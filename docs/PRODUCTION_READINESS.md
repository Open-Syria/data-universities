# Production Readiness

Use:

```bash
pnpm run report:production
```

The readiness report separates hard production requirements from source-backed
coverage targets.

For contributor-facing coverage details, use:

```bash
pnpm run coverage:data
```

## Hard Requirements

The current university identity release must have:

- 57 canonical university and higher-institute records,
- English and Arabic canonical names for every record,
- governorate and locality for every record,
- at least one approved public source ID for every record.

These checks are blockers. `pnpm run report:production` exits with a non-zero
status if any blocker is present.

## Release Manifest Gate

Release artifacts include machine-readable readiness metadata in
`release-manifest.json`.

The current release level is `identity_seed_ready`: the canonical 57-record
identity dataset is syncable, but public API exposure is explicitly
`not_approved`. API repositories must treat that as a gate. They may download
the release for discovery and internal verification, but they must not add
public university endpoints or generated docs until a later release declares
`publicApi.status: approved`.

## Nullable Or Source-Backed Targets

These fields should be improved, but must stay empty when no approved public
source supports them:

- official websites,
- source-backed centroids,
- Wikidata IDs,
- approved CDN image assets,
- ranking snapshots.

Image assets must pass license review and CDN upload before they enter
`data/assets.json`. Ranking snapshots must come from an approved ranking source
and stay in `data/rankings.json`, not in `data/universities.json`.
