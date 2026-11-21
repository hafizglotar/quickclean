#!/usr/bin/env node
/* Checks the additive service content: plain text rules, a quick answer of
   40 to 60 words, and every in-text link pointing at a page that exists. */

import { serviceExtras, partsToText } from '../app/lib/service-extras.js';
import { services } from '../app/lib/business.js';
import { getArea, AREA_PATH_PREFIX } from '../app/lib/areas.js';
import { getGuide, GUIDES_PATH } from '../app/lib/guides.js';

const FORBIDDEN = new Set(['-', '/', '&', ';', ':', '(', ')', '[', ']', '{', '}']);
const STATIC = new Set(['/', '/pricing', '/services', '/about', '/contact', '/areas', '/guides']);
let failures = 0;
const fail = (msg) => {
  failures += 1;
  console.log(`FAIL ${msg}`);
};

function linkExists(href) {
  if (STATIC.has(href)) return true;
  if (href.startsWith(AREA_PATH_PREFIX)) return Boolean(getArea(href.slice(AREA_PATH_PREFIX.length)));
  if (href.startsWith(`${GUIDES_PATH}/`)) return Boolean(getGuide(href.slice(GUIDES_PATH.length + 1)));
  if (href.startsWith('/services/')) return services.some((s) => `/services/${s.slug}` === href);
  return false;
}

for (const s of services) {
  const extras = serviceExtras[s.slug];
  if (!extras) {
    fail(`${s.slug} has no extras`);
    continue;
  }
  const words = extras.quickAnswer.split(/\s+/).filter(Boolean).length;
  if (words < 40 || words > 60) fail(`${s.slug} quick answer is ${words} words (40 to 60)`);
  const texts = [
    extras.quickAnswer,
    ...extras.context.map(partsToText),
    ...extras.faqs.flatMap((f) => [f.q, f.a]),
  ];
  for (const text of texts) {
    for (const ch of text) {
      if (FORBIDDEN.has(ch) || ch.charCodeAt(0) > 126) fail(`${s.slug} has ${JSON.stringify(ch)} in: ${text.slice(0, 60)}`);
    }
  }
  for (const part of extras.context.flat()) {
    if (typeof part !== 'string' && !linkExists(part.href)) fail(`${s.slug} links to missing page ${part.href}`);
    if (typeof part !== 'string' && part.href === `/services/${s.slug}`) fail(`${s.slug} links to itself`);
  }
}

console.log(`check-service-extras: ${services.length} service(s) checked, ${failures} problem(s).`);
if (failures) process.exit(1);
