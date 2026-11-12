# Changelog

All notable changes to this repository will be documented in this file.

## Unreleased

### Added

- Add six verified Civil Engineering and Informatics Engineering bachelor's offerings in Damascus, Homs, and Latakia.

- Add Arabic Ministry admissions aliases to 11 existing universities, with page and row references.
- Add four faculties or institutes and four reviewed program offerings across three universities.
- Add two bachelor's programs at Al-Manara University and four technical diploma tracks at Damascus University.
- Add 34 bachelor's programs and two technical diplomas from the named 2026–2027 review.
- Add 23 bachelor's programs and four technical diplomas from the second named review.
- Add eight bachelor's programs from the third named review.
- Add 20 bachelor's offerings at Ittihad, Al-Hawash, and Arab International University.
- Add 18 bachelor's offerings at Ebla, Al-Jazeera, and Bilad al-Sham.
- Add 21 bachelor's offerings at Al-Rowad and Al-Shamal.
- Add 25 bachelor's offerings at Kalamoon, IUST, and Al-Wataniya, and map Graphic Design as a field of study.
- Add 19 bachelor's offerings and one technical diploma at Antioch, Al-Maarif, and Qasyoun, and map Applied Chemistry as a field of study.
- Add 32 bachelor's offerings at Başakşehir, Al-Zahraa, and the Arab University for Science and Technology, and map Chemical Engineering as a field of study.
- Add 30 bachelor's offerings at International Sham University, the British University in Damascus, and Al-Zaytuna International University.
- Add 18 bachelor's offerings at Al-Amanos, Al-Maali, Al-Shahba, and Aram University for Sciences.
- Add 17 bachelor's offerings at the Arab Academy's Latakia campus, Cordoba's Aleppo and Qamishli campuses, the Islamic University in Syria, and the Faculty of Theology in Damascus.
- Add 17 public bachelor's offerings at Latakia, Homs, Hama, and Tartus, with a shared Computer Technologies field of study.
- Add four bachelor's programmes and two technical diplomas at Aleppo, and three technical diplomas at Idlib and Al-Dana.
- Add three bachelor's programmes and five technical diploma offerings at Damascus, Aleppo, and Homs.
- Add 24 bachelor's offerings and three technical diplomas in the completed named admissions review. Document alternate Ministry rows for existing offerings and record the evidence still needed for pending rows.
- Add the verified Civil Engineering first degrees at the University of Aleppo and Homs University from the city-grouped scientific table.
- Export the field-of-study catalogue, plus campus and academic-year admission routes on program offerings.

### Changed

- Use Deir ez-Zor as Al-Jazeera Private University's permanent campus for the 2026–2027 intake.

## v0.2.3 - 2026-11-11

### Changed

- Make tag-driven release manifests reproducible from the tagged commit timestamp.
- Prevent release workflow reruns from replacing published assets; matching assets are retained and changed bytes require a new version.
- Honor `[skip ci]` consistently in validation and CodeQL push workflows.
- Audit the complete dependency graph during validation and pin the patched `fast-uri` release.
- Add optional Wikimedia Commons cover photos for 10 of 57 universities (3 campus, 7 building) as attributed CDN WebP/AVIF assets, with one approved source per file and an import manifest.
- Raise the pinned `fast-uri` and `js-yaml` releases and `zod` past current audit advisories.

## v0.2.2 - 2026-07-08

### Changed

- Add dated record-level `sourceReferences` to universities, assets, faculties, programs, and rankings.
- Mark canonical records as `released` and make release builds default to released status.
- Add source reference columns to generated CSV and SQL artifacts.
- Expand contributor workflow docs with quick-start steps, editable files, validation commands, review expectations, and reference links for normal data pull requests.
- Group automated npm dependency updates into one weekly Dependabot pull request to keep lockfile validation stable.

## v0.2.1 - 2026-07-04

### Fixed

- Replace the incorrect Al-Furat University ministry-logo asset with reviewed
  CDN variants from the university LinkedIn company-page logo.

## v0.2.0 - 2026-06-30

### Added

- Add approved ranking snapshots from reviewed public ranking providers.
- Add approved logo assets for all 57 canonical university and higher-institute records.
- Mark the release manifest as `profile_ready` with public API exposure approved.

### Changed

- Keep faculty and program files schema-ready but empty until approved source-backed rows are reviewed.
- Move publication text checks to private environment configuration so the public repository does not expose private review markers.

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

- Restore the canonical university dataset boundary to the 57 records approved for the seed scope and confirmed by approved public sources.
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
