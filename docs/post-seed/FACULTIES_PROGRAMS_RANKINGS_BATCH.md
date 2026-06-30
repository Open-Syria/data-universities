# Faculties, Programs, And Rankings Batch

Faculty, program, specialty, and ranking data is intentionally excluded from `v0.1.0`.

`v0.1.2` adds schema-first canonical files and release artifacts for the three
batch types. Faculty and program arrays are intentionally empty until approved
reusable sources are reviewed. Ranking snapshots are populated only where an
approved source publishes explicit, source-backed ranks.

The current local comparison artifact contains:

- 89 specialty candidates,
- 468 faculty candidates,
- 8 ranking sections,
- 568 ranking rows mapped to 40 of the 57 canonical university records.

These counts are useful for planning but are not canonical data.

Approved ranking imports currently include:

- Webometrics January 2026 Figshare PDF under CC BY 4.0. It adds two Damascus
  University snapshots: global WR 3028 and Arab World REGIONR 142. The PDF
  reports 43 Syrian Arab Republic institutions overall, but the full Excel list
  is only available by request and was not imported or inferred.
- Arab Ranking for Universities 2025 official results page. It adds one
  overall Arab-region rank and one Syria country-rank snapshot for each explicit
  Syrian row in the public table: Damascus University, International University
  for Science and Technology, Al-Andalus University for Medical Sciences,
  Tishreen University, Yarmouk Private University, and Al-Sham Private
  University. The Tishreen row is matched to the current canonical Latakia
  University record.
- Times Higher Education World University Rankings 2026 Syria page. It adds
  one global snapshot for each Syrian row on the official page: Damascus
  University, Arab International University, University of Aleppo, and Zaytoonah
  International University. Non-numeric bands and Reporter rows are stored in
  `rankDisplay` with `rank: null`; Zaytoonah International University is matched
  to the canonical Al-Zaytuna University record.
- uniRank 2026 Syrian University Ranking country page. It adds one national
  snapshot for each row that clearly maps to a canonical production-boundary
  university record. The explicit Aram University unranked status is stored as
  `rankDisplay: "Unranked"` with `rank: null`. The Arab Open Academy row is not
  imported because it does not clearly match a canonical production-boundary
  university record.
- Independent Webometrics.org January 2026 Syria page. It adds global and
  national snapshots for three clear missing canonical matches: Higher Institute
  of Applied Sciences and Technology, Al-Sham University, and Arab Academy for
  E-Businesses. This source is tracked separately from the
  Webometrics.info/Figshare source.
- UNIRANKS 2026 Syria page. It adds one listed-rank snapshot for Mari Private
  University with `rankScope: "other"` because the source row publishes country,
  region, and world ranks as `N/A`.

## Remaining Ranking Gaps

After the broad public ranking pass, 13 canonical universities still do not
have approved ranking snapshots. Checked providers include Webometrics.org,
UNIRANKS, AD Scientific Index, EduRank, Times Higher Education, Arab Ranking
for Universities, and uniRank:

- `sy-al-amanos-university`
- `sy-al-hayat-university-for-applied-sciences`
- `sy-al-zahraa-university`
- `sy-arab-academy-of-science-and-technology-and-maritime-transport`
- `sy-basaksehir-university`
- `sy-faculty-of-theology`
- `sy-higher-institute-of-administration`
- `sy-higher-institute-of-cinematic-arts`
- `sy-higher-institute-of-demographic-studies-and-research`
- `sy-higher-institute-of-dramatic-arts`
- `sy-higher-institute-of-music`
- `sy-institute-of-economic-and-social-planning`
- `sy-syrian-university-for-science-and-technology`

These should remain empty unless a public ranking source publishes an explicit
rank, band, or listed/unranked status that can be matched to the canonical
record. Missing ranking snapshots are acceptable for very small, specialized,
new, or branch institutions.

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

Before the first non-empty faculties/programs release or a broader rankings
release:

- register approved sources,
- add import manifests,
- confirm every imported record references approved sources,
- keep unclear-license comparison data out of canonical files.

## Review Questions

- Are rankings in scope for OpenSyria, or should we only expose source links?
- Should faculties and programs be current-only, historical, or versioned snapshots?
- Should public and private institutions share the same faculty/program schema?
- How should closed, renamed, or merged faculties be represented?
