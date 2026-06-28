# Contributions

This guide explains how to contribute data changes to `data-universities`.

## Allowed Data Files

Most data changes should touch only:

```text
data/universities.json
data/sources.json
imports/manifests/*.json
```

## Review Rules

Contributions must:

- use public, legally reusable sources,
- avoid private personal data,
- keep IDs stable and lowercase,
- include source attribution,
- pass validation.

For broader ideas, new dataset topics, schema work, automation, or other contributions outside this normal scope, contact `data@opensyria.org` before starting.

Run before opening a change:

```bash
pnpm run validate
```
