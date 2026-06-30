# OpenSyria Data Universities

[![Validate](https://github.com/Open-Syria/data-universities/actions/workflows/validate.yml/badge.svg)](https://github.com/Open-Syria/data-universities/actions/workflows/validate.yml)

OpenSyria Data Universities is the canonical repository for public, non-personal Syrian university data.

The repository follows the same structure as other OpenSyria data repositories:

```text
data/
  assets.json
  faculties.json
  programs.json
  rankings.json
  sources.json
  universities.json
schemas/
  assets.schema.json
  faculties.schema.json
  programs.schema.json
  rankings.schema.json
  sources.schema.json
  universities.schema.json
  release-manifest.schema.json
  source-import.schema.json
fixtures/valid-data/
  assets.json
  faculties.json
  programs.json
  rankings.json
  sources.json
  universities.json
scripts/
  validate-data.mjs
  build-release.mjs
  prepare-release.mjs
  analyze-coverage.mjs
```

## Data Scope

The production university identity dataset is anchored to the approved production scope. Canonical university records must be within the current approved scope
and confirmed with approved public source IDs. Public-source records that are not
within the current approved scope are tracked as post-seed candidates until OpenSyria
makes an explicit scope decision.

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

Faculty, program, and ranking files are separated from university identity records.
Current canonical faculty and program arrays are empty until approved reusable
sources are reviewed. Ranking snapshots are populated only when approved public
ranking providers publish source-backed rows for a canonical institution.

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
pnpm run report:production
pnpm run coverage:data
pnpm run release:build
pnpm run release:build:fixtures
```

## Release Artifacts

`pnpm run release:build` writes release files to `dist/release/`, including:

- `release-manifest.json`,
- six artifact formats for `assets`,
- six artifact formats for `faculties`,
- six artifact formats for `programs`,
- six artifact formats for `rankings`,
- six artifact formats for `universities`.

`pnpm run coverage:data` writes generated coverage reports to `dist/coverage/`.
Use the committed coverage docs for stable guidance and the generated report for
current contribution targets.

## Documentation

Start with:

- [Data Schema](docs/DATA_SCHEMA.md)
- [Field Reference](docs/FIELD_REFERENCE.md)
- [Sources](docs/SOURCES.md)
- [Import Workflow](docs/IMPORT_WORKFLOW.md)
- [Production Readiness](docs/PRODUCTION_READINESS.md)
- [Release Checklist](docs/RELEASE_CHECKLIST.md)
- [Post-Seed Backlog](docs/POST_SEED_BACKLOG.md)
