import { readFile } from 'node:fs/promises';
import { z } from 'zod';

const idSchema = z.string().regex(/^sy-[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const sourceStatusSchema = z.enum(['pending_release', 'seed', 'released', 'deprecated']);
export const datasetReleaseStatusSchema = z.enum(['planned', 'seed', 'released', 'deprecated']);
export const datasetReadinessLevelSchema = z.enum([
  'raw_seed',
  'identity_seed_ready',
  'public_directory_ready',
  'profile_ready',
]);
export const datasetPublicApiStatusSchema = z.enum(['not_approved', 'approved']);
export const datasetArtifactFormatSchema = z.enum(['json', 'ndjson', 'csv', 'sql', 'yaml', 'xml']);
export const assetImageFormatSchema = z.enum(['webp', 'avif']);

export const sourceRegistryStatusSchema = z.enum(['approved', 'limited', 'proposed', 'rejected']);

export const localizedTextSchema = z
  .object({
    en: z.string().trim().min(1),
    ar: z.string().trim().min(1).optional(),
  })
  .strict();

export const geographicPointSchema = z
  .object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  })
  .strict();

export const aliasSchema = z
  .object({
    value: z.string().trim().min(1),
    language: z.enum(['ar', 'en', 'und']).optional(),
    type: z
      .enum(['alias', 'formal', 'transliteration', 'historical', 'alternate_spelling'])
      .optional(),
  })
  .strict();

export const externalIdsSchema = z
  .object({
    wikidata: z
      .string()
      .regex(/^Q[0-9]+$/)
      .optional(),
    website: z.string().url().optional(),
    ministryId: z.string().trim().min(1).optional(),
  })
  .strict();

export const universityLocationSchema = z
  .object({
    governorate: localizedTextSchema.optional(),
    locality: localizedTextSchema.optional(),
    address: localizedTextSchema.optional(),
    centroid: geographicPointSchema.nullable().optional(),
  })
  .strict();

export const sourceRecordSchema = z
  .object({
    id: z.string().trim().min(1),
    title: z.string().trim().min(1),
    url: z.string().url(),
    license: z.string().trim().min(1),
    licenseUrl: z.string().url().optional(),
    status: sourceRegistryStatusSchema,
    fields: z.array(z.string().trim().min(1)),
    notes: z.string().trim().min(1).optional(),
  })
  .strict();

export const releaseManifestSourceSchema = z
  .object({
    id: z.string().trim().min(1),
    title: z.string().trim().min(1),
    url: z.string().url().optional(),
    license: z.string().trim().min(1),
    accessedAt: z.string().datetime().optional(),
    fields: z.array(z.string().trim().min(1)).optional(),
  })
  .strict();

export const releaseManifestArtifactSchema = z
  .object({
    name: z.string().trim().min(1),
    format: datasetArtifactFormatSchema,
    path: z.string().trim().min(1),
    url: z.string().url().optional(),
    sha256: z.string().regex(/^[a-f0-9]{64}$/),
    sizeBytes: z.number().int().nonnegative(),
    recordCount: z.number().int().nonnegative().optional(),
    mediaType: z.string().trim().min(1).optional(),
  })
  .strict();

export const releaseReadinessCheckSchema = z
  .object({
    name: z.string().trim().min(1),
    status: z.enum(['passed', 'warning', 'blocked']),
    expected: z.union([z.string(), z.number(), z.boolean()]).optional(),
    actual: z.union([z.string(), z.number(), z.boolean()]).optional(),
    notes: z.string().trim().min(1).optional(),
  })
  .strict();

export const releaseReadinessDomainSchema = z
  .object({
    name: z.enum(['universities', 'assets', 'faculties', 'programs', 'rankings']),
    status: z.enum(['ready', 'partial', 'empty', 'blocked']),
    recordCount: z.number().int().nonnegative(),
    notes: z.string().trim().min(1),
  })
  .strict();

export const releaseReadinessSchema = z
  .object({
    level: datasetReadinessLevelSchema,
    publicApi: z
      .object({
        status: datasetPublicApiStatusSchema,
        minimumLevel: datasetReadinessLevelSchema,
        reason: z.string().trim().min(1),
      })
      .strict(),
    checks: z.array(releaseReadinessCheckSchema),
    domains: z.array(releaseReadinessDomainSchema),
    blockers: z.array(z.string().trim().min(1)),
  })
  .strict();

export const releaseManifestSchema = z
  .object({
    schemaVersion: z.literal('1.0'),
    generatedAt: z.string().datetime(),
    dataset: z
      .object({
        id: z.literal('opensyria-universities'),
        slug: z.literal('universities'),
        repository: z.literal('data-universities'),
        category: z.literal('education'),
        title: localizedTextSchema,
      })
      .strict(),
    release: z
      .object({
        version: z.string().trim().min(1),
        status: datasetReleaseStatusSchema,
        publishedAt: z.string().datetime().nullable(),
        notes: z.string().nullable().optional(),
      })
      .strict(),
    artifacts: z.array(releaseManifestArtifactSchema),
    sources: z.array(releaseManifestSourceSchema),
    readiness: releaseReadinessSchema.optional(),
  })
  .strict();

export const sourceImportManifestSchema = z
  .object({
    sourceId: z.string().trim().min(1),
    sourceTitle: z.string().trim().min(1),
    sourceUrl: z.string().url(),
    license: z.string().trim().min(1),
    licenseUrl: z.string().url().optional(),
    accessedAt: z.string().datetime(),
    status: z.enum(['planned', 'imported', 'reviewed', 'rejected', 'superseded']),
    rawFiles: z.array(
      z
        .object({
          name: z.string().trim().min(1),
          sha256: z
            .string()
            .regex(/^[a-f0-9]{64}$/)
            .optional(),
          notes: z.string().trim().min(1).optional(),
        })
        .strict(),
    ),
    importedFields: z.array(z.string().trim().min(1)).min(1),
    targetFiles: z
      .array(
        z.enum([
          'data/assets.json',
          'data/faculties.json',
          'data/programs.json',
          'data/rankings.json',
          'data/universities.json',
          'data/sources.json',
        ]),
      )
      .min(1),
    transforms: z.array(z.string().trim().min(1)).min(1),
    reviewNotes: z.string().trim().min(1),
  })
  .strict();

export const universityRecordSchema = z
  .object({
    id: idSchema,
    name: localizedTextSchema,
    aliases: z.array(aliasSchema),
    institutionType: z.enum(['public', 'private', 'virtual', 'technical', 'religious', 'other']),
    operationalStatus: z.enum(['operating', 'planned', 'closed', 'unknown']),
    foundedYear: z.number().int().min(1).max(9999).nullable(),
    website: z.string().url().nullable(),
    location: universityLocationSchema.nullable(),
    externalIds: externalIdsSchema,
    sourceIds: z.array(z.string().trim().min(1)).min(1),
    sourceStatus: sourceStatusSchema,
    notes: z.string().trim().min(1).optional(),
  })
  .strict();

export const assetVariantSchema = z
  .object({
    url: z.string().url(),
    key: z.string().trim().min(1),
    format: assetImageFormatSchema,
    contentType: z.enum(['image/webp', 'image/avif']),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    sha256: z.string().regex(/^[a-f0-9]{64}$/),
    sizeBytes: z.number().int().nonnegative(),
  })
  .strict();

export const assetAttributionSchema = z
  .object({
    sourceProvider: z.string().trim().min(1),
    sourceTitle: z.string().trim().min(1),
    sourceUrl: z.string().url(),
    creator: z.string().trim().min(1),
    credit: z.string().trim().min(1).optional(),
    license: z.string().trim().min(1),
    licenseUrl: z.string().url(),
    attributionRequired: z.boolean(),
  })
  .strict();

export const assetRecordSchema = z
  .object({
    id: idSchema,
    universityId: idSchema,
    assetType: z.literal('image'),
    assetRole: z.enum(['campus', 'logo', 'building', 'other']),
    title: localizedTextSchema,
    variants: z.array(assetVariantSchema).min(1),
    attribution: assetAttributionSchema,
    sourceIds: z.array(z.string().trim().min(1)).min(1),
    sourceStatus: sourceStatusSchema,
    notes: z.string().trim().min(1).optional(),
  })
  .strict();

export const facultyRecordSchema = z
  .object({
    id: idSchema,
    universityId: idSchema,
    name: localizedTextSchema,
    aliases: z.array(aliasSchema),
    facultyType: z.enum([
      'faculty',
      'college',
      'institute',
      'school',
      'center',
      'department',
      'other',
    ]),
    operationalStatus: z.enum(['operating', 'planned', 'closed', 'unknown']),
    website: z.string().url().nullable(),
    sourceIds: z.array(z.string().trim().min(1)).min(1),
    sourceStatus: sourceStatusSchema,
    notes: z.string().trim().min(1).optional(),
  })
  .strict();

export const programRecordSchema = z
  .object({
    id: idSchema,
    universityId: idSchema,
    facultyId: idSchema.nullable(),
    name: localizedTextSchema,
    aliases: z.array(aliasSchema),
    programType: z.enum(['academic', 'technical', 'specialty', 'track', 'other']),
    degreeLevel: z.enum(['diploma', 'bachelor', 'master', 'doctorate', 'certificate', 'unknown']),
    operationalStatus: z.enum(['operating', 'planned', 'closed', 'unknown']),
    website: z.string().url().nullable(),
    sourceIds: z.array(z.string().trim().min(1)).min(1),
    sourceStatus: sourceStatusSchema,
    notes: z.string().trim().min(1).optional(),
  })
  .strict();

export const rankingRecordSchema = z
  .object({
    id: idSchema,
    universityId: idSchema,
    rankingSystem: z.string().trim().min(1),
    rankScope: z.enum(['global', 'regional', 'national', 'subject', 'other']),
    year: z.number().int().min(1900).max(9999),
    rank: z.number().int().positive().nullable(),
    rankDisplay: z.string().trim().min(1).nullable(),
    sourceUrl: z.string().url(),
    retrievedAt: z.string().datetime(),
    sourceIds: z.array(z.string().trim().min(1)).min(1),
    sourceStatus: sourceStatusSchema,
    notes: z.string().trim().min(1).optional(),
  })
  .strict();

export async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

const publicationTextPatternEnv = 'OPENSYRIA_PUBLICATION_TEXT_PATTERNS';

function publicationTextPatterns() {
  const rawPatterns = process.env[publicationTextPatternEnv];

  if (!rawPatterns?.trim()) {
    return [];
  }

  return rawPatterns
    .split(/\r?\n|,/)
    .map((pattern) => pattern.trim())
    .filter(Boolean)
    .map((pattern, index) => {
      try {
        return new RegExp(pattern, 'i');
      } catch {
        throw new Error(`Invalid publication text check pattern at index ${index + 1}`);
      }
    });
}

function collectPublicationTextMatches(value, pathLabel, patterns, matches) {
  if (typeof value === 'string') {
    for (const pattern of patterns) {
      if (pattern.test(value)) {
        matches.push(pathLabel);
        break;
      }
    }

    return;
  }

  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      collectPublicationTextMatches(item, `${pathLabel}[${index}]`, patterns, matches);
    }

    return;
  }

  if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      collectPublicationTextMatches(item, `${pathLabel}.${key}`, patterns, matches);
    }
  }
}

export function ensurePublicationTextChecksPass(value, label) {
  const patterns = publicationTextPatterns();

  if (patterns.length === 0) {
    return;
  }

  const matches = [];

  collectPublicationTextMatches(value, label, patterns, matches);

  if (matches.length > 0) {
    throw new Error(
      `Data failed publication text checks:\n${matches
        .map((pathLabel) => `- ${pathLabel}`)
        .join('\n')}`,
    );
  }
}

export function parseJsonArray(schema, value, label) {
  const result = z.array(schema).safeParse(value);

  if (!result.success) {
    throw new Error(
      `${label} failed schema validation: ${JSON.stringify(z.treeifyError(result.error), null, 2)}`,
    );
  }

  return result.data;
}

export function ensureUnique(records, getKey, label) {
  const seen = new Set();

  for (const record of records) {
    const key = getKey(record);

    if (seen.has(key)) {
      throw new Error(`${label} contains duplicate key: ${key}`);
    }

    seen.add(key);
  }
}

export function ensureKnownSources(records, sources, label) {
  const sourceById = new Map(sources.map((source) => [source.id, source]));

  for (const record of records) {
    const seenSourceIds = new Set();

    for (const sourceId of record.sourceIds) {
      if (seenSourceIds.has(sourceId)) {
        throw new Error(`${label} ${record.id} contains duplicate source ID: ${sourceId}`);
      }

      seenSourceIds.add(sourceId);
      ensureApprovedSource(sourceById, sourceId, `${label} ${record.id}`);
    }
  }
}

export function ensureKnownUniversities(records, universities, label) {
  const universityIds = new Set(universities.map((university) => university.id));

  for (const record of records) {
    if (!universityIds.has(record.universityId)) {
      throw new Error(
        `${label} ${record.id} references unknown university: ${record.universityId}`,
      );
    }
  }
}

export function ensureKnownFaculties(records, faculties, label) {
  const facultyIds = new Set(faculties.map((faculty) => faculty.id));

  for (const record of records) {
    if (record.facultyId && !facultyIds.has(record.facultyId)) {
      throw new Error(`${label} ${record.id} references unknown faculty: ${record.facultyId}`);
    }
  }
}

export function ensureAssetQuality(records, label) {
  for (const record of records) {
    const variantKeys = new Set();
    const variantDimensions = new Set();

    for (const variant of record.variants) {
      if (variantKeys.has(variant.key)) {
        throw new Error(`${label} ${record.id} contains duplicate variant key: ${variant.key}`);
      }

      variantKeys.add(variant.key);

      const dimensionsKey = `${variant.format}:${variant.width}`;

      if (variantDimensions.has(dimensionsKey)) {
        throw new Error(
          `${label} ${record.id} contains duplicate ${variant.format} width: ${variant.width}`,
        );
      }

      variantDimensions.add(dimensionsKey);

      if (!variant.url.startsWith('https://cdn.opensyria.org/')) {
        throw new Error(`${label} ${record.id} variant URL is outside OpenSyria CDN`);
      }
    }

    if (record.attribution.attributionRequired && !record.attribution.licenseUrl) {
      throw new Error(`${label} ${record.id} requires attribution without a license URL`);
    }
  }
}

function ensureApprovedSource(sourceById, sourceId, label) {
  const source = sourceById.get(sourceId);

  if (!source) {
    throw new Error(`${label} references unknown source: ${sourceId}`);
  }

  if (source.status !== 'approved') {
    throw new Error(`${label} references non-approved source: ${sourceId}`);
  }
}

export function ensureAliasQuality(records, label) {
  for (const record of records) {
    const canonicalNames = [record.name.en, record.name.ar]
      .filter(Boolean)
      .map((value) => value.trim().toLowerCase());
    const seenAliases = new Set();

    for (const alias of record.aliases) {
      const normalizedAlias = alias.value.trim().toLowerCase();

      if (canonicalNames.includes(normalizedAlias)) {
        throw new Error(
          `${label} ${record.id} repeats a canonical name in aliases: ${alias.value}`,
        );
      }

      if (seenAliases.has(normalizedAlias)) {
        throw new Error(`${label} ${record.id} contains duplicate alias: ${alias.value}`);
      }

      seenAliases.add(normalizedAlias);
    }
  }
}
