/* ============================================================
   Additive semantic content for the service pages.
   ------------------------------------------------------------
   Rendered by components/ServiceExtras.js BELOW the existing
   service copy and FAQ. Nothing here replaces existing content,
   metadata or JSON-LD.

   Each service gets
     quickAnswer  a 40 to 60 word answer an AI overview can quote
     context      paragraphs that tie the service to related
                  entities (areas, property types, other services,
                  guides, pricing) with links in the text
     faqs         extra customer questions that the existing FAQ on
                  the page does not ask (time, materials, areas)

   A paragraph is a list of parts. A part is a plain string or
   { t: 'anchor text', href: '/path' }. Plain text rules apply to
   every string (see scripts/check-service-extras.mjs). Prices are
   read from pricing.js.
   ============================================================ */

import { currency, startingPrices } from './pricing.js';
import { areaPath, areas } from './areas.js';
import { guidePath } from './guides.js';

const fmt = currency.format;
const link = (t, href) => ({ t, href });
const area = (slug, t) => link(t, areaPath(slug));
const guide = (slug, t) => link(t, guidePath(slug));
const svc = (slug, t) => link(t, `/services/${slug}`);
const pricing = (t) => link(t, '/pricing');
const AREA_COUNT = areas.length;

const AREAS_ANSWER = `We cover ${AREA_COUNT} communities across Dubai, Sharjah and Ajman, including Dubai Marina, Downtown Dubai, Business Bay, JVC, Palm Jumeirah, Dubai Hills Estate and Arabian Ranches. The same prices apply in every area and there is no travel charge.`;

export const serviceExtras = {
  'residential-cleaning': {
    quickAnswer: `Residential cleaning with Quick Clean is a flat rate by home size, starting at ${fmt(startingPrices.basic)} for a studio or one bedroom apartment in Dubai. A visit usually takes one and a half to three hours and covers the kitchen, bathrooms, bedrooms, living areas and floors. You can book a single visit or a weekly or two weekly plan.`,
    context: [
      [
        `Regular home cleaning is the service most of our customers use. It suits tower apartments in `,
        area('dubai-marina', 'Dubai Marina'),
        ` and `,
        area('business-bay', 'Business Bay'),
        `, family apartments and townhouses in `,
        area('jvc', 'JVC'),
        ` and large villas in `,
        area('arabian-ranches', 'Arabian Ranches'),
        ` and `,
        area('dubai-hills', 'Dubai Hills Estate'),
        `. The work is the same everywhere. Trained cleaners follow one checklist, and the price depends only on the type and size of the home.`,
      ],
      [
        `You choose between three plans. Basic, Standard and Premium differ in who provides the cleaning supplies and the linens, and the `,
        pricing('full price list for every home size'),
        ` shows each rate. If your home has not been cleaned for a while, start with a `,
        svc('deep-cleaning', 'one time deep clean'),
        ` and move to regular visits after that. Our guide on `,
        guide('how-often-to-clean-your-home-in-dubai', 'how often to clean a home in Dubai'),
        ` explains which schedule fits which household.`,
      ],
    ],
    faqs: [
      {
        q: `How long does a regular home clean take?`,
        a: `Most visits take between one and a half and three hours. A studio or one bedroom apartment is at the short end, and a villa takes longer or is done by more than one cleaner. You get an estimated time when you book.`,
      },
      {
        q: `Who brings the cleaning products and equipment?`,
        a: `It depends on the plan. On Standard and Premium we bring the cleaning supplies. On Basic you provide them. If you want a certain product used on a surface, leave it out and tell the cleaner.`,
      },
      {
        q: `Which areas do you cover for residential cleaning?`,
        a: AREAS_ANSWER,
      },
      {
        q: `Do you clean villas as well as apartments?`,
        a: `Yes. We clean studios, apartments, penthouses, townhouses and villas with up to six bedrooms. Villas are cleaned floor by floor, and the price for each size is on the pricing page.`,
      },
    ],
  },

  'deep-cleaning': {
    quickAnswer: `Deep cleaning is a one time, detailed clean of the whole home. It covers everything in a regular clean and adds grout, limescale, skirting boards, vents, cabinet fronts and the areas inside and around appliances. In Dubai most homes need one every three to six months. Quick Clean confirms a fixed price for your property before you book.`,
    context: [
      [
        `Dubai homes build up dirt in ways a weekly clean does not reach. Fine sand settles in window tracks, hard water leaves limescale on taps and shower glass, and air conditioning moves dust onto vents and high ledges. New homes in areas such as `,
        area('dubai-south', 'Dubai South'),
        `, `,
        area('jvc', 'JVC'),
        ` and `,
        area('town-square', 'Town Square'),
        ` also carry building dust inside cupboards and wardrobes. A deep clean deals with all of this in one visit.`,
      ],
      [
        `Many customers book a deep clean first and then keep the home in order with `,
        svc('residential-cleaning', 'weekly or two weekly home cleaning'),
        `. If you are handing a rented home back, a `,
        svc('move-in-move-out-cleaning', 'move out clean'),
        ` is the better choice because it is done in an empty home. Sofas, rugs and mattresses can be added through our `,
        svc('carpet-upholstery-cleaning', 'carpet and upholstery cleaning'),
        `. For a fuller comparison, read `,
        guide('deep-cleaning-vs-regular-cleaning', 'deep cleaning compared with regular cleaning'),
        `.`,
      ],
    ],
    faqs: [
      {
        q: `How long does a deep clean take?`,
        a: `Longer than a regular clean. A small apartment takes several hours, and a large apartment or a villa often takes most of a working day with a team. We give you an estimated time when we confirm the price.`,
      },
      {
        q: `Do you bring the products and equipment for a deep clean?`,
        a: `Yes. The team arrives with the products and equipment the job needs. If a surface such as marble or natural wood needs a product of your own, leave it out and tell us.`,
      },
      {
        q: `Which areas do you cover for deep cleaning?`,
        a: AREAS_ANSWER,
      },
      {
        q: `Do I need to prepare anything before a deep clean?`,
        a: `Clear loose items from floors and counters so the team can reach every surface, and put valuables away. You do not need to move furniture. Tell us about heavy items you want cleaned behind.`,
      },
    ],
  },

  'move-in-move-out-cleaning': {
    quickAnswer: `Move in and move out cleaning is a deep clean of an empty home, done before you unpack or before you hand the keys back. It covers the oven, the inside of every cupboard and wardrobe, bathrooms, floors, windows from the inside and the balcony. Quick Clean confirms a fixed price for your property before you book.`,
    context: [
      [
        `In Dubai a tenant has to return a home in the condition it was received, apart from normal wear, and landlords often deduct cleaning costs from the deposit. That is why a proper move out clean matters in rental areas such as `,
        area('dubai-marina', 'Dubai Marina'),
        `, `,
        area('jlt', 'JLT'),
        `, `,
        area('business-bay', 'Business Bay'),
        ` and `,
        area('al-barsha', 'Al Barsha'),
        `. Our `,
        guide('move-out-cleaning-checklist-dubai', 'move out cleaning checklist for Dubai tenants'),
        ` lists what a landlord looks at, room by room.`,
      ],
      [
        `A move in clean is the same job done for a different reason. New and newly vacated homes often have dust inside the cupboards and marks left by the last tenant or the builders. Once you have settled in, `,
        svc('residential-cleaning', 'regular home cleaning'),
        ` keeps the home in order. Carpets and curtains left in the property can be done with `,
        svc('carpet-upholstery-cleaning', 'carpet and upholstery cleaning'),
        `, and `,
        svc('window-glass-cleaning', 'window and glass cleaning'),
        ` can be added for balcony glass.`,
      ],
    ],
    faqs: [
      {
        q: `How long does a move out clean take?`,
        a: `It depends on the size and condition of the home. A two bedroom apartment usually takes a team most of a day when the oven and bathrooms need real work. We give you an estimated time when we confirm the price.`,
      },
      {
        q: `Do you bring the products and equipment?`,
        a: `Yes. The team brings everything needed for the job. The electricity and water need to be connected on the day, so keep them on until the clean and the inspection are finished.`,
      },
      {
        q: `Which areas do you cover for move in and move out cleaning?`,
        a: AREAS_ANSWER,
      },
      {
        q: `How far ahead should I book?`,
        a: `A few days ahead is best. Book the clean for after the movers have left and at least one day before the handover inspection, so there is time to put right anything that is missed.`,
      },
    ],
  },

  'office-commercial-cleaning': {
    quickAnswer: `Office and commercial cleaning from Quick Clean is a regular service done in the evening or early morning, so staff are not disturbed. It covers desks, meeting rooms, the pantry, washrooms, floors and reception. We visit the premises first, agree the tasks and the schedule with you, and then give one fixed price for each visit.`,
    context: [
      [
        `Most of our office customers are in the business districts, including `,
        area('business-bay', 'Business Bay'),
        `, `,
        area('downtown-dubai', 'Downtown Dubai'),
        `, `,
        area('jlt', 'JLT'),
        ` and `,
        area('dubai-silicon-oasis', 'Dubai Silicon Oasis'),
        `. We also clean clinics, shops and small warehouses in `,
        area('dubai-investment-park', 'Dubai Investment Park'),
        ` and `,
        area('jebel-ali', 'Jebel Ali'),
        `. Tower offices usually need a pass for outside workers, and we arrange that with the building before the first visit.`,
      ],
      [
        `Regular office cleaning keeps a workplace presentable day to day. Carpet tiles, office chairs and reception sofas need a deeper clean a few times a year, which we do with `,
        svc('carpet-upholstery-cleaning', 'carpet and upholstery cleaning'),
        `. Glass partitions and shop fronts are covered by `,
        svc('window-glass-cleaning', 'window and glass cleaning'),
        `. To arrange a visit to your premises, `,
        link('contact our team', '/contact'),
        `.`,
      ],
    ],
    faqs: [
      {
        q: `How long does an office clean take?`,
        a: `It depends on the floor area and the task list. A small office is often done in one to two hours each visit. We agree the time with you after seeing the premises.`,
      },
      {
        q: `Do you bring the cleaning products and equipment?`,
        a: `Yes. We bring the products and equipment. If you want us to use and restock your own supplies, such as hand soap and paper, tell us and we include it in the plan.`,
      },
      {
        q: `Which areas do you cover for office cleaning?`,
        a: AREAS_ANSWER,
      },
      {
        q: `How often can you clean our office?`,
        a: `As often as you need. Daily, several times a week and weekly schedules are all common. The schedule is agreed with you after the first visit and can be changed later.`,
      },
    ],
  },

  'carpet-upholstery-cleaning': {
    quickAnswer: `Carpet and upholstery cleaning from Quick Clean starts at ${fmt(startingPrices.carpetUpholstery)} in Dubai. We deep clean carpets, rugs, sofas, chairs and mattresses to remove dust, stains and odours. Most items are dry within a few hours. Homes with pets, children or allergies should have soft furnishings cleaned every three to six months.`,
    context: [
      [
        `Fabric holds more dust than any hard surface, and in Dubai there is a lot of dust to hold. After a sandstorm, or after a summer with the air conditioning running all day, sofas and rugs can smell dusty even in a clean home. This is common in ground floor homes and villas in `,
        area('arabian-ranches', 'Arabian Ranches'),
        `, `,
        area('mirdif', 'Mirdif'),
        ` and `,
        area('damac-hills', 'DAMAC Hills'),
        `, and in apartments with fitted carpet. Our guide on `,
        guide('cleaning-after-a-sandstorm-dubai', 'cleaning a home after a sandstorm'),
        ` explains what you can do yourself first.`,
      ],
      [
        `This service covers sofa cleaning, rug cleaning, mattress cleaning, dining chairs and majlis seating as well as fitted carpet. It can be booked alone or added to a `,
        svc('deep-cleaning', 'deep clean of the whole home'),
        `. Landlords and tenants often add it to a `,
        svc('move-in-move-out-cleaning', 'move out clean'),
        `, and offices book it for carpet tiles and chairs as part of `,
        svc('office-commercial-cleaning', 'office cleaning'),
        `.`,
      ],
    ],
    faqs: [
      {
        q: `How long does carpet and sofa cleaning take?`,
        a: `A sofa or a single room of carpet usually takes about an hour. Several rooms or a full set of furniture takes longer. Drying takes a few more hours, so plan to keep off the carpet for the rest of the day.`,
      },
      {
        q: `Do you bring your own machine?`,
        a: `Yes. We bring the cleaning machine and the products. We need access to water and electricity, and it helps if there is parking close to the door.`,
      },
      {
        q: `Which areas do you cover for carpet and upholstery cleaning?`,
        a: AREAS_ANSWER,
      },
      {
        q: `Do you clean mattresses and majlis seating?`,
        a: `Yes. Mattresses, majlis seating, dining chairs, armchairs and rugs can all be cleaned. Tell us what you have when you book so we allow enough time.`,
      },
    ],
  },

  'window-glass-cleaning': {
    quickAnswer: `Window and glass cleaning from Quick Clean starts at ${fmt(startingPrices.windowGlass)} in Dubai. We clean windows, balcony doors, glass railings, mirrors and partitions, and clear sand from the tracks. In Dubai, glass picks up dust and salt quickly, so most homes need it every one to two months.`,
    context: [
      [
        `Glass is the first thing to look dirty in a Dubai home. Near the sea in `,
        area('dubai-marina', 'Dubai Marina'),
        `, `,
        area('palm-jumeirah', 'Palm Jumeirah'),
        ` and `,
        area('jumeirah', 'Jumeirah'),
        `, salt leaves a haze on windows and balcony railings. Further inland in `,
        area('dubai-hills', 'Dubai Hills Estate'),
        ` and `,
        area('motor-city', 'Motor City'),
        `, the problem is fine sand on the glass and in the door tracks. Both are dealt with by regular cleaning before the marks set.`,
      ],
      [
        `Window cleaning can be booked alone or added to another visit. Many customers add balcony glass to their `,
        svc('residential-cleaning', 'regular home cleaning'),
        ` every month, and it is usually included when a home gets a `,
        svc('deep-cleaning', 'deep clean'),
        `. Shops and offices with glass fronts and partitions book it as part of `,
        svc('office-commercial-cleaning', 'office and commercial cleaning'),
        `. The starting price is listed with our other `,
        pricing('cleaning prices'),
        `.`,
      ],
    ],
    faqs: [
      {
        q: `How long does window cleaning take?`,
        a: `An apartment usually takes one to two hours, depending on the number of windows and balcony doors. A villa takes longer. We give you an estimated time when you book.`,
      },
      {
        q: `What do you bring for window cleaning?`,
        a: `We bring the tools and the products, including what is needed for the frames and the tracks. We only need access to water.`,
      },
      {
        q: `Which areas do you cover for window and glass cleaning?`,
        a: AREAS_ANSWER,
      },
      {
        q: `How often should windows be cleaned in Dubai?`,
        a: `Every one to two months suits most homes. Homes near the sea or next to open sand may need it monthly, and it is worth doing after any sandstorm.`,
      },
    ],
  },
};

export function getServiceExtras(slug) {
  return serviceExtras[slug] || null;
}

/** Plain text of a rich paragraph, for the copy check and the llms files. */
export function partsToText(parts) {
  return parts.map((p) => (typeof p === 'string' ? p : p.t)).join('');
}
