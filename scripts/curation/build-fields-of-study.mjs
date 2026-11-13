// Build the full field-of-study catalogue for OpenSyria data-universities.
// Usage: node scripts/curation/build-fields-of-study.mjs <website-admissions-dir> . [--write]
// Run it against the committed data before new fields are added: it treats
// every field already in data/disciplines.json as existing.
import fs from 'node:fs';
import path from 'node:path';
import { exclude, rules } from './fields-of-study-rules.mjs';

const [admDir, ouDir, ...flags] = process.argv.slice(2);
const write = flags.includes('--write');
const ACCESSED = '2026-11-13T00:00:00.000Z';
const SRC = 'mohe-university-admissions-2026-2027';
const UNESCO = 'unesco-isced-f-2013-detailed-field-descriptions';

const strip = (s) => s.normalize('NFC').replace(/[ً-ْـ]/g, '').replace(/\s+/g, ' ').trim();
const fold = (s) =>
  strip(s)
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة(?=\s|$|\)|\/|-)/g, 'ه')
    .replace(/ى(?=\s|$|\)|\/|-)/g, 'ي')
    .replace(/\s*-?\s*محافظات\s*$/, '')
    .replace(/\s*-?\s*\(?\s*(ذكور|اناث) فقط\s*\)?\s*$/, '')
    .replace(/\(\s*/g, '(')
    .replace(/\s*\)/g, ')')
    .replace(/\s*-\s*/g, ' - ')
    .trim();

function byRules(key) {
  for (const r of rules) if (r.rules.some((re) => re.test(key))) return r.id;
}
// Faculty labels name the faculty first and the specialization last
// ("الدراسات الاسلاميه والعربيه - اللغه العربيه"), so the track decides.
// Institute labels keep their prefix: it marks a technician field.
function classify(key) {
  if (exclude.some((re) => re.test(key))) return { excluded: true };
  const segs = key.split(/\s+[-—/]\s+/);
  if (segs.length > 1 && !/^(المعهد|معهد|الكليه التطبيقيه)/.test(segs[0])) {
    const t = byRules(segs[segs.length - 1].replace(/^\(|\)$/g, ''));
    if (t) return { id: t };
  }
  const id = byRules(key);
  return id ? { id } : {};
}

// ---- inputs
const read = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const disciplines = read(path.join(ouDir, 'data/disciplines.json'));
const programs = read(path.join(ouDir, 'data/programs.json'));
const sources = read(path.join(ouDir, 'data/sources.json'));
const existingIds = new Set(disciplines.map((d) => d.id));

const rowToExistingField = new Map();
for (const p of programs)
  for (const r of p.sourceReferences || []) {
    const m = /^announcement-(\d+):p(\d+):r(\d+)$/.exec(r.sourceRecordId || '');
    if (m && p.disciplineId) rowToExistingField.set(`${m[1]}:${m[2]}:${m[3]}`, p.disciplineId);
  }

const groups = new Map();
const rowToKey = new Map();
for (const f of fs
  .readdirSync(admDir)
  .filter((f) => f.endsWith('.json'))
  .sort()) {
  const d = read(path.join(admDir, f));
  for (const p of d.programs || []) {
    const k = fold(p.name.ar);
    if (!groups.has(k)) {
      groups.set(k, {
        key: k,
        ar: new Map(),
        en: new Map(),
        offers: new Set(),
        locs: [],
        programFields: new Map(),
      });
    }
    const g = groups.get(k);
    const a = strip(p.name.ar);
    g.ar.set(a, (g.ar.get(a) || 0) + 1);
    if (p.name.en && p.name.en !== p.name.ar) g.en.set(p.name.en, (g.en.get(p.name.en) || 0) + 1);
    g.offers.add(`${p.institution.id}|${p.campus?.ar}`);
    for (const s of p.sources || []) {
      const loc = `${s.announcement}:${s.page}:${s.row}`;
      rowToKey.set(loc, k);
      if (!g.locs.includes(loc)) g.locs.push(loc);
      const c = rowToExistingField.get(loc);
      if (c) g.programFields.set(c, (g.programFields.get(c) || 0) + 1);
    }
  }
}
const top = (m) => [...m.entries()].sort((a, b) => b[1] - a[1]).map((e) => e[0]);

// ---- classify every Ministry label
const byDisc = new Map();
const unmapped = [],
  disagreements = [];
let excluded = 0;
for (const g of groups.values()) {
  const c = classify(g.key);
  const programField = top(g.programFields)[0];
  if (c.excluded && !programField) {
    excluded++;
    continue;
  }
  const id = programField || c.id;
  if (programField && c.id && c.id !== programField)
    disagreements.push(`${g.key} :: programField=${programField} rule=${c.id}`);
  if (!id) {
    unmapped.push(`${g.key} (${g.offers.size})`);
    continue;
  }
  if (!byDisc.has(id)) byDisc.set(id, []);
  byDisc.get(id).push(g);
}

// ---- aliases from Ministry labels
const CUT =
  /\s*[-–—/]?\s*(لأبناء|لابناء|ابناء|أبناء|بالقامشلي|القامشلي|قامشلي|بعين عرب|عين عرب|عين العرب|بعفرين|عفرين|بمنبج|منبج|بجرابلس|جرابلس|الدانا|ضاحية قدسيا|السقيلبية|خرابو|السلمية|تدمر)(\s|$|\)|\/).*$/;
const GENERIC = new Set([
  'العلوم',
  'الهندسه',
  'التربيه',
  'الشريعه',
  'الاداب',
  'الفنون',
  'العلوم الصحيه',
  'الكليه التطبيقيه',
  'الهندسه التقنيه',
  'الاتصالات والالكترون',
  'تعويضات',
  'التربيه المناهج وطرائق التدريس',
  'التربيه المناهج وتقنيات التعليم',
]);
function aliasCandidates(original) {
  let s = original.replace(CUT, '');
  s = s.replace(
    /\((غير )?ملتزم\)|— ?ملتزم ذكور|\(?\s*(ذكور|إناث|اناث) فقط\s*\)?|\(الدوام[^)]*\)|— ?(ذكور|إناث|اناث)$/g,
    ' ',
  );
  s = s.replace(
    /(^|\s)(محافظات|تخصصي|مجموع|ثانوية شرعية|الثانية|الثالثة|الثاني)(?=\s|$|\(|-)/g,
    ' ',
  );
  s = s.replace(/\sو\s/g, ' و');
  s = s
    .replace(/\s+/g, ' ')
    .replace(/^[\s\-–—/]+|[\s\-–—/]+$/g, '')
    .trim();
  const out = [];
  const segs = s
    .split(/\s+[-–—/]\s+/)
    .map((x) => x.trim())
    .filter(Boolean);
  const last = segs[segs.length - 1];
  if (segs.length === 1 && !/[()]/.test(s)) out.push(s);
  if (segs.length > 1) out.push(last);
  const paren = /\(([^()]+)\)/.exec(last || '');
  if (paren) out.push(paren[1].trim());
  const balanced = (x) => (x.match(/\(/g) || []).length === (x.match(/\)/g) || []).length;
  return out
    .map((x) => (balanced(x) ? x : x.replace(/[()]/g, '').trim()))
    .filter((x) => x.replace(/[^ء-ي]/g, '').length >= 3 && !GENERIC.has(fold(x)));
}

const rulesById = new Map();
for (const r of rules) {
  if (!rulesById.has(r.id)) rulesById.set(r.id, { ...r, extra: [] });
  const t = rulesById.get(r.id);
  if (!r.existing)
    Object.assign(t, { en: r.en, ar: r.ar, field: r.field, isced: r.isced, existing: false });
  t.extra.push(...r.extra);
}

const report = { aliasNotSelfMapping: [], aliasCollisions: [] };
const draft = new Map(); // id -> { record, aliasKeys }
const ordered = [
  ...disciplines.map((d) => d.id),
  ...[...rulesById.keys()].filter((id) => !existingIds.has(id)),
];
for (const id of ordered) {
  const def = rulesById.get(id);
  const gs = (byDisc.get(id) || []).sort((a, b) => b.offers.size - a.offers.size);
  const existing = disciplines.find((d) => d.id === id);
  if (!existing && gs.length === 0) {
    report.aliasNotSelfMapping.push(`NO GROUPS for new ${id}`);
    continue;
  }
  const name = existing ? existing.name : { en: def.en, ar: def.ar };
  const nameKeys = new Set([fold(name.ar), name.en.toLowerCase()]);
  const aliases = existing ? existing.aliases.map((a) => ({ ...a })) : [];
  const seen = new Set([
    ...nameKeys,
    ...aliases.map((a) => (/[a-z]/i.test(a.value) ? a.value.toLowerCase() : fold(a.value))),
  ]);
  const add = (value, language, check) => {
    const k = language === 'en' ? value.toLowerCase() : fold(value);
    if (seen.has(k)) return;
    if (check && language === 'ar') {
      const c = classify(k);
      if (c.id !== id) {
        report.aliasNotSelfMapping.push(
          `${id}: "${value}" -> ${c.id || (c.excluded ? 'excluded' : 'none')}`,
        );
        if (check === 'strict') return;
      }
    }
    seen.add(k);
    aliases.push({ value, language, type: 'alias' });
  };
  for (const v of def?.extra || []) add(v, /[a-z]/i.test(v) ? 'en' : 'ar', 'report');
  const derived = new Map();
  for (const g of gs)
    for (const [orig, n] of g.ar)
      for (const c of aliasCandidates(orig)) derived.set(c, (derived.get(c) || 0) + n);
  for (const [c] of [...derived.entries()].sort((a, b) => b[1] - a[1])) {
    if (aliases.length >= 12) break;
    add(c, 'ar', 'strict');
  }
  const locs = [];
  for (const g of gs)
    for (const l of g.locs) if (locs.length < 1 && !locs.includes(l)) locs.push(l);
  const ministryRefs = locs.map((l) => {
    const [a, p, r] = l.split(':');
    return { sourceId: SRC, sourceRecordId: `announcement-${a}:p${p}:r${r}`, accessedAt: ACCESSED };
  });
  let record;
  if (existing) {
    const added = aliases.length > existing.aliases.length;
    record = { ...existing, aliases };
    if (added && !existing.sourceIds.includes(SRC)) {
      record.sourceIds = [...existing.sourceIds, SRC];
      record.sourceReferences = [...existing.sourceReferences, ...ministryRefs.slice(0, 1)];
    }
  } else {
    record = {
      id,
      name,
      aliases,
      field: def.field,
      iscedF2013Code: def.isced,
      sourceIds: [SRC, UNESCO],
      sourceReferences: [
        ...ministryRefs,
        { sourceId: UNESCO, sourceRecordId: def.isced, accessedAt: ACCESSED },
      ],
      sourceStatus: 'released',
    };
  }
  draft.set(id, record);
}

// cross-discipline alias collisions: drop the alias everywhere it collides
const owner = new Map();
for (const [id, r] of draft) {
  for (const k of [fold(r.name.ar), r.name.en.toLowerCase()])
    owner.set(k, [...(owner.get(k) || []), `${id}#name`]);
  for (const a of r.aliases) {
    const k = a.language === 'en' ? a.value.toLowerCase() : fold(a.value);
    owner.set(k, [...(owner.get(k) || []), id]);
  }
}
for (const [k, ids] of owner) {
  const uniq = [...new Set(ids.map((x) => x.replace('#name', '')))];
  if (uniq.length < 2) continue;
  report.aliasCollisions.push(`${k}: ${ids.join(', ')}`);
  for (const id of uniq) {
    const r = draft.get(id);
    r.aliases = r.aliases.filter(
      (a) => (a.language === 'en' ? a.value.toLowerCase() : fold(a.value)) !== k,
    );
  }
}

// ---- programs without a field of study
const programChanges = [];
const newPrograms = programs.map((p) => {
  if (p.disciplineId) return p;
  let key;
  for (const r of p.sourceReferences || []) {
    const m = /^announcement-(\d+):p(\d+):r(\d+)$/.exec(r.sourceRecordId || '');
    if (m && rowToKey.has(`${m[1]}:${m[2]}:${m[3]}`)) {
      key = rowToKey.get(`${m[1]}:${m[2]}:${m[3]}`);
      break;
    }
  }
  // The verified award name is more specific than the shared Ministry row.
  // Applied-college awards and diplomas are read in their college or institute
  // context so they reach technician fields, as their Ministry rows do.
  const context = key?.startsWith('الكليه التطبيقيه')
    ? 'الكليه التطبيقيه — '
    : p.degreeLevel === 'diploma'
      ? 'المعهد '
      : '';
  const own = fold(context + p.name.ar);
  let c = classify(own);
  if (!c.id && key) c = classify(key);
  if (c.id && draft.has(c.id)) {
    programChanges.push(`${p.id}: ${p.name.ar} [${key || 'name'}] -> ${c.id}`);
    return { ...p, disciplineId: c.id };
  }
  programChanges.push(`UNMAPPED ${p.id}: ${p.name.ar} [${key || 'name'}]`);
  return p;
});

const out = [...draft.values()];
console.log(
  JSON.stringify(
    {
      labels: groups.size,
      excluded,
      unmapped: unmapped.length,
      disciplines: out.length,
      newDisciplines: out.filter((d) => !existingIds.has(d.id)).length,
      programsLinked: programChanges.filter((x) => !x.startsWith('UNMAPPED')).length,
      programsStillUnlinked: programChanges.filter((x) => x.startsWith('UNMAPPED')).length,
    },
    null,
    1,
  ),
);
const rep = path.join(process.env.TMPDIR || process.env.TEMP || '.', 'fields-of-study-report.txt');
fs.writeFileSync(
  rep,
  [
    '## UNMAPPED LABELS',
    ...unmapped,
    '',
    '## PROGRAM FIELD VS RULE',
    ...disagreements,
    '',
    '## ALIAS NOT SELF-MAPPING',
    ...report.aliasNotSelfMapping,
    '',
    '## ALIAS COLLISIONS',
    ...report.aliasCollisions,
    '',
    '## PROGRAM CHANGES',
    ...programChanges,
    '',
    '## DISCIPLINES',
    ...out.map(
      (d) =>
        `${d.id} | ${d.name.en} | ${d.name.ar} | ${d.field} ${d.iscedF2013Code} | ${(byDisc.get(d.id) || []).reduce((n, g) => n + g.offers.size, 0)} offers | ${d.aliases.map((a) => a.value).join('; ')}`,
    ),
  ].join('\n'),
);
console.log('report:', rep);

if (write) {
  const w = (f, v) => fs.writeFileSync(path.join(ouDir, f), `${JSON.stringify(v, null, 2)}\n`);
  w('data/disciplines.json', out);
  w('data/programs.json', newPrograms);
  if (!sources.some((s) => s.id === SRC)) {
    w('data/sources.json', [
      ...sources,
      {
        id: SRC,
        title:
          'Syrian Ministry of Higher Education 2026–2027 undergraduate admissions announcements',
        url: 'https://mohe.gov.sy/ar/media-center/details/651',
        license: 'Public source; factual data only',
        status: 'approved',
        fields: ['program name', 'field of study'],
        notes:
          'Program labels from the eleven 2026–2027 admissions announcements, as transcribed in the OpenSyria admissions catalogues. Used to name fields of study; offerings, faculties and awards need separate evidence.',
      },
    ]);
  }
  console.log('written');
}
