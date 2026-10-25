/* ============================================================
   Quick Clean — Pricing: the ONE source of truth for every number
   ------------------------------------------------------------
   Every "from AED" label, the instant price checker, the pricing
   matrix, FAQ answers, structured data and the llms.txt files read
   from this file, so the figures can never contradict each other.
   Change a price here and it changes everywhere.

   Prices below are the owner's published plan card (2026-10-25):
   three plans (Basic, Standard, Premium) priced flat by unit type.

   This file is imported by Node scripts as well as by Next, so it
   must stay dependency-free and use explicit ".js" import paths.
   ============================================================ */

export const currency = {
  code: 'AED',
  symbol: 'AED',
  format: (amount) => `AED ${amount}`,
};

/* Unit types, as printed on the plan card. Apartments and villas are priced
   separately, so a 3 BR apartment and a 3 BR villa are different rows. */
export const propertySizes = [
  { key: 'studio-1br', label: 'Studio & 1 BR Apt', type: 'apartment', bedrooms: 1 },
  { key: '2br-apt', label: '2 BR Apartment', type: 'apartment', bedrooms: 2 },
  { key: '3br-apt', label: '3 BR Apartment', type: 'apartment', bedrooms: 3 },
  { key: '4br-apt', label: '4 BR Apt or Penthouse', type: 'apartment', bedrooms: 4 },
  { key: '3br-villa', label: '3 BR Villa', type: 'villa', bedrooms: 3 },
  { key: '4br-villa', label: '4 BR Villa', type: 'villa', bedrooms: 4 },
  { key: '5br-villa', label: '5 BR Villa', type: 'villa', bedrooms: 5 },
  { key: '6br-villa', label: '6 BR Villa', type: 'villa', bedrooms: 6 },
];

export const propertyTypes = [
  { key: 'apartment', label: 'Apartment' },
  { key: 'villa', label: 'Villa' },
];

/* The three plans. `prices` is indexed against `propertySizes`, so the
   arrays must stay the same length. The FIRST entry of each row is that
   plan's advertised "from" price. */
export const cleanTypes = [
  {
    key: 'basic',
    name: 'Basic',
    label: 'Basic clean',
    tagline: 'Cleaning & Housekeeping + Laundry',
    provided: 'Provided by owner: linens & supplies',
    prices: [200, 300, 400, 450, 500, 600, 700, 800],
  },
  {
    key: 'standard',
    name: 'Standard',
    label: 'Standard clean',
    tagline: 'Cleaning & Laundry + Supplies',
    provided: 'Provided by owner: linens only',
    prices: [300, 400, 500, 650, 700, 715, 800, 900],
    featured: true,
  },
  {
    key: 'premium',
    name: 'Premium',
    label: 'Premium clean',
    tagline: 'We provide the full service',
    provided: 'Cleaning · Linens & laundry · Supplies & amenities',
    prices: [350, 450, 550, 650, 650, 750, 850, 950],
  },
];

export function getCleanType(key) {
  return cleanTypes.find((t) => t.key === key) || null;
}

/* Advertised starting prices. Plan prices are DERIVED from the matrix
   above — never typed twice. Services without a published rate are null
   and show as "Custom quote" everywhere. */
export const startingPrices = {
  basic: getCleanType('basic').prices[0], // 200
  standard: getCleanType('standard').prices[0], // 300
  premium: getCleanType('premium').prices[0], // 350
  deep: null, // TODO: set when a published rate exists
  moveInOut: null, // TODO: set when a published rate exists
  carpetUpholstery: 89,
  windowGlass: 69,
  office: null, // custom quote
};

/* The price table in the order the business talks about it. */
export const priceTable = [
  { key: 'basic', name: 'Basic cleaning', from: startingPrices.basic },
  { key: 'standard', name: 'Standard cleaning', from: startingPrices.standard },
  { key: 'premium', name: 'Premium cleaning', from: startingPrices.premium },
  { key: 'deep', name: 'Deep cleaning', from: startingPrices.deep },
  { key: 'moveInOut', name: 'Move in / move out cleaning', from: startingPrices.moveInOut },
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

/** "From AED 200" / "Custom quote". */
export function fromLabel(price) {
  return price ? `From ${currency.format(price)}` : 'Custom quote';
}

/** Bedroom range the matrix covers for a property type. */
export function bedroomRange(propertyType) {
  const beds = propertySizes.filter((s) => s.type === propertyType).map((s) => s.bedrooms);
  return { min: Math.min(...beds), max: Math.max(...beds) };
}

/** The matrix row for a property type and bedroom count (clamped to the range). */
export function sizeFor(propertyType = 'apartment', bedrooms = 1) {
  const type = propertyTypes.some((t) => t.key === propertyType) ? propertyType : 'apartment';
  const { min, max } = bedroomRange(type);
  const beds = Math.min(Math.max(Math.round(Number(bedrooms) || min), min), max);
  return propertySizes.find((s) => s.type === type && s.bedrooms === beds);
}

/**
 * The flat rate for a home: the plan's price for that unit type, read from
 * the same matrix the pricing page prints, so the instant price checker can
 * never show a figure that disagrees with the table.
 *
 * @param {{ propertyType?: 'apartment'|'villa', bedrooms?: number, cleanType?: string }} opts
 * @returns {number|null} price in AED, or null for an unknown plan
 */
export function flatRate({ propertyType = 'apartment', bedrooms = 1, cleanType = 'standard' } = {}) {
  const plan = getCleanType(cleanType);
  if (!plan) return null;
  const size = sizeFor(propertyType, bedrooms);
  return plan.prices[propertySizes.indexOf(size)];
}

/* Handy aggregates for headlines and structured data. */
export const lowestPackagePrice = Math.min(...cleanTypes.map((t) => t.prices[0])); // 200
export const lowestPrice = Math.min(
  ...Object.values(startingPrices).filter((p) => Number.isFinite(p))
); // 69
export const highestPrice = Math.max(...cleanTypes.flatMap((t) => t.prices)); // 950

/* Schema.org priceRange, with the ceiling rounded up to the next hundred. */
export const PRICE_RANGE = `${currency.format(lowestPrice)} - ${currency.format(
  Math.ceil(highestPrice / 100) * 100
)}`; // "AED 69 - AED 1000"

/* The three plan cards shown on the home and pricing pages. Their prices
   come straight from the matrix so a card can never disagree with the table. */
export const packages = [
  {
    key: 'basic',
    desc: 'Cleaning and housekeeping with the laundry done. You provide the linens and supplies.',
    feats: [
      'Full clean and housekeeping, top to bottom',
      'Laundry washed, dried and folded',
      'Kitchen and bathrooms detailed',
      'Floors vacuumed and mopped',
      'You provide linens and supplies',
      '100% Spotless Guarantee',
    ],
    cta: 'Book a basic clean',
  },
  {
    key: 'standard',
    desc: 'Our most popular plan. Cleaning and laundry with every supply brought by us. You provide the linens only.',
    feats: [
      'Everything in Basic',
      'We bring all cleaning supplies',
      'Laundry included',
      'You provide linens only',
      'Same trusted cleaner each visit',
      'Priority scheduling',
    ],
    cta: 'Book a standard clean',
  },
  {
    key: 'premium',
    desc: 'The full service. We bring the linens, do the laundry and restock supplies and amenities.',
    feats: [
      'Everything in Standard',
      'Fresh linens provided and laundered',
      'Supplies and amenities restocked',
      'Nothing for you to provide',
      'Inspection ready finish',
      'Dedicated account manager',
    ],
    cta: 'Book a premium clean',
  },
].map((p) => {
  const type = getCleanType(p.key);
  return {
    ...p,
    name: type.name,
    tagline: type.tagline,
    provided: type.provided,
    prices: type.prices,
    from: type.prices[0],
    featured: !!type.featured,
  };
});

/* Extras listed under the plans, priced off the service catalogue. */
export const addOnSlugs = ['carpet-upholstery-cleaning', 'window-glass-cleaning'];
