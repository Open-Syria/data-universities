# Import Workflow

1. Review the source license and add or update `data/sources.json`.
2. Save any local-only raw files under `imports/raw/`; this directory is ignored.
3. Create an import manifest under `imports/manifests/`.
4. Transform source records into `data/universities.json`.
5. Run validation:

```bash
pnpm run validate
```

6. Review diffs manually before committing.

Use `imports/manifests/source-import.template.json` as the manifest starting point.

For large imports, automation, new dataset topics, or work outside the normal university data scope, contact `data@opensyria.org` before starting.
