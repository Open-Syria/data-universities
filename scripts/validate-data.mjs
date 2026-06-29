import path from 'node:path';
import {
  assetRecordSchema,
  ensureAliasQuality,
  ensureAssetQuality,
  ensureKnownFaculties,
  ensureKnownSources,
  ensureKnownUniversities,
  ensureUnique,
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

async function loadData(dataDirectory) {
  const sources = parseJsonArray(
    sourceRecordSchema,
    await readJson(path.join(dataDirectory, 'sources.json')),
    'sources',
  );
  const universities = parseJsonArray(
    universityRecordSchema,
    await readJson(path.join(dataDirectory, 'universities.json')),
    'universities',
  );
  const assets = parseJsonArray(
    assetRecordSchema,
    await readJson(path.join(dataDirectory, 'assets.json')),
    'assets',
  );
  const faculties = parseJsonArray(
    facultyRecordSchema,
    await readJson(path.join(dataDirectory, 'faculties.json')),
    'faculties',
  );
  const programs = parseJsonArray(
    programRecordSchema,
    await readJson(path.join(dataDirectory, 'programs.json')),
    'programs',
  );
  const rankings = parseJsonArray(
    rankingRecordSchema,
    await readJson(path.join(dataDirectory, 'rankings.json')),
    'rankings',
  );

  return {
    assets,
    faculties,
    programs,
    rankings,
    sources,
    universities,
  };
}

function validateData(data) {
  ensureUnique(data.assets, (record) => record.id, 'assets');
  ensureUnique(data.faculties, (record) => record.id, 'faculties');
  ensureUnique(data.programs, (record) => record.id, 'programs');
  ensureUnique(data.rankings, (record) => record.id, 'rankings');
  ensureUnique(data.sources, (source) => source.id, 'sources');
  ensureUnique(data.universities, (record) => record.id, 'universities');
  ensureKnownSources(data.assets, data.sources, 'asset');
  ensureKnownSources(data.faculties, data.sources, 'faculty');
  ensureKnownSources(data.programs, data.sources, 'program');
  ensureKnownSources(data.rankings, data.sources, 'ranking');
  ensureKnownSources(data.universities, data.sources, 'university');
  ensureKnownUniversities(data.assets, data.universities, 'asset');
  ensureKnownUniversities(data.faculties, data.universities, 'faculty');
  ensureKnownUniversities(data.programs, data.universities, 'program');
  ensureKnownUniversities(data.rankings, data.universities, 'ranking');
  ensureKnownFaculties(data.programs, data.faculties, 'program');
  ensureAssetQuality(data.assets, 'asset');
  ensureAliasQuality(data.faculties, 'faculty');
  ensureAliasQuality(data.programs, 'program');
  ensureAliasQuality(data.universities, 'university');
}

const dataDirectory = getDataDirectory();
const data = await loadData(dataDirectory);

validateData(data);

console.log(
  JSON.stringify(
    {
      ok: true,
      dataDirectory: path.relative(root, dataDirectory).replaceAll('\\', '/'),
      counts: {
        assets: data.assets.length,
        faculties: data.faculties.length,
        programs: data.programs.length,
        rankings: data.rankings.length,
        sources: data.sources.length,
        universities: data.universities.length,
      },
    },
    null,
    2,
  ),
);
