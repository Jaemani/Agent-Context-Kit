# Handoff

<!-- agent-context-kit:handoff-snapshot:start -->
## Repository evidence

- Branch: "main"
- HEAD: "f7d0826 at 2026-07-11T01:56:31+09:00"
- Upstream: "origin/main; ahead 1, behind 0"
- Working tree: Clean (snapshot file excluded)
- Staged diff: 0 file(s), +0/-0, 0 binary
- Unstaged diff: 0 file(s), +0/-0, 0 binary
- Scope: project directory; changed paths are project-relative; this handoff snapshot file is excluded

### Changed paths (0)

None.

### Recent commits (5)

    {"commit":"f7d0826","committedAt":"2026-07-11T01:56:31+09:00","subject":"docs: record Carrylog beta4 verification"}
    {"commit":"d7a83e4","committedAt":"2026-07-11T01:49:11+09:00","subject":"feat: migrate project identity to Carrylog"}
    {"commit":"d99f92f","committedAt":"2026-07-10T21:39:18+09:00","subject":"docs: record beta3 release verification"}
    {"commit":"65230d8","committedAt":"2026-07-10T21:34:23+09:00","subject":"fix: publish exact local release artifact"}
    {"commit":"774dc2d","committedAt":"2026-07-10T18:19:31+09:00","subject":"fix: validate npm provenance client"}
<!-- agent-context-kit:handoff-snapshot:end -->

## Last verified

2026-07-11, Asia/Seoul. `@jaemani/agent-context-kit@0.1.0-beta.3` is public with verified digests,
provenance, one-off execution, and global installation. The repository has been renamed to
`Jaemani/Carrylog`; the next reviewed package is `carrylog@0.1.0-beta.4`.

## Objective

Complete a compatibility-preserving Carrylog identity migration, pass local and remote release gates,
publish beta.4 from a new immutable tag, and retire the old package and bootstrap credential safely.

## Published beta.3 evidence

- Commit `d99f92f`, tag `v0.1.0-beta.3`, CI `29093271158`, and release `29093394523` are immutable.
  Registry digests, SLSA provenance, npx/global/init/validate, the initial `EOTP`, both transparency
  entries, and four-minute visibility delay are recorded in `docs/engineering-log.md`.
- Published SHA-256 is `558578c96a8716a758755eb06b34e106a720175dbff626b1c10fbde28799c095`.

## Carrylog migration

- ADR-0008 fixes active identity as `Carrylog`, `Jaemani/Carrylog`, package/binary `carrylog`; `cl` is
  rejected for Windows. Published `.agent-context/`, v1 schema, and marker identities remain frozen.
- The new package exports only `carrylog`; the legacy error constructor and debug fallback remain API
  compatible. Package smoke covers every supported consumer and publish-dry-run path.
- An independent beta.3 fixture verifies marker/config/schema preservation, no duplicate context root,
  full idempotence, and exact LF/CRLF instruction migration at mutable document paths. Customized
  command-shaped legacy invocations fail without partial writes; historical prose remains valid.
- Published schema SHA-256 is
  `f30d6c906dba10059032ce13c74257b6ab41ebdd30308ca56b65408f039369ab`.

## Verification

- Quality: 129/129; lines/functions/branches 95.71%/95.71%/91.24%; migration 100% in all measures and
  near-one-MiB scan 4.7 ms. Sync, validate, diff, and full npm audit pass.
- Package: 126 files, 100,633 bytes. npm 10 and exact Node 24.15.0/npm 11.18.0 pass publish dry run and
  every consumer; npm 11 provenance loads; npm 12.0.0 passes keyed pack and non-publish consumers.
- Independent code/security, release/workflow, and documentation reviews returned GO with no P0/P1/P2.
- Sandboxed package smoke timed out during isolated registry install; the unchanged registry-enabled
  gate passed under npm 10/11, confirming an environment boundary rather than package failure.
- CI run `29108810508` passed all eleven jobs on exact head `0b77aac`, including every supported OS,
  Node 22/24, exact minimum Node 22.0.0, npm 11 release, and npm 12 package contracts.
- Clean exact npm 11 release verification passed on `0b77aac`; its pre-record artifact SHA-256 was
  `f3ba0076dd41337dcc0a74b47a00b2f35562fb802395213e59d0ee4b61bbb4f8`. The packaged engineering
  record changes the final tarball, so final clean verification must produce the tag candidate anew.

## Remaining

- Commit this refreshed handoff, push the verification records, require the final remote CI matrix,
  then rerun clean release verification from that exact remote-tested commit.
- Recheck npm name availability, create `v0.1.0-beta.4`, approve the protected environment, and
  monitor the first Carrylog publication without blindly retrying ambiguous registry state.
- Verify digests, provenance, npx, global install, init, and validate; remove Carrylog `latest` if
  created; configure trusted publishing; remove old-package `latest`; deprecate beta.3; delete and
  revoke the bootstrap credential.

## Next action

Commit this handoff evidence, push the verification records, and require the final remote CI matrix.
