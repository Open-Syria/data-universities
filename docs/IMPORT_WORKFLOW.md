# Import Workflow

1. Review the source license and add or update `data/sources.json`.
2. Save any local-only raw files under `imports/raw/`; this directory is ignored.
3. Create an import manifest under `imports/manifests/`.
4. Transform source records into the target canonical file, such as `data/universities.json`, `data/assets.json`, `data/faculties.json`, `data/programs.json`, or `data/rankings.json`.
5. Run validation:

```bash
pnpm run validate
```

6. Review diffs manually before committing.

Use `imports/manifests/source-import.template.json` as the manifest starting point.

For large imports, automation, new dataset topics, or work outside the normal university data scope, contact `data@opensyria.org` before starting.
