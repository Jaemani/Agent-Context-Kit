# Current state

## Active objective

Publish the reviewed beta.5 candidate through the OIDC-only workflow, verify the exact public
artifact, then run the minimum Tier 1 continuity pilot without implementing journaling or compaction.

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

## In progress

- The reviewed beta.5 implementation commit passed the eleven-job Linux/macOS/Windows CI matrix. The
  final release-content commit still needs exact-commit CI before tagging.
- Immutable beta.4 is publicly installable from the npm `beta` tag and its artifact and provenance
  were independently verified. The old package now carries an exact migration deprecation and the
  GitHub bootstrap secret is removed; exact evidence is recorded in the engineering log.

## Blockers and risks

- Cursor CLI is unavailable locally; final authenticated Codex/Gemini conformance still needs restored
  credentials.
- Automated resume needs a compatible source build, project-pinned install, or global install; Skills
  never download, build, or upgrade it implicitly.
- Sequential cross-file rename and the final path-to-syscall TOCTOU window remain under ADR-0007.
- External outcome evidence and additional Windows reparse/hard-link coverage remain stable-release
  work.
- npmjs.org does not allow removing `latest`; beta.4 remains the documented bare-install bootstrap
  until stable while `@beta` advances. Bootstrap-token revocation and the beta.5 OIDC publication
  proof still require verification.
- Trusted-publisher identity and both packages' token-disallow policies require owner-side pre-tag
  confirmation because public registry APIs do not expose those settings.

## Next best task

Commit and push the settled beta.5 release content, require exact-commit CI, confirm the owner-side npm
settings, then tag and prove token-free OIDC publication.
