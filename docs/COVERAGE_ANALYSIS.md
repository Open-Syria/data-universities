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

- 57 university and higher-institute records.
- 39 private, 8 public, 9 technical/high-institute, and 1 virtual institution.
- 57 records include English and Arabic canonical names.
- 57 records include governorate and locality values.
- 0 records currently have locality/governorate normalization warnings.
- 33 records include Wikidata identifiers.
- 6 records currently have no official website.
- 57 approved CDN logo asset records in `data/assets.json`, covering 57 of 57
  canonical universities.
- 0 canonical universities still need an approved official logo source and CDN
  upload.
- 65 approved ranking snapshot records in `data/rankings.json`, covering 44
  canonical universities. These include Webometrics January 2026, Arab Ranking
  for Universities 2025, Times Higher Education World University Rankings 2026,
  uniRank 2026 Syrian University Ranking, independent Webometrics.org January
  2026, and UNIRANKS 2026 snapshots.

Faculty and program data is not part of the current production profile release.
The canonical files and release artifacts remain available for future approved
source-backed batches.

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
