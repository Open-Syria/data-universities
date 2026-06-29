import path from 'node:path';
import {
  assetRecordSchema,
  facultyRecordSchema,
  parseJsonArray,
  programRecordSchema,
  rankingRecordSchema,
  readJson,
  sourceRecordSchema,
  universityRecordSchema,
} from './lib/data-schemas.mjs';

const root = process.cwd();
const expectedCanonicalUniversityCount = 57;

function getDataDirectory() {
  const dataDirArg = process.argv.find((arg) => arg.startsWith('--data-dir='));
  const dataDirIndex = process.argv.indexOf('--data-dir');

  if (!dataDirArg && dataDirIndex !== -1 && process.argv[dataDirIndex + 1] === undefined) {
    throw new Error('--data-dir requires a directory path');
  }

  const dataDirValue =
    dataDirArg?.slice('--data-dir='.length) ??
    (dataDirIndex === -1 ? undefined : process.argv[dataDirIndex + 1]);

  if (dataDirValue === '' || dataDirValue?.startsWith('--')) {
    throw new Error('--data-dir requires a directory path');
  }

  return path.resolve(root, dataDirValue ?? 'data');
}

async function loadData(dataDirectory) {
  return {
    assets: parseJsonArray(
      assetRecordSchema,
      await readJson(path.join(dataDirectory, 'assets.json')),
      'assets',
    ),
    faculties: parseJsonArray(
      facultyRecordSchema,
      await readJson(path.join(dataDirectory, 'faculties.json')),
      'faculties',
    ),
    programs: parseJsonArray(
      programRecordSchema,
      await readJson(path.join(dataDirectory, 'programs.json')),
      'programs',
    ),
    rankings: parseJsonArray(
      rankingRecordSchema,
      await readJson(path.join(dataDirectory, 'rankings.json')),
      'rankings',
    ),
    sources: parseJsonArray(
      sourceRecordSchema,
      await readJson(path.join(dataDirectory, 'sources.json')),
      'sources',
    ),
    universities: parseJsonArray(
      universityRecordSchema,
      await readJson(path.join(dataDirectory, 'universities.json')),
      'universities',
    ),
  };
}

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function hasCentroid(record) {
  return (
    Number.isFinite(record.location?.centroid?.latitude) &&
    Number.isFinite(record.location?.centroid?.longitude)
  );
}

function ids(records) {
  return records.map((record) => record.id).sort((first, second) => first.localeCompare(second));
}

function missingSummary(records) {
  return {
    missingCount: records.length,
    missingIds: ids(records),
  };
}

function recordSummary(records) {
  return {
    recordCount: records.length,
    recordIds: ids(records),
  };
}

function coverageSummary(universities, coveredIds) {
  const missing = universities.filter((university) => !coveredIds.has(university.id));

  return {
    coveredCount: universities.length - missing.length,
    missingCount: missing.length,
    missingIds: ids(missing),
  };
}

function requiredFieldCheck(id, label, records) {
  return {
    id,
    label,
    ok: records.length === 0,
    ...missingSummary(records),
  };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findLocationWarnings(universities) {
  const governorates = [
    ...new Set(
      universities.map((university) => university.location?.governorate?.en).filter(hasText),
    ),
  ];

  return universities
    .map((university) => {
      const governorate = university.location?.governorate?.en;
      const locality = university.location?.locality?.en;
      const reasons = [];

      if (hasText(locality) && /\bGovernorate\b/i.test(locality)) {
        reasons.push('locality includes governorate wording');
      }

      if (hasText(governorate) && hasText(locality)) {
        const mentionedGovernorates = governorates.filter((candidate) =>
          new RegExp(`\\b${escapeRegExp(candidate)}(?: Governorate)?\\b`, 'i').test(locality),
        );
        const conflictingGovernorate = mentionedGovernorates.find(
          (candidate) => candidate !== governorate,
        );

        if (conflictingGovernorate) {
          reasons.push(`locality mentions ${conflictingGovernorate}`);
        }
      }

      if (reasons.length === 0) {
        return null;
      }

      return {
        id: university.id,
        name: university.name.en,
        governorate,
        locality,
        reasons,
      };
    })
    .filter(Boolean);
}

const dataDirectory = getDataDirectory();
const data = await loadData(dataDirectory);

const assetUniversityIds = new Set(data.assets.map((asset) => asset.universityId));
const approvedSourceIds = new Set(
  data.sources.filter((source) => source.status === 'approved').map((source) => source.id),
);
const rankingUniversityIds = new Set(data.rankings.map((ranking) => ranking.universityId));

const requiredChecks = [
  {
    id: 'canonicalUniversityCount',
    label: 'Canonical university count matches the approved production boundary.',
    ok: data.universities.length === expectedCanonicalUniversityCount,
    expected: expectedCanonicalUniversityCount,
    actual: data.universities.length,
  },
  requiredFieldCheck(
    'englishName',
    'Every university has an English canonical name.',
    data.universities.filter((university) => !hasText(university.name.en)),
  ),
  requiredFieldCheck(
    'arabicName',
    'Every university has an Arabic canonical name.',
    data.universities.filter((university) => !hasText(university.name.ar)),
  ),
  requiredFieldCheck(
    'governorate',
    'Every university has a public governorate value.',
    data.universities.filter((university) => !hasText(university.location?.governorate?.en)),
  ),
  requiredFieldCheck(
    'locality',
    'Every university has a public locality value.',
    data.universities.filter((university) => !hasText(university.location?.locality?.en)),
  ),
  requiredFieldCheck(
    'sourceIds',
    'Every university has at least one approved source reference.',
    data.universities.filter(
      (university) =>
        university.sourceIds.length === 0 ||
        university.sourceIds.some((sourceId) => !approvedSourceIds.has(sourceId)),
    ),
  ),
];

const blockers = requiredChecks.filter((check) => !check.ok);
const missingWebsiteRecords = data.universities.filter((university) => !university.website);
const missingWikidataRecords = data.universities.filter(
  (university) => !university.externalIds.wikidata,
);
const missingCentroidRecords = data.universities.filter((university) => !hasCentroid(university));
const unknownOperationalStatusRecords = data.universities.filter(
  (university) => university.operationalStatus === 'unknown',
);
const locationWarnings = findLocationWarnings(data.universities);

const report = {
  ok: blockers.length === 0,
  dataDirectory: path.relative(root, dataDirectory).replaceAll('\\', '/'),
  hardRequirements: {
    blockers,
    checks: requiredChecks,
  },
  productionCoverageTargets: {
    websites: {
      status: 'optional-null-allowed',
      ...missingSummary(missingWebsiteRecords),
    },
    sourceBackedCentroids: {
      status: 'optional-source-backed-enrichment',
      ...missingSummary(missingCentroidRecords),
    },
    wikidataIds: {
      status: 'optional-source-backed-enrichment',
      ...missingSummary(missingWikidataRecords),
    },
    approvedImageAssets: {
      status: 'coverage-target-needs-license-review-and-cdn-upload',
      ...coverageSummary(data.universities, assetUniversityIds),
    },
    rankingSnapshots: {
      status: 'coverage-target-needs-approved-ranking-source',
      ...coverageSummary(data.universities, rankingUniversityIds),
    },
  },
  reviewWarnings: {
    unknownOperationalStatus: recordSummary(unknownOperationalStatusRecords),
    locationValuesNeedingNormalization: {
      count: locationWarnings.length,
      records: locationWarnings,
    },
  },
};

console.log(JSON.stringify(report, null, 2));

if (!report.ok) {
  process.exitCode = 1;
}
