# ADR-0005: Freeze configuration v1 and separate structural from semantic validation

- Status: Accepted
- Date: 2026-07-10
- Owners: Repository maintainer

## Context

The alpha decoder already called its configuration `version: 1`, but no public schema or compatibility
promise defined what that version meant. Editor validation, runtime validation, and future package
upgrades could therefore disagree or silently reinterpret an existing repository.

JSON Schema can describe object shape, bounds, enumerations, and many string constraints. It cannot
reliably express every cross-entry invariant used here, including Unicode/case-normalized path
collisions, adapter-to-source ownership, symbolic links, and actual filesystem budgets.

## Decision

Package SemVer and configuration versions are independent:

- npm package versions describe CLI/API releases;
- the integer `version` in `config.yaml` describes the canonical data contract.

Configuration v1 is the first beta contract. Every raw configuration accepted by the v1 runtime
decoder must also pass `schemas/config-v1.schema.json`. The reverse is intentionally not guaranteed:
runtime validation adds documented semantic and filesystem rules that JSON Schema cannot express.
Strings are not silently trimmed; surrounding whitespace is invalid.

The v1 schema has a stable `$id`, is shipped in the npm package, and is copied into each initialized
repository. `sync` repairs a missing or drifted copied schema but does not rewrite canonical YAML.
A pre-schema v1 project remains runnable; `validate` warns when the editor directive is missing and
documents the exact manual addition.

Unknown configuration versions fail before mutation. There is no migration command while v1 is the
only version. A future v2 must ship an explicit, reviewable migration workflow with check/dry-run
behavior before any command rewrites v1 data. Support for v1 will not be removed within package 0.x
or 1.x. Removing it later requires a package major release and a documented migration path.

After the first beta tag, changes that make a previously accepted safe v1 configuration invalid are
breaking changes. A demonstrated security defect may require a narrower rejection, but it must be
documented in the changelog and covered by a regression test.

## Rejected alternatives

- **Treat the schema as the complete validator:** rejected because filesystem and normalized
  ownership rules cannot be represented accurately.
- **Silently normalize whitespace or paths:** rejected because the rendered value would differ from
  reviewed YAML.
- **Let the installed CLI reinterpret v1 over time:** rejected because repositories could change
  behavior without changing their canonical version.
- **Add a no-op migration command now:** rejected because it would create an interface without a
  real source/target transformation to validate.

## Consequences

- Schema/runtime parity needs a permanent generated and boundary corpus.
- New configuration concepts that cannot be added compatibly require v2.
- The copied schema is generated ownership and must participate in the same collision graph as every
  document and adapter.
- Older alpha repositories may receive a non-blocking editor-directive warning after upgrading.

## Validation

- Strict Ajv compilation and boundary tests for the public schema.
- A deterministic 500-case corpus proving runtime-accepted generated v1 configs pass the schema.
- Upgrade coverage for missing schema artifacts and missing YAML directives.
- Exact package and initialized-project schema byte comparisons.
