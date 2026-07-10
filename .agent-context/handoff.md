# Handoff

<!-- agent-context-kit:handoff-snapshot:start -->
## Repository evidence

- Branch: "main"
- HEAD: "65230d8 at 2026-07-10T21:34:23+09:00"
- Upstream: "origin/main; ahead 0, behind 0"
- Working tree: 0 staged, 2 unstaged, 0 untracked, 0 conflicted
- Staged diff: 0 file(s), +0/-0, 0 binary
- Unstaged diff: 2 file(s), +13/-4, 0 binary
- Scope: project directory; changed paths are project-relative; this handoff snapshot file is excluded

### Changed paths (2)

    {"status":" M","path":".agent-context/current-state.md"}
    {"status":" M","path":"docs/engineering-log.md"}

### Recent commits (5)

    {"commit":"65230d8","committedAt":"2026-07-10T21:34:23+09:00","subject":"fix: publish exact local release artifact"}
    {"commit":"774dc2d","committedAt":"2026-07-10T18:19:31+09:00","subject":"fix: validate npm provenance client"}
    {"commit":"8561b78","committedAt":"2026-07-10T17:55:56+09:00","subject":"docs: record beta1 release verification"}
    {"commit":"06f9b9c","committedAt":"2026-07-10T17:52:50+09:00","subject":"fix: support npm 12 pack metadata"}
    {"commit":"307fe5b","committedAt":"2026-07-10T16:35:21+09:00","subject":"docs: record licensed release verification"}
<!-- agent-context-kit:handoff-snapshot:end -->

## Last verified

2026-07-10, Asia/Seoul. The `beta.2` protected release stopped before a registry request because npm
interpreted a bare slash-containing tarball argument as GitHub shorthand. The scoped package remains
E404.

## Objective

Publish `0.1.0-beta.3` without moving the immutable, unpublished `beta.0`, `beta.1`, or `beta.2` tags,
then verify registry integrity, provenance, one-off execution, and global installation.

## Release evidence

- Run `29082832556` passed npm 11.18.0 preflight on Linux, macOS, and Windows. The protected job passed
  its provenance-client contract, all 111 tests, dogfood checks, artifact construction, exact-artifact
  smoke, and runtime audit.
- Its 117-file, 86,453-byte tarball had SHA-256
  `120698432c03121c143628a93eb1ca61b7eb093b5a0a81a1e2cde330085db66a`.
- `npm publish release/*.tgz` expanded to `release/<name>.tgz`; npm parsed that value as GitHub shorthand
  and attempted SSH `git ls-remote`. Exit 128 occurred before a registry request, and npm remained
  E404. `v0.1.0-beta.2` stays immutable.
- `beta.0` and `beta.1` also failed before publication for separately documented npm 12 pack-envelope
  and missing-`sigstore` defects. Their full evidence remains in `docs/engineering-log.md`.

## Current correction

- Publication now reads `release/artifact.json` and rechecks package, version, workflow commit, safe
  filename, exact regular tarball count, size, SHA-256, SHA-1, and SHA-512 integrity.
- npm receives one absolute tarball path through a shell-free subprocess; no shell glob reaches the
  package-spec parser.
- Package smoke can run a real `npm publish --dry-run` against an absolute path containing spaces.
  npm 10 direct and npm 11 package-keyed dry-run envelopes are verified. npm 12 remains pack/install
  only because its published bundle cannot load the publish command even with provenance disabled.
- Package and lockfile versions are `0.1.0-beta.3`. Workflow, changelog, README, roadmap, release and
  testing policy, engineering log, current state, and regression tests are updated.

## Verification

- npm 10 quality passed 115 tests with 95.50% lines, 95.51% functions, and 90.91% branches.
- npm 10 passed package inspection, publish dry-run, local/ephemeral/global install, ESM, TypeScript,
  init, validate, formatting, strict typecheck, and diff checks.
- Isolated exact npm 11.18.0 loaded its provenance implementation and passed package inspection,
  publish dry-run, and every package smoke mode.
- Isolated exact npm 12.0.0 passed package-keyed inspection and all non-publish smoke modes.
- Independent root-cause audits found no P0 and recommended the implemented artifact-record-driven,
  absolute, shell-free boundary over a minimal `./` glob fix.
- Two independent frozen-tree final reviews returned GO with no unresolved P0, P1, or P2 finding.
  They separately checked code/security and workflow/test/document consistency, including tag
  immutability, annotated-tag `GITHUB_SHA`, Windows and space paths, npm client separation, and the
  documented residual path-reopen boundary.
- Commit `65230d8` passed all eleven jobs in CI run `29093006551`: Node 22/24 quality on Linux,
  macOS, and Windows; package publish-dry-run smoke on all supported operating systems and exact
  minimum Node.js 22.0.0; and the npm 11 release/npm 12 package contract.
- A clean isolated Node.js 24.15.0/npm 11.18.0 `npm run release:verify` passed on the same commit:
  115 tests, 95.50% lines, 95.51% functions, 90.91% branches, dogfood sync/validate, package
  inspection, publish dry-run, every install mode, ESM, declarations, init, validate, and audit.
  The 117-file, 87,957-byte artifact had SHA-256
  `6b531fedc49f621dc7e58561f14fbd2126f698ef26ffa44708452451549d2fee`.

## Remaining

- Commit and push this verification record, pass its remote CI, and run final clean exact npm 11
  release verification.
- Create the new `v0.1.0-beta.3` tag, approve the protected environment, and monitor publication.
- After success, verify registry digests, provenance, `npx`, and global install; configure trusted
  publishing, remove the GitHub bootstrap secret, and revoke the npm token.

## Next action

Refresh this evidence block, then commit the beta.3 verification record.
