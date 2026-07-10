# Handoff

<!-- agent-context-kit:handoff-snapshot:start -->
## Repository evidence

- Branch: "main"
- HEAD: "0c6f49c at 2026-07-10T11:37:22+09:00"
- Upstream: "origin/main; ahead 0, behind 0"
- Working tree: 0 staged, 42 unstaged, 29 untracked, 0 conflicted
- Staged diff: 0 file(s), +0/-0, 0 binary
- Unstaged diff: 42 file(s), +2053/-448, 0 binary
- Scope: project directory; changed paths are project-relative; this handoff snapshot file is excluded

### Changed paths (71)

    {"status":" M","path":".agent-context/architecture.md"}
    {"status":"??","path":".agent-context/config.schema.json"}
    {"status":" M","path":".agent-context/config.yaml"}
    {"status":" M","path":".agent-context/conventions.md"}
    {"status":" M","path":".agent-context/current-state.md"}
    {"status":" M","path":".agent-context/decisions.md"}
    {"status":" M","path":".github/workflows/ci.yml"}
    {"status":"??","path":".github/workflows/release.yml"}
    {"status":" M","path":".gitignore"}
    {"status":" M","path":"CHANGELOG.md"}
    {"status":" M","path":"CONTRIBUTING.md"}
    {"status":" M","path":"README.md"}
    {"status":" M","path":"ROADMAP.md"}
    {"status":" M","path":"SECURITY.md"}
    {"status":"??","path":"docs/adapter-compatibility.md"}
    {"status":" M","path":"docs/architecture.md"}
    {"status":"??","path":"docs/configuration.md"}
    {"status":" M","path":"docs/decisions/0004-cli-and-context-names.md"}
    {"status":"??","path":"docs/decisions/0005-configuration-v1-compatibility.md"}
    {"status":"??","path":"docs/decisions/0006-deterministic-git-handoff-evidence.md"}
    {"status":"??","path":"docs/decisions/0007-guarded-filesystem-replacement.md"}
    {"status":" M","path":"docs/decisions/README.md"}
    {"status":" M","path":"docs/engineering-log.md"}
    {"status":" M","path":"docs/product-scope.md"}
    {"status":"??","path":"docs/releasing.md"}
    {"status":" M","path":"docs/testing-strategy.md"}
    {"status":" M","path":"docs/threat-model.md"}
    {"status":" M","path":"package-lock.json"}
    {"status":" M","path":"package.json"}
    {"status":"??","path":"schemas/config-v1.schema.json"}
    {"status":"??","path":"scripts/build-release-artifact.mjs"}
    {"status":"??","path":"scripts/clean.mjs"}
    {"status":"??","path":"scripts/lib/npm-cli.mjs"}
    {"status":" M","path":"scripts/package-dry-run.mjs"}
    {"status":" M","path":"scripts/package-smoke.mjs"}
    {"status":"??","path":"scripts/verify-published.mjs"}
    {"status":" M","path":"src/adapters/managed-block.ts"}
    {"status":"??","path":"src/adapters/registry.ts"}
    {"status":" M","path":"src/adapters/render.ts"}
    {"status":" M","path":"src/cli.ts"}
    {"status":"??","path":"src/commands/handoff.ts"}
    {"status":" M","path":"src/commands/init.ts"}
    {"status":" M","path":"src/commands/sync.ts"}
    {"status":" M","path":"src/commands/validate.ts"}
    {"status":" M","path":"src/config/decode.ts"}
    {"status":" M","path":"src/config/load.ts"}
    {"status":" M","path":"src/core/files.ts"}
    {"status":"??","path":"src/core/marker-lines.ts"}
    {"status":" M","path":"src/core/paths.ts"}
    {"status":"??","path":"src/core/text.ts"}
    {"status":" M","path":"src/domain/types.ts"}
    {"status":"??","path":"src/git/inspect.ts"}
    {"status":"??","path":"src/handoff/snapshot-block.ts"}
    {"status":" M","path":"src/index.ts"}
    {"status":"??","path":"src/schema/public-schema.ts"}
    {"status":" M","path":"src/templates/defaults.ts"}
    {"status":"??","path":"src/validation/path-ownership.ts"}
    {"status":" M","path":"src/validation/validate.ts"}
    {"status":"??","path":"tests/adapters.test.mjs"}
    {"status":"??","path":"tests/adoption.test.mjs"}
    {"status":" M","path":"tests/cli.test.mjs"}
    {"status":" M","path":"tests/config.test.mjs"}
    {"status":"??","path":"tests/fixtures/adapters/claude.md"}
    {"status":"??","path":"tests/fixtures/adapters/codex.md"}
    {"status":"??","path":"tests/handoff.test.mjs"}
    {"status":" M","path":"tests/helpers.mjs"}
    {"status":" M","path":"tests/lifecycle.test.mjs"}
    {"status":" M","path":"tests/managed-block.test.mjs"}
    {"status":"??","path":"tests/performance.test.mjs"}
    {"status":"??","path":"tests/property.test.mjs"}
    {"status":"??","path":"tests/schema.test.mjs"}

### Recent commits (4)

    {"commit":"0c6f49c","committedAt":"2026-07-10T11:37:22+09:00","subject":"ci: pin actions and bound major toolchain updates"}
    {"commit":"c234680","committedAt":"2026-07-10T11:34:56+09:00","subject":"ci: modernize actions and pin macOS runner"}
    {"commit":"e2de542","committedAt":"2026-07-10T11:31:50+09:00","subject":"fix: normalize text checkouts across platforms"}
    {"commit":"570c2ea","committedAt":"2026-07-10T11:29:52+09:00","subject":"feat: establish Agent Context Kit alpha foundation"}
<!-- agent-context-kit:handoff-snapshot:end -->

## Last verified

2026-07-10, Asia/Seoul. Final local beta gates passed on macOS with Node.js 22.23.0 and npm 10.9.8.

## Objective

Finish the production-minded `0.1.0-beta.0` release candidate, pass independent follow-up review and
the full remote OS/runtime matrix, then publish only after legal and release-protection prerequisites
are explicit.

## Changes

- Added the strict public configuration v1 JSON Schema, copied editor artifact, compatibility corpus,
  and explicit future migration contract.
- Implemented deterministic Git handoff evidence with bounded direct subprocesses, hostile-environment
  controls, invalid-byte preservation, two-observation consistency, and narrative-safe Unicode output.
- Unified config, schema, documents, and adapters under one normalized ownership graph and hardened
  standalone managed markers against inline mentions and generated marker injection.
- Added frozen/revalidated loaded-project snapshots and guarded filesystem replacement using canonical
  root, parent, temporary-file, and exact-content identity.
- Expanded package verification across local, ephemeral, global, ESM, TypeScript, Windows shim, init,
  and validate paths; prepared exact-artifact npm provenance publishing.
- Added ADR-0005 through ADR-0007 plus configuration, adapter compatibility, release, threat, testing,
  and engineering-log updates.
- Ran an independent beta review. Its two P1 findings (stale loaded config and parent substitution) and
  two P2 findings (mixed-time Git evidence and stale handoff narrative) received root fixes and
  regression coverage.

## Verification

- `npm run quality`: formatter/lint, strict typecheck, build, 104 tests, and coverage thresholds passed.
- Coverage: 95.50% lines, 94.87% functions, and 90.90% branches.
- `npm run pack:check`: 115-file, 81,239-byte clean artifact plan; compiled `dist` exactly matched
  `src`, while source, tests, and internal scripts remained excluded.
- `npm run test:package`: local install, exact tarball ephemeral execution, global binary, ESM exports,
  TypeScript declarations, init, and validate passed with an isolated npm cache.
- `node dist/cli.js sync --check`: copied schema and both dogfooded adapters unchanged.
- `node dist/cli.js validate --json`: valid with no diagnostics.
- `npm audit --omit=dev`: zero known runtime vulnerabilities reported.
- `git diff --check`: no whitespace errors.
- Follow-up review found no remaining P0/P1/P2 code defect. Its only NO-GO item was handoff evidence
  freshness after late hardening; the full gates above were rerun on the frozen tree before this final
  snapshot refresh.

## Unresolved

- The uncommitted beta tree must be pushed and pass Node 22/24 quality plus Node 22.0.0/24 package
  smoke on Linux, macOS, and Windows.
- No open-source license has been selected, so public npm distribution remains legally blocked.
- GitHub environment `npm` still requires protected reviewer configuration. First publication may
  require a short-lived protected granular token before npm trusted publishing can replace it.
- Sequential cross-file commit, the final path-check-to-syscall interval, hard links, and additional
  Windows reparse points remain documented residual risks.

## Next action

Commit and push the reviewed beta candidate, then monitor every remote CI job before requesting the
license decision.
