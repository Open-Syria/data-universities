# Candidate Records Batch

This batch tracks public-source candidate records that were held out of `v0.1.0`.

The local maintainer review artifact reported:

- 57 seed records exported to `data/universities.json`,
- 30 held-for-review candidate records before the first candidate batch,
- 21 held candidates present only in the Wikipedia list artifact,
- 8 held candidates present only in the Wikidata artifact,
- 1 held candidate present in both Wikipedia and Wikidata artifacts.

`v0.1.3` releases one accepted candidate record. `v0.1.4` releases three autonomous-administration candidates. `v0.1.6` releases 16 military and police candidates. `v0.1.7` releases one foreign-branch candidate, leaving 9 held candidates for later review.

`sy-homs-military-academy` remains held because the local Wikipedia and Wikidata artifacts disagree on the founded year.

The comparison artifact is not a source. Canonical additions must cite approved public sources in `data/sources.json` and import manifests.

## Review Groups

- military, police, and defense colleges,
- autonomous-administration universities,
- foreign-branch records,
- alternate or duplicate university names,
- records missing English or Arabic names,
- records missing official websites.

## Held Candidates

| Candidate | Name | Status | Missing | Public Signals |
| --- | --- | --- | --- | --- |
| `sy-al-shahbaa-aleppo-university` | Al-Shahbaa Aleppo University | released in v0.1.3 | Arabic name, official website | Wikipedia |
| `sy-homs-military-academy` | Homs Military Academy | needs review | official website | Wikipedia, Wikidata |
| `sy-al-assad-military-academy` | Al-Assad Military Academy | released in v0.1.6 | Arabic name, official website | Wikipedia |
| `sy-al-shahbaa-university` | Al-Shahbaa University | pending review |  | Wikidata |
| `sy-aleppo-armament-college` | Aleppo Armament College | released in v0.1.6 | Arabic name, official website | Wikipedia |
| `sy-aleppo-artillery-college` | Aleppo Artillery College | released in v0.1.6 | Arabic name, official website | Wikipedia |
| `sy-bassel-al-assad-college-of-armored-corps` | Bassel al-Assad College of Armored Corps | released in v0.1.6 | Arabic name, official website | Wikipedia |
| `sy-bassel-al-assad-college-of-police-sciences` | Bassel al-Assad College of Police Sciences | released in v0.1.6 | Arabic name, official website | Wikipedia |
| `sy-electronic-warfare-college` | Electronic Warfare College | released in v0.1.6 | Arabic name, official website | Wikipedia |
| `sy-free-aleppo-university` | Free Aleppo University | pending review | official website | Wikidata |
| `sy-free-syrian-university` | Free Syrian University | pending review |  | Wikidata |
| `sy-higher-military-academy-of-syria` | Higher Military Academy of Syria | released in v0.1.6 | Arabic name, official website | Wikipedia |
| `sy-international-suleiman-university` | International Suleiman University | pending review | official website | Wikidata |
| `sy-kuweires-military-aviation-institute` | Kuweires Military Aviation Institute | released in v0.1.6 | Arabic name, official website | Wikipedia |
| `sy-mesopotamian-social-sciences-academy` | Mesopotamian Social Sciences Academy | released in v0.1.4 | Arabic name, official website | Wikipedia |
| `sy-military-college-of-administrative-affairs` | Military College of Administrative Affairs | released in v0.1.6 | Arabic name, official website | Wikipedia |
| `sy-military-college-of-chemical-protection` | Military College of Chemical Protection | released in v0.1.6 | Arabic name, official website | Wikipedia |
| `sy-military-college-of-infantry-corps` | Military College of Infantry Corps | released in v0.1.6 | Arabic name, official website | Wikipedia |
| `sy-military-college-of-technical-affairs` | Military College of Technical Affairs | released in v0.1.6 | Arabic name, official website | Wikipedia |
| `sy-omdurman-islamic-university-damascus-branch` | Omdurman Islamic University, Damascus Branch | released in v0.1.7 | Arabic name | Wikipedia |
| `sy-private-university-of-science-and-arts` | Private University of Science and Arts | pending review |  | Wikidata |
| `sy-raqqa-university` | Raqqa University | pending review | Arabic name, official website | Wikidata |
| `sy-syrian-air-defense-college` | Syrian Air Defense College | released in v0.1.6 | Arabic name, official website | Wikipedia |
| `sy-syrian-college-of-combat-engineering-corps` | Syrian College of Combat Engineering Corps | released in v0.1.6 | Arabic name, official website | Wikipedia |
| `sy-syrian-college-of-signal-corps` | Syrian College of Signal Corps | released in v0.1.6 | Arabic name, official website | Wikipedia |
| `sy-syrian-navy-college` | Syrian Navy College | released in v0.1.6 | Arabic name, official website | Wikipedia |
| `sy-university-of-kobani` | University of Kobani | released in v0.1.4 | Arabic name, official website | Wikipedia |
| `sy-university-of-rojava` | University of Rojava | released in v0.1.4 | Arabic name, official website | Wikipedia |
| `sy-source-wikidata-Q114672251` |  | pending review | English name, Arabic name, official website | Wikidata |
| `sy-source-wikidata-Q28715211` |  | pending review | English name, official website | Wikidata |

## Acceptance Criteria

Before adding a held candidate:

- confirm the institution is in scope for the dataset,
- confirm the record is not an alias or duplicate of an existing seed record,
- choose a stable `sy-...` ID,
- confirm English names from approved public sources,
- add Arabic names only when an approved public source provides them,
- include an official website when one can be confirmed,
- include location fields only when source-backed,
- update `data/sources.json` and `imports/manifests/` when a new source is used,
- run `pnpm run validate` and `pnpm run report:data`.

## Release Strategy

Add records in small thematic releases, not one mixed batch:

- military and police institutions,
- autonomous-administration institutions,
- foreign-branch institutions,
- ambiguous duplicates or aliases,
- missing-name and missing-website cleanup.
