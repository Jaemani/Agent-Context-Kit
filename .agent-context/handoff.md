# Handoff

<!-- agent-context-kit:handoff-snapshot:start -->
## Repository evidence

- Branch: "main"
- HEAD: "660b0ce at 2026-07-12T04:24:45+09:00"
- Upstream: "origin/main; ahead 0, behind 0"
- Working tree: 0 staged, 9 unstaged, 2 untracked, 0 conflicted
- Staged diff: 0 file(s), +0/-0, 0 binary
- Unstaged diff: 9 file(s), +137/-58, 0 binary
- Scope: project directory; changed paths are project-relative; this handoff snapshot file is excluded

### Changed paths (11)

    {"status":" M","path":".agent-context/current-state.md"}
    {"status":" M","path":".github/workflows/release.yml"}
    {"status":" M","path":"CHANGELOG.md"}
    {"status":" M","path":"README.md"}
    {"status":" M","path":"ROADMAP.md"}
    {"status":" M","path":"docs/engineering-log.md"}
    {"status":" M","path":"docs/releasing.md"}
    {"status":"??","path":"scripts/lib/registry-policy.mjs"}
    {"status":" M","path":"scripts/verify-published.mjs"}
    {"status":" M","path":"tests/product-identity.test.mjs"}
    {"status":"??","path":"tests/registry-policy.test.mjs"}

### Recent commits (5)

    {"commit":"660b0ce","committedAt":"2026-07-12T04:24:45+09:00","subject":"docs: record beta5 candidate CI"}
    {"commit":"243e1d5","committedAt":"2026-07-12T04:22:33+09:00","subject":"feat: add universal Carrylog continuity"}
    {"commit":"f7d0826","committedAt":"2026-07-11T01:56:31+09:00","subject":"docs: record Carrylog beta4 verification"}
    {"commit":"d7a83e4","committedAt":"2026-07-11T01:49:11+09:00","subject":"feat: migrate project identity to Carrylog"}
    {"commit":"d99f92f","committedAt":"2026-07-10T21:39:18+09:00","subject":"docs: record beta3 release verification"}
<!-- agent-context-kit:handoff-snapshot:end -->

## Objective

Publish the reviewed beta.5 candidate through the OIDC-only workflow, verify the exact public
artifact, then run the minimum Tier 1 continuity pilot without journaling or compaction.

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

## Decisions

- Configuration v1 stays frozen; v2 is explicit and fail-closed. Codex/Cursor share `AGENTS.md` and
  the generic Skill; Claude uses a minimal Skill adapter; Gemini has its own root adapter.
- Portable continuity is reviewed repository state plus fresh Git observation, never transcripts,
  hidden reasoning, provider stores, credentials, or native-compaction state.
- ADR-0012 permits the narrow checkpoint beta with documented gaps but gates behavioral continuity,
  journaling, and semantic-compaction claims on staged evidence.

## Risks

- Cross-harness behavioral continuity, repeated-switch retention, all-record value, and compaction
  superiority remain unproven.
- The future tagged release commit changes packaged documentation and still needs exact-commit gates.
- Cursor is unavailable; final authenticated Codex/Gemini conformance needs credential recovery.
- Cross-file replacement is staged and config-last but is not an OS-level transaction; ADR-0007's
  sequential rename and final path-to-syscall race remain.
- Trusted-publisher identity, both packages' token-disallow policies, and underlying bootstrap-token
  revocation require owner-side confirmation before the immutable beta.5 tag.

## Next action

Commit and push the settled beta.5 release content, require exact-commit CI, confirm the owner-side npm
settings, then create the immutable tag and verify OIDC-only publication.
