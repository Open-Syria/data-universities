# 2026–2027 Program Pilot

This batch uses the [pinned admissions catalogues](ADMISSIONS_2026_2027_REVIEW.md#input-snapshot-and-coverage)
and corroborating sources to add four offerings across three existing
universities. The [import manifest](../../imports/manifests/mohe-university-admissions-program-pilot-2026-2027-2026-11-12.json)
pins the three Ministry PDFs used for the pilot. Page and row numbers refer
to the reviewed extraction.

| Program ID | Campus | Degree level | Routes verified for 2026–2027 | Ministry evidence |
| --- | --- | --- | --- | --- |
| `sy-al-sham-private-university-pharmacy-al-tall` | Al-Tall, Rif Dimashq | Bachelor | Private | 7 p12 r7 |
| `sy-al-sham-private-university-pharmacy-latakia` | Latakia | Bachelor | Private | 7 p12 r8 |
| `sy-al-manara-university-pharmacy` | Latakia | Bachelor | Private | 7 p12 r11 |
| `sy-damascus-university-mechanical-and-electrical-engineering-technical-diploma` | Damascus | Technical diploma | General, parallel | 2 p16 r29 and 6 p12 r2 |

The Al-Sham Private University faculty directory identifies the two
pharmacy campuses separately. The World Higher Education Database lists
pharmacy among the university's first degrees. Manara's faculty page
identifies its first degree in pharmacy and pharmaceutical chemistry.
[Al-Sham Private University](https://aspu.edu.sy/site/english/index.php) ·
[WHED qualification](https://whed.net/institutions/IAU-026953) ·
[Manara Faculty of Pharmacy](https://manara.edu.sy/pharm/index.php?cat_id=208&dir=items&ex=25&lang=1&page=show&ser=42)

Announcement 2 lists the public technical institute under Damascus.
Announcement 6 names Damascus University for the same institute and city.
SANA's reporting with university and institute officials confirms the
affiliation and two-year technical diploma. The pilot records the
institute-level offering. The specific diploma tracks need their own
sources and names. [Ministry admissions notice](https://mohe.gov.sy/ar/media-center/details/651) ·
[SANA institute report](https://sana.sy/education/2332523/)

## Structured pilot model

- Reuse one discipline across campuses and universities. The three
  pharmacy offerings share the discipline `sy-pharmacy`
  (`الصيدلة`, Pharmacy), field `health`, and ISCED-F code `0916`.
  The umbrella technical diploma has a null discipline ID. Assign a
  detailed discipline to each technical track once its subject
  and award are verified. [UNESCO ISCED-F detailed field descriptions](https://uis.unesco.org/sites/default/files/documents/international-standard-classification-of-education-fields-of-education-and-training-2013-detailed-field-descriptions-2015-en.pdf)
- Keep a stable offering ID tied to the university, faculty or institute,
  campus, subject, and award. Deduplicate repeat appearances across
  applicant and certificate catalogues. Preserve the separate Al-Sham
  pharmacy offerings when adding structured campus references.
- Keep degree level on the offering so the same field can support
  different qualifications.
- Store verified admission routes with their academic year. Keep route
  identifiers distinct from certificate categories and applicant
  eligibility. The pilot table records the three ordinary routes in
  scope. The admissions advisor remains the source for marks and
  applicant rules.

The release build exports structured campus, admission cycle and routes on
programs. Discipline records have their own release artifact. The next Jobara
batch can use the program list on existing university profiles. Any later
discipline or job landing pages follow the existing localized URL, indexing,
admin, and sitemap conventions.
