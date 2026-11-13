# Source Decisions

Record source approval decisions here as real university sources are reviewed.

| Source ID | Status | Use | Decision |
| --- | --- | --- | --- |
| wikidata | approved | Public names, identifiers, official website links, founding years, and coordinates where present. | Approved for seed import under CC0 1.0. |
| wikipedia-list-universities-syria | approved | Open reference list for names, institution grouping, location, founding year, and website values. | Approved for seed import under CC BY-SA 4.0 with attribution retained through the source registry. |
| al-jazeera-private-university-official-website | approved | Public factual location/contact review for Al-Jazeera Private University. | Approved narrowly for factual official-site review; do not import copyrighted narrative content. |
| al-sham-private-university-official-website | approved | Public location, contact, and pharmacy faculty campus review for Al-Sham Private University. | Approved for factual official-site location review and pharmacy faculty affiliation at Al-Tall and Latakia. |
| arab-ranking-for-universities-2025 | approved | Source-backed 2025 Arab-region and Syria country-rank snapshots for explicit Syrian rows in the official results table. | Approved narrowly for factual ranking rows only; no narrative page content copied. |
| times-higher-education-world-university-rankings-2026-syria | approved | Source-backed 2026 overall World University Rankings snapshots for Syrian institutions listed on the official Times Higher Education Syria page. | Approved narrowly for factual ranking values and bands only; no page prose copied. |
| unirank-syrian-university-ranking-2026 | approved | Source-backed 2026 Syria national ranking snapshots for rows matched to canonical university IDs. | Approved narrowly for factual ranking values only; skipped rows without a clear canonical identity match. |
| uniranks-syria-2026 | approved | Source-backed 2026 UNIRANKS listed-rank snapshot for Mari Private University. | Approved narrowly for factual listed-rank values only; unclear or unmatched rows were not imported. |
| webometrics-org-global-web-rankings-january-2026-syria | approved | Source-backed January 2026 world-rank and Syria-rank snapshots for clear missing canonical matches in the independent Webometrics.org table. | Approved narrowly for factual table values only; kept separate from the Webometrics.info/Figshare source. |
| webometrics-ranking-web-january-2026 | approved | Source-backed ranking snapshots where the Figshare PDF publishes an explicit rank for a canonical Syrian institution. | Approved under CC BY 4.0. Only imported rows visible in the published PDF; the unavailable full Excel list was not copied or inferred. |
| mohe-private-university-admissions-2026-2027 | approved | Arabic aliases for existing university IDs. | Approved narrowly for factual institution names from Ministry announcement 7. No admission tables, marks, eligibility rules, prose, or program records are covered. |
| `sy-...-official-logo` | approved | Per-university official website and official social-page logo sources for the reviewed logo batch. | Approved narrowly for public logo identification assets. Exact source URLs, trademark notes, and CDN variants are retained in `data/assets.json`. |
| `sy-...-commons-cover` | approved | Per-file Wikimedia Commons photos used as optional cover images for 10 universities (2026-11-11 batch). | Approved because each file carries a free licence (CC BY 2.0, CC BY-SA 3.0, CC BY-SA 4.0, or public domain) checked through Commons metadata, and the creator, licence, and file page are kept in `data/assets.json` so credit is shown. CDN copies are resized WebP/AVIF only; BY-SA derivatives keep the same licence. |

Cover photo review notes for the 2026-11-11 batch:

- Only free-licence Commons files were considered; university website and social
  media photos were excluded.
- Candidates were rejected when they were too small, showed interiors or people,
  depicted a different institution, or had a licence that could not be verified.
- Damascus University uses a public domain photo of its Faculty of Medicine
  building.
- The Syrian Private University photo shows the university hospital building,
  not the main campus; the asset title and notes say so.

The first [program pilot](post-seed/PROGRAM_PILOT_2026_2027.md) uses narrow approvals for factual data:

| Source ID | Approved use |
| --- | --- |
| mohe-university-admissions-program-pilot-2026-2027 | Selected 2026–2027 offering names, campuses, named public affiliation, and route identifiers from PDFs 2, 6, and 7. |
| manara-university-pharmacy-official | Pharmacy faculty name and first degree. |
| whed-al-sham-private-university-qualification | First degree in pharmacy at Al-Sham Private University. |
| sana-damascus-technical-institute-diploma | Institute name, Damascus University affiliation, and technical diploma level. |
| unesco-isced-f-2013-detailed-field-descriptions | Detailed field identifiers and short labels used to classify reviewed disciplines. |

The approvals cover the stated facts. Marks, eligibility conditions, article prose, and images remain outside this scope.

The [named program review](post-seed/NAMED_PROGRAM_REVIEW_2026_2027.md) adds the following factual uses.

| Source ID | Approved use |
| --- | --- |
| mohe-university-admissions-named-programs-2026-2027 | Al-Manara's two named offerings and private route, plus the named Damascus institute affiliation. |
| manara-university-architecture-official | Architecture faculty and first-degree award. |
| manara-university-informatics-engineering-official | Engineering faculty and the Informatics Engineering first-degree award. |
| damascus-business-and-marketing-institute-page | Diploma title and four track names from the reproduced institute page, corroborated by the older Damascus institute profile. |

Use only the reviewed facts. Aleppo and Latakia track names and awards still need campus-specific evidence.

The [bulk named-program review](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md)
authorizes use of the 36 selected offering, campus, university and private-route
facts from announcement 7. The matching records cite university regulations,
official faculty pages, or a published Ministry decision for award levels.
The approvals are scoped to names, academic units, and qualification facts.

The second local batch extends the same announcement 7 approval to 27 more
rows. Mari's catalogue, Wadi's handbooks, and Yarmouk's study plan verify
award levels. For Al-Sham, the faculty directory confirms campus affiliations
and WHED confirms the first-degree levels in Law, Administration, and Engineering.
[Second local batch](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md#second-local-batch)

The third local batch adds eight announcement 7 rows. Use the university
pages for the academic unit, named program, first-degree level and campus
facts identified in the review. Al-Sham's schedule also supports the
English field-of-study alias Physical Therapy.
[Third local batch](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md#third-local-batch)

The fourth local batch adds 20 distinct offerings from announcement 7.
Use Ittihad's study and faculty pages for its first-degree programs and
campuses. Use the IAU and Ghorfa entries for award levels in their named
fields. The current Ministry rows supply the active offering and track labels.
[Fourth local batch](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md#fourth-local-batch)

The fifth local batch adds 18 distinct offerings from announcement 7.
Use Ebla's schedule and study rules for named first-degree tracks. Use
Al-Jazeera's published faculty, study and graduation rules for first-degree
classification, with the current Ministry rows for the campus and tracks.
Use decision 186 for the two explicitly named Bilad al-Sham branch awards.
[Fifth local batch](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md#fifth-local-batch)

The sixth local batch adds 21 offering rows from announcement 7. Al-Rowad's
study rules support first-degree classification for the named faculty tracks.
Al-Shamal's admissions and faculty lists support the eight selected programs.
The Ministry's current Al-Jazeera rows also corroborate the university's
permanent campus notice. Use these facts for the Al-Jazeera locality and
governorate. [Sixth local batch](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md#sixth-local-batch)

The seventh local batch adds 25 offering rows from announcement 7.
Use Kalamoon's republished intake table, IUST's faculty pages, and
Al-Wataniya's intake table for named programs and campus evidence.
The three institution qualification profiles support first-degree
classification for the reviewed subjects. Use UNESCO UIS for the Graphic
Design classification. [Seventh local batch](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md#seventh-local-batch)

The eighth local batch adds 20 offering rows from announcement 7. Use the
university faculty pages and the two institution profiles for named programs,
campuses, and first-degree facts. Use Qasyoun's institute and Article 4 of the
study plan adopted under Decision 20 for the technical diploma award. Use
UNESCO UIS field 0531 for Applied Chemistry.
[Eighth local batch](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md#eighth-local-batch)

The ninth local batch adds 32 offering rows from announcement 7. Use the
reviewed faculty pages and current programme tables for the named tracks
and qualification levels. Use the Ministry's campus labels and the Arab
University's official address to identify the admissions sites. Use UNESCO
UIS field 0711 for Chemical Engineering.
[Ninth local batch](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md#ninth-local-batch)

The tenth local batch adds 30 offering rows from announcement 7. Use the
International Sham faculty directory and study regulations, the British
University's programme catalogue and campus address, and Al-Zaytuna's
admissions guide and current programme announcement for the matched
qualification, programme, and campus facts.
[Tenth local batch](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md#tenth-local-batch)

The eleventh local batch adds 18 offerings from announcement 7. Use the
Al-Amanos faculty study plans and the qualification profiles for Al-Maali,
Al-Shahba, and Aram University for Sciences for the selected first-degree
programmes. Collapse matching Al-Maali applicant rows across its two
Ministry institution labels into one offering per track, using one canonical locator and recording the duplicate row in the batch notes.
[Eleventh local batch](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md#eleventh-local-batch)

The twelfth local batch adds 17 offerings from announcement 7. Match
Cordoba's two Ministry branches to the same university and retain each
verified campus offering. Use the Arab Academy and Islamic University
catalogues and the Faculty of Theology decree for first-degree evidence.
[Twelfth local batch](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md#twelfth-local-batch)

The thirteenth local batch uses announcement 6 for 17 public university
offerings and their general and parallel routes. Use the Ministry guide
and qualification profiles for the Applied Sciences award, the Homs
dean's statement for Music Education, and the Official Gazette for
the five Tartus Technical Engineering degrees. Computer Technologies
uses the broad ICT classification 0610. The reviewed common label
does not establish a finer classification across all three curricula.
[Thirteenth local batch](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md#thirteenth-local-batch)

The fourteenth local batch uses announcement 6 for four bachelor’s
programmes and five technical diplomas. Use the Gazette and the Ministry
student guide for the Aleppo first degrees. Use the Aleppo institute
award profiles and Idlib's institute pages for the named diplomas. The
council decision and university recruitment notice corroborate the
separate Al-Dana diploma offering.
[Fourteenth local batch](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md#fourteenth-local-batch)

The fifteenth local batch matches announcement 6 to the Damascus Applied
College awards and the Damascus and Homs technical diploma profiles. Use
the Aleppo university recruitment notice for the two-year diploma level
at its computing and business institutes. Grouped admissions rows stay
grouped. Announcement 5 confirms the Al-Furat specializations and the
current Homs teaching site of the Palmyra institute; those entries still
need award evidence.
[Fifteenth local batch](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md#fifteenth-local-batch)

The final named admissions pass retains grouped Fine Arts
intakes in Damascus, As-Suwayda, and Aleppo. Use announcement 5 for
the current Damascus teaching site of the institute named for Kharabo.
For private offerings, match the named faculty and campus in
announcement 7 to the faculty's first-degree award evidence. Record
alternate admissions labels for the same programme when the branch,
campus, and award are equivalent.
[Completed named admissions review](post-seed/BULK_NAMED_PROGRAMS_2026_2027.md#completed-named-admissions-review)

The first city-grouped pass uses announcement 2 for the Aleppo and Homs
intakes. Decisions 35 and 34 in Official Gazette issue 25 of 2019 confirm
the respective Civil Engineering awards. Decree 99 of 2025 confirms the
current Homs University name. The approval covers factual offering,
campus, affiliation, award, and ordinary admission-route details.
[City-grouped public program review](post-seed/PUBLIC_CITY_PROGRAMS_2026_2027.md)

The second city-grouped pass uses announcement 2 for the Damascus and
Latakia Civil and Informatics intakes and the two verified Homs
Informatics tracks. Decrees 250 and 100 establish faculty affiliation and
the current Latakia university identity. Gazette decisions and
faculty-specific qualification profiles establish the first degrees.
Grouped Informatics intakes retain one offering per campus. The two Homs
tracks retain separate offerings under the same field of study.
[Second city-grouped review](post-seed/PUBLIC_CITY_PROGRAMS_2026_2027.md#second-review-of-the-scientific-table)

The third city-grouped pass, batch 3 of the program plan, assigns rows to
public universities. Use each university's own faculty and institute
pages, internal regulations, study plans and guides, its published degree
lists, establishment decrees such as Decree 210 of 2026, article 2 of the
Decree 250 executive regulations, Higher Education Council decisions and
announcement 5 for the university, teaching city and award. When a current
page names no award, an Internet Archive copy of the university's own page
is approved for the facts it shows and is cited by its snapshot URL.
Human Medicine, Dentistry and Pharmacy are recorded from university
sources without a Ministry row, because entry is through the common
preparatory year. Directories and third-party profiles are not used.
[Third city-grouped review](post-seed/PUBLIC_CITY_PROGRAMS_2026_2027.md#third-review-university-assignments)

The same batch resolves named private candidates. Use the university's
faculty or study-system page for the professional first degree in Human
Medicine or Dentistry, which is recorded at the bachelor level by owner
decision. When the university names no award, Higher Education Council
Decision 31 (adopted 26 November 2007, published 2008), article 49, is
approved as the award evidence for these first degrees, combined with the
2026–2027 Ministry row that names the university and campus. The owner
accepted this basis on 13 November 2026. Decision 31 covers the award only;
a row whose campus is unconfirmed stays pending.
[Pending register](post-seed/PENDING_NAMED_PROGRAMS_2026_2027.md)
