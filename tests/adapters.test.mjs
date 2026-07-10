import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import {
  getAdapterDefinition,
  isAdapterType,
  listAdapterDefinitions,
  markdownCodeSpan,
  renderAdapter,
} from "../dist/index.js";
import { createDefaultConfig } from "../dist/templates/defaults.js";

const fixtures = path.join(import.meta.dirname, "fixtures", "adapters");

test("adapter registry has stable unique types and default outputs", () => {
  const definitions = listAdapterDefinitions();
  assert.deepEqual(definitions.map((definition) => definition.type).sort(), ["claude", "codex"]);
  assert.equal(new Set(definitions.map((definition) => definition.defaultOutput)).size, 2);
  assert.equal(getAdapterDefinition("codex").defaultOutput, "AGENTS.md");
  assert.equal(getAdapterDefinition("claude").defaultOutput, "CLAUDE.md");
  assert.equal(isAdapterType("codex"), true);
  assert.equal(isAdapterType("cursor"), false);
});

for (const type of ["codex", "claude"]) {
  test(`${type} adapter matches its reviewed golden fixture`, async () => {
    const config = createDefaultConfig("Adapter fixture", [type]);
    const expected = await readFile(path.join(fixtures, `${type}.md`), "utf8");
    assert.equal(renderAdapter(config, config.adapters[0]), expected.trimEnd());
  });
}

test("Markdown code spans preserve paths containing arbitrary backtick runs", () => {
  assert.equal(markdownCodeSpan("plain.md"), "`plain.md`");
  assert.equal(markdownCodeSpan("foo`bar.md"), "``foo`bar.md``");
  assert.equal(markdownCodeSpan("foo``bar.md"), "```foo``bar.md```");
  assert.equal(markdownCodeSpan("`edge`"), "`` `edge` ``");

  const config = createDefaultConfig("Backtick fixture", ["codex"]);
  config.documents[0].path = "docs/foo`bar.md";
  assert.match(renderAdapter(config, config.adapters[0]), /``\.agent-context\/docs\/foo`bar\.md``/);
});
