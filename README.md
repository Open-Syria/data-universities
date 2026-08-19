# OpenSyria Data Universities

[![Validate](https://github.com/Open-Syria/data-universities/actions/workflows/validate.yml/badge.svg)](https://github.com/Open-Syria/data-universities/actions/workflows/validate.yml)

OpenSyria Data Universities is the canonical repository for public, non-personal Syrian university data.

**Canonical public dataset page:** [Syrian Universities Data, Rankings and Downloads](https://opensyria.org/datasets/universities)

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
- source attribution,
- dated `sourceReferences` aligned with each record's `sourceIds`.

Faculty, program, and ranking files are separated from university identity records.
Current canonical faculty and program arrays are empty until approved reusable
sources are reviewed. Ranking snapshots are populated only when approved public
ranking providers publish source-backed rows for a canonical institution.

Do not add private personal data, student records, staff records, account data, phone numbers, private addresses, or unreleasable scraped content.

Normal GitHub contributions are limited to approved data fixes, missing records, source updates, and documentation corrections. For broader contribution ideas, new dataset topics, partnerships, or changes outside the approved scope, contact `data@opensyria.org` before starting work.

## Setup

```bash
corepack enable pnpm
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

Published version assets are immutable; corrections require a new version tag.

`pnpm run coverage:data` writes generated coverage reports to `dist/coverage/`.
Use the committed coverage docs for stable guidance and the generated report for
current contribution targets.

## Contribution Model

Public contributions are controlled and should focus on approved data fixes,
missing records within the current production scope, source attribution,
documentation corrections, and maintainer-approved review batches.

For a normal data pull request:

1. Read [CONTRIBUTING.md](CONTRIBUTING.md) and [contributions/README.md](contributions/README.md).
2. Edit only `data/universities.json`, `data/sources.json`, or requested import manifests unless a maintainer approved broader work.
3. Check [docs/FIELD_REFERENCE.md](docs/FIELD_REFERENCE.md), [docs/ID_POLICY.md](docs/ID_POLICY.md), [docs/SOURCES.md](docs/SOURCES.md), and [docs/PRODUCTION_READINESS.md](docs/PRODUCTION_READINESS.md).
4. Run `pnpm run validate`.
5. Explain the changed files, source IDs, source URLs, and any scope, licensing, or identity uncertainty in the pull request.

## Documentation

Start with:

- [Contributing](CONTRIBUTING.md)
- [Detailed Contribution Workflow](contributions/README.md)
- [Data Schema](docs/DATA_SCHEMA.md)
- [Field Reference](docs/FIELD_REFERENCE.md)
- [ID Policy](docs/ID_POLICY.md)
- [Sources](docs/SOURCES.md)
- [Source Decisions](docs/SOURCE_DECISIONS.md)
- [Review Process](docs/REVIEW_PROCESS.md)
- [Import Workflow](docs/IMPORT_WORKFLOW.md)
- [Production Readiness](docs/PRODUCTION_READINESS.md)
- [Coverage Analysis](docs/COVERAGE_ANALYSIS.md)
- [Release Process](docs/releases.md)
- [Release Checklist](docs/RELEASE_CHECKLIST.md)
- [Post-Seed Backlog](docs/POST_SEED_BACKLOG.md)
