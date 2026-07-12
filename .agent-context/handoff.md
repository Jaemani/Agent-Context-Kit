# Handoff

<!-- agent-context-kit:handoff-snapshot:start -->
## Repository evidence

- Branch: "main"
- HEAD: "343b4e3 at 2026-07-12T14:17:33+09:00"
- Upstream: "origin/main; ahead 0, behind 0"
- Working tree: 0 staged, 4 unstaged, 0 untracked, 0 conflicted
- Staged diff: 0 file(s), +0/-0, 0 binary
- Unstaged diff: 4 file(s), +56/-23, 0 binary
- Scope: project directory; changed paths are project-relative; this handoff snapshot file is excluded

### Changed paths (4)

    {"status":" M","path":".agent-context/current-state.md"}
    {"status":" M","path":"README.md"}
    {"status":" M","path":"ROADMAP.md"}
    {"status":" M","path":"docs/engineering-log.md"}

### Recent commits (5)

    {"commit":"343b4e3","committedAt":"2026-07-12T14:17:33+09:00","subject":"release: prepare Carrylog beta5"}
    {"commit":"660b0ce","committedAt":"2026-07-12T04:24:45+09:00","subject":"docs: record beta5 candidate CI"}
    {"commit":"243e1d5","committedAt":"2026-07-12T04:22:33+09:00","subject":"feat: add universal Carrylog continuity"}
    {"commit":"f7d0826","committedAt":"2026-07-11T01:56:31+09:00","subject":"docs: record Carrylog beta4 verification"}
    {"commit":"d7a83e4","committedAt":"2026-07-11T01:49:11+09:00","subject":"feat: migrate project identity to Carrylog"}
<!-- agent-context-kit:handoff-snapshot:end -->

## Objective

Close the verified beta.5 release evidence, then execute the preregistered minimum Tier 1 continuity
pilot without implementing journaling or compaction.

## Completed

- Built the beta.5 configuration-v2 migration, universal surfaces, continuity Skills, guarded
  checkpoint/resume, and evidence gates without changing frozen v1 wire identities.
- Resolved independent review findings in parsing, terminal output, executable resolution, legacy
  evidence scanning, v1 migration, resource bounds, public API validation, and package boundaries.
- Published immutable beta.4 through failed-job-only recovery and independently verified its public
  artifact, provenance, installation, initialization, and validation.
- Reworked user and maintainer docs around installability, measured adoption, evidence ownership, and
  a minimum Tier 1 pilot; journaling and compaction remain research-only.
- Deprecated the old scoped beta with an exact migration message, removed the GitHub bootstrap
  secret, corrected the non-removable `latest` policy, and made beta.5 publication OIDC-only.
- Added complete dist-tag verification and workflow contracts after an independent release NO-GO;
  the follow-up review is GO.
- Published immutable beta.5 through the protected token-free OIDC workflow after all three platform
  preflights passed, then independently matched the public artifact, executable, tags, signature,
  provenance, release commit, and immutable tag.

## Verification

- Full local quality, package, publish-dry-run, and audit gates pass, including accepted and rejected
  registry policy states. Exact measurements belong to the engineering log.
- Independent post-fix code/security review reports all findings resolved; dogfood sync, validation,
  checkpoint freshness, and resume pass. Exact evidence belongs to the engineering log.
- The reviewed beta.5 implementation commit passed all eleven Linux/macOS/Windows CI jobs, including
  minimum Node, packed consumers, the release client, and npm 12 contracts.
- Harness discovery has local Codex/Gemini and one authenticated Claude reconstruction result; Cursor
  remains unavailable, so cross-harness behavioral continuity is not claimed.
- Beta.4 remains the verified bare-install bootstrap because npmjs.org forbids removing `latest`;
  `@beta` is the advancing prerelease channel. The old beta.3 deprecation is publicly verified.
- The tagged beta.5 release workflow and independent public-registry checks passed. Exact run IDs,
  artifact digests, provenance identity, and the rejected ambient-global false result are recorded in
  the engineering log.

## Decisions

- Configuration v1 stays frozen; v2 is explicit and fail-closed. Codex/Cursor share `AGENTS.md` and
  the generic Skill; Claude uses a minimal Skill adapter; Gemini has its own root adapter.
- Portable continuity is reviewed repository state plus fresh Git observation, never transcripts,
  hidden reasoning, provider stores, credentials, or native-compaction state.
- ADR-0012 permits the narrow checkpoint beta with documented gaps but gates behavioral continuity,
  journaling, and semantic-compaction claims on staged evidence.
- npm's non-removable `latest` stays fixed at beta.4 until stable; beta.5 and later prereleases advance
  only through explicit `@beta` or exact-version selection.

## Risks

- Cross-harness behavioral continuity, repeated-switch retention, all-record value, and compaction
  superiority remain unproven.
- Cursor is unavailable; final authenticated Codex/Gemini conformance needs credential recovery.
- Cross-file replacement is staged and config-last but is not an OS-level transaction; ADR-0007's
  sequential rename and final path-to-syscall race remain.
- The Tier 1 protocol cannot generate scored results until two repository fixtures, task rubrics,
  randomized order, and two authenticated harnesses are frozen in a committed preregistration.

## Next action

Commit the post-release evidence, freeze the Tier 1 fixtures and harness prerequisites, then execute
the randomized pilot without changing the product during scored runs.
