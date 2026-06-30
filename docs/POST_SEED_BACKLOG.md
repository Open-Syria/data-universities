# Post-Seed Backlog

The `v0.1.0` seed release includes records that were present in the internal
approved production scope and confirmed by approved public sources. This remains
the production canonical boundary.

The next enrichment work should be handled in separate reviewed batches.

## Batch Trackers

- [Candidate Records Batch](post-seed/CANDIDATE_RECORDS_BATCH.md)
- [Identity Cleanup Batch](post-seed/IDENTITY_CLEANUP_BATCH.md)
- [Image Assets Batch](post-seed/IMAGE_ASSETS_BATCH.md)
- [Faculties, Programs, And Rankings Batch](post-seed/FACULTIES_PROGRAMS_RANKINGS_BATCH.md)

## Candidate Records Held For Review

30 public-source candidates were held out of `v0.1.0` because they were not
within the approved production scope. Some were reviewed in early
post-seed batches, but `v0.1.11` reclassifies the 27 out-of-scope additions
as held candidates instead of canonical production records.

The original held-candidate backlog is not clear for production. Candidate
records should be reviewed as separate batches and added only after they satisfy
the current scope rule or after OpenSyria approves a broader scope rule.

Review future candidates as separate batches:

- military, police, and defense colleges,
- foreign-branch records,
- alternate or duplicate university names,
- autonomous-administration universities,
- records missing English or Arabic names,
- records missing official websites.

Do not add these records only because they appear in a single list. Confirm
identity, naming, scope, source attribution, and the production boundary first.

## Logos And Images

Public profile logo assets are not part of `v0.1.0`. Campus, building, and
other non-logo images are optional and do not satisfy the profile logo coverage
gate.

The current reviewed logo batch covers all 57 canonical universities. Future
logo replacements should wait until a clean official logo source is reviewed
and uploaded.

Before uploading logos or optional images to R2:

- confirm source URL, institution match, reuse constraints, and attribution
  requirements,
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
