# 2026–2027 fields of study

`data/disciplines.json` lists 148 fields of study. Each Ministry program
label in the 2026–2027 admissions announcements maps to exactly one of them.
The 30 fields from the named program review keep their IDs. This batch
adds 118 more. A field records what people study. It does not claim that a
university offers it. Offerings in `data/programs.json` still need their own
award and campus evidence.

[Import manifest](../../imports/manifests/mohe-university-admissions-fields-of-study-2026-2027-2026-11-13.json) ·
[Ministry admissions notice](https://mohe.gov.sy/ar/media-center/details/651) ·
[UNESCO ISCED-F detailed field descriptions](https://uis.unesco.org/sites/default/files/documents/international-standard-classification-of-education-fields-of-education-and-training-2013-detailed-field-descriptions-2015-en.pdf)

## Method

1. Read the 10,494 choices in the 24 pinned admissions catalogues of
   `Open-Syria/website` (commit `0754506`). Fold Arabic spelling variants
   and drop applicant quotas, campus suffixes, ordinals and gender notes.
   This gives 744 distinct labels.
2. Assign each label with the ordered rules in
   [`scripts/curation/fields-of-study-rules.mjs`](../../scripts/curation/fields-of-study-rules.mjs).
   A faculty label is decided by its specialization, for example
   `الدراسات الإسلامية والعربية - اللغة العربية` → Arabic Language and
   Literature. Institute and applied-college labels keep their prefix.
   Where a verified offering already names a field, that field wins.
3. Give each new field an English name, an ISCED-F 2013 detailed code, one
   Ministry row reference and the UNESCO reference.
4. Add Ministry spellings as aliases only when the alias maps back to the
   same field on its own. Drop any alias that two fields share.
5. Assign the 152 verified offerings that had no field. The award name
   decides, read in its institute or applied-college context, before the
   shared Ministry row.

Rebuild with:

```sh
node scripts/curation/build-fields-of-study.mjs "../website/src/app/[locale]/admissions/_data/2026-2027" . --write
pnpm exec biome check --write data
```

A rerun on the committed data changes nothing. To review rule changes,
run it without `--write` and read the report it prints.

## Decisions

- **Technician fields stay separate** where the qualification differs from
  the degree. Examples: Pharmacy Technology and Pharmacy, Veterinary
  Technology and Veterinary Medicine, Electrical Technology and Electrical
  Engineering, Agricultural Technology and Agricultural Engineering. Job
  links can then tell a pharmacist from a pharmacy technician.
- **Excluded labels (15):** military college programs, security sciences,
  the security university's cybersecurity tracks, the medical preparatory
  year (an entry route) and the bare `العلوم الصحية` faculty label. This
  follows the data-safety checklist. Cybersecurity is still a field,
  sourced from a civilian private-university track.
- **Faculty-only labels** such as `الإدارة والاقتصاد` map to the field the
  faculty is named for (Economics). `العلوم الإدارية` maps to Business
  Administration, as in the named review.
- **Informatics tracks** stay under Informatics Engineering, as in the
  named review (Homs Software, and Networks and Computer Systems). Artificial
  intelligence tracks get their own field.

## Counts

| Field group | Fields |
| --- | ---: |
| Engineering | 43 |
| Health | 23 |
| Business | 11 |
| Education | 11 |
| Languages | 9 |
| Religion | 9 |
| Humanities | 8 |
| Science | 8 |
| Agriculture | 7 |
| Arts | 6 |
| Technology | 6 |
| Media | 3 |
| Law | 2 |
| Tourism | 2 |
