/* ============================================================
   Area (location) pages — one per community we serve.
   ------------------------------------------------------------
   Each entry renders /cleaning-services-<slug> (see next.config.mjs,
   which rewrites that URL onto app/areas/[area]). The copy below is a
   first draft written for the page; edit freely. Prices come from
   lib/pricing.js through `propertySizeKeys`, which picks the rows of
   the size matrix that fit the area's housing stock.

   `updatedAt` feeds <lastmod> in the sitemap — bump it when you edit
   an area's content.
   ============================================================ */

import { southAreas } from './area-pages/south.js';
import { westAreas } from './area-pages/west.js';
import { villaAreas } from './area-pages/villas.js';
import { centralAreas } from './area-pages/central.js';

export const AREA_PATH_PREFIX = '/cleaning-services-';
export const AREAS_HUB_PATH = '/areas';

export function areaPath(slug) {
  return `${AREA_PATH_PREFIX}${slug}`;
}

const coreAreas = [
  {
    slug: 'dubai-marina',
    name: 'Dubai Marina',
    containedIn: 'Dubai',
    updatedAt: '2026-10-25',
    metaDescription:
      'House cleaning in Dubai Marina for tower apartments from studios to 3 BR. Vetted, insured cleaners, flat prices by apartment size, and tower access handled.',
    propertySizeKeys: ['studio-1br', '2br', '3br', '4br'],
    intro: [
      `Dubai Marina is almost entirely high-rise living. Towers such as Marina Gate, Cayan Tower, Princess Tower, Marina Promenade, Park Island and the long run of buildings along Marina Walk hold tens of thousands of apartments, most of them studios, one-bedroom and two-bedroom units, with a smaller number of three-bedroom apartments, duplexes and penthouses on the higher floors. Many homes here are rented, a large share are furnished holiday lets, and the turnover between tenants and guests is constant. That is exactly the kind of place where a reliable, repeatable clean matters more than anywhere else in the city.`,
      `Quick Clean provides house cleaning services in Dubai Marina for residents, landlords and short-stay hosts. Our cleaners work from the same top-to-bottom checklist on every visit: kitchen counters, hob and appliance fronts, bathrooms descaled and sanitised, floors vacuumed and mopped, dusting of surfaces and skirting, bins emptied and beds made. Deep cleans go further into grout, extractor fans, inside the oven and fridge, balcony glass and the sliding-door tracks that collect fine sand after every windy day on the water.`,
      `Marina apartments have a few quirks we plan for. Floor-to-ceiling glass and balcony railings pick up salt haze and dust quickly, so we include interior glass and balcony wipe-downs in deep cleans and can add exterior-reachable glass on request. Open-plan kitchens mean cooking residue travels further, so appliance fronts, backsplashes and the extractor hood get real attention. Most units have one or two bathrooms with glass shower screens, which we treat for limescale on every visit rather than only when it becomes visible.`,
      `Access is the main practical question in the Marina. Almost every tower has a staffed reception, visitor registration and separate service lifts, and several require a pre-registered gate pass for contractors. When you book, tell us the tower name, unit number and whether the building needs a pass or an Emirates ID copy in advance; we will arrange it before the appointment so the cleaner is not held at the desk. For furnished holiday homes we can collect and return keys from a concierge or a lockbox, and send photos when the apartment is guest-ready.`,
      `Parking is tight. Visitor bays in most towers are limited and often paid, and street parking along Marina Walk and Al Marsa Street is metered and busy. Our cleaners typically arrive by Metro (DMCC and Sobha Realty stations) or the Dubai Tram, which stops within a short walk of most buildings, so parking is rarely an issue on our side. If your building offers a contractor bay or basement visitor parking, let us know and we will use it for deep cleans that involve heavier equipment, such as carpet and upholstery extraction.`,
      `Pricing in Dubai Marina follows our standard flat-rate matrix by apartment size, shown below, so a studio or one-bedroom apartment pays the entry rate and a three-bedroom apartment pays the three-bedroom rate, with no hourly meter. Same-day and next-day slots are usually available, early-morning and evening visits suit shift workers and holiday-let turnovers, and recurring weekly or bi-weekly plans get the same cleaner each time and save up to 20% per visit.`,
    ],
    faqs: [
      {
        q: 'How much does house cleaning cost in Dubai Marina?',
        a: 'Cleaning in Dubai Marina is priced by apartment size, not by the hour. A studio or one-bedroom apartment starts at the entry rate for the clean type you choose (Basic, Standard, Deep or Move in / out), and the full table for Marina apartment sizes is on this page. You see the flat price before you book.',
      },
      {
        q: 'Can you get into my tower without me being there?',
        a: 'Yes. Most Marina towers need a visitor registration or a gate pass for contractors. Give us the tower name and unit number when you book and we will arrange access in advance, collect keys from the concierge or a lockbox, and return them the same way.',
      },
      {
        q: 'Do you clean furnished holiday homes between guests?',
        a: 'Yes. We offer turnover cleans for short-stay apartments in Dubai Marina, including fresh linen changes where you provide the linen, restocking checks and a photo report when the apartment is guest-ready. Recurring hosts get a dedicated cleaner who knows the unit.',
      },
      {
        q: 'Is parking a problem for your cleaners in the Marina?',
        a: 'No. Our cleaners usually arrive by Metro or tram, so limited visitor parking does not affect your booking. For deep cleans that involve carpet-extraction equipment we will ask whether your building has a contractor or visitor bay.',
      },
      {
        q: 'Can you book a same-day clean in Dubai Marina?',
        a: 'Usually, yes. Same-day and next-day slots are often available for Marina apartments, including early-morning and evening visits. Book online in about a minute and pick the earliest slot that suits you.',
      },
    ],
    nearby: ['business-bay', 'downtown-dubai', 'jvc'],
  },
  {
    slug: 'downtown-dubai',
    name: 'Downtown Dubai',
    containedIn: 'Dubai',
    updatedAt: '2026-10-25',
    metaDescription:
      'House cleaning in Downtown Dubai for Boulevard towers, Old Town and Burj Khalifa district apartments. Flat prices by size, vetted cleaners, access arranged.',
    propertySizeKeys: ['studio-1br', '2br', '3br', '4br'],
    intro: [
      `Downtown Dubai packs a huge amount of residential space into a small, busy district. Along Mohammed Bin Rashid Boulevard and around the Burj Khalifa you will find tower apartments in buildings such as Boulevard Central, South Ridge, 29 Boulevard, Burj Vista, Standpoint and the Opera District towers, while Old Town and Old Town Island offer lower-rise, Arabian-style buildings with larger floor plans, courtyards and more storage. Studios and one-bedroom apartments dominate the towers; two and three-bedroom apartments are common in Old Town and on the higher floors of the Boulevard buildings, and there is a steady population of serviced and short-stay apartments throughout.`,
      `Quick Clean provides house cleaning services in Downtown Dubai for owners, tenants and holiday-home operators. Every visit follows the same checklist: kitchen surfaces, hob and appliance fronts, bathrooms descaled and sanitised, floors vacuumed and mopped, dusting of furniture, ledges and skirting, bins emptied and beds made. Deep cleans add grout, inside the oven and fridge, cabinet fronts, extractor fans, interior glass and the window tracks that fill with fine dust from the constant construction and Boulevard traffic nearby.`,
      `Downtown homes are often finished to a high standard, with marble floors, glossy cabinetry and a lot of glass, so we match products to the surface. Natural stone gets a pH-neutral cleaner rather than an acidic descaler, lacquered fronts are wiped with microfibre rather than abrasive pads, and glass balustrades and balcony doors facing the fountain and the Burj are left streak-free. Many apartments here are shown to prospective tenants or guests regularly, so we pay attention to the details people notice first: mirrors, chrome, entryways and the view line through the windows.`,
      `Access in Downtown Dubai is well organised but strict. Emaar-managed towers have staffed receptions, visitor registration and in several cases a requirement for contractors to be pre-registered with the building management. When you book, give us the building name, unit number and any access rules, and we will complete the registration before the visit. For holiday homes and serviced apartments we can coordinate with the operator, collect keys from a concierge or lockbox, and send a photo report when the apartment is ready for the next guest.`,
      `Parking is possible but not free. Most Boulevard towers have basement visitor parking with ticket validation at reception, and there is paid parking along the Boulevard and in the Dubai Mall car parks, but traffic peaks around the mall and the fountain shows in the evening. Our cleaners generally arrive by Metro (Burj Khalifa/Dubai Mall station) and the Dubai Mall feeder buses, so your booking is not affected by parking availability. For carpet and upholstery cleaning, which needs equipment, we will ask for a visitor bay in advance.`,
      `Pricing for Downtown Dubai follows our flat-rate matrix by apartment size, listed below, so a one-bedroom Boulevard apartment and a three-bedroom Old Town apartment each have a clear price before you confirm. Same-day and next-day appointments are usually available, early and late slots suit residents who work in DIFC and the business district, and recurring plans give you the same cleaner on every visit at up to 20% less per clean.`,
    ],
    faqs: [
      {
        q: 'How much does house cleaning cost in Downtown Dubai?',
        a: 'Downtown Dubai cleaning is a flat rate by apartment size, shown in the table on this page. Studios and one-bedroom apartments pay the entry rate for the clean type you choose, larger apartments pay the rate for their size, and the price is confirmed before you book. No hourly charges.',
      },
      {
        q: 'Do you clean Old Town and Old Town Island apartments as well as the towers?',
        a: 'Yes. We clean apartments across Downtown Dubai, including the low-rise Old Town and Old Town Island buildings, the Boulevard towers, the Opera District and the serviced-apartment buildings around the Burj Khalifa.',
      },
      {
        q: 'My building requires contractors to be registered. Can you handle that?',
        a: 'Yes. Give us the building name and unit number when you book and we will complete any visitor or contractor registration with the building management before the appointment, so the cleaner is not delayed at reception.',
      },
      {
        q: 'Are your products safe on marble floors and stone counters?',
        a: 'Yes. Many Downtown apartments have natural stone, so we use pH-neutral cleaners on marble and stone and keep acidic descalers for ceramic, chrome and glass only. Tell us about any special surfaces when you book.',
      },
      {
        q: 'Can I get a regular cleaner for my Downtown apartment?',
        a: 'Yes. On weekly, bi-weekly or monthly plans we send the same vetted cleaner each visit, so they learn your apartment and your preferences. Recurring plans also save up to 20% per visit compared with one-off cleans.',
      },
    ],
    nearby: ['business-bay', 'dubai-marina', 'jvc'],
  },
  {
    slug: 'jvc',
    name: 'JVC',
    longName: 'Jumeirah Village Circle (JVC)',
    containedIn: 'Dubai',
    updatedAt: '2026-10-25',
    metaDescription:
      'House cleaning in JVC (Jumeirah Village Circle) for apartments, townhouses and villas. Flat prices by home size, vetted insured cleaners and same-day slots.',
    propertySizeKeys: ['studio-1br', '2br', '3br', '4br', '5br'],
    intro: [
      `Jumeirah Village Circle, better known as JVC, is one of the fastest-growing family communities in Dubai and one of the most varied in its housing. The circular district between Al Khail Road and Hessa Street mixes mid-rise apartment buildings, long rows of townhouses and clusters of standalone villas, all set around parks and the central village areas. Apartments run from compact studios and one-bedroom units in the newer towers to spacious two and three-bedroom family apartments; townhouses are typically two to four bedrooms over two floors, and the villas go up to five bedrooms with gardens and private garages.`,
      `Quick Clean provides house cleaning services in JVC for all three property types. Apartment visits follow our standard checklist across the kitchen, bathrooms, bedrooms and living areas, with floors vacuumed and mopped and every surface dusted. Townhouse and villa cleans are planned room by room across the floors, including staircases, landings, the maid's room if used as storage, and the ground-floor areas that collect the most sand. Deep cleans add grout, inside appliances, cabinet fronts, extractor fans, window tracks and the glass that overlooks the garden or the community park.`,
      `JVC is still being built out, and that shapes what our cleaners find. Homes in newer buildings and recently handed-over townhouses often carry a fine layer of construction dust on ledges, inside cabinets and along the tops of doors and wardrobes, which a normal weekly wipe never fully removes. We recommend a deep clean or a move-in clean as the first visit in any JVC home that is new or has been empty, then a Standard clean on a recurring schedule. Families with children and pets, who make up a large share of the community, tend to choose weekly or bi-weekly plans.`,
      `Access and parking are easier in JVC than in the tower districts. Most apartment buildings have a caretaker or small reception rather than a formal gate-pass system, and townhouses and villas are reached directly from the street or a private driveway. There is usually free on-street or visitor parking close to the building, which lets our cleaners bring equipment for carpet, upholstery and deep cleans without arrangement. Tell us the building or cluster name and any access code or caretaker contact when you book, and whether a garden, balcony or garage should be included.`,
      `One practical note for JVC residents: the community sits beside major roads and open desert, so dust builds up fast on balconies, window sills and external glass, and sandy footprints reach the ground floor on every windy day. We mop hard floors on every visit as standard, and we can add balcony and sill cleaning to a recurring plan so the outdoor areas stay usable all year.`,
      `Pricing in JVC follows our flat-rate matrix by home size, shown below, which covers everything from a studio apartment to a five-bedroom villa. Same-day and next-day slots are usually available, and because the community is central to our cleaners' routes, morning, afternoon and evening appointments are all easy to arrange. Recurring customers get the same cleaner each time and save up to 20% on every visit.`,
    ],
    faqs: [
      {
        q: 'How much does house cleaning cost in JVC?',
        a: 'Cleaning in JVC is a flat rate by home size, from a studio apartment up to a five-bedroom villa. The table on this page shows the rate for every size and clean type, and you see your exact price before booking. Recurring plans save up to 20% per visit.',
      },
      {
        q: 'Do you clean villas and townhouses in JVC, or only apartments?',
        a: 'All three. We clean apartments, townhouses and standalone villas across Jumeirah Village Circle, and the visit is planned floor by floor for multi-level homes, including staircases, landings and the ground-floor areas that collect the most sand.',
      },
      {
        q: 'Our JVC home is newly handed over and full of construction dust. Where should we start?',
        a: 'Start with a deep clean or a move-in clean. New JVC homes usually carry fine construction dust inside cabinets, on ledges and on top of doors and wardrobes, which a standard clean is not designed to remove. After that first visit, a recurring Standard clean keeps the home maintained.',
      },
      {
        q: 'Is parking available for your cleaners in JVC?',
        a: 'Yes. Most JVC buildings and clusters have free on-street or visitor parking nearby, so our cleaners can bring equipment for carpet, upholstery and deep cleans without special arrangements. Let us know any access code or caretaker contact when you book.',
      },
      {
        q: 'Can you include the balcony, garden or garage in a JVC clean?',
        a: 'Yes. Balconies, window sills, garden patios and garage floors can be added to any visit or built into a recurring plan. Tell us what to include when you book and the flat price is confirmed before the clean.',
      },
    ],
    nearby: ['dubai-marina', 'business-bay', 'downtown-dubai'],
  },
  {
    slug: 'business-bay',
    name: 'Business Bay',
    containedIn: 'Dubai',
    updatedAt: '2026-10-25',
    metaDescription:
      'House and office cleaning in Business Bay for canal-side towers, serviced apartments and workplaces. Flat prices by size and after-hours office cleaning.',
    propertySizeKeys: ['studio-1br', '2br', '3br'],
    intro: [
      `Business Bay stretches along both banks of the Dubai Water Canal, just south of Downtown, and is a true mixed-use district: residential towers, serviced apartments, hotels and office buildings sit side by side, often in the same tower. Residential stock is dominated by studios and one-bedroom apartments in buildings such as the Executive Towers, DAMAC Towers by Paramount, Bay Square, Churchill Towers, Vera and the newer canal-front developments, with two and three-bedroom apartments on the higher floors and in the family-oriented towers. A large share of homes are furnished and let on short or medium terms, and a significant number of residents also work in the district.`,
      `Quick Clean provides house cleaning in Business Bay for residents, landlords and holiday-let operators, and after-hours office cleaning for the businesses that share these towers. Residential visits follow our standard checklist in the kitchen, bathrooms, bedrooms and living space, with floors vacuumed and mopped and surfaces dusted, and deep cleans add grout, inside appliances, extractor fans, interior glass and balcony doors. Office visits are built around your own checklist: workstations, meeting rooms, pantry, washrooms and reception, scheduled in the evening or early morning so your team never sees a cleaner at work.`,
      `Apartments in Business Bay tend to be compact, modern and heavy on glass, with open kitchens that put cooking residue on more surfaces than a closed kitchen would. We give appliance fronts, backsplashes and extractor hoods proper attention on every visit, keep glass shower screens free of limescale, and leave the balcony doors and canal-facing windows streak-free. For furnished short-stay units we offer turnover cleans with linen changes where linen is provided, restocking checks and a photo report when the apartment is guest-ready.`,
      `Access in Business Bay is tower-managed. Expect a staffed reception, visitor registration and in many buildings a contractor pass or a pre-approval from the building management, and separate service lifts. When you book, give us the tower name, unit or office number and any access rules, and we will handle the registration before the appointment. For offices we can hold keys or access cards under a signed agreement so that recurring evening cleans run without anyone needing to stay late.`,
      `Parking is limited and mostly paid. Visitor bays in the towers are scarce, and the surrounding streets are metered and congested during office hours, with heavy traffic at the Al Khail Road and Sheikh Zayed Road junctions at peak times. Our cleaners typically arrive by Metro (Business Bay station) or on foot from Downtown, so parking does not affect residential bookings. For carpet and upholstery cleaning or large office jobs that need equipment, we will ask for a loading bay or a visitor space in advance.`,
      `Residential pricing in Business Bay follows our flat-rate matrix by apartment size, shown below, with studios and one-bedroom apartments at the entry rate. Office and commercial cleaning is quoted after a free walkthrough, based on the floor area, frequency and checklist, and comes back as a flat recurring rate. Same-day and next-day residential slots are usually available, and recurring customers get the same cleaner each visit at up to 20% less per clean.`,
    ],
    faqs: [
      {
        q: 'How much does apartment cleaning cost in Business Bay?',
        a: 'Business Bay apartments are priced by size, not by the hour. Studios and one-bedroom apartments pay the entry rate for the clean type you choose, and the full table of Business Bay apartment sizes is on this page. The flat price is confirmed before you book.',
      },
      {
        q: 'Do you clean offices in Business Bay as well as homes?',
        a: 'Yes. We provide after-hours office and commercial cleaning across Business Bay on a recurring schedule built around your own checklist. Request a free walkthrough and we will send a flat recurring quote based on the floor area and frequency.',
      },
      {
        q: 'Can you clean a short-stay apartment between guests?',
        a: 'Yes. We offer turnover cleans for furnished and serviced apartments in Business Bay, with linen changes where you provide linen, restocking checks and a photo report when the unit is ready for the next guest. Regular hosts get a dedicated cleaner.',
      },
      {
        q: 'How does tower access work for a cleaner in Business Bay?',
        a: 'Most towers need visitor registration or a contractor pass. Give us the tower name and unit number when you book and we will arrange access in advance, collect keys from the concierge or a lockbox and return them the same way. For offices we can hold keys or access cards under a signed agreement.',
      },
      {
        q: 'Can you clean my Business Bay apartment while I am at work?',
        a: 'Yes. Most customers in Business Bay give us access instructions and come home to a clean apartment. Early-morning, daytime and evening slots are all available, and on recurring plans the same cleaner visits each time.',
      },
    ],
    nearby: ['downtown-dubai', 'dubai-marina', 'jvc'],
  },
  {
    slug: 'sharjah',
    name: 'Sharjah',
    containedIn: 'United Arab Emirates',
    updatedAt: '2026-10-25',
    metaDescription:
      'House cleaning in Sharjah for apartments in Al Nahda, Al Majaz, Al Khan and Muwaileh and villas across the city. Flat prices by home size, insured cleaners.',
    propertySizeKeys: ['studio-1br', '2br', '3br', '4br', '5br', '6br'],
    intro: [
      `Sharjah is home to a huge number of families who want a bigger home than the same budget buys in Dubai, and the housing reflects that. The apartment districts of Al Nahda, Al Taawun, Al Majaz, Al Khan, Al Qasimia and Abu Shagara are full of mid and high-rise buildings with generous two and three-bedroom apartments, many with maid's rooms and large kitchens, while Muwaileh, University City and the newer Aljada and Al Zahia developments add modern one to three-bedroom apartments and townhouses. Villa areas such as Al Falaj, Al Ramtha, Al Fisht, Sharjah Garden City and Al Rahmaniya hold three to six-bedroom family villas with gardens, majlis rooms and multiple bathrooms.`,
      `Quick Clean provides house cleaning services across Sharjah for apartments, townhouses and villas. Every visit covers the kitchen, bathrooms, bedrooms and living areas, with floors vacuumed and mopped and surfaces dusted, and larger homes are planned floor by floor so nothing is missed on landings, staircases, the majlis or the guest bathrooms. Deep cleans add grout, inside the oven and fridge, cabinet fronts, extractor fans, ceiling fans, window tracks and the balcony or courtyard surfaces that collect sand after every windy day.`,
      `Sharjah homes are typically larger and busier than Dubai apartments, with more bathrooms, more kitchen use and more foot traffic, so we size each visit to the property rather than to a fixed number of hours. A three-bedroom apartment in Al Majaz with three bathrooms is priced and planned differently from a studio, and a six-bedroom villa in Al Ramtha is scheduled with the right number of cleaners to finish in one visit. Dust is the constant challenge in the city, so hard floors are mopped on every visit and window sills, balcony rails and external glass can be added to any recurring plan.`,
      `Access in Sharjah is straightforward in most districts. Apartment buildings usually have a watchman or caretaker rather than a formal pass system, and villas are reached directly from the street, so our cleaners can arrive and start without registration. In the newer towers along Al Majaz waterfront and Al Khan, there may be a reception and visitor registration; tell us the building name and apartment number when you book and we will arrange it. For villas, let us know whether the garden, external majlis, driveway or garage should be included and whether there is an outside tap for washing floors.`,
      `Parking is generally easy outside the densest areas. Villa streets and most residential districts have free on-street parking, which lets our cleaners bring equipment for carpet, upholstery and deep cleans. In Al Nahda, Al Taawun and parts of Al Majaz, parking is paid and competitive during the day, so we favour morning appointments there. Travel between Dubai and Sharjah is slow at the morning and evening peaks on Al Ittihad Road and Sheikh Mohammed Bin Zayed Road, which is why we schedule Sharjah visits in blocks and give you a reliable arrival window rather than a vague morning or afternoon.`,
      `Pricing in Sharjah follows the same flat-rate matrix by home size that we use everywhere, from a studio apartment to a six-bedroom villa, shown below. There is no travel surcharge for Sharjah. Same-day and next-day slots are usually available, weekend appointments are popular with families, and recurring weekly or bi-weekly plans send the same cleaner each time and save up to 20% on every visit.`,
    ],
    faqs: [
      {
        q: 'How much does house cleaning cost in Sharjah?',
        a: 'Cleaning in Sharjah is a flat rate by home size, from a studio apartment to a six-bedroom villa, with no travel surcharge. The table on this page shows the rate for every size and clean type, and the exact price is confirmed before you book. Recurring plans save up to 20% per visit.',
      },
      {
        q: 'Which areas of Sharjah do you cover?',
        a: 'We clean across Sharjah city, including Al Nahda, Al Taawun, Al Majaz, Al Khan, Al Qasimia, Abu Shagara, Muwaileh, University City, Aljada, Al Zahia and the villa districts such as Al Falaj, Al Ramtha, Al Fisht, Sharjah Garden City and Al Rahmaniya. If your area is not listed, ask when you book.',
      },
      {
        q: 'Do you clean large villas in Sharjah in a single visit?',
        a: 'Yes. Villas are planned floor by floor and staffed with the right number of cleaners to finish in one visit, including staircases, the majlis, guest bathrooms and, if you wish, the garden, external majlis and garage. Tell us the number of bedrooms and bathrooms when you book.',
      },
      {
        q: 'Can I book a weekend cleaning in Sharjah?',
        a: 'Yes. Saturday appointments are available and popular with families in Sharjah. Same-day and next-day weekday slots are usually available as well, and recurring plans can be set to any day of the week.',
      },
      {
        q: 'Do your cleaners bring their own supplies and equipment to Sharjah?',
        a: 'Yes. Our cleaners arrive with professional, eco-friendly products and equipment, including everything needed for deep cleans and, when booked, carpet and upholstery extraction. If you prefer specific products, leave them out and let us know.',
      },
    ],
    nearby: ['ajman', 'jvc', 'business-bay'],
  },
  {
    slug: 'ajman',
    name: 'Ajman',
    containedIn: 'United Arab Emirates',
    updatedAt: '2026-10-25',
    metaDescription:
      'House cleaning in Ajman for Corniche and Al Nuaimiya apartments and villas in Al Rawda, Al Mowaihat and Al Zahra. Flat prices by home size, insured cleaners.',
    propertySizeKeys: ['studio-1br', '2br', '3br', '4br', '5br', '6br'],
    intro: [
      `Ajman is the smallest emirate but a busy residential one, with a growing population of families and commuters who want space at an affordable price. The apartment districts of Al Nuaimiya, Al Rashidiya, Al Rumailah and Ajman Downtown are lined with mid and high-rise buildings offering roomy one, two and three-bedroom apartments, many with large kitchens and balconies, while the Corniche towers and Ajman One offer newer sea-facing apartments. Villa communities such as Al Rawda, Al Mowaihat, Al Zahra, Al Jurf, Al Helio and Al Yasmeen hold three to six-bedroom family villas with gardens, majlis rooms, driveways and several bathrooms.`,
      `Quick Clean provides house cleaning services across Ajman for apartments, townhouses and villas. Each visit covers the kitchen, bathrooms, bedrooms and living areas, with floors vacuumed and mopped, surfaces dusted, bins emptied and beds made, and multi-floor villas are planned floor by floor so staircases, landings, the majlis and guest bathrooms are all included. Deep cleans add grout, inside the oven and fridge, cabinet fronts, extractor fans, ceiling fans, window tracks and the balcony or courtyard surfaces that gather sand.`,
      `Homes in Ajman are typically larger and more lived-in than a city-centre apartment, with more bathrooms and heavier kitchen use, so we size each visit to the property rather than to a fixed number of hours. Sand and dust are the constant challenge, especially in the villa areas close to open land and along the Corniche where sea air leaves a film on glass and railings, so hard floors are mopped on every visit and window sills, balcony rails and reachable external glass can be built into any recurring plan.`,
      `Access in Ajman is simple in most districts. Apartment buildings usually have a watchman or a small reception rather than a formal pass system, and villas are reached directly from the street or a private driveway, so our cleaners can arrive and begin without advance registration. In the newer Corniche towers and Ajman One there may be a reception and visitor sign-in; give us the building name and apartment number when you book and we will arrange it. For villas, tell us whether the garden, external majlis, driveway or garage should be included and whether there is an outside tap.`,
      `Parking is rarely a problem. Villa streets and most residential districts have free on-street parking close to the door, which lets our cleaners bring equipment for carpet, upholstery and deep cleans without arrangement. Parking is busier around Ajman Downtown and the Corniche in the evenings, so we favour morning and early-afternoon appointments there. Our team travels to Ajman via Sheikh Mohammed Bin Zayed Road and Emirates Road and schedules visits in blocks to avoid the peak-hour traffic through Sharjah, so you get a reliable arrival window.`,
      `Pricing in Ajman follows the same flat-rate matrix by home size that we use everywhere, from a studio apartment to a six-bedroom villa, shown below, and there is no travel surcharge. Same-day and next-day slots are usually available, Saturday appointments suit families, and recurring weekly or bi-weekly plans send the same cleaner on every visit and save up to 20% per clean.`,
    ],
    faqs: [
      {
        q: 'How much does house cleaning cost in Ajman?',
        a: 'Cleaning in Ajman is a flat rate by home size, from a studio apartment to a six-bedroom villa, with no travel surcharge. The table on this page shows the rate for every size and clean type, and the price is confirmed before you book. Recurring plans save up to 20% per visit.',
      },
      {
        q: 'Which parts of Ajman do you serve?',
        a: 'We clean across Ajman, including Al Nuaimiya, Al Rashidiya, Al Rumailah, Ajman Downtown, the Corniche towers and Ajman One, and the villa communities of Al Rawda, Al Mowaihat, Al Zahra, Al Jurf, Al Helio and Al Yasmeen. If your area is not listed, ask when you book.',
      },
      {
        q: 'Do you clean villas in Ajman, including the garden and majlis?',
        a: 'Yes. We clean three to six-bedroom villas across Ajman, planned floor by floor and staffed to finish in one visit. The garden patio, external majlis, driveway and garage can be included on request. Tell us the number of bedrooms and bathrooms when you book.',
      },
      {
        q: 'Is there an extra charge for travelling to Ajman?',
        a: 'No. Ajman is part of our regular service area and is priced from the same flat-rate table as Dubai and Sharjah, with no travel surcharge. We schedule Ajman visits in blocks and give you a reliable arrival window.',
      },
      {
        q: 'Can I get the same cleaner every time in Ajman?',
        a: 'Yes. On weekly, bi-weekly or monthly plans we send the same vetted cleaner each visit, so they learn your home and your preferences. Recurring plans also save up to 20% per visit compared with one-off cleans.',
      },
    ],
    nearby: ['sharjah', 'jvc', 'business-bay'],
  },
];

/* The six original areas first, then the groups added on 2026-10-25. */
export const areas = [...coreAreas, ...southAreas, ...westAreas, ...villaAreas, ...centralAreas];

export function getArea(slug) {
  return areas.find((a) => a.slug === slug) || null;
}

/* Areas highlighted on service pages, the contact and about pages and in the
   footer. The /areas hub page lists every area. */
export const featuredAreaSlugs = [
  'dubai-marina',
  'downtown-dubai',
  'business-bay',
  'jvc',
  'palm-jumeirah',
  'jlt',
  'dubai-hills',
  'arabian-ranches',
  'al-barsha',
  'deira-bur-dubai',
  'sharjah',
  'ajman',
];

export function featuredAreas() {
  return featuredAreaSlugs.map(getArea).filter(Boolean);
}

/** The areas an area page links to as nearby (its own `nearby` list). */
export function nearbyAreas(area) {
  return (area?.nearby || []).map(getArea).filter(Boolean);
}

/* Grouping for the /areas hub page. */
export const areaRegions = [
  { name: 'Dubai Marina and the coast', slugs: ['dubai-marina', 'jlt', 'palm-jumeirah', 'jumeirah'] },
  { name: 'Downtown and central Dubai', slugs: ['downtown-dubai', 'business-bay', 'al-barsha', 'dubai-hills'] },
  {
    name: 'New Dubai and the south',
    slugs: ['jvc', 'dubai-sports-city', 'motor-city', 'al-furjan', 'discovery-gardens', 'jebel-ali', 'dubai-investment-park', 'expo-city', 'dubai-south'],
  },
  { name: 'Villa communities', slugs: ['arabian-ranches', 'damac-hills', 'mudon', 'town-square'] },
  { name: 'Old Dubai and the east', slugs: ['deira-bur-dubai', 'mirdif', 'dubai-silicon-oasis'] },
  { name: 'Northern Emirates', slugs: ['sharjah', 'ajman'] },
];

export function areasByRegion() {
  const placed = new Set();
  const groups = areaRegions.map((r) => {
    const list = r.slugs.map(getArea).filter(Boolean);
    list.forEach((a) => placed.add(a.slug));
    return { name: r.name, areas: list };
  });
  const rest = areas.filter((a) => !placed.has(a.slug));
  if (rest.length) groups.push({ name: 'More areas', areas: rest });
  return groups;
}

/** Most recent updatedAt across all areas (feeds the hub page's lastmod). */
export function areasUpdatedAt() {
  return areas.map((a) => a.updatedAt).sort().at(-1);
}

/** Display name with the long form where one exists, e.g. "Jumeirah Village Circle (JVC)". */
export function areaDisplayName(area) {
  return area.longName || area.name;
}

/** Word count of an area's intro — handy when editing copy (target: 500+). */
export function areaWordCount(area) {
  return area.intro.join(' ').split(/\s+/).filter(Boolean).length;
}
