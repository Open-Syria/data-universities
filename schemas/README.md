# Schemas

This directory contains machine-readable JSON Schemas for canonical data files and generated release manifests.

## Canonical Data Schemas

```text
sources.schema.json
universities.schema.json
assets.schema.json
faculties.schema.json
programs.schema.json
rankings.schema.json
```

These schemas are useful for editors, external tooling, and contributors who want early feedback while editing JSON.

## Release Schemas

```text
release-manifest.schema.json
source-import.schema.json
```

The release manifest schema documents the contract consumed by downstream tools such as `datasets-api`.

The source import schema documents maintainer import manifests under `imports/manifests/`.

## Validation

Run:

```bash
pnpm run validate:schemas
pnpm run validate:imports
pnpm run validate
```

The repository validation scripts remain the authoritative validation path because they also check cross-file rules such as unique IDs, approved source references, and duplicate aliases.
