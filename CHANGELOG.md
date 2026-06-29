# Changelog

All notable changes to this repository will be documented in this file.

## v0.1.13 - 2026-06-29

### Changed

- Normalize safe locality labels by removing redundant governorate wording where the structured governorate already matches.
- Track the remaining three locality/governorate conflicts for source review instead of applying inferred fixes.

## v0.1.12 - 2026-06-29

### Added

- Add release manifest readiness metadata that separates syncable identity seed data from public API approval.
- Mark the current release as `identity_seed_ready` with public API exposure explicitly `not_approved`.

## v0.1.11 - 2026-06-29

### Changed

- Restore the canonical university dataset boundary to the 57 records present in the internal comparison control list and confirmed by approved public sources.
- Reclassify the 27 public-source-only post-seed records as held candidates pending an explicit scope decision.
- Keep candidate review notes in the post-seed backlog instead of shipping those records as canonical production data.
- Remove the unused Homs Military Academy source entry from the canonical source registry after reclassifying that candidate as held.
- Add a production-readiness report that separates hard identity requirements from source-backed coverage targets.

## v0.1.10 - 2026-06-29

### Added

- Add the accepted Homs Military Academy candidate record with reviewed conflict notes.
- Add a dedicated Wikipedia source entry and import manifest for Homs Military Academy.

### Changed

- Merge the held Wikidata University of Kobani duplicate candidate into the existing canonical record.

## v0.1.9 - 2026-06-29

### Changed

- Merge two held Wikidata duplicate/enrichment candidates into existing canonical records.
- Add a reviewed import manifest for the duplicate/enrichment cleanup.

## v0.1.8 - 2026-06-29

### Added

- Add five accepted Wikidata-only post-seed candidate records with reviewed labels and no current duplicate hit.
- Add a reviewed import manifest for the Wikidata-only candidate batch.

## v0.1.7 - 2026-06-29

### Added

- Add the accepted foreign-branch candidate record, `sy-omdurman-islamic-university-damascus-branch`.
- Add a reviewed import manifest for the foreign-branch candidate batch.

## v0.1.6 - 2026-06-29

### Added

- Add 16 accepted military and police post-seed candidate records from the approved Wikipedia list source.
- Add a reviewed import manifest for the military and police candidate batch.
- Keep `sy-homs-military-academy` held for later review because the local artifacts show a cross-source founded-year conflict.

## v0.1.5 - 2026-06-29

### Fixed

- Ensure empty NDJSON release artifacts are non-zero-byte files so GitHub Release uploads succeed.
- Add release preparation validation for zero-byte artifacts.

## v0.1.4 - 2026-06-29

### Added

- Add three accepted autonomous-administration university candidate records.
- Add a reviewed import manifest for the autonomous-administration candidate batch.
- Fix release scripts so GitHub Actions can tolerate a forwarded `--` argument separator.

## v0.1.3 - 2026-06-29

### Added

- Add the first accepted post-seed candidate record, `sy-al-shahbaa-aleppo-university`.
- Add a reviewed import manifest for the candidate-record batch.

## v0.1.2 - 2026-06-29

### Added

- Add schema-first canonical files for faculties, programs, and rankings.
- Add validation, fixtures, examples, reports, and release artifacts for the new batch files.
- Keep canonical faculty, program, and ranking data empty until approved reusable sources are reviewed.

## v0.1.1 - 2026-06-29

### Added

- Add `data/assets.json` for attribution-aware university image assets.
- Add the first reviewed Wikimedia Commons campus image assets with OpenSyria CDN variants.
- Add asset validation, fixtures, schema, import manifest, and release artifacts.

## v0.1.0 - 2026-06-29

### Added

- Initialize `data-universities` with the same validation, fixture, schema, and release-artifact workflow used by `data-geography`.
- Add the first university record schema and release artifact builder.
- Add the first seed dataset with 57 Syrian university and higher-institute records.
- Add approved public source registry entries and import manifests for Wikidata and Wikipedia.
