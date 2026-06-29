# Release Checklist

Before publishing:

- update `CHANGELOG.md`,
- verify `package.json` version,
- run `pnpm run validate`,
- run `pnpm run report:data`,
- build artifacts with `pnpm run release:build`,
- inspect `dist/release/release-manifest.json`.

For a formal release:

```bash
pnpm run release:prepare -- --version v0.1.2
```
