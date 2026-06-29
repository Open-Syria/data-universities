import { mkdir, writeFile } from 'node:fs/promises';
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
const dataDirectory = path.resolve(root, getCliOption('--data-dir') ?? 'data');
const outputDirectory = path.resolve(root, getCliOption('--out-dir') ?? 'dist/coverage');
const maxItems = Number.parseInt(getCliOption('--max-items') ?? '25', 10);

if (!Number.isInteger(maxItems) || maxItems < 1) {
  throw new Error('--max-items must be a positive integer');
}

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

async function loadData() {
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

function fieldMetric(label, priority, records, hasValue, options = {}) {
  const expectedRecords = records.filter(options.isExpected ?? (() => true));
  const missingRecords = expectedRecords.filter((record) => !hasValue(record));
  const knownMissing = missingRecords.flatMap((record) => {
    const reason = options.knownMissingReason?.(record);

    return reason ? [{ recordId: record.id, reason }] : [];
  });
  const knownMissingIds = new Set(knownMissing.map((item) => item.recordId));
  const actionableMissingRecords = missingRecords.filter(
    (record) => !knownMissingIds.has(record.id),
  );

  return {
    label,
    priority,
    expected: expectedRecords.length,
    present: expectedRecords.length - missingRecords.length,
    missing: missingRecords.length,
    knownMissing: knownMissing.length,
    actionableMissing: actionableMissingRecords.length,
    percent: percent(expectedRecords.length - missingRecords.length, expectedRecords.length),
    missingRecordIds: ids(missingRecords),
    knownMissingRecords: knownMissing,
    actionableMissingRecordIds: ids(actionableMissingRecords),
  };
}

function coverageMetric(label, priority, universities, coveredUniversityIds, options = {}) {
  return fieldMetric(
    label,
    priority,
    universities,
    (record) => coveredUniversityIds.has(record.id),
    {
      knownMissingReason: options.knownMissingReason,
    },
  );
}

function buildUniversityCoverage(data) {
  const assetUniversityIds = new Set(data.assets.map((asset) => asset.universityId));
  const facultyUniversityIds = new Set(data.faculties.map((faculty) => faculty.universityId));
  const programUniversityIds = new Set(data.programs.map((program) => program.universityId));
  const rankingUniversityIds = new Set(data.rankings.map((ranking) => ranking.universityId));

  return {
    total: data.universities.length,
    byInstitutionType: countBy(data.universities, (record) => record.institutionType),
    byOperationalStatus: countBy(data.universities, (record) => record.operationalStatus),
    fields: {
      englishName: fieldMetric('English canonical name', 'high', data.universities, (record) =>
        hasText(record.name.en),
      ),
      arabicName: fieldMetric('Arabic canonical name', 'high', data.universities, (record) =>
        hasText(record.name.ar),
      ),
      governorate: fieldMetric('Governorate', 'high', data.universities, (record) =>
        hasText(record.location?.governorate?.en),
      ),
      locality: fieldMetric('Locality', 'high', data.universities, (record) =>
        hasText(record.location?.locality?.en),
      ),
      officialWebsite: fieldMetric(
        'Official website',
        'medium',
        data.universities,
        (record) => Boolean(record.website),
        {
          knownMissingReason: (record) => {
            const notes = record.notes?.toLowerCase() ?? '';

            return notes.includes('official website remains unconfirmed') ||
              notes.includes('missing official website is acceptable')
              ? 'No official website confirmed from approved public sources.'
              : null;
          },
        },
      ),
      sourceBackedCentroid: fieldMetric(
        'Source-backed centroid',
        'medium',
        data.universities,
        (record) => hasCentroid(record),
      ),
      wikidataId: fieldMetric('Wikidata ID', 'low', data.universities, (record) =>
        Boolean(record.externalIds.wikidata),
      ),
      approvedImageAsset: coverageMetric(
        'Approved CDN image asset',
        'medium',
        data.universities,
        assetUniversityIds,
      ),
      facultyCoverage: coverageMetric(
        'Faculty or institute rows',
        'medium',
        data.universities,
        facultyUniversityIds,
      ),
      programCoverage: coverageMetric(
        'Program rows',
        'medium',
        data.universities,
        programUniversityIds,
      ),
      rankingSnapshot: coverageMetric(
        'Ranking snapshot',
        'low',
        data.universities,
        rankingUniversityIds,
      ),
    },
  };
}

function buildDatasetCounts(data) {
  return {
    sources: data.sources.length,
    universities: data.universities.length,
    assets: data.assets.length,
    faculties: data.faculties.length,
    programs: data.programs.length,
    rankings: data.rankings.length,
  };
}

function buildContributionFocus(report) {
  return Object.entries(report.universities.fields)
    .flatMap(([fieldId, field]) => {
      if (field.actionableMissing === 0 || report.universities.total === 0) {
        return [];
      }

      return [
        {
          priority: field.priority,
          area: `universities.${fieldId}`,
          title: `Improve ${field.label.toLowerCase()} coverage`,
          count: field.actionableMissing,
          recordIds: field.actionableMissingRecordIds,
          action: buildFieldAction(field.label),
        },
      ];
    })
    .sort((left, right) => priorityWeight(right.priority) - priorityWeight(left.priority));
}

function buildFieldAction(label) {
  const lowerLabel = label.toLowerCase();

  if (lowerLabel.includes('website')) {
    return 'Confirm official websites from approved public sources, or keep null when no official site exists.';
  }

  if (lowerLabel.includes('centroid')) {
    return 'Add WGS84 coordinates only from approved source-backed location data.';
  }

  if (lowerLabel.includes('wikidata')) {
    return 'Add Wikidata IDs only after checking identity and duplicate risk.';
  }

  if (lowerLabel.includes('image')) {
    return 'Review image license and attribution, generate CDN variants, then add an asset record.';
  }

  if (lowerLabel.includes('ranking')) {
    return 'Import ranking snapshots only from an approved ranking source and keep them in rankings.json.';
  }

  if (lowerLabel.includes('faculty') || lowerLabel.includes('program')) {
    return 'Import rows only after a reusable source and parent university mapping are approved.';
  }

  return `Add missing ${lowerLabel} values with source-backed review notes where needed.`;
}

function buildMarkdown(report) {
  const lines = [
    '# Universities Coverage Report',
    '',
    `Generated at: ${report.generatedAt}`,
    '',
    `Data directory: \`${report.dataDirectory}\``,
    '',
    'This report identifies missing fields and source-backed enrichment gaps in the canonical data. It does not prove real-world completeness; it shows where maintainers and contributors can focus next within the current schema.',
    '',
    '## Dataset Summary',
    '',
    markdownTable(
      ['Dataset', 'Records'],
      Object.entries(report.counts).map(([datasetName, count]) => [datasetName, count]),
    ),
    '',
    '## University Coverage',
    '',
    markdownTable(
      [
        'Field',
        'Expected',
        'Present',
        'Missing',
        'Known gaps',
        'Actionable missing',
        'Coverage',
        'Examples',
      ],
      Object.values(report.universities.fields).map((field) => [
        field.label,
        field.expected,
        field.present,
        field.missing,
        knownGapCell(field),
        field.actionableMissing,
        coverageCell(field),
        sampleIds(field.actionableMissingRecordIds),
      ]),
    ),
    '',
    '## Contribution Focus',
    '',
  ];

  if (report.contributionFocus.length === 0) {
    lines.push('No actionable coverage gaps were detected for the configured checks.', '');
  } else {
    lines.push(
      markdownTable(
        ['Priority', 'Area', 'Missing', 'Action', 'Example records'],
        report.contributionFocus.map((item) => [
          item.priority,
          item.area,
          item.count,
          item.action,
          sampleIds(item.recordIds),
        ]),
      ),
      '',
    );
  }

  lines.push(
    '## Institution Type Coverage',
    '',
    markdownTable(
      ['Institution type', 'Records'],
      Object.entries(report.universities.byInstitutionType).map(([key, count]) => [key, count]),
    ),
    '',
    '## Operational Status Coverage',
    '',
    markdownTable(
      ['Operational status', 'Records'],
      Object.entries(report.universities.byOperationalStatus).map(([key, count]) => [key, count]),
    ),
    '',
  );

  return `${lines.join('\n')}\n`;
}

function knownGapCell(metric) {
  if (!metric.knownMissingRecords || metric.knownMissingRecords.length === 0) {
    return '-';
  }

  const reasons = new Map();

  for (const item of metric.knownMissingRecords) {
    const recordIds = reasons.get(item.reason) ?? [];
    recordIds.push(item.recordId);
    reasons.set(item.reason, recordIds);
  }

  return [...reasons.entries()]
    .map(([reason, recordIds]) => `${reason} (${sampleIds(recordIds)})`)
    .join('; ');
}

function coverageCell(metric) {
  return metric.expected === 0 ? 'n/a' : `${metric.percent}%`;
}

function sampleIds(recordIds) {
  if (recordIds.length === 0) {
    return '-';
  }

  const sampledIds = recordIds.slice(0, maxItems);
  const suffix =
    recordIds.length > sampledIds.length ? `, +${recordIds.length - sampledIds.length}` : '';

  return `${sampledIds.map((id) => `\`${id}\``).join(', ')}${suffix}`;
}

function markdownTable(headers, rows) {
  return [
    `| ${headers.map(escapeMarkdownCell).join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map(
      (row) => `| ${row.map((value) => escapeMarkdownCell(String(value))).join(' | ')} |`,
    ),
  ].join('\n');
}

function escapeMarkdownCell(value) {
  return value.replaceAll('|', '\\|').replaceAll('\n', '<br>');
}

function ids(records) {
  return records.map((record) => record.id).sort((first, second) => first.localeCompare(second));
}

function percent(part, total) {
  if (total === 0) {
    return 0;
  }

  return Number(((part / total) * 100).toFixed(2));
}

function priorityWeight(priority) {
  return {
    high: 3,
    medium: 2,
    low: 1,
  }[priority];
}

const data = await loadData();
const report = {
  ok: true,
  generatedAt: new Date().toISOString(),
  dataDirectory: path.relative(root, dataDirectory).replaceAll('\\', '/'),
  counts: buildDatasetCounts(data),
  universities: buildUniversityCoverage(data),
};

report.contributionFocus = buildContributionFocus(report);

await mkdir(outputDirectory, { recursive: true });
await writeFile(
  path.join(outputDirectory, 'coverage-report.json'),
  `${JSON.stringify(report, null, 2)}\n`,
);
await writeFile(path.join(outputDirectory, 'COVERAGE.md'), buildMarkdown(report));

console.log(
  JSON.stringify(
    {
      ok: report.ok,
      dataDirectory: report.dataDirectory,
      outputDirectory: path.relative(root, outputDirectory).replaceAll('\\', '/'),
      counts: report.counts,
      contributionFocusItems: report.contributionFocus.length,
    },
    null,
    2,
  ),
);
