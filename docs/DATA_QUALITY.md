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

As of `v0.1.12`, the canonical identity dataset contains 57 records anchored to
the internal comparison control list and approved public source IDs.

Known cleanup gaps:

- all 57 records currently keep `operationalStatus: "unknown"`,
- 6 records are missing official websites,
- 24 records are missing Wikidata identifiers,
- 31 records are missing source-backed centroids,
- 55 records do not yet have approved CDN image assets,
- 57 records do not yet have approved ranking snapshots,
- 30 records have locality values that should be normalized or reviewed,
- 16 records retain reviewed comparison-conflict notes,
- faculty, program, and ranking canonical files are intentionally empty pending
  approved reusable sources.

Track identity cleanup in
[Identity Cleanup Batch](post-seed/IDENTITY_CLEANUP_BATCH.md).
