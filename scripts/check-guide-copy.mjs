#!/usr/bin/env node
/* Plain text check for the guides, the same rules as the area pages:
   no dashes, slashes, ampersands, semicolons, colons, brackets or
   characters outside printable ASCII. Fails the build on any hit and
   warns on meta description length and thin guides. */

import { guides, guideStrings, guideWordCount } from '../app/lib/guides.js';

const FORBIDDEN = new Set(['-', '/', '&', ';', ':', '(', ')', '[', ']', '{', '}']);
let failures = 0;
const warnings = [];
const slugs = new Set();

for (const guide of guides) {
  if (slugs.has(guide.slug)) {
    failures += 1;
    console.log(`FAIL duplicate slug ${guide.slug}`);
  }
  slugs.add(guide.slug);
  for (const [field, text] of guideStrings(guide)) {
    for (let i = 0; i < text.length; i += 1) {
      const ch = text[i];
      if (FORBIDDEN.has(ch) || ch.charCodeAt(0) > 126) {
        failures += 1;
        console.log(`FAIL ${guide.slug} ${field} ${JSON.stringify(ch)}: ...${text.slice(Math.max(0, i - 25), i + 25)}...`);
      }
    }
  }
  const words = guideWordCount(guide);
  if (words < 600) warnings.push(`${guide.slug}: ${words} words (target 600 or more)`);
  if (guide.metaDescription.length > 155) warnings.push(`${guide.slug}: meta description ${guide.metaDescription.length} chars (target under 155)`);
  if (guide.title.length > 60) warnings.push(`${guide.slug}: title ${guide.title.length} chars (target 60 or fewer)`);
}

console.log(`check-guide-copy: ${guides.length} guide(s) checked, ${failures} problem(s).`);
for (const w of warnings) console.log(`warn: ${w}`);
if (failures) process.exit(1);
