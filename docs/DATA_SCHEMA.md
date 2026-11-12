# Data Schema

Canonical data lives in:

```text
data/sources.json
data/universities.json
data/assets.json
data/faculties.json
data/programs.json
data/rankings.json
```

`sources.json` records reusable sources that have been reviewed for license compatibility.

`universities.json` records public university facts. Each university must have:

- `id`
- `name`
- `aliases`
- `institutionType`
- `operationalStatus`
- `foundedYear`
- `website`
- `location`
- `externalIds`
- `sourceIds`
- `sourceReferences`
- `sourceStatus`

`assets.json` records public media assets that are approved for OpenSyria CDN use. Each asset must have:

- `id`
- `universityId`
- `assetType`
- `assetRole`
- `title`
- `variants`
- `attribution`
- `sourceIds`
- `sourceReferences`
- `sourceStatus`

Logo assets are the production profile asset target. Campus, building, and
other non-logo images are optional and do not satisfy logo coverage gates.
Image assets must keep license, attribution, trademark, or reuse notes with the
CDN variants. Do not place external hotlinks in canonical records.

`faculties.json` records faculties, colleges, institutes, schools, centers, departments, and similar university units. Each faculty record must have:

- `id`
- `universityId`
- `name`
- `aliases`
- `facultyType`
- `operationalStatus`
- `website`
- `sourceIds`
- `sourceReferences`
- `sourceStatus`

The `disciplines.json` catalogue records shared fields of study with bilingual
names, aliases, an admissions field, an ISCED-F 2013 detailed code, source
references, and release status.

`programs.json` records academic programs, technical programs, specialties, and tracks. Each program record must have:

- `id`
- `universityId`
- `facultyId`
- `disciplineId`
- `campus`
- `admissions`
- `name`
- `aliases`
- `programType`
- `degreeLevel`
- `operationalStatus`
- `website`
- `sourceIds`
- `sourceReferences`
- `sourceStatus`

`rankings.json` records ranking snapshots. Each ranking record must have:

- `id`
- `universityId`
- `rankingSystem`
- `rankScope`
- `year`
- `rank`
- `rankDisplay`
- `sourceUrl`
- `retrievedAt`
- `sourceIds`
- `sourceReferences`
- `sourceStatus`

The first canonical faculty and program batch covers four offerings across
three universities. It includes one curated discipline. See the
[program pilot](post-seed/PROGRAM_PILOT_2026_2027.md) for mapping decisions. Ranking rows are populated only when an
approved ranking source publishes a source-backed snapshot. Every public record
must include `sourceReferences` with dated evidence for each `sourceIds` entry.

Machine-readable JSON Schemas live under `schemas/`. The authoritative validation path is:

```bash
pnpm run validate:data
```
