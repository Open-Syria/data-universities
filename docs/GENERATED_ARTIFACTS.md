# Generated Artifacts

Run:

```bash
pnpm run release:build
```

The release builder writes:

```text
dist/release/release-manifest.json
dist/release/artifacts/assets.json
dist/release/artifacts/assets.ndjson
dist/release/artifacts/assets.csv
dist/release/artifacts/assets.sql
dist/release/artifacts/assets.yaml
dist/release/artifacts/assets.xml
dist/release/artifacts/faculties.json
dist/release/artifacts/faculties.ndjson
dist/release/artifacts/faculties.csv
dist/release/artifacts/faculties.sql
dist/release/artifacts/faculties.yaml
dist/release/artifacts/faculties.xml
dist/release/artifacts/programs.json
dist/release/artifacts/programs.ndjson
dist/release/artifacts/programs.csv
dist/release/artifacts/programs.sql
dist/release/artifacts/programs.yaml
dist/release/artifacts/programs.xml
dist/release/artifacts/rankings.json
dist/release/artifacts/rankings.ndjson
dist/release/artifacts/rankings.csv
dist/release/artifacts/rankings.sql
dist/release/artifacts/rankings.yaml
dist/release/artifacts/rankings.xml
dist/release/artifacts/universities.json
dist/release/artifacts/universities.ndjson
dist/release/artifacts/universities.csv
dist/release/artifacts/universities.sql
dist/release/artifacts/universities.yaml
dist/release/artifacts/universities.xml
```

Each artifact is listed in the release manifest with format, path, checksum, byte size, media type, and record count.

Schema-first batch files may have `recordCount: 0` until approved reusable sources are imported.

Coverage analysis is also generated locally:

```bash
pnpm run coverage:data
```

This writes:

```text
dist/coverage/COVERAGE.md
dist/coverage/coverage-report.json
```

Coverage output is a contributor aid, not a release artifact, and should not be
committed.
