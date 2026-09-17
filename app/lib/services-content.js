/* ============================================================
   Long-form, SEO/AEO-optimized content for each service page.
   Keyed by the same slug used in business.js `services`.
   The page merges this with the base service (icon, title, price).
   ============================================================ */


import { business } from './business';

const CITY = business.address.city; // "Dubai"

export const serviceContent = {
  'residential-cleaning': {
    serviceType: 'Residential Cleaning',
    subhead:
      'Professional residential cleaning in Dubai for recurring or one-time visits. Enjoy a fresh, healthy, guest-ready home with vetted and insured cleaners.',
    intro: `Quick Clean provides reliable residential cleaning services in Dubai for apartments, villas, and family homes. Our vetted and insured cleaners follow a consistent top-to-bottom checklist covering kitchens, bathrooms, living areas, bedrooms, floors, and high-touch surfaces. Choose a one-time clean or a recurring weekly, bi-weekly, or monthly service based on your needs.`,
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
        q:  `How much does residential cleaning cost in ${CITY}?`,
        a: 'Residential cleaning in Dubai starts at AED 99. The exact price depends on your home size and cleaning needs. You see the flat rate before booking, and recurring plans can save up to 20% per visit.',
    },   
      {
        q: 'Can I get the same cleaner every time?',
        a: 'Yes. For recurring residential cleaning in Dubai, we aim to send the same cleaner whenever possible, so they can become familiar with your home and preferences.',
    },
      {
       q: 'How often should I schedule a house cleaning in Dubai?',
      a: 'Most households in Dubai choose bi-weekly residential cleaning. Homes with kids or pets often prefer weekly cleaning, while lighter-use homes may only need a monthly visit.',
   },
    ],
  },

  'deep-cleaning': {
    serviceType: 'Deep Cleaning',
    subhead:
       'Professional deep cleaning services in Dubai for homes that need a detailed top-to-bottom clean, including baseboards, grout, appliances, vents, and hard-to-reach areas.',
   intro: `Quick Clean provides professional deep cleaning services in Dubai for homes that need more than a standard clean. We tackle built-up grime, hard-to-reach areas, baseboards, grout, appliances, vents, and detailed surfaces. Deep cleaning is ideal before guests arrive, after a renovation, or as the first clean before starting a recurring service.`,
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
        q: 'What is the difference between standard and deep cleaning in Dubai?',
        a: 'Standard cleaning is designed to maintain an already tidy home, while deep cleaning in Dubai is more detailed and time-intensive. It targets built-up grime, baseboards, grout, vents, and areas behind or inside appliances.',
     },
      {
        q: `How much does deep cleaning cost in ${CITY}?`,
        a: 'Deep cleaning in Dubai starts at AED 179. The exact flat rate depends on your home size and cleaning needs and is shown before you book.',
    },
      {
        q: 'How often should I schedule deep cleaning in Dubai?',
        a: 'Most homes benefit from deep cleaning in Dubai 2–4 times a year. You may also want a deep clean before guests arrive, after renovations, or as the first visit before starting regular residential cleaning.',
   },
    ],
  },

  'move-in-move-out-cleaning': {
    serviceType: 'Move In / Move Out Cleaning',
    subhead:
      'Professional move-in and move-out cleaning in Dubai for apartments and villas, with detailed cleaning to help prepare your home for inspection, handover, or a fresh start.',
    intro: `Quick Clean provides professional move-in and move-out cleaning in Dubai for apartments and villas. We clean inside cabinets, drawers, appliances, closets, bathrooms, floors, and other areas commonly checked during inspections. It is ideal for tenants preparing to hand back a property, landlords getting a home ready for new tenants, or anyone moving into a freshly cleaned space.`,
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
        q: 'Will move-out cleaning help me get my deposit back in Dubai?',
        a: 'A thorough move-out cleaning in Dubai can help prepare the property for inspection by cleaning areas landlords commonly check, including appliances, cabinets, baseboards, bathrooms, and floors. The service is backed by our 100% Spotless Guarantee.',
     },
      {
        q: 'Does the home need to be empty for move-out cleaning in Dubai?',
        a: 'An empty home allows our cleaners to reach more surfaces and deliver the best result. We can also clean partially furnished homes in Dubai, so let us know the property condition when you book.',
     },
      {
        q: `How much does move-in and move-out cleaning cost in ${CITY}?`,
        a: 'Move-in and move-out cleaning in Dubai starts at AED 189. The exact flat rate depends on your home size and cleaning needs and is confirmed before booking.',
    },
    ],
  },

  'office-commercial-cleaning': {
    serviceType: 'Commercial Cleaning',
    subhead:
      'Professional office and commercial cleaning in Dubai with flexible after-hours service to keep workplaces clean, healthy, and ready for business.',
    intro: `Quick Clean provides professional office and commercial cleaning services in Dubai for offices, clinics, studios, retail spaces, and other workplaces. We offer flexible after-hours cleaning with vetted and insured cleaners, customized checklists, and recurring schedules that fit your business hours.`,
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
      'Professional carpet and upholstery cleaning in Dubai that removes stains, odors, allergens, and built-up dirt from carpets, rugs, sofas, and chairs.',
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
