# Sources

Use legally reusable, public, reviewable sources.

Preferred source types:

- official university websites,
- Syrian ministry or regulator pages,
- Wikidata for cross-reference identifiers and multilingual labels,
- Wikimedia Commons for reviewed image assets with retained attribution,
- openly licensed public education directories.

Every source used by canonical records must appear in `data/sources.json` with `status: "approved"`.

The internal comparison control list is not a reusable canonical source.
Comparison-only material can
guide identity review and scope decisions, but canonical records must cite
approved public sources such as Wikidata, Wikipedia, official websites, or other
reviewed reusable sources.

For the production seed, a university identity record must be present in the
internal comparison control list and confirmed by at least one approved public
source. Records found only in public secondary sources remain candidates until
OpenSyria explicitly broadens the dataset scope.

Faculty, program, and ranking rows need the same source approval as university identity records. Comparison-only or unclear-license data can guide review but must not be copied into canonical files.

Do not import private directories, leaked data, student records, staff records, account data, or content whose license does not permit reuse.

For source partnerships or unusual source proposals, contact `data@opensyria.org` before importing or transforming data.
