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
- `sourceStatus`

Image assets must keep license and attribution metadata with the CDN variants. Do not place external hotlinks in canonical records.

`faculties.json` records faculties, colleges, institutes, schools, centers, departments, and similar university units. Each faculty record must have:

- `id`
- `universityId`
- `name`
- `aliases`
- `facultyType`
- `operationalStatus`
- `website`
- `sourceIds`
- `sourceStatus`

`programs.json` records academic programs, technical programs, specialties, and tracks. Each program record must have:

- `id`
- `universityId`
- `facultyId`
- `name`
- `aliases`
- `programType`
- `degreeLevel`
- `operationalStatus`
- `website`
- `sourceIds`
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
- `sourceStatus`

The current canonical faculty, program, and ranking arrays are intentionally empty until approved reusable sources are reviewed.

Machine-readable JSON Schemas live under `schemas/`. The authoritative validation path is:

```bash
pnpm run validate:data
```
