# Logo And Image Assets Batch

Public profile logo assets are intentionally excluded from `v0.1.0`.
Campus, building, and other non-logo images are optional media assets, not a
production readiness requirement.

The current logo maintainer artifacts show:

- the R2 bucket was cleaned before the fresh logo batch,
- 24 old university image objects were deleted,
- first official-site pass: 42 logo candidates downloaded, 37 approved after
  automatic scoring and manual review, and 202 WebP/AVIF variants uploaded,
- second Arabic/English official-page pass: 17 additional logos approved from
  official websites or official social pages, and 74 WebP/AVIF variants
  uploaded,
- Arabic-page follow-up: 1 additional official Facebook logo approved and 2
  WebP/AVIF variants uploaded,
- final official-social follow-up: 2 additional logos approved and 12 WebP/AVIF
  variants uploaded,
- 57 approved logo sources were converted into 290 CDN objects and verified
  through `https://cdn.opensyria.org`.

Current production logo coverage is 57 approved logo assets for 57 canonical
universities. The public profile asset target is logo coverage, not campus photo
coverage. University records should stay without a logo asset until an official
or otherwise approved logo source, trademark/reuse review, and CDN upload are
complete.

There are no remaining logo gaps in the current canonical university dataset.

## Rules

- Do not hotlink external source images from canonical records.
- Do not upload logos without confirming the institution match, source URL, and
  trademark or reuse constraints.
- Do not upload non-logo images without confirming reuse rights and attribution requirements.
- Keep source download manifests as review artifacts.
- Generate WebP and AVIF variants before upload.
- Run an R2 dry run before uploading.
- Reference only `https://cdn.opensyria.org` URLs in canonical data after upload.

## Working Flow

1. Collect logo candidates from official university websites or clear official
   social pages into ignored local review artifacts. Search English and Arabic
   names when pages may publish under either language.
2. Confirm source URL, institution match, mark quality, trademark/reuse
   constraints, attribution needs, and record match.
3. For Wikimedia Commons or other openly licensed image candidates, generate a
   license review manifest.
4. Copy approved items into an approved local manifest with `approved: true`.
5. Generate logo variants with `build-image-assets`.
6. Run `upload-image-assets --dry-run`.
7. Inspect object keys and public URLs.
8. Upload to R2 only after review.
9. Add CDN URLs to canonical `data/assets.json` records with `assetRole:
   "logo"` and attribution or rights notes.

## Schema Decision

Image assets live in `data/assets.json`, not directly on `data/universities.json` records.

Logo assets are the production profile target. Campus, building, and other
non-logo images can remain in `data/assets.json` when reviewed, but they do not
satisfy the profile logo readiness gate. Future batches should follow the same
attribution and rights sidecar pattern.
