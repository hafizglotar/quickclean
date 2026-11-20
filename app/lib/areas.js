/* ============================================================
   Area (location) pages — one per community we serve.
   ------------------------------------------------------------
   Each entry renders /cleaning-services-<slug> (see next.config.mjs,
   which rewrites that URL onto app/areas/[area]). The copy lives in area-pages/*.js. Prices come from
   lib/pricing.js through `propertySizeKeys`, which picks the rows of
   the size matrix that fit the area's housing stock.

   `updatedAt` feeds <lastmod> in the sitemap — bump it when you edit
   an area's content.
   ============================================================ */

import { coreAreas } from './area-pages/core.js';
import { southAreas } from './area-pages/south.js';
import { westAreas } from './area-pages/west.js';
import { villaAreas } from './area-pages/villas.js';
import { centralAreas } from './area-pages/central.js';

export const AREA_PATH_PREFIX = '/cleaning-services-';
export const AREAS_HUB_PATH = '/areas';

export function areaPath(slug) {
  return `${AREA_PATH_PREFIX}${slug}`;
}

/* The six original areas first, then the groups added on 2026-10-25. */
export const areas = [...coreAreas, ...southAreas, ...westAreas, ...villaAreas, ...centralAreas];

export function getArea(slug) {
  return areas.find((a) => a.slug === slug) || null;
}

/* Areas highlighted on service pages, the contact and about pages and in the
   footer. The /areas hub page lists every area. */
export const featuredAreaSlugs = [
  'dubai-marina',
  'downtown-dubai',
  'business-bay',
  'jvc',
  'palm-jumeirah',
  'jlt',
  'dubai-hills',
  'arabian-ranches',
  'al-barsha',
  'deira-bur-dubai',
  'sharjah',
  'ajman',
];

export function featuredAreas() {
  return featuredAreaSlugs.map(getArea).filter(Boolean);
}

/** The areas an area page links to as nearby (its own `nearby` list). */
export function nearbyAreas(area) {
  return (area?.nearby || []).map(getArea).filter(Boolean);
}

/** Nearby areas followed by the next few areas in list order. The second
 *  group rotates page by page, so every area is linked from several others
 *  and none depends on the hub page alone. */
export function linkedAreas(area, extra = 4) {
  const near = nearbyAreas(area);
  const seen = new Set([area.slug, ...near.map((a) => a.slug)]);
  const start = areas.findIndex((a) => a.slug === area.slug);
  const more = [];
  for (let k = 1; k < areas.length && more.length < extra; k += 1) {
    const next = areas[(start + k) % areas.length];
    if (!seen.has(next.slug)) more.push(next);
  }
  return [...near, ...more];
}

/* Grouping for the /areas hub page. */
export const areaRegions = [
  { name: 'Dubai Marina and the coast', slugs: ['dubai-marina', 'jlt', 'palm-jumeirah', 'jumeirah'] },
  { name: 'Downtown and central Dubai', slugs: ['downtown-dubai', 'business-bay', 'al-barsha', 'dubai-hills'] },
  {
    name: 'New Dubai and the south',
    slugs: ['jvc', 'dubai-sports-city', 'motor-city', 'al-furjan', 'discovery-gardens', 'jebel-ali', 'dubai-investment-park', 'expo-city', 'dubai-south'],
  },
  { name: 'Villa communities', slugs: ['emirates-hills', 'arabian-ranches', 'damac-hills', 'mudon', 'town-square'] },
  { name: 'Old Dubai and the east', slugs: ['deira-bur-dubai', 'mirdif', 'dubai-silicon-oasis'] },
  { name: 'Northern Emirates', slugs: ['sharjah', 'ajman'] },
];

export function areasByRegion() {
  const placed = new Set();
  const groups = areaRegions.map((r) => {
    const list = r.slugs.map(getArea).filter(Boolean);
    list.forEach((a) => placed.add(a.slug));
    return { name: r.name, areas: list };
  });
  const rest = areas.filter((a) => !placed.has(a.slug));
  if (rest.length) groups.push({ name: 'More areas', areas: rest });
  return groups;
}

/** Most recent updatedAt across all areas (feeds the hub page's lastmod). */
export function areasUpdatedAt() {
  return areas.map((a) => a.updatedAt).sort().at(-1);
}

/** Display name with the long form where one exists, e.g. "Jumeirah Village Circle (JVC)". */
export function areaDisplayName(area) {
  return area.longName || area.name;
}

/** Word count of an area's intro — handy when editing copy (target: 500+). */
export function areaWordCount(area) {
  return area.intro.join(' ').split(/\s+/).filter(Boolean).length;
}
