# Post-Seed Backlog

The `v0.1.0` seed release includes records that were present in the internal
comparison control list and confirmed by approved public sources. This remains
the production canonical boundary.

The next enrichment work should be handled in separate reviewed batches.

## Batch Trackers

- [Candidate Records Batch](post-seed/CANDIDATE_RECORDS_BATCH.md)
- [Identity Cleanup Batch](post-seed/IDENTITY_CLEANUP_BATCH.md)
- [Image Assets Batch](post-seed/IMAGE_ASSETS_BATCH.md)
- [Faculties, Programs, And Rankings Batch](post-seed/FACULTIES_PROGRAMS_RANKINGS_BATCH.md)

## Candidate Records Held For Review

30 public-source candidates were held out of `v0.1.0` because they were not
present in the internal comparison control list. Some were reviewed in early
post-seed batches, but `v0.1.11` reclassifies the 27 non-control-list additions
as held candidates instead of canonical production records.

The original held-candidate backlog is not clear for production. Candidate
records should be reviewed as separate batches and added only after they satisfy
the current control-list rule or after OpenSyria approves a broader scope rule.

Review future candidates as separate batches:

- military, police, and defense colleges,
- foreign-branch records,
- alternate or duplicate university names,
- autonomous-administration universities,
- records missing English or Arabic names,
- records missing official websites.

Do not add these records only because they appear in a single list. Confirm
identity, naming, scope, source attribution, and the production boundary first.

## Images

Public image assets are not part of `v0.1.0`.

Before uploading images to R2:

- confirm image license and attribution requirements,
- keep source download manifests as review artifacts,
- generate WebP/AVIF variants locally,
- run an R2 dry-run before uploading,
- reference `https://cdn.opensyria.org` URLs only after upload.

## Faculties, Programs, And Rankings

Faculty, program, and ranking data is not part of `v0.1.0`.

`v0.1.2` adds empty canonical files, schemas, fixtures, and release artifacts for these batches so future approved imports have a stable target.

Before adding these datasets:

- confirm reusable sources,
- decide whether rankings are in scope,
- avoid copying unclear-license prose or lists directly into canonical data,
- keep university records independent from volatile ranking snapshots.
