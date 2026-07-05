# University Contribution Guide

This guide explains how to contribute data changes to `data-universities`.

The goal is to make contributions easy to review without letting the dataset schema drift. Contributors can improve approved data. Maintainers control schemas, dataset subjects, release artifacts, production scope, and source policy.

## Table of Contents

- [Contributor Quick Start](#contributor-quick-start)
- [What You Can Contribute](#what-you-can-contribute)
- [Files Contributors Should Edit](#files-contributors-should-edit)
- [Contribution Types](#contribution-types)
- [ID Rules](#id-rules)
- [Source Rules](#source-rules)
- [Running Validation](#running-validation)
- [Before Opening a Pull Request](#before-opening-a-pull-request)
- [Review Flow](#review-flow)
- [Reference Links](#reference-links)

## Contributor Quick Start

1. Choose one focused change: a university identity correction, a missing approved source, a name or alias improvement, a public website correction, or a source-backed location fix.
2. Check the field rules in [`../docs/FIELD_REFERENCE.md`](../docs/FIELD_REFERENCE.md), the ID rules in [`../docs/ID_POLICY.md`](../docs/ID_POLICY.md), and the current scope notes in [`../docs/PRODUCTION_READINESS.md`](../docs/PRODUCTION_READINESS.md).
3. Confirm the source is public, reusable, and either already approved in [`../data/sources.json`](../data/sources.json) or suitable to propose there.
4. Edit the relevant canonical file under [`../data/`](../data/).
5. Run `pnpm run validate`; use `pnpm run report:data`, `pnpm run report:production`, and `pnpm run coverage:data` when checking current coverage.
6. Open a focused pull request that lists the changed files, source IDs, source URLs, and any scope, licensing, identity, or source conflict.

## What You Can Contribute

Accepted as normal data pull requests:

- fix incorrect university identity values,
- add missing records only when they are within the current approved production scope,
- add Arabic names, English names, aliases, or transliterations,
- improve source attribution,
- replace weak sources with stronger approved reusable sources,
- correct public website URLs,
- correct public governorate, locality, address, or centroid fields when the schema already supports them,
- mark records as deprecated when sources support that change.

Not accepted as normal pull requests:

- new fields,
- schema changes,
- ID format changes,
- new dataset topics,
- generated release pipeline changes,
- large automated imports without maintainer approval,
- additions outside the approved production scope,
- data from unclear or incompatible sources,
- private personal data, student records, staff records, account data, private addresses, or unreleasable scraped content.

Use a schema proposal issue or contact `data@opensyria.org` before working on anything outside the current scope.

## Files Contributors Should Edit

Usually edit only:

```text
data/universities.json
data/sources.json
```

When a maintainer asks for source-review documentation, also edit:

```text
imports/manifests/*.json
```

Documentation corrections may edit the relevant Markdown file, such as:

```text
README.md
CONTRIBUTING.md
contributions/README.md
docs/SOURCES.md
docs/FIELD_REFERENCE.md
```

Do not edit generated output:

```text
dist/
```

Generated artifacts include JSON, NDJSON, CSV, SQL, YAML, and XML files. These are all built from canonical JSON source files under `data/`.

Do not edit schema, scripts, workflow files, examples, fixtures, or release artifacts unless the maintainer has approved that work:

```text
schemas/
scripts/
.github/workflows/
examples/
fixtures/
```

`data/assets.json`, `data/faculties.json`, `data/programs.json`, and `data/rankings.json` are canonical files, but normal contributors should change them only through maintainer-approved issues or reviewed batches. Logo assets require source review, derivative file generation, CDN upload, attribution, and rights notes. Rankings belong in `data/rankings.json`, not in `data/universities.json`.

## Contribution Types

### Correct Existing University Data

Use this when a value is wrong, outdated, misspelled, duplicated, or linked to the wrong public source.

Checklist:

- keep the existing `id` unless the maintainer approves an ID migration,
- update only the incorrect fields,
- add or update source IDs,
- explain why the correction is needed in the pull request,
- do not mix unrelated corrections into one PR.

### Add a Missing Approved University Record

Use this only when the record is within the approved production scope or a maintainer has approved the addition.

Checklist:

- create a stable `id`,
- include `name.en` and `name.ar` when required by the current production boundary,
- include `aliases` as an array, even when empty,
- set `institutionType` and `operationalStatus` to supported enum values,
- set `foundedYear`, `website`, and `location` only when source-backed, otherwise use `null` where the schema allows it,
- include `externalIds` as an object, even when empty,
- include at least one approved `sourceId`,
- set `sourceStatus` to `seed` or `pending_release`.

### Add Names, Aliases, or Transliterations

Use `aliases` for formal names, alternate names, historical names, alternate spellings, or transliterations.

Do not duplicate `name.en` or `name.ar` inside `aliases`.

Example:

```json
{
  "value": "Dimashq University",
  "language": "en",
  "type": "transliteration"
}
```

### Correct Public Location, Website, or Centroid

Use this only for fields that already exist in the schema.

Checklist:

- use approved public sources only,
- keep coordinates in WGS84 latitude and longitude,
- use public institution addresses only,
- do not add private addresses or personal contact details,
- use `null` when no approved source supports a value,
- explain source conflicts in the pull request.

### Improve Sources

Use this when a record has missing, weak, outdated, or unclear source attribution.

Checklist:

- add the source to `data/sources.json` if it is new,
- confirm the source license allows reuse,
- mark the source as `approved`, `restricted`, `proposed`, or `rejected`,
- reference only `approved` sources from data records,
- do not treat AI output as a source,
- do not add OSM-derived values unless the maintainer approves the ODbL approach.

### Assets, Faculties, Programs, and Rankings

These files are not the normal starting point for public pull requests:

```text
data/assets.json
data/faculties.json
data/programs.json
data/rankings.json
```

Work in these files only when a maintainer has opened or approved a specific issue or review batch. Use the batch notes in [`../docs/POST_SEED_BACKLOG.md`](../docs/POST_SEED_BACKLOG.md) and [`../docs/post-seed/`](../docs/post-seed/) before changing them.

## ID Rules

IDs must:

- be stable,
- start with `sy-`,
- use lowercase ASCII,
- use hyphen-separated words,
- not change because a display name improves.

Example:

```text
sy-damascus-university
```

See [`../docs/ID_POLICY.md`](../docs/ID_POLICY.md) for the full ID policy.

## Source Rules

Every record must have at least one `sourceId`.

Allowed record sources:

- sources with `status: "approved"` in `data/sources.json`.

Not allowed as record sources:

- `restricted`,
- `proposed`,
- `rejected`,
- unknown source IDs.

AI may help organize or compare data, but AI output is not a source.

Source decisions are tracked in [`../docs/SOURCE_DECISIONS.md`](../docs/SOURCE_DECISIONS.md). Source policy is documented in [`../docs/SOURCES.md`](../docs/SOURCES.md).

## Running Validation

Install dependencies:

```bash
corepack enable pnpm
pnpm install
```

Validate:

```bash
pnpm run validate
```

Inspect current coverage and production readiness:

```bash
pnpm run report:data
pnpm run report:production
pnpm run coverage:data
```

The generated `dist/coverage/COVERAGE.md` report lists missing fields and source-backed enrichment gaps. Use it to choose a focused contribution, but do not commit generated coverage output.

Validation checks:

- formatting,
- published schema metadata,
- import manifest metadata,
- schema shape,
- unknown fields,
- unique IDs,
- known approved sources,
- university references from assets, faculties, programs, and rankings,
- generated release artifact compatibility.

Generated artifact rules are documented in [`../docs/GENERATED_ARTIFACTS.md`](../docs/GENERATED_ARTIFACTS.md).

## Before Opening a Pull Request

Include these details in the pull request:

- which records changed,
- which files changed,
- source IDs from `data/sources.json`,
- source URLs or source titles for new or corrected evidence,
- whether the record is inside the approved production scope,
- whether any values are uncertain or conflict across sources,
- which validation command you ran.

Keep unrelated corrections out of the pull request. Separate small, source-backed changes are easier to review and merge.

## Review Flow

1. Contributor opens a focused PR.
2. CI runs validation.
3. Maintainer reviews production scope, source quality, and licensing.
4. Maintainer reviews identity, duplicate risk, public-only data boundaries, and field semantics.
5. Maintainer either requests changes, approves, or closes the PR with an explanation.
6. Merged data is included in a future maintainer-controlled release.

Passing CI does not guarantee acceptance. Source quality, licensing, safety, production scope, and identity review still matter.

## Reference Links

- [Repository contribution policy](../CONTRIBUTING.md)
- [Data schema](../docs/DATA_SCHEMA.md)
- [Field reference](../docs/FIELD_REFERENCE.md)
- [ID policy](../docs/ID_POLICY.md)
- [Source policy](../docs/SOURCES.md)
- [Source decisions](../docs/SOURCE_DECISIONS.md)
- [Review process](../docs/REVIEW_PROCESS.md)
- [Production readiness](../docs/PRODUCTION_READINESS.md)
- [Post-seed backlog](../docs/POST_SEED_BACKLOG.md)
- [Coverage analysis](../docs/COVERAGE_ANALYSIS.md)
- [Generated artifacts](../docs/GENERATED_ARTIFACTS.md)
