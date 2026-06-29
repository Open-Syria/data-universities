# Identity Cleanup Batch

This batch tracks production cleanup for the 57 canonical university identity
records. It does not add records outside the internal comparison control list.

Use `pnpm run report:data` and `pnpm run report:production` for current counts.

## Current Gaps

- 57 records have `operationalStatus: "unknown"`.
- 6 records have no official website.
- 24 records have no Wikidata identifier.
- 31 records have no source-backed centroid.
- 30 records have locality values that should be normalized or reviewed.
- 16 records have reviewed comparison-conflict notes.

## Missing Official Websites

These records should be checked against official websites, Wikidata, ministry or
regulator pages, or another approved reusable source:

| ID | Name |
| --- | --- |
| `sy-arab-academy-for-e-businesses` | Arab Academy for E-Businesses |
| `sy-higher-institute-of-administration` | Higher Institute of Administration |
| `sy-higher-institute-of-cinematic-arts` | Higher Institute of Cinematic Arts |
| `sy-higher-institute-of-dramatic-arts` | Higher Institute of Dramatic Arts |
| `sy-higher-institute-of-music` | Higher Institute of Music |
| `sy-institute-of-economic-and-social-planning` | Institute of Economic and Social Planning |

## Review Rules

- Do not resolve a field from comparison-only material alone; it is comparison-only.
- Prefer official institution pages, ministry/regulator pages, Wikidata, or
  other approved reusable public sources.
- Add or update an import manifest for every reviewed batch.
- Keep uncertain operational states as `unknown`.
- Do not infer coordinates from city names; use source-backed coordinates only.
- Keep website nulls when no approved public source confirms an official
  website.
- Keep faculty, program, and ranking rows out of identity records.

## Acceptance Criteria

Before closing this batch:

- confirm every non-null website is still live or source-backed,
- resolve operational status only where a public source supports it,
- either add missing Wikidata IDs or document why no match is safe,
- either add source-backed centroids or leave them null with no inference,
- clear or preserve comparison-conflict notes with a reviewed explanation,
- run `pnpm run validate` and `pnpm run report:data`.
