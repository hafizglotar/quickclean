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
// A .ae domain is a genuine local-ranking signal in the UAE.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.quickclean.ae';

// Locale — used for og:locale, JSON-LD inLanguage, and <html lang>.
export const LOCALE = { lang: 'en-AE', ogLocale: 'en_AE' };

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
  legalName: 'Quick Clean LLC',
  tagline: 'Deep cleaning specialists for homes & offices.',
  // A crisp, factual one-liner — AI answer engines (AEO/GEO) quote sentences like this.
  description:
    'Quick Clean is a deep cleaning company in Dubai, UAE. We provide villa and apartment deep cleaning, domestic (residential) cleaning, office and commercial cleaning, and move-in/move-out cleaning across Dubai, with vetted, insured cleaners, flat upfront pricing in AED, and a 100% satisfaction guarantee. Book online in 60 seconds.',
  foundingYear: 2018,

  // ---- Contact / NAP (Name, Address, Phone — keep identical everywhere for local SEO) ----
  // TODO before launch: replace with your real trade-licence details.
  // The name/address/phone here must match your Google Business Profile
  // character-for-character — mismatched NAP is the #1 local-SEO killer.
  telephone: '+971-4-123-4567',
  telephoneDisplay: '+971 4 123 4567',
  // WhatsApp is the primary contact channel for services in the UAE.
  whatsapp: '971501234567',
  email: 'hello@quickclean.ae',

  // UAE trade licence — showing these builds trust and E-E-A-T for Google.
  license: { authority: 'Dubai DED', number: 'TODO-000000' },

  address: {
    street: 'Office 1204, Clover Bay Tower, Business Bay',
    city: 'Dubai',
    region: 'Dubai',
    regionName: 'Dubai',
    country: 'AE',
    countryName: 'United Arab Emirates',
    // The UAE has no postal codes — businesses use a P.O. Box instead.
    poBox: 'P.O. Box 000000',
  },

  // Used for LocalBusiness geo (helps Google Maps / local + GEO geographic ranking).
  // These coordinates are Business Bay, Dubai — update to your real office pin.
  geo: { latitude: 25.1857, longitude: 55.2766 },

  // Dubai communities you serve — drives local SEO, "near me" queries, and the
  // geographic answers AI engines give ("deep cleaning in Dubai Marina").
  areaServed: [
    'Dubai Marina',
    'Jumeirah Lake Towers (JLT)',
    'Downtown Dubai',
    'Business Bay',
    'Palm Jumeirah',
    'Jumeirah Village Circle (JVC)',
    'Dubai Hills Estate',
    'Arabian Ranches',
    'Al Barsha',
    'Jumeirah',
    'Bur Dubai',
    'Deira',
    'Mirdif',
    'Dubai Silicon Oasis',
    'DAMAC Hills',
    'The Springs & Meadows',
  ],

  // Dubai's working week runs Monday–Friday, with Saturday–Sunday the weekend.
  // Home services typically trade all seven days.
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '20:00' },
    { days: ['Saturday', 'Sunday'], opens: '09:00', closes: '18:00' },
  ],

  priceRange: 'AED 69–189',

  rating: { value: 4.9, count: 2300, best: 5 },

  social: {
    facebook: 'https://www.facebook.com/quickcleanae',
    instagram: 'https://www.instagram.com/quickcleanae',
    google: 'https://www.google.com/maps?cid=000000000000000000',
    tiktok: 'https://www.tiktok.com/@quickcleanae',
  },
};

export const sameAs = Object.values(business.social);

/** "Dubai, UAE" — the human place label used in headings, titles and schema. */
export const placeLabel = `${business.address.city}, UAE`;

/** Natural-language list of every community served (used in copy + FAQ answers). */
export function areaSentence() {
  const a = business.areaServed;
  return `${a.slice(0, -1).join(', ')}, and ${a[a.length - 1]}`;
}

/* ---------------- Content data (shared by UI + schema) ---------------- */

export const stats = [
  { value: 47000, suffix: '', label: 'Homes & offices cleaned' },
  { value: 2300, suffix: '', label: '5-star reviews' },
  { value: 98, suffix: '%', label: 'Re-book rate' },
  { value: 60, suffix: 's', label: 'To book online' },
];

// TODO before launch: replace with real clients (with their permission).
export const trustLogos = [
  'Marina Heights Realty',
  'Bay Square Offices',
  'Emirates Property Co.',
  'Jumeirah Dental',
  'Lumen Studios DIFC',
];

/* Order matters: this array drives the nav dropdown, the services grids, the
   footer links, the sitemap, and the OfferCatalog in structured data.
   Deep cleaning leads everywhere because it is the flagship service. */
export const services = [
  {
    slug: 'deep-cleaning',
    icon: '✨',
    title: 'Deep Cleaning',
    desc: 'Our specialty. The full reset — baseboards, grout, vents, inside and behind appliances, and every spot a routine clean skips.',
    price: '179',
    featured: true,
  },
  {
    slug: 'domestic-cleaning',
    icon: '🏠',
    title: 'Domestic Cleaning',
    desc: 'Recurring or one-time home cleaning that keeps every room fresh, top to bottom.',
    price: '99',
  },
  {
    slug: 'office-commercial-cleaning',
    icon: '🏢',
    title: 'Office & Commercial',
    desc: 'After-hours office cleaning and deep cleans that keep your workspace sharp and your team healthy.',
    price: null,
  },
  {
    slug: 'move-in-move-out-cleaning',
    icon: '📦',
    title: 'Move In / Move Out',
    desc: 'A full deep clean of an empty property. Landlord- and inspection-ready, every time.',
    price: '189',
  },
  {
    slug: 'carpet-upholstery-cleaning',
    icon: '🛋️',
    title: 'Carpet & Upholstery',
    desc: 'Deep-extraction cleaning that lifts stains, odors, and years of wear.',
    price: '89',
  },
  {
    slug: 'window-glass-cleaning',
    icon: '🪟',
    title: 'Window & Glass',
    desc: 'Streak-free, inside and out, so the light pours back in.',
    price: '69',
  },
];

// Quick lookup of a service by its URL slug.
export function getService(slug) {
  return services.find((s) => s.slug === slug) || null;
}

/* ---------------- Deep cleaning (flagship service) ----------------
   Powers the room-by-room breakdown on the home page. Specific,
   verifiable task lists are exactly what AI answer engines quote back
   for "what does a deep clean include" style questions. */

export const deepCleanRooms = [
  {
    icon: '🍳',
    room: 'Kitchen',
    tasks: [
      'Inside the oven, microwave, and fridge',
      'Behind and under movable appliances',
      'Cabinet fronts and interiors degreased',
      'Backsplash, extractor hood, and filters',
      'Sink descaled, taps polished',
    ],
  },
  {
    icon: '🚿',
    room: 'Bathrooms',
    tasks: [
      'Tile and grout scrubbed line by line',
      'Limescale and soap scum removed',
      'Shower screens, tracks, and seals detailed',
      'Toilets sanitised, base and behind included',
      'Mirrors, chrome, and fixtures polished',
    ],
  },
  {
    icon: '🛏️',
    room: 'Bedrooms & living areas',
    tasks: [
      'Under and behind furniture where movable',
      'Skirting boards and door frames hand-wiped',
      'Wardrobe and cupboard interiors',
      'Upholstery and mattresses vacuumed',
      'Switches, handles, and high-touch points',
    ],
  },
  {
    icon: '🏠',
    room: 'Whole property',
    tasks: [
      'AC vents and grilles wiped free of dust',
      'Balconies swept clear of sand and dust',
      'Window interiors, sills, and tracks',
      'Doors, frames, and skirting throughout',
      'Floors deep-mopped into every corner',
    ],
  },
];

// Standard vs deep — the single most-asked question in this industry.
export const cleanCompare = [
  { task: 'Surfaces, floors, and bathrooms cleaned', standard: true, deep: true },
  { task: 'Kitchen wiped down, bins emptied', standard: true, deep: true },
  { task: 'Skirting boards, door frames, and trim', standard: false, deep: true },
  { task: 'Inside oven, fridge, and microwave', standard: false, deep: true },
  { task: 'Behind and under movable appliances', standard: false, deep: true },
  { task: 'Tile and grout scrubbed', standard: false, deep: true },
  { task: 'AC vents, grilles, and light fixtures', standard: false, deep: true },
  { task: 'Limescale and hard-water buildup removed', standard: false, deep: true },
  { task: 'Cabinet and wardrobe interiors', standard: false, deep: true },
  { task: 'Balcony sand and construction dust', standard: false, deep: true },
];

export const whyPoints = [
  {
    title: 'Deep cleaning is what we do best',
    body: 'Our crews are trained and equipped specifically for deep cleans — the grout, the vents, the inside of the oven, not just the surfaces.',
  },
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
];

export const steps = [
  { title: 'Tell us about your space', body: 'Home or office, and how deep you want to go. Get your flat price instantly.' },
  { title: 'Pick a time that works', body: 'Choose a slot as soon as today. We match you with a deep-clean trained crew.' },
  { title: "Walk in and inspect", body: 'Check every room against the checklist. You only pay when you’re happy.' },
];

/* Three plans that mirror the three things we actually sell:
   a deep clean, a domestic clean, and an office contract. */
export const plans = [
  {
    name: 'Domestic Clean',
    price: '99',
    period: '/ visit',
    desc: 'Weekly, bi-weekly, or monthly upkeep. Your home, always guest-ready.',
    feats: [
      'Kitchen & bathrooms detailed',
      'Floors, dusting & surfaces',
      'Save up to 20% on recurring visits',
      'Same trusted cleaner',
      'Satisfaction guarantee',
    ],
    cta: 'Book a home clean',
    featured: false,
  },
  {
    name: 'Deep Clean',
    price: '179',
    period: '/ visit',
    desc: 'The full property reset. Our flagship service and most-booked clean.',
    feats: [
      'Everything in a domestic clean',
      'Inside oven, fridge & cabinets',
      'Grout, limescale & buildup removed',
      'Skirting, vents & light fixtures',
      'Behind and under appliances',
      'Free re-clean guarantee',
    ],
    cta: 'Book a deep clean',
    featured: true,
  },
  {
    name: 'Office & Commercial',
    price: null,
    priceLabel: 'Custom',
    period: '/ quote',
    desc: 'After-hours contracts and one-off office deep cleans.',
    feats: [
      'Free on-site walkthrough',
      'Cleaned around your hours',
      'Checklist built for your space',
      'Restrooms sanitised & restocked',
      'Flat recurring rate',
    ],
    cta: 'Request a walkthrough',
    featured: false,
  },
];

// TODO before launch: replace with real, verifiable reviews. Never invent
// testimonials — Google penalises fake review content and it breaks the
// aggregateRating in your structured data.
export const reviews = [
  {
    initials: 'SM',
    name: 'Sara M.',
    meta: 'Deep clean · 3-bed, Dubai Marina',
    quote:
      'I booked a deep clean expecting the usual surface job. They pulled out the oven, scrubbed the grout, did every AC grille — the kitchen looks brand new. Now on a bi-weekly plan.',
  },
  {
    initials: 'DJ',
    name: 'Dr. Jamal K.',
    meta: 'Office deep clean · Jumeirah Dental',
    quote:
      'We had them deep clean the whole practice after hours, and now they come weekly. Reliable, professional, and the place always smells incredible. Never had a no-show.',
  },
  {
    initials: 'AR',
    name: 'Alicia R.',
    meta: 'Move-out deep clean · JVC villa',
    quote:
      'Got my full security deposit back after a move-out deep clean. Inside the cabinets, behind the fridge, the balconies, everything. The agent said it was the cleanest handover he had seen.',
  },
];

// AEO/GEO gold: clear, self-contained Q&A. Powers both the visible FAQ and FAQPage schema.
export const faqs = [
  {
    q: 'What is a deep clean and what does it include?',
    a: 'A deep clean is a full top-to-bottom reset of a property that goes far beyond routine cleaning. In a Dubai apartment or villa it includes the inside of the oven, fridge and microwave, behind and under movable appliances, tile and grout scrubbing, limescale and hard-water removal, skirting boards and door frames, AC vents and grilles, ceiling fans and light fixtures, cabinet and wardrobe interiors, balcony sand and dust removal, and window interiors, sills and tracks — on top of everything in a standard clean.',
  },
  {
    q: 'What is the difference between a standard clean and a deep clean?',
    a: 'A standard clean maintains an already-tidy space: surfaces, floors, kitchen and bathrooms. A deep clean is far more thorough and time-intensive — it targets built-up grime in the places a routine clean never reaches, such as inside appliances, grout, vents, skirting boards, and behind furniture. Most customers start with a deep clean, then switch to recurring standard cleans to maintain it.',
  },
  {
    q: 'How much does deep cleaning cost in Dubai?',
    a: 'Deep cleaning with Quick Clean starts at AED 179. Your exact flat rate in AED is shown before you book and depends on the size and condition of the property — a studio costs less than a 3-bedroom apartment, and a villa more again. There are no hourly meters and no surprise add-ons.',
  },
  {
    q: 'How long does a deep clean take?',
    a: 'A deep clean typically takes 4 to 8 hours depending on the size and condition of the property, compared with about 1.5 to 3 hours for a standard clean. A studio or 1-bedroom apartment is usually done in half a day, while larger villas and offices need a full team or a full day. You get an estimated duration when you book.',
  },
  {
    q: 'How often should I book a deep clean in Dubai?',
    a: 'Most Dubai homes benefit from a deep clean 3 to 4 times a year — slightly more often than in cooler climates, because construction dust, shamal sand, and constant air conditioning put more load on a property. Many customers book one as their very first clean, then keep it that way with recurring domestic cleans. Deep cleans are also popular before moving in, after a fit-out or renovation, and before hosting.',
  },
  {
    q: 'Which areas of Dubai do you cover?',
    a: `Quick Clean covers all of Dubai, including ${areaSentence()}. If your community is not listed, contact us — we almost certainly cover it.`,
  },
  {
    q: 'Do you deep clean villas as well as apartments?',
    a: 'Yes. We deep clean studios, apartments, townhouses, and villas across Dubai. Villas are quoted on bedrooms and built-up area and usually need a team of two to four cleaners for a full day.',
  },
  {
    q: 'Are you a licensed cleaning company in Dubai?',
    a: 'Yes. Quick Clean holds a valid UAE trade licence, and every cleaner is employed by us on a proper visa, background-checked, trained, insured, and bonded. We do not use freelance or unlicensed labour.',
  },
  {
    q: 'Do you clean on weekends and public holidays?',
    a: 'Yes. We work Monday to Friday from 8:00 AM to 8:00 PM and Saturday to Sunday from 9:00 AM to 6:00 PM, including most UAE public holidays. Ramadan timings are adjusted each year and shown at booking.',
  },
  {
    q: 'Do you offer move-out cleaning for a tenancy handover?',
    a: 'Yes. Our move-out clean is a full deep clean of an empty property, aimed at exactly what Dubai landlords and property managers inspect at handover — inside cabinets and appliances, AC grilles, bathrooms, and balconies — so you protect your security deposit.',
  },
  {
    q: 'Do you deep clean offices and commercial spaces?',
    a: 'Yes. We deep clean offices, clinics, retail units, studios, and gyms, either as a one-off reset or as part of a recurring after-hours contract. Request a free walkthrough and we will send you a flat quote.',
  },
  {
    q: 'Do you also do regular domestic cleaning?',
    a: 'Yes. Alongside deep cleaning we provide domestic (residential) cleaning on a weekly, bi-weekly, or monthly schedule from AED 99 per visit, as well as one-time cleans. Recurring plans save up to 20% per visit and you get the same vetted cleaner each time.',
  },
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
    a: 'After the clean is done and you are happy — by card, bank transfer, or cash. No payment up front, and no contracts.',
  },
  {
    q: 'How much does house cleaning cost in Dubai?',
    a: 'With Quick Clean, domestic cleans start at AED 99, deep cleans at AED 179, and move-in/move-out cleans at AED 189. Office and commercial cleaning is quoted after a free walkthrough. You see your exact flat rate in AED before you book — pricing depends on property size and community.',
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
    a: 'We clean studios, apartments, townhouses, and villas across Dubai, as well as offices, clinics, retail units, and other commercial spaces. The same 100% Spotless Guarantee applies to every property type and size.',
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
    a: 'You pay in AED after the clean is finished and you are happy with it — securely online by credit or debit card, by bank transfer, or in cash to the crew if you prefer. No payment is taken up front.',
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
    q: 'Can you clean our office outside working hours?',
    a: 'Yes. Office and commercial cleaning is scheduled around your business — evenings, early mornings, or weekends — on a custom recurring plan, so your team never works around a cleaner.',
  },
  {
    q: 'What is included in a standard cleaning?',
    a: 'A standard clean covers your kitchen, bathrooms, bedrooms, and living areas — dusting, vacuuming, mopping, wiping surfaces and counters, emptying bins, and tidying. Detail work like inside the oven, grout, skirting boards, and vents belongs to a deep clean.',
  },
];
