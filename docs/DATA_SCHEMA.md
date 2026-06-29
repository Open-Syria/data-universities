# Data Schema

Canonical data lives in:

```text
data/sources.json
data/universities.json
data/assets.json
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

Machine-readable JSON Schemas live under `schemas/`. The authoritative validation path is:

```bash
pnpm run validate:data
```
