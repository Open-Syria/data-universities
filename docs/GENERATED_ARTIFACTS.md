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
dist/release/artifacts/universities.json
dist/release/artifacts/universities.ndjson
dist/release/artifacts/universities.csv
dist/release/artifacts/universities.sql
dist/release/artifacts/universities.yaml
dist/release/artifacts/universities.xml
```

Each artifact is listed in the release manifest with format, path, checksum, byte size, media type, and record count.
