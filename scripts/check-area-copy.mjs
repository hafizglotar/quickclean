#!/usr/bin/env node
/* ============================================================
   Plain text check for area page copy
   ------------------------------------------------------------
   Area copy is written for people reading on a phone and for AI
   answer engines, so it must stay plain. This script scans every
   area's name, meta description, body paragraphs and FAQs and
   fails the build if any of them contain:
     dashes of any kind, slashes, ampersands, semicolons, colons,
     brackets, curly quotes, bullets, emoji or any other character
     outside printable ASCII.
   It also reports meta description length (target under 155) and
   body word count (target 550 to 750) as warnings.

   The six original areas were written before these rules; their
   hits are reported but do not fail the check unless you pass
   --strict-all.
   ============================================================ */

import { areas, areaWordCount } from '../app/lib/areas.js';

const LEGACY = new Set(['dubai-marina', 'downtown-dubai', 'jvc', 'business-bay', 'sharjah', 'ajman']);
const strictAll = process.argv.includes('--strict-all');
const ASCII_FORBIDDEN = new Set(['-', '/', '&', ';', ':', '(', ')', '[', ']', '{', '}']);

function describe(ch) {
  const code = ch.charCodeAt(0);
  return code > 126 ? `U+${code.toString(16).toUpperCase().padStart(4, '0')}` : JSON.stringify(ch);
}

function scan(text) {
  const hits = [];
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (ASCII_FORBIDDEN.has(ch) || ch.charCodeAt(0) > 126) {
      hits.push({ ch: describe(ch), at: i, snippet: text.slice(Math.max(0, i - 25), i + 25).replace(/\s+/g, ' ') });
    }
  }
  return hits;
}

let failures = 0;
let legacyHits = 0;
const warnings = [];

for (const area of areas) {
  const fields = [
    ['name', area.name],
    ['longName', area.longName || ''],
    ['metaDescription', area.metaDescription],
    ...area.intro.map((p, i) => [`intro[${i}]`, p]),
    ...area.faqs.flatMap((f, i) => [[`faqs[${i}].q`, f.q], [`faqs[${i}].a`, f.a]]),
  ];
  const strict = strictAll || !LEGACY.has(area.slug);
  let areaHits = 0;
  for (const [field, text] of fields) {
    for (const hit of scan(text || '')) {
      areaHits += 1;
      if (strict) {
        failures += 1;
        console.log(`FAIL ${area.slug} ${field} ${hit.ch} at ${hit.at}: ...${hit.snippet}...`);
      }
    }
  }
  if (!strict && areaHits) legacyHits += areaHits;

  const words = areaWordCount(area);
  if (words < 550 || words > 750) warnings.push(`${area.slug}: ${words} words (target 550 to 750)`);
  if (area.metaDescription.length > 155) warnings.push(`${area.slug}: meta description ${area.metaDescription.length} chars (target under 155)`);
  if (area.faqs.length !== 5) warnings.push(`${area.slug}: ${area.faqs.length} FAQs (expected 5)`);
}

const checked = areas.filter((a) => strictAll || !LEGACY.has(a.slug)).length;
console.log(`check-area-copy: ${checked} area(s) checked strictly, ${failures} forbidden character(s).`);
if (legacyHits) console.log(`note: ${legacyHits} hit(s) in the ${LEGACY.size} original areas were written before the plain text rules and are not enforced (run with --strict-all to enforce).`);
for (const w of warnings) console.log(`warn: ${w}`);
if (failures) process.exit(1);
