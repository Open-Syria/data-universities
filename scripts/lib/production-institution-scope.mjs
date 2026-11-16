// Public identity scope approved for the university catalogue and the
// standalone 2026–2027 technical-institute intake review.
const existingInstitutionCount = 57;
const standaloneTechnicalInstituteIds = new Set([
  'sy-oil-and-gas-technical-institute-baniyas',
  'sy-oil-and-gas-technical-institute-deir-ez-zor',
  'sy-oil-and-gas-technical-institute-homs',
  'sy-oil-and-gas-technical-institute-rmelan',
  'sy-syrian-railways-technical-institute-aleppo',
  'sy-technical-institute-of-applied-arts-damascus',
  'sy-technical-institute-of-applied-industries-aleppo',
  'sy-technical-institute-of-applied-industries-damascus',
  'sy-technical-institute-of-applied-industries-homs',
  'sy-technical-institute-of-chemical-industries-damascus',
  'sy-technical-institute-of-social-work-damascus',
]);

export function productionInstitutionScope(universities) {
  const existing = universities.filter(({ id }) => !standaloneTechnicalInstituteIds.has(id));
  const standalone = universities.filter(({ id }) => standaloneTechnicalInstituteIds.has(id));
  const technicallyClassified = new Set(
    standalone.filter(({ institutionType }) => institutionType === 'technical').map(({ id }) => id),
  );

  return {
    expectedCount: existingInstitutionCount + standaloneTechnicalInstituteIds.size,
    matches:
      existing.length === existingInstitutionCount &&
      standalone.length === standaloneTechnicalInstituteIds.size &&
      technicallyClassified.size === standaloneTechnicalInstituteIds.size,
    logoRequired: existing,
  };
}
