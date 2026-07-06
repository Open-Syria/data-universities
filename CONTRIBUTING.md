# Contributing

Thanks for helping improve OpenSyria university data.

This repository accepts controlled data contributions. The maintainer owns the dataset scope, schemas, release pipeline, validation rules, and source acceptance policy.

For contribution ideas outside the approved issue and pull request scope, contact `data@opensyria.org` before starting work.

Start with the full contributor guide:

```text
contributions/README.md
```

## Table of Contents

- [Contributor Quick Start](#contributor-quick-start)
- [Accepted Contributions](#accepted-contributions)
- [Not Accepted as Normal Pull Requests](#not-accepted-as-normal-pull-requests)
- [Files and Reference Docs](#files-and-reference-docs)
- [Schema Proposals](#schema-proposals)
- [Source Rules](#source-rules)
- [Validation](#validation)
- [Pull Request Checklist](#pull-request-checklist)

## Contributor Quick Start

For a normal university data correction or source update:

1. Read the detailed workflow in [contributions/README.md](contributions/README.md).
2. Pick one focused change, such as one record correction, one source update, or one small group of related university records.
3. Keep normal edits to `data/universities.json`, `data/sources.json`, and documentation unless a maintainer approved broader work.
4. Confirm every changed value is backed by an approved reusable public source in `data/sources.json`.
5. Run `corepack enable pnpm`, `pnpm install`, and `pnpm run validate`.
6. Open a pull request that lists the changed files, source IDs, source URLs, and any scope, licensing, or identity uncertainty.

## Accepted Contributions

You may open pull requests for:

- fixing incorrect records,
- adding missing records within the approved universities scope,
- adding aliases, Arabic names, English names, and transliterations,
- improving source attribution,
- replacing weak sources with stronger reusable sources,
- correcting public location fields, official websites, or coordinates when the schema already includes those fields,
- marking records as deprecated, renamed, merged, uncertain, or replaced when supported by sources.

Record IDs must follow [docs/ID_POLICY.md](docs/ID_POLICY.md).

## Not Accepted as Normal Pull Requests

Do not open direct PRs for:

- new dataset topics,
- new fields,
- schema changes,
- ID format changes,
- validation rule changes,
- release pipeline changes,
- large automated imports without prior maintainer approval,
- proprietary or unclear-license data,
- personal, private, sensitive, military, checkpoint, surveillance, or security-related data.

These changes require a schema proposal or maintainer approval before implementation.

If your idea does not fit the normal issue or pull request categories, email `data@opensyria.org` with a short summary, proposed sources, and expected dataset impact.

Generated files under `dist/`, examples under `examples/`, fixtures under `fixtures/`, validation scripts, schemas, and release workflows are maintainer-owned unless the maintainer explicitly asks for changes.

## Files and Reference Docs

Normal data pull requests usually edit:

| Need | File or doc |
| --- | --- |
| University identity records | [data/universities.json](data/universities.json) |
| Source registry | [data/sources.json](data/sources.json) |
| Import manifests, when requested | [imports/manifests/](imports/manifests/) |
| Field rules | [docs/FIELD_REFERENCE.md](docs/FIELD_REFERENCE.md) |
| Stable ID rules | [docs/ID_POLICY.md](docs/ID_POLICY.md) |
| Source policy | [docs/SOURCES.md](docs/SOURCES.md) |
| Source decisions | [docs/SOURCE_DECISIONS.md](docs/SOURCE_DECISIONS.md) |
| Review process | [docs/REVIEW_PROCESS.md](docs/REVIEW_PROCESS.md) |
| Production readiness | [docs/PRODUCTION_READINESS.md](docs/PRODUCTION_READINESS.md) |
| Post-seed backlog | [docs/POST_SEED_BACKLOG.md](docs/POST_SEED_BACKLOG.md) |
| Coverage targets | [docs/COVERAGE_ANALYSIS.md](docs/COVERAGE_ANALYSIS.md) |

`data/assets.json`, `data/faculties.json`, `data/programs.json`, and `data/rankings.json` are schema-ready canonical files, but normal contributors should edit them only for maintainer-approved issues or review batches.

Do not edit generated release or coverage output under `dist/` for a normal data contribution.

## Schema Proposals

New fields are possible, but they must be proposed first.

A proposal should explain:

- what the field is,
- who needs it,
- whether it can be sourced legally and consistently,
- whether it is safe to publish,
- how it should be validated,
- whether it is required or optional,
- how existing records will be migrated,
- how release artifacts and the public API should expose it.

## Source Rules

- Use sources that are public, reusable, and license-compatible.
- Record source IDs in changed records.
- Records must reference at least one approved source.
- Do not use Google Maps, commercial map databases, proprietary directories, or scraped websites as data sources.
- Do not treat AI output as a source.
- Do not import OSM-derived data unless the maintainer explicitly approves the ODbL licensing approach.

Source review decisions are documented in [docs/SOURCE_DECISIONS.md](docs/SOURCE_DECISIONS.md).

## Validation

Install dependencies:

```bash
corepack enable pnpm
pnpm install
```

Run:

```bash
pnpm run validate
```

To inspect current coverage counts, run:

```bash
pnpm run report:data
pnpm run coverage:data
```

Generated coverage output is written under `dist/coverage/` and should not be
committed in normal data pull requests.

## Dependency Updates

Dependabot groups npm updates into one weekly pull request so `package.json` and
`pnpm-lock.yaml` stay synchronized. Merge automated dependency updates only
after the validation workflow passes with `pnpm install --frozen-lockfile`.

If dependency pull requests are manually combined, regenerate the lockfile with
the pinned pnpm version before merging. A manifest-only bump will fail CI and
should not be pushed to `main`.

## Pull Request Checklist

- The change is within the approved schema.
- Every changed record has source IDs.
- Source licenses allow reuse.
- IDs are stable and unique.
- No personal or sensitive data is added.
- Validation passes.
- The pull request describes the changed files, source IDs, source URLs, and any scope, licensing, or identity uncertainty.
