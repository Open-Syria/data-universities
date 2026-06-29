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
- 33 records include Wikidata identifiers.
- 6 records currently have no official website.
- 2 reviewed Wikimedia Commons image asset records in `data/assets.json`.
- 0 approved ranking snapshot records in `data/rankings.json`.

Faculty/program/ranking data is not part of the first seed release. `v0.1.2` adds empty canonical files and release artifacts for these future batches.

The production canonical boundary is the internal comparison control list plus
approved public source confirmation. Public-source-only records are tracked in
the post-seed backlog and are not counted here.

Future coverage reports can track:

- records by institution type,
- records by operational status,
- records with Arabic names,
- records with websites,
- records with source-backed centroids,
- records with public CDN image assets,
- faculty, program, and ranking rows once approved sources are imported,
- source coverage.
