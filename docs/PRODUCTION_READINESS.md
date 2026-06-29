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
