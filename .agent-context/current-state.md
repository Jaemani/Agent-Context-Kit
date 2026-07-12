# Current state

## Active objective

Close the verified beta.5 release evidence, then execute the preregistered minimum Tier 1 continuity
pilot without implementing journaling or compaction.

## Implemented and verified

- Strict TypeScript CLI implements deterministic context initialization, synchronization, validation,
  Git handoff, explicit v1-to-v2 migration, checkpoint, and portable resume.
- Configuration v1 remains frozen; v2 adds Codex/Cursor, Claude, and Gemini surfaces plus offline
  continuity Skills with fail-closed ownership and migration.
- Resume binds guarded context reads to stable Git evidence, enforces per-file and aggregate resource
  limits, and emits terminal-safe human and JSON projections without provider-session data.
- ADR-0009 through ADR-0012 define universal surfaces, continuity boundaries, Git stability, and
  evidence gates; research protocols remain outside the product package.
- Dogfood lifecycle, package consumers, complete dist-tag policy, and independent post-fix
  code/security and release reviews pass locally. Exact measurements belong to the engineering log.
- Immutable beta.5 is publicly installable through the explicit npm `beta` channel. Its tagged
  cross-platform preflight, token-free OIDC publication, registry artifact, executable, dist-tags,
  signature, and SLSA provenance were independently verified.

## In progress

- Post-release evidence is being checkpointed separately from the immutable beta.5 release commit.
- The Tier 1 protocol exists, but its two repository fixtures, task rubrics, randomized order, and
  authenticated two-harness access must be frozen in a committed preregistration before scored runs.

## Blockers and risks

- Cursor CLI is unavailable locally; final authenticated Codex/Gemini conformance still needs restored
  credentials.
- Automated resume needs a compatible source build, project-pinned install, or global install; Skills
  never download, build, or upgrade it implicitly.
- Sequential cross-file rename and the final path-to-syscall TOCTOU window remain under ADR-0007.
- External outcome evidence and additional Windows reparse/hard-link coverage remain stable-release
  work.
- npmjs.org does not allow removing `latest`; beta.4 remains the documented bare-install bootstrap
  until stable while `@beta` advances.
- Cross-harness behavioral continuity, repeated-switch retention, conversation reconstruction, and
  compaction value remain unproven and outside the supported runtime.

## Next best task

Commit the post-release evidence, freeze the Tier 1 fixtures and harness prerequisites, then execute
the randomized pilot without changing the product during scored runs.
