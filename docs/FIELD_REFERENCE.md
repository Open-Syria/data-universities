# Field Reference

## `id`

Stable OpenSyria identifier. Use lowercase ASCII slugs:

```text
sy-damascus-university
```

## `name`

Canonical localized name object with required `en` and optional `ar`.

## `aliases`

Alternative names, historical names, spellings, or transliterations. Do not repeat canonical names.

## `institutionType`

One of:

```text
public
private
virtual
technical
religious
other
```

## `operationalStatus`

One of:

```text
operating
planned
closed
unknown
```

## `foundedYear`

Year the institution was founded, or `null` when not source-backed.

## `website`

Official public website URL, or `null`.

## `location`

Optional public location context:

- `governorate`
- `locality`
- `address`
- `centroid`

Use only public institution addresses, not personal or private addresses.

## `externalIds`

Supported keys:

- `wikidata`
- `website`
- `ministryId`

## `sourceIds`

Approved source IDs from `data/sources.json`.

## `sourceStatus`

One of:

```text
pending_release
seed
released
deprecated
```

## Asset Fields

`assets.json` stores approved media assets separately from university identity records.

`universityId` references a record in `data/universities.json`.

`assetType` is currently `image`.

`assetRole` describes the use of the asset:

```text
campus
logo
building
other
```

`variants` contains generated OpenSyria CDN objects. Each variant includes:

- `url`
- `key`
- `format`
- `contentType`
- `width`
- `height`
- `sha256`
- `sizeBytes`

`attribution` keeps the source provider, source URL, creator, license, and whether attribution is required. Keep this data with the image record, especially for Creative Commons BY or BY-SA media.
