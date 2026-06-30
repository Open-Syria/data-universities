import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  assetRecordSchema,
  datasetReleaseStatusSchema,
  facultyRecordSchema,
  parseJsonArray,
  programRecordSchema,
  rankingRecordSchema,
  readJson,
  releaseManifestSchema,
  sourceRecordSchema,
  universityRecordSchema,
} from './lib/data-schemas.mjs';

const root = process.cwd();
const dataDirectory = path.resolve(root, getCliOption('--data-dir') ?? 'data');
const releaseDirectory = path.resolve(root, getCliOption('--release-dir') ?? 'dist/release');
const packageJson = await readJson(path.join(root, 'package.json'));
const releaseVersion = process.env.RELEASE_VERSION ?? `v${packageJson.version}`;
const releaseStatus = datasetReleaseStatusSchema.parse(process.env.RELEASE_STATUS ?? 'seed');
const releasePublishedAt = process.env.RELEASE_PUBLISHED_AT ?? null;
const assetBaseUrl = process.env.RELEASE_ASSET_BASE_URL;

const datasetConfigs = [
  {
    name: 'universities',
    tableName: 'universities',
    fileName: 'universities.json',
    schema: universityRecordSchema,
    toPublicRecord: toUniversityPublicRecord,
    toFlatRow: toUniversityFlatRow,
    columns: [
      'id',
      'name_en',
      'name_ar',
      'aliases_json',
      'institution_type',
      'operational_status',
      'founded_year',
      'website',
      'governorate_en',
      'governorate_ar',
      'locality_en',
      'locality_ar',
      'address_en',
      'address_ar',
      'centroid_latitude',
      'centroid_longitude',
      'wikidata_id',
      'external_website',
      'ministry_id',
      'source_ids_json',
      'source_status',
    ],
  },
  {
    name: 'assets',
    tableName: 'university_assets',
    fileName: 'assets.json',
    schema: assetRecordSchema,
    toPublicRecord: toAssetPublicRecord,
    toFlatRow: toAssetFlatRow,
    columns: [
      'id',
      'university_id',
      'asset_type',
      'asset_role',
      'title_en',
      'title_ar',
      'variants_json',
      'source_provider',
      'source_title',
      'source_url',
      'creator',
      'credit',
      'license',
      'license_url',
      'attribution_required',
      'source_ids_json',
      'source_status',
    ],
  },
  {
    name: 'faculties',
    tableName: 'university_faculties',
    fileName: 'faculties.json',
    schema: facultyRecordSchema,
    toPublicRecord: toFacultyPublicRecord,
    toFlatRow: toFacultyFlatRow,
    columns: [
      'id',
      'university_id',
      'name_en',
      'name_ar',
      'aliases_json',
      'faculty_type',
      'operational_status',
      'website',
      'source_ids_json',
      'source_status',
    ],
  },
  {
    name: 'programs',
    tableName: 'university_programs',
    fileName: 'programs.json',
    schema: programRecordSchema,
    toPublicRecord: toProgramPublicRecord,
    toFlatRow: toProgramFlatRow,
    columns: [
      'id',
      'university_id',
      'faculty_id',
      'name_en',
      'name_ar',
      'aliases_json',
      'program_type',
      'degree_level',
      'operational_status',
      'website',
      'source_ids_json',
      'source_status',
    ],
  },
  {
    name: 'rankings',
    tableName: 'university_rankings',
    fileName: 'rankings.json',
    schema: rankingRecordSchema,
    toPublicRecord: toRankingPublicRecord,
    toFlatRow: toRankingFlatRow,
    columns: [
      'id',
      'university_id',
      'ranking_system',
      'rank_scope',
      'year',
      'rank',
      'rank_display',
      'source_url',
      'retrieved_at',
      'source_ids_json',
      'source_status',
    ],
  },
];

const artifactFormats = [
  {
    extension: 'json',
    format: 'json',
    mediaType: 'application/json',
    serialize: ({ records }) => stringifyJson({ items: records }),
  },
  {
    extension: 'ndjson',
    format: 'ndjson',
    mediaType: 'application/x-ndjson',
    serialize: ({ records }) => records.map((record) => stringifyCompactJson(record)).join('\n'),
  },
  {
    extension: 'csv',
    format: 'csv',
    mediaType: 'text/csv',
    serialize: ({ columns, rows }) => serializeCsv(columns, rows),
  },
  {
    extension: 'sql',
    format: 'sql',
    mediaType: 'application/sql',
    serialize: ({ columns, rows, tableName }) => serializeSql(tableName, columns, rows),
  },
  {
    extension: 'yaml',
    format: 'yaml',
    mediaType: 'application/yaml',
    serialize: ({ records }) => serializeYaml({ items: records }),
  },
  {
    extension: 'xml',
    format: 'xml',
    mediaType: 'application/xml',
    serialize: ({ name, records }) => serializeXml(name, records),
  },
];

function getCliOption(name) {
  const equalArg = process.argv.find((arg) => arg.startsWith(`${name}=`));
  const optionIndex = process.argv.indexOf(name);

  if (!equalArg && optionIndex !== -1 && process.argv[optionIndex + 1] === undefined) {
    throw new Error(`${name} requires a value`);
  }

  const value =
    equalArg?.slice(`${name}=`.length) ??
    (optionIndex === -1 ? undefined : process.argv[optionIndex + 1]);

  if (value === '' || value?.startsWith('--')) {
    throw new Error(`${name} requires a value`);
  }

  return value;
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function getArtifactUrl(relativePath) {
  if (!assetBaseUrl) {
    return undefined;
  }

  return `${assetBaseUrl.replace(/\/$/, '')}/${path.posix.basename(relativePath)}`;
}

function escapeNonAscii(value) {
  return value.replace(
    /[\u007f-\uffff]/g,
    (character) => `\\u${character.charCodeAt(0).toString(16).padStart(4, '0')}`,
  );
}

function stringifyJson(data) {
  return escapeNonAscii(JSON.stringify(data, null, 2));
}

function stringifyCompactJson(data) {
  return escapeNonAscii(JSON.stringify(data));
}

function toUniversityPublicRecord(record) {
  return removeUndefined({
    id: record.id,
    name: record.name,
    aliases: record.aliases,
    institutionType: record.institutionType,
    operationalStatus: record.operationalStatus,
    foundedYear: record.foundedYear,
    website: record.website,
    location: record.location,
    externalIds: record.externalIds,
    sourceIds: record.sourceIds,
    sourceStatus: record.sourceStatus,
    notes: record.notes,
  });
}

function removeUndefined(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined),
  );
}

function toUniversityFlatRow(record) {
  return {
    id: record.id,
    name_en: record.name.en,
    name_ar: record.name.ar ?? null,
    aliases_json: stringifyCompactJson(record.aliases),
    institution_type: record.institutionType,
    operational_status: record.operationalStatus,
    founded_year: record.foundedYear,
    website: record.website,
    governorate_en: record.location?.governorate?.en ?? null,
    governorate_ar: record.location?.governorate?.ar ?? null,
    locality_en: record.location?.locality?.en ?? null,
    locality_ar: record.location?.locality?.ar ?? null,
    address_en: record.location?.address?.en ?? null,
    address_ar: record.location?.address?.ar ?? null,
    centroid_latitude: record.location?.centroid?.latitude ?? null,
    centroid_longitude: record.location?.centroid?.longitude ?? null,
    wikidata_id: record.externalIds.wikidata ?? null,
    external_website: record.externalIds.website ?? null,
    ministry_id: record.externalIds.ministryId ?? null,
    source_ids_json: stringifyCompactJson(record.sourceIds),
    source_status: record.sourceStatus,
  };
}

function toAssetPublicRecord(record) {
  return removeUndefined({
    id: record.id,
    universityId: record.universityId,
    assetType: record.assetType,
    assetRole: record.assetRole,
    title: record.title,
    variants: record.variants,
    attribution: record.attribution,
    sourceIds: record.sourceIds,
    sourceStatus: record.sourceStatus,
    notes: record.notes,
  });
}

function toAssetFlatRow(record) {
  return {
    id: record.id,
    university_id: record.universityId,
    asset_type: record.assetType,
    asset_role: record.assetRole,
    title_en: record.title.en,
    title_ar: record.title.ar ?? null,
    variants_json: stringifyCompactJson(record.variants),
    source_provider: record.attribution.sourceProvider,
    source_title: record.attribution.sourceTitle,
    source_url: record.attribution.sourceUrl,
    creator: record.attribution.creator,
    credit: record.attribution.credit ?? null,
    license: record.attribution.license,
    license_url: record.attribution.licenseUrl,
    attribution_required: record.attribution.attributionRequired,
    source_ids_json: stringifyCompactJson(record.sourceIds),
    source_status: record.sourceStatus,
  };
}

function toFacultyPublicRecord(record) {
  return removeUndefined({
    id: record.id,
    universityId: record.universityId,
    name: record.name,
    aliases: record.aliases,
    facultyType: record.facultyType,
    operationalStatus: record.operationalStatus,
    website: record.website,
    sourceIds: record.sourceIds,
    sourceStatus: record.sourceStatus,
    notes: record.notes,
  });
}

function toFacultyFlatRow(record) {
  return {
    id: record.id,
    university_id: record.universityId,
    name_en: record.name.en,
    name_ar: record.name.ar ?? null,
    aliases_json: stringifyCompactJson(record.aliases),
    faculty_type: record.facultyType,
    operational_status: record.operationalStatus,
    website: record.website,
    source_ids_json: stringifyCompactJson(record.sourceIds),
    source_status: record.sourceStatus,
  };
}

function toProgramPublicRecord(record) {
  return removeUndefined({
    id: record.id,
    universityId: record.universityId,
    facultyId: record.facultyId,
    name: record.name,
    aliases: record.aliases,
    programType: record.programType,
    degreeLevel: record.degreeLevel,
    operationalStatus: record.operationalStatus,
    website: record.website,
    sourceIds: record.sourceIds,
    sourceStatus: record.sourceStatus,
    notes: record.notes,
  });
}

function toProgramFlatRow(record) {
  return {
    id: record.id,
    university_id: record.universityId,
    faculty_id: record.facultyId,
    name_en: record.name.en,
    name_ar: record.name.ar ?? null,
    aliases_json: stringifyCompactJson(record.aliases),
    program_type: record.programType,
    degree_level: record.degreeLevel,
    operational_status: record.operationalStatus,
    website: record.website,
    source_ids_json: stringifyCompactJson(record.sourceIds),
    source_status: record.sourceStatus,
  };
}

function toRankingPublicRecord(record) {
  return removeUndefined({
    id: record.id,
    universityId: record.universityId,
    rankingSystem: record.rankingSystem,
    rankScope: record.rankScope,
    year: record.year,
    rank: record.rank,
    rankDisplay: record.rankDisplay,
    sourceUrl: record.sourceUrl,
    retrievedAt: record.retrievedAt,
    sourceIds: record.sourceIds,
    sourceStatus: record.sourceStatus,
    notes: record.notes,
  });
}

function toRankingFlatRow(record) {
  return {
    id: record.id,
    university_id: record.universityId,
    ranking_system: record.rankingSystem,
    rank_scope: record.rankScope,
    year: record.year,
    rank: record.rank,
    rank_display: record.rankDisplay,
    source_url: record.sourceUrl,
    retrieved_at: record.retrievedAt,
    source_ids_json: stringifyCompactJson(record.sourceIds),
    source_status: record.sourceStatus,
  };
}

function formatTextArtifact(content) {
  if (content.length === 0) {
    return Buffer.from('\n');
  }

  return Buffer.from(`${content}\n`);
}

async function writeArtifact(relativePath, content) {
  const buffer = formatTextArtifact(content);
  const filePath = path.join(releaseDirectory, relativePath);

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, buffer);

  return buffer;
}

async function writeJson(filePath, data) {
  const buffer = Buffer.from(`${stringifyJson(data)}\n`);

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, buffer);

  return buffer;
}

function csvEscape(value) {
  if (value === null || value === undefined) {
    return '';
  }

  const text = escapeNonAscii(String(value));

  if (/[",\r\n]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }

  return text;
}

function serializeCsv(columns, rows) {
  return [
    columns.join(','),
    ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(',')),
  ].join('\n');
}

function sqlIdentifier(value) {
  return `"${value.replaceAll('"', '""')}"`;
}

function sqlValue(value) {
  if (value === null || value === undefined) {
    return 'NULL';
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return `'${escapeNonAscii(String(value)).replaceAll("'", "''")}'`;
}

function sqlColumnType(column) {
  if (column === 'centroid_latitude' || column === 'centroid_longitude') {
    return 'REAL';
  }

  if (column === 'founded_year' || column === 'year' || column === 'rank') {
    return 'INTEGER';
  }

  return 'TEXT';
}

function serializeSql(tableName, columns, rows) {
  const createTable = [
    `CREATE TABLE IF NOT EXISTS ${sqlIdentifier(tableName)} (`,
    columns
      .map((column, index) => {
        const suffix = index === columns.length - 1 ? '' : ',';
        const primaryKey = column === 'id' ? ' PRIMARY KEY' : '';

        return `  ${sqlIdentifier(column)} ${sqlColumnType(column)}${primaryKey}${suffix}`;
      })
      .join('\n'),
    ');',
  ].join('\n');

  const inserts = rows.map((row) => {
    const identifiers = columns.map(sqlIdentifier).join(', ');
    const values = columns.map((column) => sqlValue(row[column])).join(', ');

    return `INSERT INTO ${sqlIdentifier(tableName)} (${identifiers}) VALUES (${values});`;
  });

  return [createTable, ...inserts].join('\n');
}

function yamlScalar(value) {
  if (value === null || value === undefined) {
    return 'null';
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  return escapeNonAscii(JSON.stringify(String(value)));
}

function serializeYamlValue(value, indentation = 0) {
  const indent = ' '.repeat(indentation);

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]';
    }

    return value
      .map((item) => {
        if (item && typeof item === 'object') {
          return `${indent}- ${serializeYamlValue(item, indentation + 2).trimStart()}`;
        }

        return `${indent}- ${yamlScalar(item)}`;
      })
      .join('\n');
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value);

    if (entries.length === 0) {
      return '{}';
    }

    return entries
      .map(([key, entryValue]) => {
        if (entryValue && typeof entryValue === 'object') {
          const serializedValue = serializeYamlValue(entryValue, indentation + 2);

          if (serializedValue === '[]' || serializedValue === '{}') {
            return `${indent}${key}: ${serializedValue}`;
          }

          return `${indent}${key}:\n${serializedValue}`;
        }

        return `${indent}${key}: ${yamlScalar(entryValue)}`;
      })
      .join('\n');
  }

  return yamlScalar(value);
}

function serializeYaml(value) {
  return serializeYamlValue(value);
}

function xmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
    .replace(
      /[\u007f-\uffff]/g,
      (character) => `&#x${character.charCodeAt(0).toString(16).padStart(4, '0')};`,
    );
}

function serializeXmlElement(name, value, indentation = 0) {
  const indent = ' '.repeat(indentation);

  if (value === null || value === undefined) {
    return `${indent}<${name} />`;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return `${indent}<${name} />`;
    }

    return [
      `${indent}<${name}>`,
      ...value.map((item) => serializeXmlElement('item', item, indentation + 2)),
      `${indent}</${name}>`,
    ].join('\n');
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value);

    if (entries.length === 0) {
      return `${indent}<${name} />`;
    }

    return [
      `${indent}<${name}>`,
      ...entries.map(([key, entryValue]) => serializeXmlElement(key, entryValue, indentation + 2)),
      `${indent}</${name}>`,
    ].join('\n');
  }

  return `${indent}<${name}>${xmlEscape(value)}</${name}>`;
}

function serializeXml(name, records) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<dataset name="${xmlEscape(name)}">`,
    serializeXmlElement('items', records, 2),
    '</dataset>',
  ].join('\n');
}

async function loadDataset(config) {
  return parseJsonArray(
    config.schema,
    await readJson(path.join(dataDirectory, config.fileName)),
    config.name,
  );
}

const datasetRecordsByName = new Map();

async function buildDatasetArtifacts(config) {
  const sourceRecords = await loadDataset(config);
  datasetRecordsByName.set(config.name, sourceRecords);

  const records = sourceRecords.map(config.toPublicRecord);
  const rows = records.map(config.toFlatRow);

  const artifacts = [];

  for (const artifactFormat of artifactFormats) {
    const fileName = `${config.name}.${artifactFormat.extension}`;
    const relativePath = path.posix.join('artifacts', fileName);
    const content = artifactFormat.serialize({
      name: config.name,
      tableName: config.tableName,
      columns: config.columns,
      records,
      rows,
    });
    const buffer = await writeArtifact(relativePath, content);
    const url = getArtifactUrl(relativePath);

    artifacts.push({
      name: config.name,
      format: artifactFormat.format,
      path: relativePath,
      ...(url ? { url } : {}),
      sha256: sha256(buffer),
      sizeBytes: buffer.byteLength,
      recordCount: records.length,
      mediaType: artifactFormat.mediaType,
    });
  }

  return artifacts;
}

function buildReleaseReadiness() {
  const universities = datasetRecordsByName.get('universities') ?? [];
  const assets = datasetRecordsByName.get('assets') ?? [];
  const logoAssets = assets.filter((asset) => asset.assetRole === 'logo');
  const faculties = datasetRecordsByName.get('faculties') ?? [];
  const programs = datasetRecordsByName.get('programs') ?? [];
  const rankings = datasetRecordsByName.get('rankings') ?? [];
  const universityCount = universities.length;
  const englishNameCount = universities.filter((record) => record.name.en).length;
  const arabicNameCount = universities.filter((record) => record.name.ar).length;
  const locationCount = universities.filter(
    (record) => record.location?.governorate?.en && record.location?.locality?.en,
  ).length;
  const sourcedCount = universities.filter((record) => record.sourceIds.length > 0).length;
  const websiteCount = universities.filter((record) => record.website).length;
  const centroidCount = universities.filter((record) => record.location?.centroid).length;
  const hardRequirementsPassed =
    universityCount === 57 &&
    englishNameCount === universityCount &&
    arabicNameCount === universityCount &&
    locationCount === universityCount &&
    sourcedCount === universityCount;
  const logoCoveragePassed = logoAssets.length === universityCount;
  const rankingSnapshotsAvailable = rankings.length > 0;
  const profileReady = hardRequirementsPassed && logoCoveragePassed && rankingSnapshotsAvailable;

  return {
    level: profileReady
      ? 'profile_ready'
      : hardRequirementsPassed
        ? 'public_directory_ready'
        : 'raw_seed',
    publicApi: {
      status: profileReady ? 'approved' : 'not_approved',
      minimumLevel: 'profile_ready',
      reason: profileReady
        ? 'Approved for public university profile endpoints. Nullable website, centroid, faculty, and program gaps remain source-backed enrichment work.'
        : 'Public university profile endpoints require canonical identity data, complete logo coverage, and approved ranking snapshots.',
    },
    checks: [
      {
        name: 'canonical_university_count',
        status: universityCount === 57 ? 'passed' : 'blocked',
        expected: 57,
        actual: universityCount,
      },
      {
        name: 'english_names',
        status: englishNameCount === universityCount ? 'passed' : 'blocked',
        expected: universityCount,
        actual: englishNameCount,
      },
      {
        name: 'arabic_names',
        status: arabicNameCount === universityCount ? 'passed' : 'blocked',
        expected: universityCount,
        actual: arabicNameCount,
      },
      {
        name: 'locations',
        status: locationCount === universityCount ? 'passed' : 'blocked',
        expected: universityCount,
        actual: locationCount,
      },
      {
        name: 'approved_public_sources',
        status: sourcedCount === universityCount ? 'passed' : 'blocked',
        expected: universityCount,
        actual: sourcedCount,
      },
      {
        name: 'approved_logo_assets',
        status: logoCoveragePassed ? 'passed' : 'blocked',
        expected: universityCount,
        actual: logoAssets.length,
      },
      {
        name: 'approved_ranking_snapshots',
        status: rankingSnapshotsAvailable ? 'passed' : 'blocked',
        expected: 'source-backed ranking snapshots',
        actual: rankings.length,
        notes:
          'Ranking snapshots are not expected to cover every institution; smaller institutions may not appear in public ranking providers.',
      },
      {
        name: 'official_websites',
        status: websiteCount === universityCount ? 'passed' : 'warning',
        expected: universityCount,
        actual: websiteCount,
        notes:
          'Websites are nullable because some institutions do not have an approved public website.',
      },
      {
        name: 'source_backed_centroids',
        status: centroidCount === universityCount ? 'passed' : 'warning',
        expected: universityCount,
        actual: centroidCount,
        notes: 'Centroids must stay empty until an approved public source supports them.',
      },
    ],
    domains: [
      {
        name: 'universities',
        status: 'ready',
        recordCount: universities.length,
        notes: 'Canonical identity records pass the hard seed requirements.',
      },
      {
        name: 'assets',
        status:
          logoAssets.length === universities.length
            ? 'ready'
            : logoAssets.length > 0
              ? 'partial'
              : 'empty',
        recordCount: logoAssets.length,
        notes:
          'Logo coverage is the public profile asset target. Non-logo image assets are optional and do not satisfy this gate.',
      },
      {
        name: 'faculties',
        status: faculties.length > 0 ? 'partial' : 'empty',
        recordCount: faculties.length,
        notes: 'Faculty records are schema-ready but not populated for this release.',
      },
      {
        name: 'programs',
        status: programs.length > 0 ? 'partial' : 'empty',
        recordCount: programs.length,
        notes: 'Program records are schema-ready but not populated for this release.',
      },
      {
        name: 'rankings',
        status: rankings.length > 0 ? 'partial' : 'empty',
        recordCount: rankings.length,
        notes:
          rankings.length > 0
            ? 'Ranking snapshots are available for institutions listed by approved ranking providers; missing rows are allowed when no approved ranking source lists the institution.'
            : 'Ranking snapshots are schema-ready but not populated for this release.',
      },
    ],
    blockers: [
      ...(hardRequirementsPassed ? [] : ['canonical_identity_requirements_not_met']),
      ...(logoCoveragePassed ? [] : ['approved_logo_asset_coverage_incomplete']),
      ...(rankingSnapshotsAvailable ? [] : ['ranking_snapshots_empty']),
    ],
  };
}

const sources = parseJsonArray(
  sourceRecordSchema,
  await readJson(path.join(dataDirectory, 'sources.json')),
  'sources',
);
const approvedSources = sources.filter((source) => source.status === 'approved');
const artifacts = [];

for (const config of datasetConfigs) {
  artifacts.push(...(await buildDatasetArtifacts(config)));
}

const manifest = {
  schemaVersion: '1.0',
  generatedAt: new Date().toISOString(),
  dataset: {
    id: 'opensyria-universities',
    slug: 'universities',
    repository: 'data-universities',
    category: 'education',
    title: {
      en: 'Universities',
      ar: '\u0627\u0644\u062c\u0627\u0645\u0639\u0627\u062a',
    },
  },
  release: {
    version: releaseVersion,
    status: releaseStatus,
    publishedAt: releasePublishedAt,
    notes: 'Generated university release artifacts.',
  },
  artifacts,
  sources: approvedSources.map((source) => ({
    id: source.id,
    title: source.title,
    url: source.url,
    license: source.license,
    fields: source.fields,
  })),
  readiness: buildReleaseReadiness(),
};

releaseManifestSchema.parse(manifest);

await writeJson(path.join(releaseDirectory, 'release-manifest.json'), manifest);

console.log(
  JSON.stringify(
    {
      ok: true,
      dataDirectory: path.relative(root, dataDirectory).replaceAll('\\', '/'),
      releaseDirectory,
      artifacts: manifest.artifacts,
    },
    null,
    2,
  ),
);
