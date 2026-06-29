# Faculties, Programs, And Rankings Batch

Faculty, program, specialty, and ranking data is intentionally excluded from `v0.1.0`.

The current local comparison artifact contains:

- 89 specialty candidates,
- 468 faculty candidates,
- 8 ranking sections,
- 568 ranking rows.

These counts are useful for planning but are not canonical data.

## Batch Boundaries

Handle this work as three separate batches:

- faculties and colleges,
- programs and specialties,
- ranking snapshots.

Do not mix these into ordinary university identity records.

## Schema Direction

Potential future canonical files:

- `data/faculties.json`,
- `data/programs.json`,
- `data/rankings.json`.

Faculties and programs should reference a canonical university `id`. Rankings should be snapshot records with source, ranking system, year, rank fields, and retrieval metadata.

## Source Rules

- Confirm a reusable source before canonical import.
- Avoid copying unclear-license page prose or full lists.
- Prefer official university pages or open licensed datasets for faculty/program data.
- Treat ranking rows as volatile snapshots, not stable university facts.
- Keep ranking data out of `data/universities.json`.

## Acceptance Criteria

Before the first faculties/programs/rankings release:

- define and validate JSON schemas,
- add fixture data,
- add release artifact generation for new files,
- register approved sources,
- add import manifests,
- prove parent university IDs resolve to `data/universities.json`,
- run `pnpm run validate` and `pnpm run report:data`.

## Review Questions

- Are rankings in scope for OpenSyria, or should we only expose source links?
- Should faculties and programs be current-only, historical, or versioned snapshots?
- Should public and private institutions share the same faculty/program schema?
- How should closed, renamed, or merged faculties be represented?
