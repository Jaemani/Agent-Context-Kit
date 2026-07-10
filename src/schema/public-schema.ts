import { readFileSync } from "node:fs";

export const PUBLIC_SCHEMA_PATH = ".agent-context/config.schema.json";
export const PUBLIC_SCHEMA_YAML_DIRECTIVE = "# yaml-language-server: $schema=./config.schema.json";

const schemaUrl = new URL("../../schemas/config-v1.schema.json", import.meta.url);

export function readPublicSchema(): string {
  const content = readFileSync(schemaUrl, "utf8");
  return content.endsWith("\n") ? content : `${content}\n`;
}
