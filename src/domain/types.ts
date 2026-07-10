export const CONFIG_PATH = ".agent-context/config.yaml";
export const CONFIG_VERSION = 1 as const;

export type AdapterType = "codex" | "claude";
export type LoadPolicy = "always" | "on-demand";

export interface ProjectConfig {
  readonly version: typeof CONFIG_VERSION;
  readonly project: {
    readonly name: string;
  };
  readonly documents: readonly ContextDocument[];
  readonly adapters: readonly AdapterConfig[];
  readonly policies: {
    readonly maxAlwaysCharacters: number;
    readonly maxAdapterCharacters: number;
  };
}

export interface ContextDocument {
  readonly id: string;
  readonly path: string;
  readonly load: LoadPolicy;
  readonly description: string;
  readonly triggers?: readonly string[];
}

export interface AdapterConfig {
  readonly type: AdapterType;
  readonly output: string;
}

export type DiagnosticLevel = "error" | "warning";

export interface Diagnostic {
  level: DiagnosticLevel;
  code: string;
  message: string;
  path?: string;
  hint?: string;
}

export interface LoadedProject {
  readonly root: string;
  readonly configPath: string;
  readonly configSource: string;
  readonly config: ProjectConfig;
}
