/* ============================================================
   Long-form, SEO/AEO-optimized content for each service page.
   Keyed by the same slug used in business.js `services`.
   The page merges this with the base service (icon, title, price).
   ============================================================ */

import { business } from './business';

const CITY = business.address.city; // "Dubai"

export const serviceContent = {
  'deep-cleaning': {
    serviceType: 'Deep Cleaning',
    subhead:
      'Our flagship service. A detailed, top-to-bottom reset of your Dubai apartment, villa, or office that reaches everything a routine clean skips — inside appliances, grout, skirting boards, AC grilles, and behind the furniture.',
    intro: `Deep cleaning is what Quick Clean does best, and Dubai properties need it more than most. Constant air conditioning pulls dust through every room, shamal winds push fine sand onto balconies and window tracks, and the hard water here leaves limescale on every tap and shower screen. Our crews are trained and equipped specifically for that: we move what can be moved, strip out built-up grease and limescale, scrub grout line by line, and detail the parts of a property a weekly clean never touches. It is the right choice before you move in, after a fit-out or renovation, ahead of hosting, or simply as the reset that makes recurring cleaning easy to maintain afterwards.`,
    turnaround: 'Book 1–2 days ahead · 4–8 hours on site',
    includes: [
      'Everything in a standard clean, in far greater detail',
      'Inside the oven, fridge, and microwave',
      'Behind and under movable appliances and furniture',
      'Tile and grout scrubbed line by line',
      'Limescale, soap scum, and hard-water buildup removed',
      'Skirting boards, door frames, and trim hand-wiped',
      'AC vents and grilles wiped free of dust',
      'Cabinet and wardrobe interiors emptied and wiped',
      'Window interiors, sills, and tracks detailed',
      'Balconies swept clear of sand and construction dust',
    ],
    idealFor: [
      'Apartments, villas & townhouses',
      'Pre-move-in & post-handover',
      'Offices and clinics',
      'Properties not deep cleaned in 6+ months',
    ],
    faqs: [
      {
        q: 'What is the difference between a standard and deep clean?',
        a: 'A standard clean maintains an already-tidy space — surfaces, floors, kitchen, and bathrooms. A deep clean is far more thorough and time-intensive: it targets built-up grime inside appliances, in grout, on skirting boards, in vents, and behind furniture.',
      },
      {
        q: `How much does deep cleaning cost in ${CITY}?`,
        a: 'Deep cleans start at AED 179, with the exact flat rate in AED shown before you book based on property size and condition. A studio or 1-bedroom apartment sits at the lower end; villas are quoted on bedrooms and built-up area.',
      },
      {
        q: 'How long does a deep clean take?',
        a: 'Usually 4 to 8 hours depending on the size and condition of the property. A studio or 1-bedroom apartment is typically half a day; larger villas and offices need a full team or a full day. You will get an estimated duration when you book.',
      },
      {
        q: `Which areas of ${CITY} do you deep clean?`,
        a: `We cover all of ${CITY}, including ${business.areaServed.slice(0, 6).join(', ')}, and every other community across the emirate.`,
      },
      {
        q: 'Do you deep clean villas as well as apartments?',
        a: 'Yes. Studios, apartments, townhouses, and villas. Villas usually need a team of two to four cleaners for a full day, and we quote on bedrooms and built-up area.',
      },
      {
        q: 'Do you deep clean offices as well as homes?',
        a: 'Yes. We deep clean offices, clinics, retail units, studios, and gyms, either as a one-off reset or as the first visit of a recurring after-hours contract.',
      },
      {
        q: 'How often do I need a deep clean?',
        a: 'Most properties benefit from a deep clean 2–4 times a year, or as the first visit before switching to a recurring domestic clean.',
      },
    ],
  },

  'domestic-cleaning': {
    serviceType: 'House Cleaning',
    subhead:
      'Recurring or one-time domestic cleaning that keeps your whole home fresh, healthy, and guest-ready — without you lifting a finger.',
    intro: `Quick Clean's domestic cleaning service covers every room of your home with a consistent, top-to-bottom checklist. Choose weekly, bi-weekly, or monthly visits and we send the same vetted, insured cleaner each time, or book a one-time clean whenever you need a reset. Many customers start with a deep clean and then keep the result with recurring domestic visits.`,
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
        q: `How much does domestic cleaning cost in ${CITY}?`,
        a: 'Domestic cleans start at AED 99. Recurring plans save up to 20% per visit. You see your exact flat rate before you book, based on home size.',
      },
      {
        q: 'Is domestic cleaning the same as residential cleaning?',
        a: 'Yes — domestic cleaning, residential cleaning, house cleaning, and maid service all describe the same thing: regular cleaning of a private home. We use "domestic cleaning" for our recurring and one-time home visits.',
      },
      {
        q: 'Should I book a deep clean first?',
        a: 'We usually recommend it. A deep clean resets the property properly, and recurring domestic visits then keep it that way for less per visit.',
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

  'move-in-move-out-cleaning': {
    serviceType: 'Move Out Cleaning',
    subhead:
      'Hand back the keys spotless. A full deep clean of the entire empty property so you protect your deposit or welcome new tenants.',
    intro: `Quick Clean's move in / move out cleaning is a full deep clean of an empty property, and it gets the place truly handover-ready. We clean inside cabinets, drawers, appliances, and wardrobes — the areas Dubai landlords, agents, and property managers check first — so tenants protect their security deposit and owners hand over a flawless unit.`,
    turnaround: 'Book around your handover date',
    includes: [
      'Inside all cabinets, drawers, and wardrobes',
      'Inside oven, refrigerator, and microwave',
      'All appliance exteriors and behind where accessible',
      'Skirting boards, doors, and trim wiped down',
      'Bathrooms fully detailed and sanitised',
      'AC vents and grilles dusted',
      'Balconies swept and washed down',
      'Floors vacuumed and mopped throughout',
      'Window interiors, sills, and tracks',
    ],
    idealFor: ['Tenants protecting a deposit', 'Landlords & property managers', 'Agents prepping a listing'],
    faqs: [
      {
        q: 'Will a move-out clean help me get my security deposit back?',
        a: 'Yes — our move-out clean targets exactly what Dubai landlords and agents inspect at handover: inside appliances and cabinets, AC grilles, bathrooms, skirting, and balconies. It is backed by our 100% Spotless Guarantee.',
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
      'Reliable after-hours office and commercial cleaning — plus full office deep cleans — that keep your workspace sharp, healthy, and ready for business.',
    intro: `Quick Clean keeps your workplace spotless with flexible, after-hours commercial cleaning. From offices and clinics to studios and retail, we build a recurring plan around your schedule with vetted, insured pros — so your team walks into a fresh space every morning and never deals with a no-show. Most clients start with a one-off office deep clean, then move onto a recurring contract to hold that standard.`,
    turnaround: 'Custom recurring schedule',
    includes: [
      'Workstations, desks, and common areas',
      'Restrooms cleaned, sanitized, and restocked',
      'Kitchen and break-room surfaces and appliances',
      'Floors vacuumed and mopped throughout',
      'Trash and recycling collected and relined',
      'Glass doors, partitions, and high-touch points',
      'Reception and meeting rooms reset',
      'Optional deep clean: vents, grout, and inside appliances',
      'Custom checklist tailored to your space',
    ],
    idealFor: ['Offices & co-working spaces', 'Medical & dental practices', 'Retail, studios & gyms'],
    faqs: [
      {
        q: 'Do you clean offices after business hours?',
        a: 'Yes. We schedule commercial cleaning around your hours — evenings, early mornings, or weekends — so we never disrupt your team.',
      },
      {
        q: 'Can you deep clean our office?',
        a: 'Yes. An office deep clean covers everything in a routine visit plus AC vents, inside kitchen appliances, grout, skirting boards, and behind furniture. It is usually done over a weekend or evening so nobody loses working time.',
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
      'Deep-extraction carpet cleaning, sofa shampooing, and mattress cleaning that lift stains, odours, allergens, and years of wear.',
    intro: `Quick Clean's carpet and upholstery cleaning uses hot-water extraction — what most people in Dubai call sofa shampooing — to pull out trapped dirt, dust, allergens, and odours that vacuuming leaves behind. Carpets, rugs, sofas, majlis seating, and mattresses come back fresher, brighter, and faster-drying.`,
    turnaround: 'Dries in a few hours',
    includes: [
      'Pre-treatment of stains and high-traffic lanes',
      'Hot-water extraction (steam) deep clean',
      'Sofa shampooing — sofas, chairs, and ottomans',
      'Majlis seating and floor cushions',
      'Mattress deep cleaning and sanitising',
      'Area rugs and runners',
      'Odour and allergen neutralising',
      'Spot treatment for pet accidents',
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
