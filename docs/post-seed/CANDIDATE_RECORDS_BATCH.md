# Candidate Records Batch

This batch tracks public-source candidate records that were held out of `v0.1.0`
because they were outside the current approved scope.

The local maintainer review artifact reported:

- 57 seed records exported to `data/universities.json`,
- 30 held-for-review candidate records before the first candidate batch,
- 21 held candidates present only in the Wikipedia list artifact,
- 8 held candidates present only in the Wikidata artifact,
- 1 held candidate present in both Wikipedia and Wikidata artifacts.

`v0.1.11` restores the production boundary to the original 57 approved seed records. The 27 out-of-scope records that were briefly added through
post-seed batches are held again. Two duplicate/enrichment candidates remain
merged into existing approved seed records because they do not create new
canonical institutions.

The comparison artifact is not a source. Canonical additions must cite approved
public sources in `data/sources.json` and import manifests. Under the current
production rule, they must also be present in the approved production scope
list or have an explicit OpenSyria scope exception.

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
| `sy-al-shahbaa-aleppo-university` | Al-Shahbaa Aleppo University | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-homs-military-academy` | Homs Military Academy | held; outside current scope | official website | Wikipedia, Wikidata |
| `sy-al-assad-military-academy` | Al-Assad Military Academy | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-al-shahbaa-university` | Al-Shahbaa University | merged as alias/enrichment into `sy-al-shahba-university`; no new record |  | Wikidata |
| `sy-aleppo-armament-college` | Aleppo Armament College | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-aleppo-artillery-college` | Aleppo Artillery College | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-bassel-al-assad-college-of-armored-corps` | Bassel al-Assad College of Armored Corps | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-bassel-al-assad-college-of-police-sciences` | Bassel al-Assad College of Police Sciences | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-electronic-warfare-college` | Electronic Warfare College | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-free-aleppo-university` | Free Aleppo University | held; outside current scope | official website | Wikidata |
| `sy-free-syrian-university` | Free Syrian University | held; outside current scope |  | Wikidata |
| `sy-higher-military-academy-of-syria` | Higher Military Academy of Syria | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-international-suleiman-university` | International Suleiman University | held; outside current scope | official website | Wikidata |
| `sy-kuweires-military-aviation-institute` | Kuweires Military Aviation Institute | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-mesopotamian-social-sciences-academy` | Mesopotamian Social Sciences Academy | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-military-college-of-administrative-affairs` | Military College of Administrative Affairs | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-military-college-of-chemical-protection` | Military College of Chemical Protection | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-military-college-of-infantry-corps` | Military College of Infantry Corps | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-military-college-of-technical-affairs` | Military College of Technical Affairs | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-omdurman-islamic-university-damascus-branch` | Omdurman Islamic University, Damascus Branch | held; outside current scope | Arabic name | Wikipedia |
| `sy-private-university-of-science-and-arts` | Private University of Science and Arts | held; outside current scope |  | Wikidata |
| `sy-raqqa-university` | Raqqa University | held; outside current scope | Arabic name, official website | Wikidata |
| `sy-syrian-air-defense-college` | Syrian Air Defense College | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-syrian-college-of-combat-engineering-corps` | Syrian College of Combat Engineering Corps | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-syrian-college-of-signal-corps` | Syrian College of Signal Corps | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-syrian-navy-college` | Syrian Navy College | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-university-of-kobani` | University of Kobani | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-university-of-rojava` | University of Rojava | held; outside current scope | Arabic name, official website | Wikipedia |
| `sy-source-wikidata-Q114672251` |  | held with the University of Kobani candidate; no canonical target under current boundary | English name, Arabic name, official website | Wikidata |
| `sy-source-wikidata-Q28715211` |  | merged as Arabic alias/enrichment into `sy-bilad-al-sham-university-for-sharia-sciences`; no new record | English name, official website | Wikidata |

## Acceptance Criteria

Before adding a held candidate:

- confirm the institution is in the approved production scope or has an
  explicit OpenSyria scope exception,
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

Do not add mixed post-seed records directly to `data/universities.json`.
Handle future records in small thematic reviews:

- control-list additions or corrections,
- military and police institutions,
- autonomous-administration institutions,
- foreign-branch institutions,
- ambiguous duplicates or aliases,
- missing-name and missing-website cleanup.
