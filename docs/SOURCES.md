# Sources

Use legally reusable, public, reviewable sources.

Preferred source types:

- official university websites,
- Syrian ministry or regulator pages,
- Wikidata for cross-reference identifiers and multilingual labels,
- openly licensed public education directories.

Every source used by canonical records must appear in `data/sources.json` with `status: "approved"`.
Every public record must also carry a matching dated `sourceReferences` entry
for each source ID it lists.

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

Optional cover photo rows (`campus` or `building` roles) use Wikimedia Commons
files only, under free licences: CC0, public domain, CC BY, or CC BY-SA. Do not
use university website or social media photos as covers. Register one approved
source per Commons file page and keep the creator, licence, licence URL, and
attribution requirement in `data/assets.json` so credit can be shown wherever the
image appears.

Do not import private directories, leaked data, student records, staff records, account data, or content whose license does not permit reuse.

For source partnerships or unusual source proposals, contact `data@opensyria.org` before importing or transforming data.
