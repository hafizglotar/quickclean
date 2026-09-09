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

// IMPORTANT: set this to your real domain before launch (no trailing slash).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.quickclean.ae';

/* ---- Contact placeholders ----
   PHONE and ADDRESS are not final. Fill them in here and every header,
   footer, tel: link, contact card and schema node updates with them. */
export const PHONE = '+971 XX XXX XXXX';
export const ADDRESS = 'Dubai, UAE';
export const SERVICE_AREAS =
  'Dubai, Sharjah, and Ajman — including Dubai Marina, Downtown Dubai, JVC, Business Bay, and surrounding communities.';

// Currency — single switch for the whole site's pricing.
// `code` is the ISO code used in structured data; `format` renders a bare amount.
export const currency = {
  code: 'AED',
  symbol: 'AED',
  format: (amount) => `AED ${amount}`,
};

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
  email: 'hello@quickclean.ae',

  // `street` and `postalCode` are intentionally blank: ADDRESS above is a
  // placeholder and the UAE does not use postal codes. Schema omits empties.
  address: {
    street: '',
    city: 'Dubai',
    region: 'UAE',
    regionName: 'United Arab Emirates',
    postalCode: '',
    country: 'AE',
  },

  // Used for LocalBusiness geo (helps Google Maps / local + GEO geographic ranking).
  geo: { latitude: 25.2048, longitude: 55.2708 },

  // Cities you serve — drives local SEO + "near me" / geographic answers.
  areaServed: [
    'Dubai',
    'Sharjah',
    'Ajman',
    'Dubai Marina',
    'Downtown Dubai',
    'JVC',
    'Business Bay',
  ],

  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
    { days: ['Saturday'], opens: '09:00', closes: '16:00' },
  ],

  priceRange: 'AED 69–189',

  rating: { value: 4.9, count: 2300, best: 5 },

  social: {
    facebook: 'https://www.facebook.com/quickclean',
    instagram: 'https://www.instagram.com/quickclean',
    google: 'https://www.google.com/maps?cid=000000000000000000',
    yelp: 'https://www.yelp.com/biz/quick-clean',
  },
};

export const sameAs = Object.values(business.social);

/* ---------------- Content data (shared by UI + schema) ---------------- */

export const stats = [
  { value: 47000, suffix: '', label: 'Cleans completed' },
  { value: 2300, suffix: '', label: '5-star reviews' },
  { value: 98, suffix: '%', label: 'Re-book rate' },
  { value: 60, suffix: 's', label: 'To book online' },
];

export const trustLogos = [
  'Northside Realty',
  'Brightwork Offices',
  'Maple Property Co.',
  'Harbor Dental',
  'Lumen Studios',
];

// `icon` is a key into SERVICE_ICONS in components/icons.js (real SVG icons, not emoji).
export const services = [
  {
    slug: 'residential-cleaning',
    icon: 'home',
    title: 'Residential Cleaning',
    desc: 'Recurring or one-time cleans that keep your whole home fresh, top to bottom.',
    price: '99',
  },
  {
    slug: 'deep-cleaning',
    icon: 'sparkle',
    title: 'Deep Cleaning',
    desc: 'The detailed reset — baseboards, behind appliances, grout, and the spots that get missed.',
    price: '179',
  },
  {
    slug: 'move-in-move-out-cleaning',
    icon: 'box',
    title: 'Move In / Move Out',
    desc: 'Hand back the keys spotless. Landlord- and inspection-ready, every time.',
    price: '189',
  },
  {
    slug: 'office-commercial-cleaning',
    icon: 'building',
    title: 'Office & Commercial',
    desc: 'After-hours cleaning that keeps your workspace sharp and your team healthy.',
    price: null,
  },
  {
    slug: 'carpet-upholstery-cleaning',
    icon: 'sofa',
    title: 'Carpet & Upholstery',
    desc: 'Deep-extraction cleaning that lifts stains, odors, and years of wear.',
    price: '89',
  },
  {
    slug: 'window-glass-cleaning',
    icon: 'window',
    title: 'Window & Glass',
    desc: 'Streak-free, inside and out, so the light pours back in.',
    price: '69',
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
   Three packages, each priced by property size. `prices` is indexed
   against `pricingSizes` below, so both arrays must stay the same length.
   Entry prices match the headline rates used across the site
   (standard 99, deep 179, move-out 189) and scale up with size. */

export const pricingSizes = [
  'Studio & 1 BR Apt',
  '2 BR Apartment',
  '3 BR Apartment',
  '4 BR Villa',
  '5 BR Villa',
  '6 BR Villa',
];

export const pricingTiers = [
  {
    name: 'Basic',
    slug: 'basic',
    desc: 'The essential clean that keeps an already-tidy home fresh.',
    prices: [99, 129, 159, 199, 239, 279],
    feats: [
      'Full standard clean, top to bottom',
      'Kitchen & bathrooms detailed',
      'Floors vacuumed & mopped',
      'Dusting, surfaces & bins emptied',
      '100% Spotless Guarantee',
    ],
    cta: 'Book a basic clean',
    featured: false,
  },
  {
    name: 'Standard',
    slug: 'standard',
    desc: 'Our most popular package — everything in Basic, in more detail.',
    prices: [149, 189, 229, 279, 329, 379],
    feats: [
      'Everything in Basic',
      'We bring all supplies & equipment',
      'Inside microwave & appliance fronts',
      'Baseboards, doors & switch plates',
      'Same trusted cleaner each visit',
      'Priority scheduling',
    ],
    cta: 'Book a standard clean',
    featured: true,
  },
  {
    name: 'Premium',
    slug: 'premium',
    desc: 'The full detailed reset for deep cleans, move-outs and handovers.',
    prices: [189, 239, 289, 349, 409, 469],
    feats: [
      'Everything in Standard',
      'Inside oven, fridge & cabinets',
      'Grout, vents & light fixtures',
      'Interior windows & glass',
      'Inspection-ready finish',
      'Dedicated account manager',
    ],
    cta: 'Book a premium clean',
    featured: false,
  },
];

// Extras priced off the service catalogue above, so the numbers never drift.
export const pricingAddOnSlugs = ['carpet-upholstery-cleaning', 'window-glass-cleaning'];

// Lowest advertised price for a tier — used for "from" labels and schema.
export function tierFrom(tier) {
  return Math.min(...tier.prices);
}

export const reviews = [
  {
    initials: 'SM',
    name: 'Sarah M.',
    meta: 'Bi-weekly plan · Downtown',
    quote:
      'I booked at 9am and my apartment was spotless by 4pm. The cleaner was lovely and didn’t miss a thing. This is my go-to now.',
  },
  {
    initials: 'DJ',
    name: 'Dr. James K.',
    meta: 'Office cleaning · Harbor Dental',
    quote:
      'We use Quick Clean for our dental office. Reliable, professional, and the place always smells incredible. Never had a no-show.',
  },
  {
    initials: 'AR',
    name: 'Alicia R.',
    meta: 'Move-out clean · Maple Ave',
    quote:
      'Got my full deposit back after a move-out clean. The landlord said it was the cleanest unit he’d seen. Worth every dirham.',
  },
];

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
    a: 'Basic cleans start at AED 99, our Standard package is AED 149, deep cleans at AED 179, and move-in/move-out cleans at AED 189. You see your exact flat rate before you book — pricing depends on home size and location.',
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
