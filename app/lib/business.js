/* ============================================================
   Quick Clean — Single source of truth
   ------------------------------------------------------------
   Edit your real business details here ONCE. This file feeds:
     • Visible page content (components import from here)
     • SEO metadata (app/layout.js)
     • Structured data / JSON-LD (SEO + AEO + GEO)
     • sitemap.js, robots.js, manifest.js, llms.txt
   Keeping content + schema in one place is itself an SEO best
   practice: Google requires structured data to match what users
   actually see on the page.
   ============================================================ */


import { currency, servicePrice, PRICE_RANGE, startingPrices } from './pricing.js';

// IMPORTANT: set this to your real domain before launch (no trailing slash).
export const SITE_URL = 'https://www.quickclean.ae';
/* ---- Contact details ----
   Edit here and every header, footer, tel: link, contact card and schema
   node updates with them. PHONE is written for display; the tel: href is
   derived from it below by stripping the spaces. */
export const PHONE = '+971 58 933 1711';
export const SERVICE_AREAS =
  'Dubai, Sharjah, and Ajman — including Dubai Marina, Downtown Dubai, JVC, Business Bay, and surrounding communities.';

// Currency and every price live in pricing.js — the single source of truth.
export { currency };

// "From AED 99" / "Custom quote" label for a service.
export function fromLabel(service) {
  return service.price ? `From ${currency.format(service.price)}` : 'Custom quote';
}

export const business = {
  name: 'Quick Clean',
  legalName: 'Quick Clean',
  tagline: 'Spotless homes & offices, guaranteed.',
  // A crisp, factual one-liner — AI answer engines (AEO/GEO) quote sentences like this.
  description:
    'Quick Clean is a professional residential and commercial cleaning service offering vetted, insured cleaners, flat upfront pricing, and a 100% satisfaction guarantee. Book a standard, deep, or move-out clean online in 60 seconds.',
  foundingYear: 2018,

  // ---- Contact / NAP (Name, Address, Phone — keep identical everywhere for local SEO) ----
  // tel: href — strip spaces so it dials correctly once PHONE is filled in.
  telephone: PHONE.replace(/\s+/g, ''),
  telephoneDisplay: PHONE,

  // WhatsApp number that receives quote alerts from /api/quote, in
  // international format:
  // country code first, DIGITS ONLY — no +, spaces, dashes or brackets.
  // e.g. +971 50 123 4567  ->  '971501234567'
  // Override per-environment with the WHATSAPP_TO env var if you prefer to
  // keep it out of the repo.
  whatsapp: '923116229099',
  email: 'info@quickclean.ae',

  // TODO: replace STREET_ADDRESS_TODO with the real street address (building,
  // street, community). Anything still containing "TODO" is skipped by the
  // schema and the visible pages until it is filled in. The UAE does not use
  // postal codes, so `postalCode` stays blank.
  address: {
    street: 'STREET_ADDRESS_TODO',
    city: 'Dubai',
    region: 'UAE',
    regionName: 'United Arab Emirates',
    postalCode: '',
    country: 'AE',
  },

  // Used for LocalBusiness geo (helps Google Maps / local + GEO geographic ranking).
  geo: { latitude: 25.2048, longitude: 55.2708 },

  // TODO: paste the "Embed a map" iframe src from Google Maps (Share → Embed a
  // map). The contact page shows a placeholder panel until this is real.
  map: { embedUrl: 'TODO_GOOGLE_MAPS_EMBED_URL' },

  // Emirates served — drives the LocalBusiness areaServed and the footer.
  // Individual communities (Dubai Marina, JVC, ...) live in lib/areas.js.
  areaServed: ['Dubai', 'Sharjah', 'Ajman'],

  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
    { days: ['Saturday'], opens: '09:00', closes: '16:00' },
  ],

  priceRange: PRICE_RANGE,

  // TODO: replace each placeholder with the real profile URL. Entries still
  // containing "TODO" are left out of sameAs and never rendered.
  social: {
    googleBusinessProfile: 'TODO_GOOGLE_BUSINESS_PROFILE_URL',
    instagram: 'TODO_INSTAGRAM_URL',
    facebook: 'TODO_FACEBOOK_URL',
  },
};

/** True for a value that is still a TODO placeholder (never emit these). */
export function isPlaceholder(value) {
  return typeof value === 'string' && /TODO/.test(value);
}

/** Google Business Profile URL, or null while it is still the TODO placeholder. */
export const googleBusinessProfileUrl = isPlaceholder(business.social.googleBusinessProfile)
  ? null
  : business.social.googleBusinessProfile;

/** One-line postal address for the footer, contact page and map links.
 *  The street is included only once its TODO placeholder has been replaced. */
export function formatAddress() {
  const a = business.address;
  return [a.street && !isPlaceholder(a.street) ? a.street : null, a.city, a.regionName]
    .filter(Boolean)
    .join(', ');
}

/** Google Maps search link for the address (works before the embed exists). */
export function mapsSearchUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${business.legalName}, ${formatAddress()}`
  )}`;
}

const WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/** Opening hours as display rows, e.g. { days: 'Monday – Friday', hours: '08:00 – 18:00' },
 *  followed by a "Closed" row for any day not covered. */
export function hoursRows() {
  const rows = business.openingHours.map((o) => ({
    days: o.days.length === 1 ? o.days[0] : `${o.days[0]} – ${o.days[o.days.length - 1]}`,
    hours: `${o.opens} – ${o.closes}`,
  }));
  const closed = WEEK.filter((d) => !business.openingHours.some((o) => o.days.includes(d)));
  return [...rows, ...closed.map((d) => ({ days: d, hours: 'Closed' }))];
}

// Social / profile URLs that are real, for schema.org sameAs.
export const sameAs = Object.values(business.social).filter((u) => u && !isPlaceholder(u));

/* ---------------- Page timestamps ----------------
   Feeds <lastmod> in sitemap.xml. Bump the date when you change a page's
   content; service and area pages carry their own `updatedAt` in
   services-content.js and areas.js. */
export const pageUpdatedAt = {
  home: '2026-10-25',
  pricing: '2026-10-25',
  services: '2026-10-25',
  about: '2026-10-25',
  contact: '2026-10-25',
};

/* ---------------- Content data (shared by UI + schema) ---------------- */

// Ratings, stats, client logos and testimonials live in social-proof.js.

// `icon` is a key into SERVICE_ICONS in components/icons.js (real SVG icons, not emoji).
// `title` is the short label for cards and navigation; `name` is the full
// Title Case service name used in page titles, headings and schema.
export const services = [
  {
    slug: 'residential-cleaning',
    icon: 'home',
    title: 'Residential Cleaning',
    name: 'Residential Cleaning',
    desc: 'Reliable residential cleaning in Dubai for recurring or one-time visits that keep your home fresh, top to bottom.',
    price: servicePrice('residential-cleaning'),
  },
  {
    slug: 'deep-cleaning',
    icon: 'sparkle',
    title: 'Deep Cleaning',
    name: 'Deep Cleaning',
    desc: 'Detailed deep cleaning in Dubai covering baseboards, grout, appliances, and hard-to-reach areas that often get missed.',
    price: servicePrice('deep-cleaning'),
  },
  {
    slug: 'move-in-move-out-cleaning',
    icon: 'box',
    title: 'Move In / Move Out',
    name: 'Move In / Move Out Cleaning',
    desc: 'Move-in and move-out cleaning in Dubai to help leave your apartment or villa spotless and inspection-ready.',
    price: servicePrice('move-in-move-out-cleaning'),
  },
  {
    slug: 'office-commercial-cleaning',
    icon: 'building',
    title: 'Office & Commercial',
    name: 'Office & Commercial Cleaning',
    desc: 'Professional office and commercial cleaning in Dubai with flexible after-hours service for a clean, healthy workspace.',
    price: servicePrice('office-commercial-cleaning'),
  },
  {
    slug: 'carpet-upholstery-cleaning',
    icon: 'sofa',
    title: 'Carpet & Upholstery',
    name: 'Carpet & Upholstery Cleaning',
    desc: 'Professional carpet and upholstery cleaning in Dubai that removes stains, odors, and built-up dirt.',
    price: servicePrice('carpet-upholstery-cleaning'),
  },
  {
    slug: 'window-glass-cleaning',
    icon: 'window',
    title: 'Window & Glass',
    name: 'Window & Glass Cleaning',
    desc: 'Professional window and glass cleaning in Dubai for clear, streak-free results inside and out.',
    price: servicePrice('window-glass-cleaning'),
  },
];

// Quick lookup of a service by its URL slug.
export function getService(slug) {
  return services.find((s) => s.slug === slug) || null;
}

export const whyPoints = [
  {
    title: 'The 100% Spotless Guarantee',
    body: 'Not happy with any area? We come back and re-clean it free within 24 hours.',
  },
  {
    title: 'Flat, upfront pricing',
    body: 'You see the full price before you book. No hourly meters, no surprise add-ons.',
  },
  {
    title: 'Vetted, background-checked pros',
    body: 'Every cleaner is interviewed, trained, insured, and rated after each job.',
  },
  {
    title: 'Same cleaner, every time',
    body: 'On recurring plans we send the pro who already knows your home.',
  },
];

export const steps = [
  { title: 'Tell us about your space', body: 'Answer a few quick questions online and get your flat price instantly.' },
  { title: 'Pick a time that works', body: 'Choose a slot as soon as today. We match you with a top-rated local pro.' },
  { title: "Relax — it's handled", body: 'We clean, you check the results, and you only pay when you’re happy.' },
];

/* ---------------- Pricing ----------------
   Sizes, clean types, package cards and the flat-rate function all live in
   pricing.js so the numbers are defined exactly once. */

// AEO/GEO gold: clear, self-contained Q&A. Powers both the visible FAQ and FAQPage schema.
export const faqs = [
  {
    q: 'Do I need to be home during the clean?',
    a: 'No. Most customers give us secure access instructions and come home to a spotless space. You are welcome to be there if you prefer.',
  },
  {
    q: 'What if I am not happy with the clean?',
    a: 'Just let us know within 24 hours and we will send someone back to re-clean the area free. That is our 100% Spotless Guarantee.',
  },
  {
    q: 'Are your cleaners insured and background-checked?',
    a: 'Yes. Every Quick Clean pro is interviewed, background-checked, trained, and fully insured and bonded before they ever enter a home.',
  },
  {
    q: 'Do you bring your own supplies?',
    a: 'Yes. We arrive with professional, eco-friendly products and equipment. Have a preferred product? Just leave it out and let us know.',
  },
  {
    q: 'How do I pay, and when?',
    a: 'Securely online after the clean is done and you are happy. No cash needed, no payment up front, and no contracts.',
  },
  {
    q: 'How much does house cleaning cost with Quick Clean?',
    a: `Basic cleans start at ${currency.format(startingPrices.basic)}, our Standard package from ${currency.format(startingPrices.standard)}, deep cleans from ${currency.format(startingPrices.deep)}, and move-in/move-out cleans from ${currency.format(startingPrices.moveInOut)}. You see your exact flat rate before you book — pricing depends on home size and the number of bathrooms.`,
  },
  {
    q: 'Which areas do you serve?',
    a: `Quick Clean serves ${SERVICE_AREAS}`,
  },
  {
    q: 'How long does a house cleaning take?',
    a: 'A standard clean usually takes about 1.5 to 3 hours, depending on the size and condition of your home. Deep cleans and move-in/move-out cleans take longer. You will get an estimated time when you book.',
  },
  {
    q: 'Can I book a same-day or next-day cleaning?',
    a: 'Yes. Same-day and next-day appointments are often available. You can book online in about 60 seconds and choose the earliest time slot that works for you.',
  },
  {
    q: 'What types of properties do you clean?',
    a: 'We clean apartments, villas, townhouses, and studios, as well as offices and commercial spaces. The same 100% Spotless Guarantee applies to every property type and size.',
  },
  {
    q: 'What is included in a standard cleaning?',
    a: 'A standard clean covers your kitchen, bathrooms, bedrooms, and living areas — dusting, vacuuming, mopping, wiping surfaces and counters, emptying bins, and tidying. Extras like inside the oven or baseboards can be added as a deep clean.',
  },
  {
    q: 'What is the difference between a standard clean and a deep clean?',
    a: 'A standard clean maintains an already-tidy home. A deep clean is more thorough and adds baseboards, grout, vents, and inside or behind appliances. Many customers start with a deep clean, then switch to recurring standard cleans.',
  },
  {
    q: 'How often should I schedule a cleaning?',
    a: 'Most households choose bi-weekly cleaning. Homes with kids or pets often prefer weekly, while lighter homes do well with monthly visits. Recurring plans save up to 20% per visit.',
  },
  {
    q: 'Are your cleaning products safe for children and pets?',
    a: 'Yes. We use professional, eco-friendly, non-toxic products that are safe around children and pets. If you prefer specific products, just leave them out and let us know.',
  },
  {
    q: 'Can I request the same cleaner every time?',
    a: 'Yes. On recurring plans we send the same vetted cleaner who already knows your home and your preferences.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'You pay securely online by credit or debit card after the clean is finished and you are happy with it. No cash is needed and no payment is taken up front.',
  },
  {
    q: 'Can I reschedule or cancel my cleaning?',
    a: 'Yes. You can reschedule or cancel anytime from your booking confirmation. There are no contracts and no cancellation fees — we just appreciate a little notice when possible.',
  },
  {
    q: 'What happens if something is damaged during the clean?',
    a: 'Quick Clean is fully insured and bonded. In the rare event something is damaged, let us know within 24 hours and we will make it right.',
  },
  {
    q: 'Do you offer office or commercial cleaning?',
    a: 'Yes. We provide after-hours office and commercial cleaning on a custom recurring schedule. Request a free walkthrough and we will send you a flat quote.',
  },
];
