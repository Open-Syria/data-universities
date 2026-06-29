# Image Assets Batch

Public image assets are intentionally excluded from `v0.1.0`.

The current local maintainer artifacts show:

- 126 image candidates in the comparison snapshot,
- 4 Wikidata image candidates selected for download,
- 2 Wikidata images downloaded,
- 2 Wikidata image downloads failed,
- 2 Wikimedia Commons image candidates reviewed for license metadata,
- 2 reviewed candidates licensed as `CC BY-SA 4.0`,
- 2 reviewed candidates requiring attribution,
- 2 downloaded images converted into 8 WebP/AVIF variants,
- 8 R2 objects prepared in a dry-run upload manifest.

The 126 comparison-snapshot image candidates are not approved for upload. They are review hints only.

The two reviewed Wikimedia Commons candidates are approved as the first small image batch through `data/assets.json`, which keeps attribution metadata next to the CDN variants.

## Rules

- Do not hotlink external source images from canonical records.
- Do not upload images without confirming reuse rights and attribution requirements.
- Keep source download manifests as review artifacts.
- Generate WebP and AVIF variants before upload.
- Run an R2 dry run before uploading.
- Reference only `https://cdn.opensyria.org` URLs in canonical data after upload.

## Working Flow

1. Collect image candidates into ignored local review artifacts.
2. Confirm source license, attribution, image subject, and record match.
3. For Wikimedia Commons candidates, generate a license review manifest.
4. Copy approved items into an approved local manifest with `approved: true`.
5. Generate variants with `build-image-assets`.
6. Run `upload-image-assets --dry-run`.
7. Inspect object keys and public URLs.
8. Upload to R2 only after review.
9. Add CDN URLs to canonical `data/assets.json` records with attribution.

## Schema Decision

Image assets live in `data/assets.json`, not directly on `data/universities.json` records.

The first public image batch is intentionally small and source-clear. Future batches should follow the same attribution sidecar pattern.
