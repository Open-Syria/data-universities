# 2026–2027 Admissions Review

The first batch adds Arabic aliases to 11 existing university records.
The [import manifest](../../imports/manifests/mohe-private-university-admissions-2026-2027-2026-11-12.json)
pins the Ministry's private admissions PDF (announcement 7). Each changed
university cites a page and row in the reviewed extraction. This review
covers the identity pass. The follow-up [program pilot](PROGRAM_PILOT_2026_2027.md)
records the first reviewed offerings.

## Input snapshot and coverage

Input: [OpenSyria website catalogues at `0754506`](https://github.com/Open-Syria/website/tree/07545062e6a0f06fde4540a7f1dc460ae2f7932e/src/app/%5Blocale%5D/admissions/_data/2026-2027).
Use the corresponding [admissions source audit](https://github.com/Open-Syria/website/blob/07545062e6a0f06fde4540a7f1dc460ae2f7932e/docs/admissions-source-audit.md)
to resolve announcement numbers and check source hashes.

| Input rows | Count | Disposition |
| --- | ---: | --- |
| Named civilian institutions | 6,155 | 5,355 match a canonical Arabic name or alias across 43 admissions institution IDs. The other 800 have explicit branch or complex labels across 11 IDs; see below. |
| Public faculties or institutes grouped by city | 4,303 | 27 group IDs. No parent university is named on these rows. |
| Medical preparatory year | 5 | No specific university is identified. |
| Out of scope under the dataset's data safety rules | 31 | Exclude the service catalogues. |
| **Total** | **10,494** | 24 catalogues, 788 distinct Arabic labels across all choices before exclusions and curation. |

To reproduce the counts, read the `programs` array in each catalogue; skip
`vocational-options.json`, which is not a catalogue. Classify the four
`service-*.json` files first, then classify `public-medical-preparatory` and
city grouping labels that contain ` — `. Match the remaining Arabic
institution labels exactly against canonical names and Arabic aliases.
A branch suffix can identify a parent for review; preserve the branch or
complex and the row's campus separately. The counts are raw choice rows:
applicant categories, routes and specialties can repeat one offering.

## Identity decisions

- **British University in Damascus:** retain
  `sy-al-rasheed-international-university-for-science-and-technology`.
  The [rename announcement as reported by Uni.sy](https://www.uni.sy/index.php/news/1709.html)
  and its [record under the old website key](https://uni.sy/Syria/University/ru.edu.sy)
  connect the two names. The [university's current site](https://www.bud.edu.sy/contact)
  uses the new name and places the campus in Ghabageb, Daraa. This batch adds
  the Ministry's Arabic label; review the canonical display names, website,
  locality and legacy logo together in a separate identity update.
- **Al-Sham Private and International Sham:** both already exist. The
  [Al-Sham Private site](https://aspu.edu.sy/) lists Al-Tall, Al-Mazraa and
  Latakia faculties under `sy-al-sham-private-university`. The
  [International Sham site](https://isu.edu.sy/home) places
  `sy-al-sham-university` near Azaz. The
  [Higher Education Council decision reported by SANA](https://sana.sy/education/2321644/)
  explains why the Azaz institution can appear under a similar historical
  name. Do not add that ambiguous historical name as an unqualified alias.

## Branch and complex crosswalk for review

These are parent candidates for the future import, with locations as stated
in the input. They do not create new university identities or settle faculty
affiliation for individual programs. References use announcement 7 page and
row coordinates from the extraction.

| Admissions institution ID | Candidate parent ID | Branch or complex | Example |
| --- | --- | --- | --- |
| `private-ed42462241b1` | `sy-ittihad-private-university` | Aleppo branch | p13 r16 |
| `private-a31a54881cb0` | `sy-ittihad-private-university` | Alqeen headquarters | p11 r12 |
| `private-426355baca86` | `sy-cordoba-private-university` | Aleppo branch | p10 r9 |
| `private-4b4ecf855032` | `sy-cordoba-private-university` | Qamishli headquarters | p12 r18 |
| `private-02a5c3d3a5a7` | `sy-bilad-al-sham-university-for-sharia-sciences` | Ahmad Kuftaro complex | p60 r11 |
| `private-54b8c96560e8` | `sy-bilad-al-sham-university-for-sharia-sciences` | Ahmad Kuftaro complex, alternate institution label | p21 r17 |
| `private-64679c495b22` | `sy-bilad-al-sham-university-for-sharia-sciences` | Sayyida Ruqayya complex | p28 r13 |
| `private-71bbc33ad094` | `sy-bilad-al-sham-university-for-sharia-sciences` | Al-Fath Islamic complex | p26 r3 |
| `private-a5cf595b2a09` | `sy-arab-academy-of-science-and-technology-and-maritime-transport` | [Latakia branch](https://aast.edu/ar/campuses/latakia/ar/) | p13 r17 |
| `private-91c97bde80bc` | `sy-al-sham-private-university` | Latakia faculties | p11 r5 |
| `private-f97d4cfe72fd` | `sy-al-sham-private-university` | Al-Tall in the institution label; rows distinguish Al-Tall and Al-Mazraa | p10 r7 |

## Public affiliation and next import

The [city-grouped public program review](PUBLIC_CITY_PROGRAMS_2026_2027.md)
tracks the reviewed rows and the evidence needed for further assignments.
Its [register](PENDING_PUBLIC_CITY_PROGRAMS_2026_2027.md) lists the leads
still pending after the fourth review.

Assign a public offering only when a Ministry row or an official institution
source names the parent for that program at that campus. Do not assign a
whole city grouping to one university. Joining grouped rows to explicitly
named public rows by Arabic program label, campus, governorate and kind
identified 162 choice rows (37 distinct program and campus leads) for
review; a join hit alone is not an affiliation decision. For example, the
foreign literary tables list the technical institute for business
administration and marketing in Damascus, Aleppo and Latakia at announcement
9, p35 r22–24. The vocational table names the respective universities for
the same institute and campuses at announcement 6, p20 r8–10. Carry both
references into review and keep any unmatched or ambiguous rows unpublished.

Before the first canonical offering batch:

1. Review reuse and approval for program facts separately from the narrow
   name approval. Start with the named private institutions and a small
   sample of sourced public affiliations.
2. Agree on the discipline and campus schema. Curate bilingual discipline
   names and ISCED-F codes, and distinguish degrees from institute diplomas.
   The admissions `kind` describes the institution or route; it does not
   establish a faculty name or award level on its own. The exception is the
   owner decision of 13 November 2026: for city-grouped rows whose
   university and teaching city an approved source already gives, the
   table type gives the award level. See the
   [source decisions](../SOURCE_DECISIONS.md).
3. Deduplicate by stable university, campus, faculty when known, discipline,
   and degree level. Retain academic routes and source locators. A choice
   ID is specific to the admissions catalogue and should not become a
   canonical offering ID.
4. Keep marks, quotas, and applicant eligibility in the website catalogues.
   Review the release and downstream consumers after the canonical batch
   validates.
