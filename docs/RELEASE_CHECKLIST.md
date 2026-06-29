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
pnpm run release:prepare -- --version v0.1.4
pnpm run release:publish:github -- --tag v0.1.4 --dry-run
git tag v0.1.4
git push origin v0.1.4
```

Pushing the version tag runs `.github/workflows/release.yml`, rebuilds and verifies `dist/release`, then publishes the release manifest and artifacts to the GitHub Release.
