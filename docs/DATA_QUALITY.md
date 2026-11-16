# Data Quality

Track quality through:

- validation errors,
- duplicate ID checks,
- duplicate alias checks,
- approved-source references,
- dated record-level source references,
- missing Arabic names,
- missing official websites,
- missing public location context.

Run:

```bash
pnpm run report:data
pnpm run report:production
```

## Current Production Snapshot

As of the current working dataset after `v0.2.2`, the canonical identity dataset
contains 68 records anchored to the approved production scope, approved public
source IDs, and dated `sourceReferences`.

Known cleanup gaps:

- the original 57 records keep `operationalStatus: "unknown"`,
- 6 records are missing official websites,
- 23 records are missing Wikidata identifiers,
- 30 records are missing source-backed centroids,
- the 57 original institutions have approved CDN logo assets, with text-only profiles for the 11 standalone institutes,
- 58 records have no optional cover photo yet (10 of 68 are covered; covers are
  not a release gate),
- 13 records are not listed by the approved ranking providers imported so far,
- 0 records have locality/governorate conflicts that require source review,
- 16 records retain reviewed comparison-conflict notes,
- faculty and program coverage is partial. The preview contains 763
  source-backed offerings. The [bulk named-program review](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md)
  documents the remaining award and affiliation checks.
  The [city-grouped review](post-seed/PUBLIC_CITY_PROGRAMS_2026_2027.md)
  records verified and pending public affiliations, and its
  [register](post-seed/PENDING_PUBLIC_CITY_PROGRAMS_2026_2027.md) lists the
  262 leads still pending. Some public awards rest on archived copies of a
  university's own pages that are up to 15 years old; each source records
  its snapshot date. For 177 public offerings the award level comes from
  the Ministry table type rather than a university statement, under the
  owner decision of 13 November 2026; they cite
  `mohe-admissions-2026-2027-award-by-table-type`. The [November field review](post-seed/FIELD_OFFERINGS_2026_2027.md) covers new offerings and superseding decisions.

Track identity cleanup in
[Identity Cleanup Batch](post-seed/IDENTITY_CLEANUP_BATCH.md).
