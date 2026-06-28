import path from 'node:path';
import {
  ensureAliasQuality,
  ensureKnownSources,
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

  return {
    sources,
    universities,
  };
}

function validateData(data) {
  ensureUnique(data.sources, (source) => source.id, 'sources');
  ensureUnique(data.universities, (record) => record.id, 'universities');
  ensureKnownSources(data.universities, data.sources, 'university');
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
        sources: data.sources.length,
        universities: data.universities.length,
      },
    },
    null,
    2,
  ),
);
