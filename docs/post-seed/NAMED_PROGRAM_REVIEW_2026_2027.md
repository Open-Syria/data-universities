# Named program review for 2026–2027

This review follows the [first program pilot](PROGRAM_PILOT_2026_2027.md).
It covers two first-degree programs at Al-Manara University and three
campus offerings of the Technical Institute of Business Administration and
Marketing. The local preview includes the two Al-Manara programs and
four Damascus diploma tracks.

The counts come from the 24 program catalogues in the OpenSyria website
snapshot at `07545062e6a0f06fde4540a7f1dc460ae2f7932e`. Page numbers refer
to the PDF viewer and row numbers to the catalogue extraction. Ministry
announcements 6 and 7 were checked against the published PDF checksums
and the listed table entries were visually verified.
[Pinned admissions data](https://github.com/Open-Syria/website/tree/07545062e6a0f06fde4540a7f1dc460ae2f7932e/src/app/%5Blocale%5D/admissions/_data/2026-2027) ·
[Source audit](https://github.com/Open-Syria/website/blob/07545062e6a0f06fde4540a7f1dc460ae2f7932e/docs/admissions-source-audit.md) ·
[Announcement 6](https://mohe.gov.sy/img/uploads1/news_pdf_20260930160315_651_0.pdf#page=20) ·
[Announcement 7](https://mohe.gov.sy/img/uploads1/news_pdf_6abe5325b7e08.pdf#page=13)

## First-degree programs

Both programs are at Al-Manara University (`sy-al-manara-university`) in
Latakia. The Ministry and university list them for 2026–2027 through the
private admissions route. The university's degree requirements support
`degreeLevel: bachelor` for both programs.
[Manara's 2026–2027 program list](https://manara.edu.sy/index.phpnruar/arch/eng/arch/index.php?act=424&cat_id=424&dir=items&ex=2&lang=1&page=show&ser=1)

| Candidate | Ministry evidence | Catalogue rows | Proposed offering |
| --- | --- | ---: | --- |
| Informatics Engineering (`الهندسة المعلوماتية`) | 7 p13 r12 | 45 | One offering. Five rows use the scientific spelling and 40 use the vocational spelling. [University degree requirements](https://www.manara.edu.sy/eng/index.php?act=930index.php%3F&cat_id=930&dir=items&ex=2&lang=1&page=show&ser=51) |
| Architecture (`الهندسة المعمارية`) | 7 p18 r7 | 5 | One admissions offering. The faculty lists Architectural Design and Urban Planning as degree specializations under Architecture. [Faculty of Architecture](https://manara.edu.sy/arch/index.php?cat_id=255&dir=items&ex=2&lang=1&page=show&service=62) |

## Technical institute offerings

Announcement 6 names the Technical Institute of Business Administration and
Marketing (`المعهد التقاني لإدارة الأعمال والتسويق`) and lists each host
university and city for 2026–2027. Each location appears in four
university-named rows and ten city-grouped rows in the catalogues. Match
the city-grouped rows by the full institute name and city. The Ministry
table verifies general and parallel admissions for each location.
[Ministry table](https://mohe.gov.sy/img/uploads1/news_pdf_20260930160315_651_0.pdf#page=20)

| University ID | City | Ministry evidence | Catalogue rows |
| --- | --- | --- | ---: |
| `sy-damascus-university` | Damascus | 6 p20 r8 | 14 |
| `sy-university-of-aleppo` | Aleppo | 6 p20 r9 | 14 |
| `sy-latakia-university` | Latakia | 6 p20 r10 | 14 |

### Damascus

The institute page reproduced by FindGlocal lists a technical diploma
in Business Administration (`دبلوم تقاني في إدارة الأعمال`). Its four
tracks agree with the older Damascus institute profile.
[Institute page mirror](https://www.findglocal.com/SY/Unknown/183084771761938/%D8%A7%D9%84%D9%85%D8%B9%D9%87%D8%AF-%D8%A7%D9%84%D8%AA%D9%82%D8%A7%D9%86%D9%8A-%D9%84%D8%A7%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D8%A7%D8%B9%D9%85%D8%A7%D9%84-%D9%88%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%8A%D9%82-%D9%81%D9%8A-%D8%AF%D9%85%D8%B4%D9%82) ·
[Damascus institute profile](https://al-raaei.com/en/node/720)

| Arabic track | English display name |
| --- | --- |
| إدارة الأعمال | Business Administration |
| التسويق والمبيعات | Marketing and Sales |
| العلاقات العامة | Public Relations |
| إدارة المؤتمرات والمعارض | Conference and Exhibition Management |

The Ministry publishes general and parallel routes for the institute as
a whole. Each track is stored with `degreeLevel: diploma` and a null
`admissions` field pending track-specific route evidence.

### Aleppo and Latakia

The Ministry rows establish the institute names, cities and host
universities. Aleppo's Education Directorate corroborates the local
institute listing. Neither source gives a campus-specific award title
or track list. Hold both campus program imports pending a university
study plan, award listing, or equivalent campus-specific source.
[Aleppo Education Directorate](https://t.me/s/aleppoedu/2349) ·
[Ministry table](https://mohe.gov.sy/img/uploads1/news_pdf_20260930160315_651_0.pdf#page=20)

## Import decision

The preview links the two Manara programs to disciplines. Architecture
uses ISCED-F 0731. Informatics Engineering uses 0613 based on the software
and systems emphasis of the university's study plan. The Damascus tracks
use localized names and degree levels. Their discipline mapping remains
open, so they appear on the university profile and in program text search.
[ISCED-F detailed descriptions](https://www.uis.unesco.org/sites/default/files/medias/fichiers/2025/04/international-standard-classification-of-education-fields-of-education-and-training-2013-detailed-field-descriptions-2015-en.pdf) ·
[Manara Informatics Engineering curriculum](https://www.manara.edu.sy/eng/index.php?cat_id=1111index.php%3F&dir=items&ex=2&lang=1&page=show&service=52) ·
[Import manifest](../../imports/manifests/mohe-university-admissions-named-programs-2026-2027-2026-11-12.json) ·
[Source decisions](../SOURCE_DECISIONS.md)
