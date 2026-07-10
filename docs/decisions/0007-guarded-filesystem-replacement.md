# ADR-0007: Guard filesystem replacement with path identity

- Status: Accepted
- Date: 2026-07-10
- Owners: Repository maintainer

## Context

Expected-content checks prevent an ordinary stale plan from overwriting a human edit, but content is
not the complete identity of a filesystem path. After preflight, an attacker or concurrent process
could rename a managed parent directory and replace it with a symbolic link. A later path-based
temporary write or rename could then target a different directory, including one outside the project.

Portable Node.js exposes path-based `mkdir`, `open`, and `rename`, but it does not expose the
directory-descriptor-relative `openat`/`renameat` operations needed to hold a parent directory stable
across every syscall.

## Considered options

1. Rely only on the original symlink preflight and expected file content.
2. Add a native platform-specific filesystem module before the beta.
3. Carry inspected path identity into the write batch and repeatedly fail closed on substitution.
4. Use a repository lock file as proof that paths cannot change.

## Decision

Use option 3 for the portable beta boundary.

Before a batch starts, every target and external precondition receives a guard containing the
canonical root, absolute target, device/inode identity of existing directory components, and the set
of parent directories that were absent. All guards are rechecked before staging begins.

After missing directories are created, the writer verifies physical root containment and rejects
symbolic links, then records the actual parent identity. It rechecks that identity immediately before
creating a sibling temporary file and before every rename. Temporary-file identity is also checked so
a replaced staging file cannot be committed. Expected target and configuration content is rechecked
before each remaining rename, and cleanup removes a temporary file only while its parent identity is
still trusted.

Commands also re-read the exact bounded configuration source at entry. A reused `LoadedProject`
therefore cannot make validate, check, dry-run, or an unchanged write path report against stale
configuration.

## Consequences

Positive:

- parent substitution between command preflight and the write batch is detected;
- ordinary concurrent edits, stale loaded snapshots, symbolic links, and replaced temporary files
  fail with stable project errors;
- the implementation remains standard-library-only and works across the supported OS matrix;
- cleanup does not follow a parent path after its identity becomes untrusted.

Negative and residual:

- each write performs additional metadata and realpath checks;
- sequential multi-file rename can still leave a partial batch after a later failure;
- a path can change in the final check-to-syscall interval, and path-based `mkdir` can have an external
  directory side effect before the postcondition detects a swap;
- eliminating those syscall windows requires a separately reviewed native directory-descriptor
  implementation, not another path-level check;
- hard links and Windows reparse-point variants beyond tested directory junction behavior remain
  explicit stable-release work.

## Validation

- deterministic parent-to-symlink substitution after guard capture;
- stale target/configuration content and missing/non-regular targets;
- staged batch cleanup, duplicate targets, mode preservation, and multi-output initialization;
- stale loaded configuration under validate, sync check/dry-run/write, and handoff check/dry-run/write.
