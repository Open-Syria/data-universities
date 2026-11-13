# Imports

This directory documents maintainer-led source imports.

Raw downloaded files should not be committed here. Keep raw files local under:

```text
imports/raw/
imports/tmp/
```

Those paths are ignored by Git.

## What Should Be Committed

Commit import manifests and notes that explain how data was collected and transformed:

```text
imports/manifests/
```

An import manifest should record:

- source ID,
- source URL,
- license,
- access date,
- downloaded file names or checksums when available,
- imported fields,
- transformation steps,
- maintainer review notes.

See the [2026–2027 admissions review](../docs/post-seed/ADMISSIONS_2026_2027_REVIEW.md)
for the pinned catalogue input and the scope of the name-only import.

The [program pilot](../docs/post-seed/PROGRAM_PILOT_2026_2027.md) records
selected offering facts and the evidence for each institution and campus.
Its manifest also records the discipline and academic-year route mapping.
The [public named-program manifest](manifests/mohe-public-university-named-programs-2026-2027-2026-11-12.json)
records the first batch of named public offerings from announcement 6.
The [city-grouped public manifest](manifests/mohe-public-city-programs-2026-2027-2026-11-12.json)
pins the first reviewed announcement 2 rows.

## What Should Not Be Committed

Do not commit:

- proprietary source files,
- unclear-license downloads,
- large raw archives,
- generated scratch files,
- AI-generated source material,
- OSM-derived extracts unless a maintainer has approved the ODbL release approach.

Canonical records still live only under:

```text
data/
```

Import manifests explain provenance. They are not canonical data.
