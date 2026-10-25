/* ============================================================
   Quick Clean — Pricing: the ONE source of truth for every number
   ------------------------------------------------------------
   Every "from AED" label, the instant price checker, the pricing
   matrix, FAQ answers, structured data and the llms.txt files read
   from this file, so the figures can never contradict each other.
   Change a price here and it changes everywhere.

   This file is imported by Node scripts as well as by Next, so it
   must stay dependency-free and use explicit ".js" import paths.
   ============================================================ */

export const currency = {
  code: 'AED',
  symbol: 'AED',
  format: (amount) => `AED ${amount}`,
};

/* Property sizes, smallest first. `bathroomsIncluded` is how many bathrooms
   the matrix price already covers; the price checker adds a flat surcharge
   for each one beyond that, so a bigger home never comes out cheaper than
   the advertised "from" price. */
export const propertySizes = [
  { key: 'studio-1br', label: 'Studio & 1 BR Apt', bedrooms: 1, bathroomsIncluded: 1 },
  { key: '2br', label: '2 BR Apartment', bedrooms: 2, bathroomsIncluded: 2 },
  { key: '3br', label: '3 BR Apartment', bedrooms: 3, bathroomsIncluded: 2 },
  { key: '4br', label: '4 BR Villa', bedrooms: 4, bathroomsIncluded: 3 },
  { key: '5br', label: '5 BR Villa', bedrooms: 5, bathroomsIncluded: 4 },
  { key: '6br', label: '6 BR Villa', bedrooms: 6, bathroomsIncluded: 5 },
];

/* The four clean types sold by property size. `prices` is indexed against
   `propertySizes`, so the arrays must stay the same length. The FIRST entry
   of each row is that clean type's advertised "from" price. */
export const cleanTypes = [
  {
    key: 'basic',
    name: 'Basic',
    label: 'Basic clean',
    prices: [99, 129, 159, 199, 239, 279],
    extraBathroom: 20,
  },
  {
    key: 'standard',
    name: 'Standard',
    label: 'Standard clean',
    prices: [149, 189, 229, 279, 329, 379],
    extraBathroom: 20,
    featured: true,
  },
  {
    key: 'deep',
    name: 'Deep',
    label: 'Deep clean',
    prices: [179, 229, 279, 339, 399, 459],
    extraBathroom: 30,
  },
  {
    key: 'move',
    name: 'Move in / out',
    label: 'Move in / move out clean',
    prices: [189, 239, 289, 349, 409, 469],
    extraBathroom: 30,
  },
];

export function getCleanType(key) {
  return cleanTypes.find((t) => t.key === key) || null;
}

/* Advertised starting prices. Package prices are DERIVED from the matrix
   above — never typed twice — and the per-item services are priced flat. */
export const startingPrices = {
  basic: getCleanType('basic').prices[0], // 99
  standard: getCleanType('standard').prices[0], // 149
  deep: getCleanType('deep').prices[0], // 179
  moveInOut: getCleanType('move').prices[0], // 189
  carpetUpholstery: 89,
  windowGlass: 69,
  office: null, // custom quote
};

/* The price table in the order the business talks about it. */
export const priceTable = [
  { key: 'basic', name: 'Basic clean', from: startingPrices.basic },
  { key: 'standard', name: 'Standard clean', from: startingPrices.standard },
  { key: 'deep', name: 'Deep clean', from: startingPrices.deep },
  { key: 'moveInOut', name: 'Move in / move out clean', from: startingPrices.moveInOut },
  { key: 'carpetUpholstery', name: 'Carpet & upholstery cleaning', from: startingPrices.carpetUpholstery },
  { key: 'windowGlass', name: 'Window & glass cleaning', from: startingPrices.windowGlass },
  { key: 'office', name: 'Office & commercial cleaning', from: null },
];

/* Which starting price each service page advertises, by URL slug. */
export const servicePriceKeys = {
  'residential-cleaning': 'basic',
  'deep-cleaning': 'deep',
  'move-in-move-out-cleaning': 'moveInOut',
  'office-commercial-cleaning': 'office',
  'carpet-upholstery-cleaning': 'carpetUpholstery',
  'window-glass-cleaning': 'windowGlass',
};

/** Starting price for a service slug, or null for custom-quote services. */
export function servicePrice(slug) {
  const key = servicePriceKeys[slug];
  return key ? startingPrices[key] : null;
}

/** "From AED 99" / "Custom quote". */
export function fromLabel(price) {
  return price ? `From ${currency.format(price)}` : 'Custom quote';
}

/**
 * The flat rate for a home. Looks the clean type up in the size matrix by
 * bedroom count (a studio counts as 1) and adds a surcharge for bathrooms
 * beyond the number that size already includes. Because it reads the same
 * matrix the pricing page prints, the instant price checker can never show
 * a figure below that clean type's advertised "from" price.
 *
 * @param {{ bedrooms?: number, bathrooms?: number, cleanType?: string }} opts
 * @returns {number|null} price in AED, or null for an unknown clean type
 */
export function flatRate({ bedrooms = 1, bathrooms = 1, cleanType = 'standard' } = {}) {
  const type = getCleanType(cleanType);
  if (!type) return null;
  const beds = Math.round(Number(bedrooms) || 0);
  const baths = Math.round(Number(bathrooms) || 0);
  const index = Math.min(Math.max(beds, 1), propertySizes.length) - 1;
  const size = propertySizes[index];
  const extraBathrooms = Math.max(0, baths - size.bathroomsIncluded);
  return type.prices[index] + extraBathrooms * type.extraBathroom;
}

/* Handy aggregates for headlines and structured data. */
export const lowestPackagePrice = Math.min(...cleanTypes.map((t) => t.prices[0])); // 99
export const lowestPrice = Math.min(
  ...Object.values(startingPrices).filter((p) => Number.isFinite(p))
); // 69
export const highestPrice = Math.max(...cleanTypes.flatMap((t) => t.prices)); // 469

/* Schema.org priceRange. The ceiling is rounded up to the next hundred so a
   large villa with extra bathrooms still falls inside the advertised range. */
export const PRICE_RANGE = `${currency.format(lowestPrice)} - ${currency.format(
  Math.ceil(highestPrice / 100) * 100
)}`; // "AED 69 - AED 500"

/* The three package cards shown on the home and pricing pages. Their prices
   come straight from the matrix so a card can never disagree with the table. */
export const packages = [
  {
    key: 'basic',
    desc: 'The essential clean that keeps an already-tidy home fresh.',
    feats: [
      'Full standard clean, top to bottom',
      'Kitchen & bathrooms detailed',
      'Floors vacuumed & mopped',
      'Dusting, surfaces & bins emptied',
      '100% Spotless Guarantee',
    ],
    cta: 'Book a basic clean',
  },
  {
    key: 'standard',
    desc: 'Our most popular package — everything in Basic, in more detail.',
    feats: [
      'Everything in Basic',
      'We bring all supplies & equipment',
      'Inside microwave & appliance fronts',
      'Baseboards, doors & switch plates',
      'Same trusted cleaner each visit',
      'Priority scheduling',
    ],
    cta: 'Book a standard clean',
  },
  {
    key: 'deep',
    desc: 'The full top-to-bottom reset for grime, grout and the spots a regular clean skips.',
    feats: [
      'Everything in Standard',
      'Inside oven, fridge & cabinets',
      'Tile & grout scrubbed',
      'Vents, fans & light fixtures',
      'Window sills, tracks & ledges',
      'Ideal first clean or seasonal reset',
    ],
    cta: 'Book a deep clean',
  },
].map((p) => {
  const type = getCleanType(p.key);
  return { ...p, name: type.name, prices: type.prices, from: type.prices[0], featured: !!type.featured };
});

/* Extras listed under the packages, priced off the service catalogue. */
export const addOnSlugs = ['carpet-upholstery-cleaning', 'window-glass-cleaning'];
