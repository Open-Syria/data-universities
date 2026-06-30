# Sources

Use legally reusable, public, reviewable sources.

Preferred source types:

- official university websites,
- Syrian ministry or regulator pages,
- Wikidata for cross-reference identifiers and multilingual labels,
- openly licensed public education directories.

Every source used by canonical records must appear in `data/sources.json` with `status: "approved"`.

The approved production scope is not a reusable canonical source.
Review-only material can
guide identity review and scope decisions, but canonical records must cite
approved public sources such as Wikidata, Wikipedia, official websites, or other
reviewed reusable sources.

For the production seed, a university identity record must be present in the
approved production scope and confirmed by at least one approved public
source. Records found only in public secondary sources remain candidates until
OpenSyria explicitly broadens the dataset scope.

Faculty, program, ranking, and logo rows need the same source approval as university identity records. Review-only or unclear-license data can guide review but must not be copied into canonical files.

Logo rows should use official university website logo sources where possible,
or official social-page logo sources when no website logo is available and the
page identity is clear. Retain the exact source URL and trademark or reuse notes
in `data/assets.json`.

Do not import private directories, leaked data, student records, staff records, account data, or content whose license does not permit reuse.

For source partnerships or unusual source proposals, contact `data@opensyria.org` before importing or transforming data.
