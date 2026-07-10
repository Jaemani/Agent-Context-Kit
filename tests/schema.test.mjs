import assert from "node:assert/strict";
import { mkdir, readFile, rm, symlink, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import Ajv2020 from "ajv/dist/2020.js";
import {
  decodeConfig,
  initProject,
  loadProject,
  PUBLIC_SCHEMA_PATH,
  readPublicSchema,
  syncProject,
  validateProject,
} from "../dist/index.js";
import { createDefaultConfig } from "../dist/templates/defaults.js";
import { createTemporaryDirectory, diagnosticCodes, removeTemporaryDirectory } from "./helpers.mjs";

const schema = JSON.parse(readPublicSchema());
const validateSchema = new Ajv2020({ allErrors: true, strict: true }).compile(schema);

test("public v1 schema accepts the runtime default configuration", () => {
  const config = createDefaultConfig("Schema fixture", ["codex", "claude"]);
  assert.equal(validateSchema(config), true, JSON.stringify(validateSchema.errors));
});

test("public v1 schema has a stable identity and covers runtime acceptance boundaries", () => {
  assert.equal(
    schema.$id,
    "https://raw.githubusercontent.com/Jaemani/Agent-Context-Kit/main/schemas/config-v1.schema.json",
  );
  const astralName = "🚀".repeat(120);
  const config = createDefaultConfig(astralName, ["codex"]);
  assert.equal(validateSchema(config), true, JSON.stringify(validateSchema.errors));
  assert.notEqual(decodeConfig(config).config, undefined);

  const maximumPath = `${"a".repeat(1021)}.md`;
  config.documents[0].path = maximumPath;
  assert.equal([...maximumPath].length, 1024);
  assert.equal(validateSchema(config), true, JSON.stringify(validateSchema.errors));
  assert.notEqual(decodeConfig(config).config, undefined);

  config.documents[0].path = `${maximumPath}x`;
  assert.equal(validateSchema(config), false);
  assert.equal(decodeConfig(config).config, undefined);
});

test("schema and runtime both reject lossy whitespace, reserved markers, and no always tier", () => {
  for (const mutate of [
    (config) => {
      config.project.name = " padded ";
    },
    (config) => {
      config.documents[0].description = "agent-context-kit:managed:start";
    },
    (config) => {
      for (const document of config.documents) document.load = "on-demand";
    },
    (config) => {
      config.documents[0].path = "line\u2028separator.md";
    },
    (config) => {
      config.documents[0].description = "escape\u001bsequence";
    },
    (config) => {
      config.documents[0].path = "lone-\ud800.md";
    },
  ]) {
    const config = createDefaultConfig("Contract fixture", ["codex"]);
    mutate(config);
    assert.equal(validateSchema(config), false, JSON.stringify(config));
    assert.equal(decodeConfig(config).config, undefined, JSON.stringify(config));
  }
});

test("every generated runtime-valid config in the compatibility corpus passes the schema", () => {
  let state = 0x5eed1234;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state;
  };
  for (let index = 0; index < 500; index += 1) {
    const config = createDefaultConfig(`Project-${random().toString(16)}-🚀`, [
      random() % 2 === 0 ? "codex" : "claude",
    ]);
    config.documents[0].description = `Description ${random().toString(36)}`;
    config.documents[4].triggers = [
      `trigger-${random().toString(36)}`,
      `trigger-${random().toString(36)}`,
    ];
    const decoded = decodeConfig(config);
    assert.notEqual(decoded.config, undefined, JSON.stringify(decoded.diagnostics));
    assert.equal(validateSchema(config), true, JSON.stringify(validateSchema.errors));
  }
});

test("public v1 schema rejects unknown keys and structural budget violations", () => {
  const config = createDefaultConfig("Schema fixture", ["codex"]);
  config.unknown = true;
  config.policies.maxAlwaysCharacters = 999;
  config.documents[0].path = "../outside.md";
  assert.equal(validateSchema(config), false);
  const keywords = new Set(validateSchema.errors.map((error) => error.keyword));
  assert.equal(keywords.has("additionalProperties"), true);
  assert.equal(keywords.has("minimum"), true);
  assert.equal(keywords.has("pattern"), true);
});

test("init links and copies the exact public schema", async () => {
  const root = await createTemporaryDirectory();
  try {
    await initProject({
      root,
      adapters: ["codex"],
      adopt: false,
      dryRun: false,
    });
    const config = await readFile(path.join(root, ".agent-context", "config.yaml"), "utf8");
    assert.match(config, /^# yaml-language-server: \$schema=\.\/config\.schema\.json\n/);
    assert.equal(await readFile(path.join(root, PUBLIC_SCHEMA_PATH), "utf8"), readPublicSchema());
  } finally {
    await removeTemporaryDirectory(root);
  }
});

test("validate and sync distinguish missing and drifted schema artifacts", async () => {
  const root = await createTemporaryDirectory();
  try {
    await initProject({
      root,
      adapters: ["codex"],
      adopt: false,
      dryRun: false,
    });
    const schemaPath = path.join(root, PUBLIC_SCHEMA_PATH);
    const project = await loadProject(root);

    await unlink(schemaPath);
    assert.equal(
      diagnosticCodes(await validateProject(project)).includes("E_SCHEMA_MISSING"),
      true,
    );
    const missingPlan = await syncProject(project, { adopt: false, check: true, dryRun: false });
    assert.equal(
      missingPlan.changes.some((change) => change.path === PUBLIC_SCHEMA_PATH),
      true,
    );

    await writeFile(schemaPath, "{}\n", "utf8");
    assert.equal(diagnosticCodes(await validateProject(project)).includes("E_SCHEMA_DRIFT"), true);
    await syncProject(project, { adopt: false, check: false, dryRun: false });
    assert.equal(await readFile(schemaPath, "utf8"), readPublicSchema());
  } finally {
    await removeTemporaryDirectory(root);
  }
});

test("pre-schema v1 projects upgrade without rewriting canonical YAML", async () => {
  const root = await createTemporaryDirectory();
  try {
    await initProject({ root, adapters: ["codex"], adopt: false, dryRun: false });
    const configPath = path.join(root, ".agent-context", "config.yaml");
    const schemaPath = path.join(root, PUBLIC_SCHEMA_PATH);
    const source = await readFile(configPath, "utf8");
    const legacySource = source.replace(/^# yaml-language-server:.*\n/, "");
    await writeFile(configPath, legacySource, "utf8");
    await unlink(schemaPath);

    const project = await loadProject(root);
    let result = await validateProject(project);
    assert.equal(diagnosticCodes(result).includes("W_CONFIG_SCHEMA_HEADER"), true);
    assert.equal(diagnosticCodes(result).includes("E_SCHEMA_MISSING"), true);

    await syncProject(project, { adopt: false, check: false, dryRun: false });
    result = await validateProject(project);
    assert.equal(result.valid, true);
    assert.equal(diagnosticCodes(result).includes("W_CONFIG_SCHEMA_HEADER"), true);
    assert.equal(await readFile(configPath, "utf8"), legacySource);
    assert.equal(await readFile(schemaPath, "utf8"), readPublicSchema());
  } finally {
    await removeTemporaryDirectory(root);
  }
});

test("schema artifact rejects symlinks, directories, and oversized content", async (context) => {
  const root = await createTemporaryDirectory();
  try {
    await initProject({ root, adapters: ["codex"], adopt: false, dryRun: false });
    const schemaPath = path.join(root, PUBLIC_SCHEMA_PATH);
    const project = await loadProject(root);

    await unlink(schemaPath);
    await writeFile(schemaPath, Buffer.alloc(1024 * 1024 + 1, 0x20));
    assert.equal(
      diagnosticCodes(await validateProject(project)).includes("E_FILE_TOO_LARGE"),
      true,
    );

    await unlink(schemaPath);
    await mkdir(schemaPath);
    assert.equal(
      diagnosticCodes(await validateProject(project)).includes("E_NOT_REGULAR_FILE"),
      true,
    );

    if (process.platform !== "win32") {
      const target = path.join(root, "schema-target.json");
      await rm(schemaPath, { recursive: true });
      await writeFile(target, readPublicSchema(), "utf8");
      await symlink(target, schemaPath);
      assert.equal(
        diagnosticCodes(await validateProject(project)).includes("E_SYMLINK_PATH"),
        true,
      );
    } else {
      context.diagnostic("Symlink case skipped on Windows; directory and size cases still ran.");
    }
  } finally {
    await removeTemporaryDirectory(root);
  }
});
