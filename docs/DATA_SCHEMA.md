# Data Schema

Canonical data lives in:

```text
data/sources.json
data/universities.json
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

Machine-readable JSON Schemas live under `schemas/`. The authoritative validation path is:

```bash
pnpm run validate:data
```
