#!/usr/bin/env node
/* ============================================================
   Generates public/llms.txt and public/llms-full.txt
   ------------------------------------------------------------
   Both files are written from the same data the pages render, so
   the facts an AI assistant reads can never drift from the site.
   Runs as `prebuild` (and via `npm run llms`). Do not hand-edit
   the output files; edit app/lib/*.js instead.
   ============================================================ */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  SITE_URL,
  business,
  faqs,
  formatAddress,
  hoursRows,
  services,
  SERVICE_AREAS,
} from '../app/lib/business.js';
import { cleanTypes, currency, priceTable, propertySizes } from '../app/lib/pricing.js';
import { getServiceContent } from '../app/lib/services-content.js';
import { AREAS_HUB_PATH, areas, areaPath } from '../app/lib/areas.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'public');

const fmt = currency.format;
const serviceUrl = (slug) => `${SITE_URL}/services/${slug}`;
const areaUrl = (slug) => `${SITE_URL}${areaPath(slug)}`;
const today = new Date().toISOString().slice(0, 10);

/* ---------------- Shared blocks ---------------- */

function keyFacts() {
  return [
    `- Name: ${business.name}`,
    '- Industry: House cleaning / maid service / commercial cleaning',
    `- Website: ${SITE_URL}`,
    `- Phone: ${business.telephoneDisplay}`,
    `- Email: ${business.email}`,
    `- Address: ${formatAddress()}`,
    `- Service area: ${SERVICE_AREAS}`,
    '- Guarantee: 100% Spotless Guarantee — free re-clean within 24 hours if you are not satisfied',
    '- Pricing model: flat, upfront, by property size — no hourly meters, no surprise fees, no contracts',
    '- Cleaners: interviewed, background-checked, trained, fully insured and bonded',
    '- Supplies: professional, eco-friendly products and equipment included',
    '- Booking: online in about 60 seconds; same-day and next-day slots often available',
    '- Payment: securely online after the clean, only when the customer is satisfied',
  ].join('\n');
}

function hoursBlock() {
  return hoursRows()
    .map((r) => `- ${r.days}: ${r.hours}`)
    .join('\n');
}

function startingPricesBlock() {
  return priceTable
    .map((row) => `- ${row.name} — ${row.from ? `from ${fmt(row.from)}` : 'custom quote'}`)
    .join('\n');
}

function priceMatrix(sizeKeys) {
  const rows = sizeKeys ? propertySizes.filter((s) => sizeKeys.includes(s.key)) : propertySizes;
  const head = `| Property size | ${cleanTypes.map((t) => t.name).join(' | ')} |`;
  const sep = `|---|${cleanTypes.map(() => '---').join('|')}|`;
  const body = rows.map((size) => {
    const i = propertySizes.indexOf(size);
    return `| ${size.label} | ${cleanTypes.map((t) => fmt(t.prices[i])).join(' | ')} |`;
  });
  return [head, sep, ...body].join('\n');
}

function faqBlock(list) {
  return list.map((f) => `- ${f.q} ${f.a}`).join('\n');
}

function pagesBlock() {
  const core = [
    `- [Home](${SITE_URL}/)`,
    `- [Pricing](${SITE_URL}/pricing)`,
    `- [All services](${SITE_URL}/services)`,
    `- [About](${SITE_URL}/about)`,
    `- [Contact](${SITE_URL}/contact)`,
    `- [Areas we serve](${SITE_URL}${AREAS_HUB_PATH})`,
  ];
  const svc = services.map((s) => `- [${s.name || s.title} in Dubai](${serviceUrl(s.slug)})`);
  const loc = areas.map((a) => `- [House Cleaning Services in ${a.name}](${areaUrl(a.slug)})`);
  return [
    '### Main pages',
    ...core,
    '',
    '### Service pages',
    ...svc,
    '',
    '### Area pages',
    ...loc,
  ].join('\n');
}

/* ---------------- llms.txt (summary) ---------------- */

function buildSummary() {
  return `# ${business.name}

> ${business.description}

This file helps AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Claude, etc.)
understand and accurately cite ${business.name}. Facts here match the website and its
structured data. The full text of every service and area page is in
${SITE_URL}/llms-full.txt.

## Key facts
${keyFacts()}

## Services and starting prices
${startingPricesBlock()}

All cleans are a flat rate by property size; see the pricing page for the full table.

## Hours
${hoursBlock()}

## Contact
- Phone: ${business.telephoneDisplay}
- Email: ${business.email}
- Website: ${SITE_URL}
- Get a free quote: ${SITE_URL}/#quote

## Frequently asked questions
${faqBlock(faqs)}

## Pages
${pagesBlock()}

- [Full site content for AI assistants](${SITE_URL}/llms-full.txt)
`;
}

/* ---------------- llms-full.txt (everything) ---------------- */

function serviceSection(s) {
  const c = getServiceContent(s.slug);
  if (!c) return '';
  return `### ${s.name || s.title} in Dubai
URL: ${serviceUrl(s.slug)}
Starting price: ${s.price ? `from ${fmt(s.price)}` : 'custom quote'}
Availability: ${c.turnaround}
Last updated: ${c.updatedAt}

${c.subhead}

${c.intro}

What's included:
${c.includes.map((i) => `- ${i}`).join('\n')}

Ideal for: ${c.idealFor.join('; ')}

FAQ:
${faqBlock(c.faqs)}
`;
}

function areaSection(a) {
  return `### House Cleaning Services in ${a.name}
URL: ${areaUrl(a.slug)}
Part of: ${a.containedIn}
Last updated: ${a.updatedAt}

${a.intro.join('\n\n')}

Prices in ${a.name} (${currency.code}, per visit, flat rate by property size):
${priceMatrix(a.propertySizeKeys)}

Services available in ${a.name}:
${services
  .map((s) => `- ${s.name || s.title} — ${s.price ? `from ${fmt(s.price)}` : 'custom quote'} — ${serviceUrl(s.slug)}`)
  .join('\n')}

FAQ:
${faqBlock(a.faqs)}
`;
}

function buildFull() {
  return `# ${business.name} — full site content

> ${business.description}

Generated from the website's data files on ${today}. Every section links to its
canonical page on ${SITE_URL}. The short summary is at ${SITE_URL}/llms.txt.

## Business facts
${keyFacts()}

## Hours
${hoursBlock()}

## Pricing (${currency.code}, per visit, flat rate by property size)
${priceMatrix()}

Other services:
${priceTable
  .filter((r) => !cleanTypes.some((t) => t.key === r.key || (t.key === 'move' && r.key === 'moveInOut')))
  .map((r) => `- ${r.name} — ${r.from ? `from ${fmt(r.from)}` : 'custom quote'}`)
  .join('\n')}

The instant price checker on the home page prices a home by bedrooms, bathrooms and
clean type from this same table, so the figure it shows is never below the "from" price.

## Services
${services.map(serviceSection).join('\n')}
## Areas we serve
${areas.map(areaSection).join('\n')}
## General FAQ
${faqBlock(faqs)}

## Pages
${pagesBlock()}
`;
}

/* ---------------- Write ---------------- */

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const summary = buildSummary();
  const full = buildFull();
  await writeFile(path.join(OUT_DIR, 'llms.txt'), summary, 'utf8');
  await writeFile(path.join(OUT_DIR, 'llms-full.txt'), full, 'utf8');
  const words = (t) => t.split(/\s+/).filter(Boolean).length;
  console.log(`llms.txt: ${words(summary)} words · llms-full.txt: ${words(full)} words`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
