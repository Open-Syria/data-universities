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

The current release level is `profile_ready`: the canonical 57-record identity
dataset has complete reviewed logo coverage and approved ranking snapshots where
public ranking providers list Syrian institutions. Public API exposure is
approved through `publicApi.status: approved`.

Faculty, program, and discipline coverage is partial after the
[program pilot](post-seed/PROGRAM_PILOT_2026_2027.md) and
[bulk named-program review](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md).
The [city-grouped review](post-seed/PUBLIC_CITY_PROGRAMS_2026_2027.md)
adds verified affiliations to that partial coverage. Its fourth review
takes the award level of 168 offerings from the Ministry table type, by
owner decision, and its
[register](post-seed/PENDING_PUBLIC_CITY_PROGRAMS_2026_2027.md) lists the
public rows that still need evidence.
It is separate from the university identity and profile readiness checks.

## Nullable Or Source-Backed Targets

These fields should be improved, but must stay empty when no approved public
source supports them:

- official websites,
- source-backed centroids,
- Wikidata IDs,
- ranking snapshots for institutions not listed by approved public ranking
  providers.

Logo assets are the production profile target. Campus, building, and other
non-logo images are optional and do not satisfy the public profile asset gate.
Logos must still have an approved public source, trademark/reuse review, CDN
upload, and attribution or rights notes before they enter `data/assets.json`.
The current reviewed logo batch covers all 57 canonical universities. Future
logo changes should still wait for a clean official logo source, trademark or
reuse review, and CDN upload.
Optional Wikimedia Commons cover photos currently cover 10 of 57 universities;
they are not a readiness gate.
Ranking snapshots must come from an approved ranking source and stay in
`data/rankings.json`, not in `data/universities.json`.
