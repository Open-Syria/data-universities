# Faculties, Programs, And Rankings Batch

Faculty, program, specialty, and ranking data is intentionally excluded from `v0.1.0`.

`v0.1.2` adds schema-first canonical files and release artifacts for the three batch types. The canonical arrays are intentionally empty until approved reusable sources are reviewed.

The current local comparison artifact contains:

- 89 specialty candidates,
- 468 faculty candidates,
- 8 ranking sections,
- 568 ranking rows mapped to 40 of the 57 canonical university records.

These counts are useful for planning but are not canonical data.

## Batch Boundaries

Handle this work as three separate batches:

- faculties and colleges,
- programs and specialties,
- ranking snapshots.

Do not mix these into ordinary university identity records.

## Schema Decision

Canonical files:

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
- Do not treat missing ranking rows as a university identity failure until an
  approved ranking source and scope rule exist.

## Acceptance Criteria

Before the first faculties/programs/rankings release:

- define and validate JSON schemas,
- add fixture data,
- add release artifact generation for new files,
- prove parent university IDs resolve to `data/universities.json`,
- run `pnpm run validate` and `pnpm run report:data`.

Before the first non-empty faculties/programs/rankings release:

- register approved sources,
- add import manifests,
- confirm every imported record references approved sources,
- keep unclear-license comparison data out of canonical files.

## Review Questions

- Are rankings in scope for OpenSyria, or should we only expose source links?
- Should faculties and programs be current-only, historical, or versioned snapshots?
- Should public and private institutions share the same faculty/program schema?
- How should closed, renamed, or merged faculties be represented?
