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

For admissions-derived university names and future offerings, see the
[2026–2027 admissions review](post-seed/ADMISSIONS_2026_2027_REVIEW.md).
The [program pilot](post-seed/PROGRAM_PILOT_2026_2027.md) shows which facts
are imported and how campus, qualification, and classification evidence is
recorded. Link reviewed disciplines and store the routes with their cycle. Keep
marks and applicant rules in the website catalogues. The
[public batch review](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md#thirteenth-local-batch)
records how the announcement 6 rows were matched to first degrees.
The [city-grouped public program review](post-seed/PUBLIC_CITY_PROGRAMS_2026_2027.md)
documents the program-specific sources needed to assign announcement 2 rows.

For large imports, automation, new dataset topics, or work outside the normal university data scope, contact `data@opensyria.org` before starting.
