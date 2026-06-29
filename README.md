# OpenSyria Data Universities

[![Validate](https://github.com/Open-Syria/data-universities/actions/workflows/validate.yml/badge.svg)](https://github.com/Open-Syria/data-universities/actions/workflows/validate.yml)

OpenSyria Data Universities is the canonical repository for public, non-personal Syrian university data.

The repository follows the same structure as other OpenSyria data repositories:

```text
data/
  sources.json
  universities.json
schemas/
  sources.schema.json
  universities.schema.json
  release-manifest.schema.json
  source-import.schema.json
fixtures/valid-data/
  sources.json
  universities.json
scripts/
  validate-data.mjs
  build-release.mjs
  prepare-release.mjs
```

## Data Scope

University records may include public facts such as:

- canonical English and Arabic names,
- aliases and transliterations,
- institution type,
- operating status,
- founding year,
- public website,
- public location fields,
- reusable external identifiers,
- source attribution.

Do not add private personal data, student records, staff records, account data, phone numbers, private addresses, or unreleasable scraped content.

Normal GitHub contributions are limited to approved data fixes, missing records, source updates, and documentation corrections. For broader contribution ideas, new dataset topics, partnerships, or changes outside the approved scope, contact `data@opensyria.org` before starting work.

## Setup

```bash
pnpm install
pnpm run validate
```

Useful commands:

```bash
pnpm run validate:data
pnpm run validate:fixtures
pnpm run report:data
pnpm run release:build
pnpm run release:build:fixtures
```

## Release Artifacts

`pnpm run release:build` writes release files to `dist/release/`, including:

- `release-manifest.json`,
- `artifacts/universities.json`,
- `artifacts/universities.ndjson`,
- `artifacts/universities.csv`,
- `artifacts/universities.sql`,
- `artifacts/universities.yaml`,
- `artifacts/universities.xml`.

## Documentation

Start with:

- [Data Schema](docs/DATA_SCHEMA.md)
- [Field Reference](docs/FIELD_REFERENCE.md)
- [Sources](docs/SOURCES.md)
- [Import Workflow](docs/IMPORT_WORKFLOW.md)
- [Release Checklist](docs/RELEASE_CHECKLIST.md)
- [Post-Seed Backlog](docs/POST_SEED_BACKLOG.md)
