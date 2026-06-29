import path from 'node:path';
import {
  assetRecordSchema,
  ensureAliasQuality,
  ensureAssetQuality,
  ensureKnownSources,
  ensureKnownUniversities,
  ensureUnique,
  parseJsonArray,
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

  return {
    assets,
    sources,
    universities,
  };
}

function validateData(data) {
  ensureUnique(data.assets, (record) => record.id, 'assets');
  ensureUnique(data.sources, (source) => source.id, 'sources');
  ensureUnique(data.universities, (record) => record.id, 'universities');
  ensureKnownSources(data.assets, data.sources, 'asset');
  ensureKnownSources(data.universities, data.sources, 'university');
  ensureKnownUniversities(data.assets, data.universities, 'asset');
  ensureAssetQuality(data.assets, 'asset');
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
        sources: data.sources.length,
        universities: data.universities.length,
      },
    },
    null,
    2,
  ),
);
