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
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.quickclean.co';

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
  tagline: 'Spotless homes & offices, guaranteed.',
  // A crisp, factual one-liner — AI answer engines (AEO/GEO) quote sentences like this.
  description:
    'Quick Clean is a professional residential and commercial cleaning service offering vetted, insured cleaners, flat upfront pricing, and a 100% satisfaction guarantee. Book a standard, deep, or move-out clean online in 60 seconds.',
  foundingYear: 2018,

  // ---- Contact / NAP (Name, Address, Phone — keep identical everywhere for local SEO) ----
  telephone: '+1-800-555-0123',
  telephoneDisplay: '(800) 555-0123',
  email: 'hello@quickclean.co',

  address: {
    street: '100 Market Street, Suite 200',
    city: 'Austin',
    region: 'TX',
    regionName: 'Texas',
    postalCode: '78701',
    country: 'US',
  },

  // Used for LocalBusiness geo (helps Google Maps / local + GEO geographic ranking).
  geo: { latitude: 30.2672, longitude: -97.7431 },

  // Cities you serve — drives local SEO + "near me" / geographic answers.
  areaServed: [
    'Austin',
    'Round Rock',
    'Cedar Park',
    'Pflugerville',
    'Georgetown',
    'Leander',
    'Lakeway',
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

export const services = [
  {
    slug: 'residential-cleaning',
    icon: '🏠',
    title: 'Residential Cleaning',
    desc: 'Recurring or one-time cleans that keep your whole home fresh, top to bottom.',
    price: '99',
  },
  {
    slug: 'deep-cleaning',
    icon: '✨',
    title: 'Deep Cleaning',
    desc: 'The detailed reset — baseboards, behind appliances, grout, and the spots that get missed.',
    price: '179',
  },
  {
    slug: 'move-in-move-out-cleaning',
    icon: '📦',
    title: 'Move In / Move Out',
    desc: 'Hand back the keys spotless. Landlord- and inspection-ready, every time.',
    price: '189',
  },
  {
    slug: 'office-commercial-cleaning',
    icon: '🏢',
    title: 'Office & Commercial',
    desc: 'After-hours cleaning that keeps your workspace sharp and your team healthy.',
    price: null,
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

export const plans = [
  {
    name: 'One-Time Clean',
    price: '129',
    period: '/ visit',
    desc: 'Perfect for a refresh, a special occasion, or to try us out.',
    feats: ['Full standard clean', 'Kitchen & bathrooms detailed', 'Floors, dusting & surfaces', 'Satisfaction guarantee'],
    cta: 'Book one-time',
    featured: false,
  },
  {
    name: 'Recurring Plan',
    price: '99',
    period: '/ visit',
    desc: 'Weekly, bi-weekly, or monthly. Your home, always guest-ready.',
    feats: ['Everything in one-time', 'Save up to 20% per visit', 'Same trusted cleaner', 'Priority scheduling', 'Free re-clean guarantee'],
    cta: 'Start a plan',
    featured: true,
  },
  {
    name: 'Deep / Move-Out',
    price: '189',
    period: '/ visit',
    desc: 'The full detailed reset for tough jobs and turnovers.',
    feats: ['Inside appliances & cabinets', 'Baseboards, grout & vents', 'Inspection-ready finish', 'Satisfaction guarantee'],
    cta: 'Book deep clean',
    featured: false,
  },
];

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
      'Got my full deposit back after a move-out clean. The landlord said it was the cleanest unit he’d seen. Worth every penny.',
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
    a: 'Standard cleans start at AED 99, deep cleans at AED 179, and move-in/move-out cleans at AED 189. You see your exact flat rate before you book — pricing depends on home size and location.',
  },
  {
    q: 'Which areas do you serve?',
    a: `Quick Clean serves ${business.areaServed.slice(0, -1).join(', ')}, and ${business.areaServed[business.areaServed.length - 1]}.`,
  },
];
