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

function countBy(records, getKey) {
  return Object.fromEntries(
    [
      ...records.reduce((counts, record) => {
        const key = getKey(record);

        counts.set(key, (counts.get(key) ?? 0) + 1);

        return counts;
      }, new Map()),
    ].sort(([first], [second]) => first.localeCompare(second)),
  );
}

async function loadData(dataDirectory) {
  return {
    sources: parseJsonArray(
      sourceRecordSchema,
      await readJson(path.join(dataDirectory, 'sources.json')),
      'sources',
    ),
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
    universities: parseJsonArray(
      universityRecordSchema,
      await readJson(path.join(dataDirectory, 'universities.json')),
      'universities',
    ),
  };
}

function summarizeUniversities(universities) {
  return {
    count: universities.length,
    byInstitutionType: countBy(universities, (record) => record.institutionType),
    byOperationalStatus: countBy(universities, (record) => record.operationalStatus),
    bySourceStatus: countBy(universities, (record) => record.sourceStatus),
    withArabicName: universities.filter((record) => Boolean(record.name.ar)).length,
    withWebsite: universities.filter((record) => Boolean(record.website)).length,
    withLocation: universities.filter((record) => Boolean(record.location)).length,
  };
}

function summarizeAssets(assets) {
  return {
    count: assets.length,
    byAssetType: countBy(assets, (record) => record.assetType),
    byAssetRole: countBy(assets, (record) => record.assetRole),
    bySourceStatus: countBy(assets, (record) => record.sourceStatus),
    variants: assets.reduce((count, asset) => count + asset.variants.length, 0),
    attributionRequired: assets.filter((asset) => asset.attribution.attributionRequired).length,
  };
}

function summarizeFaculties(faculties) {
  return {
    count: faculties.length,
    byFacultyType: countBy(faculties, (record) => record.facultyType),
    byOperationalStatus: countBy(faculties, (record) => record.operationalStatus),
    bySourceStatus: countBy(faculties, (record) => record.sourceStatus),
    withWebsite: faculties.filter((record) => Boolean(record.website)).length,
  };
}

function summarizePrograms(programs) {
  return {
    count: programs.length,
    byProgramType: countBy(programs, (record) => record.programType),
    byDegreeLevel: countBy(programs, (record) => record.degreeLevel),
    byOperationalStatus: countBy(programs, (record) => record.operationalStatus),
    bySourceStatus: countBy(programs, (record) => record.sourceStatus),
    linkedToFaculty: programs.filter((record) => Boolean(record.facultyId)).length,
    withWebsite: programs.filter((record) => Boolean(record.website)).length,
  };
}

function summarizeRankings(rankings) {
  return {
    count: rankings.length,
    byRankingSystem: countBy(rankings, (record) => record.rankingSystem),
    byRankScope: countBy(rankings, (record) => record.rankScope),
    byYear: countBy(rankings, (record) => String(record.year)),
    bySourceStatus: countBy(rankings, (record) => record.sourceStatus),
    withNumericRank: rankings.filter((record) => record.rank !== null).length,
  };
}

const dataDirectory = getDataDirectory();
const data = await loadData(dataDirectory);

console.log(
  JSON.stringify(
    {
      ok: true,
      dataDirectory: path.relative(root, dataDirectory).replaceAll('\\', '/'),
      sources: {
        count: data.sources.length,
        byStatus: countBy(data.sources, (source) => source.status),
        byLicense: countBy(data.sources, (source) => source.license),
      },
      assets: summarizeAssets(data.assets),
      faculties: summarizeFaculties(data.faculties),
      programs: summarizePrograms(data.programs),
      rankings: summarizeRankings(data.rankings),
      universities: summarizeUniversities(data.universities),
    },
    null,
    2,
  ),
);
