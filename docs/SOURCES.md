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

For the 2026–2027 admissions identity batch, Ministry announcement 7 is
approved for Arabic institution names only. See the
[admissions review](post-seed/ADMISSIONS_2026_2027_REVIEW.md) for source
locators and the separate review required for faculty and program facts.

The [program pilot](post-seed/PROGRAM_PILOT_2026_2027.md) records the separate
review for factual offering details from the Ministry and corroborating sources.
Discipline classification uses ISCED-F 2013 field codes from UNESCO UIS.
The [named program review](post-seed/NAMED_PROGRAM_REVIEW_2026_2027.md)
records the Ministry, university and institute references for the
additional Al-Manara programs and Damascus diploma tracks.
The [bulk named-program review](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md)
records program and award evidence across the named admissions review.
The last pass uses announcements 5, 6, and 7 with campus-specific award
lists, faculty profiles, and the Gazette. The
[pending register](post-seed/PENDING_NAMED_PROGRAMS_2026_2027.md) links the
remaining candidates to their Ministry rows and evidence gaps.
The [city-grouped review](post-seed/PUBLIC_CITY_PROGRAMS_2026_2027.md) uses
announcement 2 for intake facts. Gazette decisions and faculty qualification
profiles establish first-degree awards. Decrees 99 and 100 establish the
current Homs and Latakia university names.
The Ministry's intake rows also corroborate Al-Jazeera's permanent campus
announcement. [Al-Jazeera campus notice](https://t.me/STUDENTSJPU/1779)

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
