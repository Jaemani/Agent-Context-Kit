# Adapter compatibility

Adapter support is based on documented instruction discovery, not filename guesses. Sources were
rechecked on 2026-07-10.

| Adapter | Default output | Supported beta contract | Official behavior source |
| --- | --- | --- | --- |
| Codex | `AGENTS.md` | Root managed block that routes to canonical context | [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md.md) |
| Claude Code | `CLAUDE.md` | Root managed block that routes to canonical context | [How Claude remembers your project](https://code.claude.com/docs/en/memory) |

## Codex

Codex builds guidance once per run/session. It reads global guidance, then walks from the project
root to the working directory. At each level it prefers `AGENTS.override.md`, then `AGENTS.md`, then
configured fallbacks; nearer files appear later and override broader guidance. The default combined
project-document limit is 32 KiB.

The beta adapter owns a block in the configured output, defaulting to the repository-root
`AGENTS.md`. It does not automatically generate a nested hierarchy, overrides, fallback
configuration, or global guidance. A custom nested output is written when configured, but discovery
and conformance for that path are user-owned. Existing human content is preserved through explicit
adoption.

## Claude Code

Claude Code loads `CLAUDE.md`/`CLAUDE.local.md` files above the working directory at launch and loads
subdirectory instructions when it works there. A project file can live at `./CLAUDE.md` or
`./.claude/CLAUDE.md`; concise files under roughly 200 lines are recommended.

The beta adapter defaults to `./CLAUDE.md`. It does not automatically generate `.claude/rules/`,
local personal instructions, imports, exclusions, or organization policy. A custom nested output is
written when configured, but discovery and conformance for that path are user-owned.

## Guarantees and limits

- The registry is the single runtime source for adapter labels and default outputs.
- Golden fixtures freeze exact managed-block output for both adapters.
- Default routers contain references and load policy, not full canonical document bodies.
- A custom output path is accepted when portable, but the user is responsible for choosing a path
  the target tool discovers.
- CI does not launch authenticated Codex or Claude sessions; conformance covers documented discovery,
  exact output, adoption, drift, and cross-platform file behavior.

Cursor, Copilot, Gemini CLI, overrides, and nested generation remain unsupported until each has its
own documented discovery/precedence contract and golden fixtures.
