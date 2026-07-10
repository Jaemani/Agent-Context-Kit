import type { AdapterType } from "../domain/types.js";

export interface AdapterDefinition {
  readonly type: AdapterType;
  readonly label: string;
  readonly defaultOutput: string;
}

const DEFINITIONS: Readonly<Record<AdapterType, AdapterDefinition>> = Object.freeze({
  codex: Object.freeze({ type: "codex", label: "Codex", defaultOutput: "AGENTS.md" }),
  claude: Object.freeze({
    type: "claude",
    label: "Claude Code",
    defaultOutput: "CLAUDE.md",
  }),
});

export function getAdapterDefinition(type: AdapterType): AdapterDefinition {
  return DEFINITIONS[type];
}

export function isAdapterType(value: string): value is AdapterType {
  return Object.hasOwn(DEFINITIONS, value);
}

export function listAdapterDefinitions(): AdapterDefinition[] {
  return Object.values(DEFINITIONS);
}
