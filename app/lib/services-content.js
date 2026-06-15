/* ============================================================
   Long-form, SEO/AEO-optimized content for each service page.
   Keyed by the same slug used in business.js `services`.
   The page merges this with the base service (icon, title, price).
   ============================================================ */

import { business } from './business';

const CITY = business.address.city; // "Austin"

export const serviceContent = {
  'residential-cleaning': {
    serviceType: 'House Cleaning',
    subhead:
      'Recurring or one-time house cleaning that keeps your whole home fresh, healthy, and guest-ready — without you lifting a finger.',
    intro: `Quick Clean's residential cleaning service covers every room of your home with a consistent, top-to-bottom checklist. Choose weekly, bi-weekly, or monthly visits and we send the same vetted, insured cleaner each time, or book a one-time clean whenever you need a reset.`,
    turnaround: 'Same-day & next-day slots',
    includes: [
      'Kitchen: counters, sink, stovetop, exterior of appliances',
      'Bathrooms: toilets, showers, tubs, mirrors, sinks',
      'Dusting of all reachable surfaces and fixtures',
      'Vacuuming carpets and rugs throughout',
      'Mopping all hard floors',
      'Making beds and tidying living spaces',
      'Emptying trash and replacing liners',
      'Wiping switches, handles, and high-touch points',
    ],
    idealFor: ['Busy households & families', 'Working professionals', 'Anyone who wants a reliable recurring clean'],
    faqs: [
      {
        q: `How much does residential cleaning cost in ${CITY}?`,
        a: 'Standard residential cleans start at AED 99. Recurring plans save up to 20% per visit. You see your exact flat rate before you book, based on home size.',
      },
      {
        q: 'Can I get the same cleaner every time?',
        a: 'Yes. On recurring plans we send the pro who already knows your home and your preferences.',
      },
      {
        q: 'How often should I schedule a house cleaning?',
        a: 'Most households choose bi-weekly cleaning. Homes with kids or pets often prefer weekly, while lighter homes do well with monthly visits.',
      },
    ],
  },

  'deep-cleaning': {
    serviceType: 'Deep Cleaning',
    subhead:
      'A detailed, top-to-bottom reset that reaches the spots a standard clean skips — baseboards, behind appliances, grout, vents, and more.',
    intro: `A deep cleaning from Quick Clean is the thorough reset your home gets a few times a year. We go beyond the surface to tackle built-up grime, hard-to-reach areas, and detail work — perfect before guests arrive, after a renovation, or as the first clean before starting a recurring plan.`,
    turnaround: 'Recommended 1–2 days ahead',
    includes: [
      'Everything in a standard clean, in greater detail',
      'Baseboards, door frames, and trim hand-wiped',
      'Inside microwave and around (behind) appliances',
      'Cabinet fronts and backsplash degreased',
      'Tile and grout scrubbed in kitchen and baths',
      'Vents, fans, and light fixtures dusted',
      'Window sills, tracks, and ledges detailed',
      'Buildup removed from showers and faucets',
    ],
    idealFor: ['First-time cleans', 'Spring cleaning & pre-holiday', 'Homes that haven’t been cleaned in a while'],
    faqs: [
      {
        q: 'What is the difference between a standard and deep clean?',
        a: 'A standard clean maintains an already-tidy home. A deep clean is more thorough and time-intensive — it targets built-up grime, baseboards, grout, vents, and behind/inside appliances.',
      },
      {
        q: `How much does a deep cleaning cost in ${CITY}?`,
        a: 'Deep cleans start at AED 179, with the exact flat rate shown before you book based on home size and condition.',
      },
      {
        q: 'How often do I need a deep clean?',
        a: 'Most homes benefit from a deep clean 2–4 times a year, or as the first visit before switching to a recurring standard clean.',
      },
    ],
  },

  'move-in-move-out-cleaning': {
    serviceType: 'Move Out Cleaning',
    subhead:
      'Hand back the keys spotless. A detailed, inspection-ready clean of the entire empty home so you protect your deposit or welcome new tenants.',
    intro: `Quick Clean's move in / move out cleaning gets an empty home truly inspection-ready. We clean inside cabinets, drawers, appliances, and closets — the areas landlords and property managers check first — so renters protect their deposit and owners hand over a flawless space.`,
    turnaround: 'Book around your move date',
    includes: [
      'Inside all cabinets, drawers, and closets',
      'Inside oven, refrigerator, and microwave',
      'All appliance exteriors and behind where accessible',
      'Baseboards, doors, and trim wiped down',
      'Bathrooms fully detailed and sanitized',
      'Floors vacuumed and mopped throughout',
      'Window sills, tracks, and ledges',
      'Cobweb removal and high-touch points',
    ],
    idealFor: ['Renters protecting a deposit', 'Landlords & property managers', 'Realtors prepping a listing'],
    faqs: [
      {
        q: 'Will a move-out clean help me get my deposit back?',
        a: 'Yes — our move-out clean targets exactly what landlords inspect (inside appliances, cabinets, baseboards, and bathrooms). It is backed by our 100% Spotless Guarantee.',
      },
      {
        q: 'Should the home be empty for a move-out clean?',
        a: 'An empty home gets the best result because we can reach every surface. We can still clean partially furnished spaces — just let us know when you book.',
      },
      {
        q: `How much does move-out cleaning cost in ${CITY}?`,
        a: 'Move in / move out cleans start at AED 189, with your exact flat rate confirmed before booking based on home size.',
      },
    ],
  },

  'office-commercial-cleaning': {
    serviceType: 'Commercial Cleaning',
    subhead:
      'Reliable after-hours office and commercial cleaning that keeps your workspace sharp, healthy, and ready for business.',
    intro: `Quick Clean keeps your workplace spotless with flexible, after-hours commercial cleaning. From offices and clinics to studios and retail, we build a recurring plan around your schedule with vetted, insured pros — so your team walks into a fresh space every morning and never deals with a no-show.`,
    turnaround: 'Custom recurring schedule',
    includes: [
      'Workstations, desks, and common areas',
      'Restrooms cleaned, sanitized, and restocked',
      'Kitchen and break-room surfaces and appliances',
      'Floors vacuumed and mopped throughout',
      'Trash and recycling collected and relined',
      'Glass doors, partitions, and high-touch points',
      'Reception and meeting rooms reset',
      'Custom checklist tailored to your space',
    ],
    idealFor: ['Offices & co-working spaces', 'Medical & dental practices', 'Retail, studios & gyms'],
    faqs: [
      {
        q: 'Do you clean offices after business hours?',
        a: 'Yes. We schedule commercial cleaning around your hours — evenings, early mornings, or weekends — so we never disrupt your team.',
      },
      {
        q: 'How is commercial cleaning priced?',
        a: 'Commercial cleaning is a custom quote based on your square footage, frequency, and checklist. Request a free walkthrough and we will send a flat recurring rate.',
      },
      {
        q: 'Are your commercial cleaners insured?',
        a: 'Every Quick Clean pro is background-checked, trained, insured, and bonded before entering your premises.',
      },
    ],
  },

  'carpet-upholstery-cleaning': {
    serviceType: 'Carpet Cleaning',
    subhead:
      'Deep-extraction carpet and upholstery cleaning that lifts stains, odors, allergens, and years of wear.',
    intro: `Quick Clean's carpet and upholstery cleaning uses hot-water extraction to pull out trapped dirt, allergens, and odors that vacuuming leaves behind. Carpets, rugs, sofas, and chairs come back fresher, brighter, and faster-drying — a healthier home without the rental-machine hassle.`,
    turnaround: 'Dries in a few hours',
    includes: [
      'Pre-treatment of stains and high-traffic lanes',
      'Hot-water extraction (steam) deep clean',
      'Upholstered sofas, chairs, and ottomans',
      'Area rugs and runners',
      'Odor and allergen neutralizing',
      'Spot treatment for pet accidents',
      'Fast-dry process and grooming',
      'Safe, eco-friendly solutions',
    ],
    idealFor: ['Homes with pets & kids', 'Stained or high-traffic carpets', 'Pre-sale or post-party refresh'],
    faqs: [
      {
        q: 'How long does carpet take to dry?',
        a: 'Most carpets are dry within 2–6 hours depending on airflow and fabric. We use a fast-dry extraction process and can groom fibers to speed it up.',
      },
      {
        q: 'Can you remove pet stains and odors?',
        a: 'Yes. We pre-treat pet accidents and use odor-neutralizing solutions to lift both the stain and the smell at the source.',
      },
      {
        q: `How much does carpet cleaning cost in ${CITY}?`,
        a: 'Carpet and upholstery cleaning starts at AED 89. Your flat rate depends on the number of rooms and pieces, and is confirmed before booking.',
      },
    ],
  },

  'window-glass-cleaning': {
    serviceType: 'Window Cleaning',
    subhead:
      'Streak-free window and glass cleaning, inside and out, so the natural light pours back in.',
    intro: `Quick Clean's window and glass cleaning leaves every pane crystal clear and streak-free. We clean interior and accessible exterior windows, glass doors, and mirrors, plus wipe down sills and tracks — an easy, affordable way to instantly brighten your whole space.`,
    turnaround: 'Quick, often same-week',
    includes: [
      'Interior window glass cleaned streak-free',
      'Accessible exterior windows',
      'Glass doors and partitions',
      'Mirrors throughout the home',
      'Window sills and tracks wiped',
      'Frame and ledge detailing',
      'Hard-water spot treatment',
      'Screens dusted where accessible',
    ],
    idealFor: ['Pre-sale & listing prep', 'Spring and seasonal refresh', 'Anyone wanting brighter rooms'],
    faqs: [
      {
        q: 'Do you clean the outside of windows too?',
        a: 'Yes, we clean accessible exterior windows along with interiors. For high or hard-to-reach exterior glass, let us know your setup when you book.',
      },
      {
        q: 'Will the windows be streak-free?',
        a: 'Yes — we use professional tools and technique for a streak-free finish, backed by our 100% Spotless Guarantee.',
      },
      {
        q: `How much does window cleaning cost in ${CITY}?`,
        a: 'Window and glass cleaning starts at AED 69, with your flat rate based on the number of windows and confirmed before booking.',
      },
    ],
  },
};

export function getServiceContent(slug) {
  return serviceContent[slug] || null;
}
