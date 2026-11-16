# Coverage Analysis

Use these commands for current coverage:

```bash
pnpm run report:data
pnpm run report:production
pnpm run coverage:data
```

`pnpm run coverage:data` writes generated contributor-facing reports to
`dist/coverage/`. Do not commit generated coverage output.

## Current Coverage

- 68 institutional records, including 11 standalone technical institutes.
- 39 private, 8 public, 9 technical/high-institute, and 1 virtual institution.
- 68 records include English and Arabic canonical names.
- 68 records include governorate and locality values.
- 0 records currently have locality/governorate normalization warnings.
- 34 records include Wikidata identifiers.
- 6 records currently have no official website.
- 57 approved CDN logo asset records in `data/assets.json`, covering all 57 original
  canonical universities.
- 0 institutions in the original catalogue still need an official logo source and CDN
  upload.
- 10 optional Wikimedia Commons cover photo asset records in `data/assets.json`
  (3 `campus`, 7 `building`), covering 10 institutions. Covers
  do not count toward logo coverage.
- 65 approved ranking snapshot records in `data/rankings.json`, covering 44
  canonical universities. These include Webometrics January 2026, Arab Ranking
  for Universities 2025, Times Higher Education World University Rankings 2026,
  uniRank 2026 Syrian University Ranking, independent Webometrics.org January
  2026, and UNIRANKS 2026 snapshots.

The preview contains 443 faculties or institutes and 763 offerings
across 57 institutions. Every offering has one of the 148 fields of study;
145 fields are in use. 762 offerings carry a campus. The Syrian Virtual
University Computer Science master's is delivered online. 720 offerings
carry verified 2026–2027 admission routes. Public Human Medicine, Dentistry
and Pharmacy use the preparatory year. Syrian Virtual University publishes
a separate intake calendar and route.
For 177 public offerings the award level comes from the Ministry table
type, under the owner decision of 13 November 2026.
The [city-grouped register](post-seed/PENDING_PUBLIC_CITY_PROGRAMS_2026_2027.md)
and the [named register](post-seed/PENDING_NAMED_PROGRAMS_2026_2027.md)
list the rows still pending. The [November field review](post-seed/FIELD_OFFERINGS_2026_2027.md) records the latest decisions for 20 fields. [Bulk named-program review](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md)
· [City-grouped public program review](post-seed/PUBLIC_CITY_PROGRAMS_2026_2027.md)

The production canonical boundary is the approved production scope plus
approved public source confirmation. Public-source-only records are tracked in
the post-seed backlog and are not counted here.

Future coverage reports can track:

- records by institution type,
- records by operational status,
- records with Arabic names,
- records with websites,
- records with source-backed centroids,
- records with public CDN logo assets,
- faculty, program, and ranking rows once approved sources are imported,
- source coverage.

The [standalone technical institute review](post-seed/STANDALONE_TECHNICAL_INSTITUTES_2026_2027.md) documents the added providers and programme tracks.
