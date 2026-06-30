# Identity Cleanup Batch

This batch tracks production cleanup for the 57 canonical university identity
records. It does not add records outside the approved production scope.

Use `pnpm run report:data` and `pnpm run report:production` for current counts.

## Current Gaps

- 57 records have `operationalStatus: "unknown"`.
- 6 records have no official website.
- 24 records have no Wikidata identifier.
- 31 records have no source-backed centroid.
- 0 records have locality/governorate conflicts that need source review.
- 16 records have reviewed comparison-conflict notes.

## Location Review Completed

The safe locality normalization pass removed redundant governorate wording from
matching locality values. A follow-up source review resolved the three remaining
structured governorate/locality conflicts:

| ID | Name | Reviewed governorate | Reviewed locality | Notes |
| --- | --- | --- | --- | --- |
| `sy-al-jazeera-private-university` | Al-Jazeera Private University | Daraa | Ghabagheb | Historical Deir ez-Zor seat and Damascus contact context are retained in notes pending future multi-campus or history modeling. |
| `sy-al-sham-private-university` | Al-Sham Private University | Rif Dimashq | Al-Tall | Additional Damascus Al-Mazraa and Latakia locations are retained in notes pending future multi-campus modeling. |
| `sy-arab-academy-for-e-businesses` | Arab Academy for E-Businesses | Aleppo | Aleppo | More precise campus or contact locations require future approved-source review. |

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

- Do not resolve a field from review-only material alone; it is review-only.
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
