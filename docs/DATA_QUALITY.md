# Data Quality

Track quality through:

- validation errors,
- duplicate ID checks,
- duplicate alias checks,
- approved-source references,
- missing Arabic names,
- missing official websites,
- missing public location context.

Run:

```bash
pnpm run report:data
pnpm run report:production
```

## Current Production Snapshot

As of the current working dataset after `v0.2.0`, the canonical identity dataset
contains 57 records anchored to the approved production scope and
approved public source IDs.

Known cleanup gaps:

- all 57 records currently keep `operationalStatus: "unknown"`,
- 6 records are missing official websites,
- 24 records are missing Wikidata identifiers,
- 31 records are missing source-backed centroids,
- 0 records do not yet have approved CDN logo assets,
- 13 records are not listed by the approved ranking providers imported so far,
- 0 records have locality/governorate conflicts that require source review,
- 16 records retain reviewed comparison-conflict notes,
- faculty and program canonical files are intentionally empty pending approved
  reusable sources.

Track identity cleanup in
[Identity Cleanup Batch](post-seed/IDENTITY_CLEANUP_BATCH.md).
