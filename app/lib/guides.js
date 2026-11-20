/* ============================================================
   Guides: long form answers to the questions people ask before
   they book a cleaner in Dubai.
   ------------------------------------------------------------
   Single source for the /guides hub, each /guides/<slug> page,
   the Article and FAQ schema, the sitemap and the llms files.

   Plain text rules apply to every string here, the same ones the
   area pages follow (see scripts/check-guide-copy.mjs): no dashes,
   slashes, ampersands, semicolons, colons, brackets or characters
   outside printable ASCII. Every price is read from pricing.js so
   a guide can never drift from the published price card.
   ============================================================ */

import { cleanTypes, currency, propertySizes, startingPrices } from './pricing.js';

export const GUIDES_PATH = '/guides';
export const guidePath = (slug) => `${GUIDES_PATH}/${slug}`;

const fmt = currency.format;

/** Published flat rate for a plan and unit type, formatted. */
function price(planKey, sizeKey) {
  const plan = cleanTypes.find((t) => t.key === planKey);
  const i = propertySizes.findIndex((s) => s.key === sizeKey);
  if (!plan || i < 0) throw new Error(`guides.js: no price for ${planKey} ${sizeKey}`);
  return fmt(plan.prices[i]);
}

const basicFrom = fmt(startingPrices.basic);
const standardFrom = fmt(startingPrices.standard);
const premiumFrom = fmt(startingPrices.premium);

export const guides = [
  {
    slug: 'house-cleaning-cost-dubai',
    title: 'How Much Does House Cleaning Cost in Dubai',
    short: 'House cleaning cost in Dubai',
    updatedAt: '2026-11-20',
    metaDescription: `What house cleaning costs in Dubai, how hourly and flat rate pricing compare, and the full Quick Clean price list from ${basicFrom} per visit.`,
    answer: `House cleaning in Dubai is sold in two ways, by the hour or as a flat rate for the home. Quick Clean charges a flat rate by unit type. A studio or one bedroom apartment costs ${basicFrom} on the Basic plan, ${standardFrom} on Standard and ${premiumFrom} on Premium, and a six bedroom villa costs ${price('basic', '6br-villa')} to ${price('premium', '6br-villa')}.`,
    sections: [
      {
        h: 'The two ways cleaning is priced in Dubai',
        p: [
          `Most cleaning in Dubai is sold by the hour. You choose how many cleaners and how many hours, and you pay for the time whether or not the home is finished. It looks cheap on the booking screen, but the final cost depends on how fast the cleaner works and how well you guessed the hours. If the visit runs short, the last rooms get rushed or skipped.`,
          `The other way is a flat rate for the home. The company prices the job by the type and size of the property, and the price does not change if the work takes longer than planned. This is how Quick Clean prices every regular clean. You see the full amount before you book and the cleaner stays until the checklist is done.`,
        ],
      },
      {
        h: 'Quick Clean prices for apartments',
        p: [
          `Apartment prices rise with the number of bedrooms. These are the published rates per visit.`,
        ],
        list: [
          `Studio or one bedroom apartment. Basic ${price('basic', 'studio-1br')}, Standard ${price('standard', 'studio-1br')}, Premium ${price('premium', 'studio-1br')}.`,
          `Two bedroom apartment. Basic ${price('basic', '2br-apt')}, Standard ${price('standard', '2br-apt')}, Premium ${price('premium', '2br-apt')}.`,
          `Three bedroom apartment. Basic ${price('basic', '3br-apt')}, Standard ${price('standard', '3br-apt')}, Premium ${price('premium', '3br-apt')}.`,
          `Four bedroom apartment or penthouse. Basic ${price('basic', '4br-apt')}, Standard ${price('standard', '4br-apt')}, Premium ${price('premium', '4br-apt')}.`,
        ],
      },
      {
        h: 'Quick Clean prices for villas',
        p: [
          `Villas cost more than apartments with the same number of bedrooms because they have more floors, more bathrooms and more floor area to cover.`,
        ],
        list: [
          `Three bedroom villa. Basic ${price('basic', '3br-villa')}, Standard ${price('standard', '3br-villa')}, Premium ${price('premium', '3br-villa')}.`,
          `Four bedroom villa. Basic ${price('basic', '4br-villa')}, Standard ${price('standard', '4br-villa')}, Premium ${price('premium', '4br-villa')}.`,
          `Five bedroom villa. Basic ${price('basic', '5br-villa')}, Standard ${price('standard', '5br-villa')}, Premium ${price('premium', '5br-villa')}.`,
          `Six bedroom villa. Basic ${price('basic', '6br-villa')}, Standard ${price('standard', '6br-villa')}, Premium ${price('premium', '6br-villa')}.`,
        ],
      },
      {
        h: 'What the three plans include',
        p: [
          `The plans differ in who provides the linens and the supplies, not in how carefully the home is cleaned.`,
        ],
        list: [
          `Basic covers cleaning, housekeeping and laundry. You provide the linens and the cleaning supplies.`,
          `Standard covers cleaning and laundry, and we bring the cleaning supplies. You provide the linens.`,
          `Premium is the full service. We provide the cleaning, the linens and laundry, the supplies and the guest amenities.`,
        ],
      },
      {
        h: 'What changes the price of a clean',
        p: [
          `Four things decide what a clean costs anywhere in Dubai. The first is the size and type of the home. The second is the kind of clean, because a deep clean or a move out clean takes far longer than a regular visit. The third is who supplies the products and equipment. The fourth is how often you book, since recurring visits are quicker for the cleaner than a first visit to a home that has not been cleaned for a while.`,
          `Add on work is priced separately. With Quick Clean, carpet and upholstery cleaning starts at ${fmt(startingPrices.carpetUpholstery)} and window and glass cleaning starts at ${fmt(startingPrices.windowGlass)}. Deep cleaning and move in or move out cleaning are quoted for your property before you book, because the condition of the home matters more than its size.`,
        ],
      },
      {
        h: 'How to compare two quotes fairly',
        p: [
          `Ask each company the same five questions. Is the price fixed or by the hour? Are supplies and equipment included? How many cleaners will come and for how long? What happens if you are not happy with part of the clean? Is there a travel charge for your area? A low hourly rate with no supplies, one cleaner and no guarantee often costs more than a flat rate once the visit is over.`,
        ],
      },
    ],
    faqs: [
      {
        q: `What is the cheapest house cleaning price with Quick Clean?`,
        a: `The lowest plan price is ${basicFrom} for a Basic clean of a studio or one bedroom apartment. Standard for the same home is ${standardFrom} and Premium is ${premiumFrom}.`,
      },
      {
        q: `How much does it cost to clean a two bedroom apartment in Dubai?`,
        a: `With Quick Clean a two bedroom apartment costs ${price('basic', '2br-apt')} on Basic, ${price('standard', '2br-apt')} on Standard and ${price('premium', '2br-apt')} on Premium, per visit, as a flat rate.`,
      },
      {
        q: `Is there a travel charge for my area?`,
        a: `No. The same flat rates apply in every community we serve across Dubai, Sharjah and Ajman.`,
      },
      {
        q: `Why is deep cleaning not on the price list?`,
        a: `A deep clean depends on the condition of the home as much as its size, so we confirm a flat price for your property before you book rather than publish a figure that may not fit.`,
      },
    ],
    services: ['residential-cleaning', 'deep-cleaning'],
  },

  {
    slug: 'deep-cleaning-vs-regular-cleaning',
    title: 'Deep Cleaning vs Regular Cleaning and Which One You Need',
    short: 'Deep cleaning vs regular cleaning',
    updatedAt: '2026-11-20',
    metaDescription: `The difference between a deep clean and a regular clean, what each one covers, how long they take and how to tell which one your home in Dubai needs.`,
    answer: `A regular clean maintains a home that is already in good order. It covers surfaces, floors, the kitchen and the bathrooms. A deep clean resets a home. It adds the slow detailed work a regular visit has no time for, such as grout, skirting boards, vents, door frames and the areas inside and behind appliances. Most homes need one deep clean first and regular cleans after that.`,
    sections: [
      {
        h: 'What a regular clean covers',
        p: [
          `A regular clean keeps a home at the standard it already has. It is built around the things that get dirty every week.`,
        ],
        list: [
          `Kitchen counters, sink, hob and the outside of appliances wiped down.`,
          `Bathrooms cleaned, including the toilet, shower, bath, basin and mirror.`,
          `All reachable surfaces and fixtures dusted.`,
          `Carpets and rugs vacuumed and hard floors mopped.`,
          `Beds made and living areas tidied.`,
          `Bins emptied and liners replaced.`,
          `Switches, handles and other high touch points wiped.`,
        ],
      },
      {
        h: 'What a deep clean adds',
        p: [
          `A deep clean includes everything above and then goes after the build up that a weekly visit never reaches.`,
        ],
        list: [
          `Skirting boards, door frames and trim wiped by hand.`,
          `Tile and grout scrubbed in the kitchen and bathrooms.`,
          `Limescale and soap build up removed from showers and taps.`,
          `Cabinet fronts and splashbacks degreased.`,
          `The inside of the microwave and the areas around and behind appliances.`,
          `Vents, fans and light fittings dusted.`,
          `Window sills, tracks and ledges cleaned out.`,
        ],
      },
      {
        h: 'How long each one takes',
        p: [
          `A regular clean usually takes between one and a half and three hours, depending on the size and condition of the home. A deep clean takes noticeably longer, often most of a working day for a large apartment or a villa, and it is usually done by a team rather than one person. That extra time is the reason the two are priced differently.`,
        ],
      },
      {
        h: 'Signs your home needs a deep clean',
        p: [
          `You do not need a deep clean every month. You need one when a regular clean no longer makes the home look clean.`,
        ],
        list: [
          `The grout between tiles has turned grey or brown.`,
          `Taps and shower glass have a white crust that wiping does not move.`,
          `There is a sticky film on kitchen cabinet doors near the hob.`,
          `Dust has gathered on air conditioning vents and the tops of doors.`,
          `The home has not been professionally cleaned for three months or more.`,
          `You have just taken the keys to a new home or finished a renovation.`,
          `Guests are coming to stay or a new baby is on the way.`,
        ],
      },
      {
        h: 'Why Dubai homes need deep cleans more often',
        p: [
          `Three things about Dubai speed up the build up. Fine sand gets in through window tracks and balcony doors even when they are closed. The water is hard enough in many buildings to leave limescale on taps and glass within weeks. Air conditioning runs for most of the year and moves dust around the home, so vents and the tops of furniture collect it quickly. A home that would manage on one deep clean a year elsewhere often needs two or three here.`,
        ],
      },
      {
        h: 'The pattern that works for most homes',
        p: [
          `Start with one deep clean. Follow it with a regular clean every week or every two weeks. Book another deep clean every three to six months, or after the summer when the dust and humidity have done their work. Starting a recurring plan without a deep clean first means the cleaner spends every visit catching up rather than maintaining.`,
          `With Quick Clean, regular cleans are a flat rate by unit type from ${basicFrom}. Deep cleans are quoted for your property before you book.`,
        ],
      },
    ],
    faqs: [
      {
        q: `Can I book a regular clean for a home that really needs a deep clean?`,
        a: `You can, but the result will disappoint. A regular visit does not include the time for grout, limescale and built up grease, so the home will look tidy rather than clean. One deep clean first makes every later visit worth more.`,
      },
      {
        q: `How often should I book a deep clean in Dubai?`,
        a: `Every three to six months suits most homes. Homes with pets, young children or a lot of cooking are better at every three months, and homes cleaned weekly can stretch to six.`,
      },
      {
        q: `Is a move out clean the same as a deep clean?`,
        a: `It is a deep clean of an empty home with extra attention to the things a landlord checks, such as the inside of cupboards, the oven, the balcony and marks on the walls.`,
      },
      {
        q: `Do I need to move furniture before a deep clean?`,
        a: `No. The cleaners move light furniture themselves. Tell us in advance about heavy items you want cleaned behind so the team plans for it.`,
      },
    ],
    services: ['deep-cleaning', 'residential-cleaning'],
  },

  {
    slug: 'move-out-cleaning-checklist-dubai',
    title: 'Move Out Cleaning Checklist for Dubai Tenants',
    short: 'Move out cleaning checklist',
    updatedAt: '2026-11-20',
    metaDescription: `A room by room move out cleaning checklist for Dubai tenants, what landlords check at handover and how to protect your security deposit.`,
    answer: `Under Dubai tenancy law a tenant must hand the property back in the condition it was received, apart from ordinary wear and tear. In practice that means an empty, fully cleaned home with the oven, cupboards, bathrooms, balcony and floors all done. Cleaning is one of the most common reasons landlords deduct from the security deposit, so it is worth doing properly and keeping photos.`,
    sections: [
      {
        h: 'What the law and your landlord expect',
        p: [
          `Article 21 of Dubai Law 26 of 2007 says the tenant must return the property in the same condition it was in when the lease began, except for ordinary wear and tear. Faded paint and light marks from furniture are wear and tear. Grease in the oven, limescale in the shower and a dusty balcony are not.`,
          `The security deposit in Dubai is usually 5 percent of the annual rent for an unfurnished home and 10 percent for a furnished one. The landlord can deduct the cost of cleaning and repairs from it. If you disagree with a deduction, the Rental Dispute Centre is the body that hears the case, and photos taken on handover day are the best evidence you can bring.`,
        ],
      },
      {
        h: 'Kitchen checklist',
        p: [`The kitchen is where most deductions start, so give it the most time.`],
        list: [
          `Oven, grill and hob degreased inside and out, including the trays and racks.`,
          `Extractor hood and its filter cleaned.`,
          `Fridge and freezer emptied, defrosted, wiped inside and left with the doors open.`,
          `Every cupboard and drawer emptied and wiped inside.`,
          `Sink, taps and drain descaled.`,
          `Splashback and worktops cleaned of grease and stains.`,
          `Washing machine drawer and door seal wiped.`,
        ],
      },
      {
        h: 'Bathroom checklist',
        p: [`Bathrooms are judged on limescale and grout.`],
        list: [
          `Shower glass, taps and shower heads descaled.`,
          `Tile grout scrubbed and any mould removed.`,
          `Toilet cleaned inside, outside and behind.`,
          `Basin, vanity unit and mirror cleaned, with cupboards emptied.`,
          `Extractor fan cover dusted.`,
          `Floor drains cleared of hair.`,
        ],
      },
      {
        h: 'Bedrooms and living areas checklist',
        p: [`With the furniture gone, everything that was hidden is on show.`],
        list: [
          `Wardrobes emptied and wiped inside, including the top shelves.`,
          `Skirting boards, door frames and doors wiped.`,
          `Light switches and sockets wiped.`,
          `Air conditioning vents dusted.`,
          `Windows cleaned inside and the tracks cleared of sand.`,
          `Floors vacuumed and mopped, including the corners where furniture stood.`,
          `Scuffs and marks on walls gently cleaned where the paint allows.`,
        ],
      },
      {
        h: 'Balcony, storage and outside areas',
        p: [`These are the areas tenants forget and landlords always open.`],
        list: [
          `Balcony floor swept and washed, railings and glass wiped.`,
          `Storage room and utility cupboard emptied and swept.`,
          `For villas, the garage floor swept and the patio washed down.`,
          `All rubbish removed from the property, not left by the door.`,
        ],
      },
      {
        h: 'The order to do things in',
        p: [
          `Timing matters as much as effort. Follow this order and the clean only has to be done once.`,
        ],
        list: [
          `Tell your landlord or agent your handover date in writing.`,
          `Book the movers and get a move out permit from the building management if your building requires one.`,
          `Do repairs first, such as filling nail holes and replacing dead bulbs.`,
          `Clean after the movers have left, so the home is empty.`,
          `Take dated photos and a video of every room once the clean is finished.`,
          `Keep the electricity and water connected until the handover inspection is over, then request your final bill.`,
        ],
      },
      {
        h: 'Doing it yourself or hiring a team',
        p: [
          `A move out clean of an empty two bedroom apartment takes two people most of a day if the oven and bathrooms need real work. If you are packing, working and arranging movers in the same week, a professional team is usually the safer choice. Quick Clean quotes move out cleans for your property before you book, and if the inspection finds an area that is not right, tell us within 24 hours and we come back and clean it again at no charge.`,
        ],
      },
    ],
    faqs: [
      {
        q: `Can my landlord deduct cleaning costs from my deposit in Dubai?`,
        a: `Yes, if the home is not returned in the condition it was received. The landlord cannot charge for ordinary wear and tear, and you can take a disputed deduction to the Rental Dispute Centre.`,
      },
      {
        q: `Should I clean before or after the movers come?`,
        a: `After. An empty home lets the cleaners reach the floors, skirting boards and the inside of every wardrobe and cupboard, which is exactly what the inspection looks at.`,
      },
      {
        q: `Does a move out clean include painting?`,
        a: `No. Cleaning and painting are separate jobs. Check your tenancy contract, because some contracts ask the tenant to repaint and some do not.`,
      },
      {
        q: `How far ahead should I book a move out clean?`,
        a: `A few days ahead is best, and at least one day before the handover inspection so there is time to fix anything that is missed.`,
      },
    ],
    services: ['move-in-move-out-cleaning', 'deep-cleaning'],
  },

  {
    slug: 'how-often-to-clean-your-home-in-dubai',
    title: 'How Often Should You Clean Your Home in Dubai',
    short: 'How often to clean your home',
    updatedAt: '2026-11-20',
    metaDescription: `A practical cleaning schedule for Dubai homes, with what to do daily, weekly, monthly and each season, and how often to book a professional cleaner.`,
    answer: `Most homes in Dubai do best with a professional clean every one or two weeks and a deep clean every three to six months. Households with children or pets usually need weekly visits. A single person or a couple in a small apartment can manage on a visit every two weeks. Dust and limescale build up faster here than in cooler, wetter climates, so monthly visits are rarely enough on their own.`,
    sections: [
      {
        h: 'Why Dubai homes get dirty faster',
        p: [
          `Fine desert sand is always in the air and it finds its way in through window tracks, balcony doors and the air conditioning. Humidity is high through the summer months, which encourages mould in bathrooms and around window seals. The water leaves limescale on taps, shower glass and kettles. None of this is a sign of a badly kept home. It simply means the schedule that worked in another country will fall short here.`,
        ],
      },
      {
        h: 'How often to book a cleaner by household',
        p: [`Use the number of people and how the home is used as your guide.`],
        list: [
          `Family with children. Weekly.`,
          `Home with a dog or a cat. Weekly, with extra attention to floors and sofas.`,
          `Couple or two sharers who both work. Every two weeks.`,
          `One person in a studio or one bedroom apartment. Every two weeks.`,
          `Home that is empty for much of the year. Once a month, plus a clean before each stay.`,
          `Villa with a garden and outdoor seating. Weekly inside, with patios and outdoor glass every two to four weeks.`,
        ],
      },
      {
        h: 'Jobs to do every day or two',
        p: [`These take minutes and stop the weekly clean from turning into a rescue.`],
        list: [
          `Wipe kitchen counters and the hob after cooking.`,
          `Wash up or run the dishwasher.`,
          `Squeegee the shower glass after use to slow limescale.`,
          `Take out food waste, which attracts insects quickly in the heat.`,
        ],
      },
      {
        h: 'Jobs to do every week',
        p: [`This is what a regular professional clean covers.`],
        list: [
          `Vacuum and mop all floors.`,
          `Clean bathrooms fully.`,
          `Dust surfaces, shelves and electronics.`,
          `Change bed linen.`,
          `Wipe handles, switches and remote controls.`,
          `Sweep the balcony.`,
        ],
      },
      {
        h: 'Jobs to do every month',
        p: [`These are easy to forget because the dirt is out of sight.`],
        list: [
          `Wipe air conditioning vents and clean or rinse the filters.`,
          `Clear sand from window and balcony door tracks.`,
          `Clean inside the microwave and wipe the fridge shelves.`,
          `Descale the kettle and the shower head.`,
          `Wash the balcony floor and wipe the railings.`,
        ],
      },
      {
        h: 'Jobs to do every three to six months',
        p: [`This is the deep clean list.`],
        list: [
          `Scrub tile grout in the kitchen and bathrooms.`,
          `Degrease cabinet fronts and the extractor hood.`,
          `Clean behind and under the fridge, cooker and washing machine.`,
          `Have carpets, rugs and sofas professionally cleaned.`,
          `Wash curtains or have blinds dusted and wiped.`,
          `Clean windows inside and out where they can be reached safely.`,
        ],
      },
      {
        h: 'Adjusting for the seasons',
        p: [
          `Summer is the hard season. Windows stay shut, the air conditioning runs all day and humidity rises, so bathrooms and vents need more attention and a deep clean at the end of summer is well timed. From late winter into spring the shamal winds bring dust storms, and balconies and window tracks need clearing after each one. Before long holidays, when many residents travel, a clean on the day you leave means you do not come home to stale air and dust.`,
          `Recurring plans with Quick Clean start at ${basicFrom} per visit for a studio or one bedroom apartment, and on a recurring plan the same cleaner comes each time.`,
        ],
      },
    ],
    faqs: [
      {
        q: `Is a monthly clean enough for an apartment in Dubai?`,
        a: `Only for a home that is lightly used. For a home that is lived in every day, dust and limescale build up too far in four weeks, and each visit becomes a deep clean rather than a regular one.`,
      },
      {
        q: `How often should air conditioning vents be cleaned?`,
        a: `Wipe the vents and rinse the filters about once a month. The ducts and the unit itself should be serviced by an air conditioning company, usually once or twice a year.`,
      },
      {
        q: `How often should carpets and sofas be cleaned?`,
        a: `Every six months suits most homes, and every three to four months if you have pets, young children or allergies.`,
      },
      {
        q: `Does weekly cleaning cost more per visit than cleaning every two weeks?`,
        a: `The published flat rate is per visit by unit type, and recurring customers can save up to 20 percent on each clean after the first.`,
      },
    ],
    services: ['residential-cleaning', 'deep-cleaning', 'carpet-upholstery-cleaning'],
  },

  {
    slug: 'holiday-home-turnover-cleaning-dubai',
    title: 'Holiday Home Turnover Cleaning Checklist for Dubai Hosts',
    short: 'Holiday home turnover cleaning',
    updatedAt: '2026-11-20',
    metaDescription: `A turnover cleaning checklist for Dubai holiday home hosts, covering linens, restocking, timing between guests and what a turnover costs by unit size.`,
    answer: `A turnover clean prepares a holiday home for the next guest between check out and check in. It covers a full clean, fresh linens and towels, restocked supplies and a check for damage or missing items. In Dubai the window is usually only four or five hours. Quick Clean prices turnovers as a flat rate by unit type, from ${basicFrom} to ${premiumFrom} for a studio or one bedroom apartment depending on who provides the linens and supplies.`,
    sections: [
      {
        h: 'How a turnover differs from a normal clean',
        p: [
          `A normal clean is for the person who lives in the home. A turnover is for a stranger who has seen photos and paid for a hotel standard. That changes the job. Hair in a drain or a mark on a pillowcase that a resident would ignore becomes a bad review. A turnover also includes tasks that are not cleaning at all, such as counting towels, checking the remote controls work and reporting a broken glass.`,
          `Holiday homes in Dubai are licensed by the Department of Economy and Tourism, and guests can complain to the platform or the authority about cleanliness. A reliable turnover routine protects both your rating and your permit.`,
        ],
      },
      {
        h: 'Turnover checklist for every room',
        p: [`Work through the home in the same order every time so nothing is missed.`],
        list: [
          `Strip all beds and remake them with fresh linen, checking the mattress protector for stains.`,
          `Replace bath towels, hand towels and bath mats.`,
          `Clean bathrooms fully and clear every drain of hair.`,
          `Clean the kitchen, including inside the microwave, the fridge and the oven if it was used.`,
          `Wash, dry and put away all dishes, and empty the dishwasher.`,
          `Dust surfaces, wipe mirrors and glass, and remove fingerprints from switches and handles.`,
          `Vacuum and mop all floors, including under the beds and the sofa.`,
          `Sweep the balcony and wipe the outdoor furniture.`,
          `Empty every bin and take the rubbish out of the unit.`,
        ],
      },
      {
        h: 'Restocking and checks',
        p: [`These are the items guests notice within the first ten minutes.`],
        list: [
          `Toilet paper, hand soap, shampoo and shower gel.`,
          `Dishwashing liquid, a clean sponge and bin liners.`,
          `Drinking water, tea and coffee if you provide them.`,
          `Air conditioning set to a comfortable temperature before arrival.`,
          `Lights, television, remote controls and the internet connection tested.`,
          `Lost property collected and reported to the host.`,
          `Damage, stains and missing items photographed and reported the same day.`,
        ],
      },
      {
        h: 'Timing between guests',
        p: [
          `Most Dubai listings use a late morning check out and a mid afternoon check in, which leaves four to five hours. A studio or one bedroom apartment can be turned over well inside that. A three bedroom apartment or a villa needs a team rather than one cleaner. Laundry is the bottleneck. A second and third set of linen for every bed means the cleaner can remake the beds straight away and the washing can follow, and it is the single change that makes same day turnovers reliable.`,
        ],
      },
      {
        h: 'What a turnover costs with Quick Clean',
        p: [
          `The three plans suit the way hosts work. The price is per turnover and depends on the unit type and on who provides the linens and supplies.`,
        ],
        list: [
          `Basic, from ${basicFrom}. Cleaning, housekeeping and laundry, with linens and supplies provided by the owner.`,
          `Standard, from ${standardFrom}. Cleaning and laundry with our cleaning supplies, and linens provided by the owner.`,
          `Premium, from ${premiumFrom}. The full service, with linens, laundry, supplies and guest amenities provided by us.`,
          `A two bedroom apartment costs ${price('basic', '2br-apt')}, ${price('standard', '2br-apt')} or ${price('premium', '2br-apt')} on the three plans.`,
          `A four bedroom villa costs ${price('basic', '4br-villa')}, ${price('standard', '4br-villa')} or ${price('premium', '4br-villa')} on the three plans.`,
        ],
      },
      {
        h: 'Keeping standards up between deep cleans',
        p: [
          `Turnovers keep a unit presentable but they do not stop slow build up. Plan a deep clean every two to three months for a busy listing, with grout, limescale, the oven, the vents and the sofa all done, and schedule it for a gap between bookings. Have carpets and upholstery cleaned at the same time. Hosts who do this find that each turnover is quicker and that cleanliness scores stay steady through the high season.`,
        ],
      },
    ],
    faqs: [
      {
        q: `How long does a turnover clean take?`,
        a: `It depends on the size of the unit and how the guests left it. A studio or one bedroom apartment fits comfortably between a late morning check out and an afternoon check in, and larger units are handled by a team so they fit the same window.`,
      },
      {
        q: `Can you provide the linens and guest amenities?`,
        a: `Yes. On the Premium plan we provide linens, laundry, cleaning supplies and guest amenities. On Standard we bring the supplies and you provide the linens, and on Basic you provide both.`,
      },
      {
        q: `Do you report damage or missing items?`,
        a: `Ask for it when you book. The cleaner can photograph anything broken, stained or missing and send it to you on the day, so you can raise it with the guest or the platform in time.`,
      },
      {
        q: `Can I book turnovers at short notice?`,
        a: `Same day and next day slots are often available. For a busy listing, tell us your bookings as they come in so each turnover is scheduled early.`,
      },
    ],
    services: ['residential-cleaning', 'deep-cleaning', 'carpet-upholstery-cleaning'],
  },

  {
    slug: 'hourly-maid-vs-flat-rate-cleaning-dubai',
    title: 'Hourly Maid Service or Flat Rate Cleaning in Dubai',
    short: 'Hourly maid vs flat rate cleaning',
    updatedAt: '2026-11-20',
    metaDescription: `Hourly maid service and flat rate cleaning compared for Dubai homes, with how each is priced, what can go wrong and which suits your home.`,
    answer: `Hourly maid service charges for time, so you pay for the hours booked whether or not the home is finished. Flat rate cleaning charges for the result, so the price is fixed for your home and the cleaner stays until the checklist is done. Hourly suits small top up jobs where you direct the work. Flat rate suits full home cleans where you want a known price and a known outcome.`,
    sections: [
      {
        h: 'How hourly maid service works',
        p: [
          `You book a number of cleaners for a number of hours, usually with a minimum of two hours. Cleaning materials are often an extra charge per hour. The cleaner arrives, you tell them what to do, and they stop when the time is up. The advertised hourly rate is low, which is why this is the most common way to book a cleaner in Dubai.`,
          `The weakness is that all the risk sits with you. If you guess too few hours, the last rooms are rushed or left. If you guess too many, you pay for time you did not need. The total also grows once materials, a second cleaner and any minimum booking are added.`,
        ],
      },
      {
        h: 'How flat rate cleaning works',
        p: [
          `The company prices the job by the type and size of the home and commits to a checklist. You know the total before you book. If the work takes longer than planned, that is the company's problem rather than yours. Quick Clean works this way. A two bedroom apartment is ${price('basic', '2br-apt')}, ${price('standard', '2br-apt')} or ${price('premium', '2br-apt')} per visit depending on the plan, and that figure does not move on the day.`,
        ],
      },
      {
        h: 'Side by side',
        p: [`The differences that matter in practice.`],
        list: [
          `Price certainty. Hourly depends on how long the job takes. Flat rate is fixed before you book.`,
          `Who plans the work. With hourly, you direct the cleaner. With flat rate, the cleaner follows a set checklist.`,
          `If the job runs over. With hourly you pay more or accept less. With flat rate the cleaner finishes at no extra cost.`,
          `Supplies. Often an extra charge with hourly bookings. With flat rate it depends on the plan and is stated up front.`,
          `Quality guarantee. Rare with hourly bookings, since you bought time. Quick Clean will clean any area again at no charge if you tell us within 24 hours.`,
          `Best for. Hourly suits ironing, a quick tidy or one room. Flat rate suits a full home clean.`,
        ],
      },
      {
        h: 'When hourly is the better choice',
        p: [
          `Hourly service makes sense when the job is small and you know exactly what you want done. Two hours of ironing, a kitchen tidy after a dinner, or help with one room before guests arrive are all good examples. It also suits people who are at home and like to direct the work themselves.`,
        ],
      },
      {
        h: 'When flat rate is the better choice',
        p: [
          `Flat rate is the better choice for a full clean of the home, for recurring weekly or two weekly visits, for villas where it is hard to guess the hours, and for anyone who will not be at home during the clean. It is also the safer choice for holiday homes, where the unit has to be guest ready by a fixed time and nobody is there to supervise.`,
        ],
      },
      {
        h: 'Questions to ask before you book either',
        p: [`Whichever you choose, get clear answers to these.`],
        list: [
          `What is the total I will pay, including materials and any fees?`,
          `Is there a minimum number of hours or a travel charge?`,
          `Are the cleaners employed by the company and insured?`,
          `Will the same cleaner come each time?`,
          `What happens if I am not happy with the result?`,
        ],
      },
    ],
    faqs: [
      {
        q: `Is flat rate cleaning more expensive than hourly?`,
        a: `Not necessarily. Once materials, a minimum booking and a second cleaner are added, an hourly booking for a full home often costs the same or more, without a fixed result.`,
      },
      {
        q: `What if my home is much dirtier than average?`,
        a: `Tell us when you book. A home that has not been cleaned for a long time may need a deep clean first, which is quoted for your property, and regular flat rate visits after that.`,
      },
      {
        q: `Can I add extra tasks to a flat rate clean?`,
        a: `Yes. Carpet and upholstery cleaning starts at ${fmt(startingPrices.carpetUpholstery)} and window and glass cleaning starts at ${fmt(startingPrices.windowGlass)}, and both can be added to a visit.`,
      },
      {
        q: `Do I need to be home for a flat rate clean?`,
        a: `No. Most customers leave access instructions and come home to a clean house. You are welcome to be there if you prefer.`,
      },
    ],
    services: ['residential-cleaning', 'office-commercial-cleaning'],
  },

  {
    slug: 'how-to-prepare-for-a-cleaning-visit',
    title: 'How to Prepare Your Home for a Professional Cleaner',
    short: 'How to prepare for a cleaner',
    updatedAt: '2026-11-20',
    metaDescription: `Ten minutes of preparation that gets you a better professional clean, with what to tidy, what to tell your cleaner and how access works in Dubai buildings.`,
    answer: `You do not need to clean before the cleaner comes. You only need to clear the way. Pick up clothes, toys and loose items so surfaces and floors can be reached, put away valuables and documents, arrange building access and tell the cleaner about anything fragile or anything you want done first. Ten minutes of preparation means the visit is spent cleaning rather than tidying.`,
    sections: [
      {
        h: 'Tidy, do not clean',
        p: [
          `A cleaner cannot wipe a counter that is covered in post or vacuum a floor covered in toys. Every minute spent moving things is a minute not spent cleaning. Before the visit, do a quick pass through each room.`,
        ],
        list: [
          `Pick clothes up off floors, beds and chairs.`,
          `Put toys in their boxes.`,
          `Clear kitchen counters of dishes and food.`,
          `Stack loose papers in one place and say whether they should be left alone.`,
          `Clear the floor of the shower and the edge of the bath.`,
        ],
      },
      {
        h: 'Put away what matters',
        p: [
          `Reputable cleaners are vetted and insured, and problems are rare. It is still sensible to put cash, jewellery, passports and important documents in a drawer or a safe. It removes any chance of something being moved and mislaid, and it lets the cleaner work without worrying about delicate personal items.`,
        ],
      },
      {
        h: 'Arrange access in advance',
        p: [
          `Access is the most common reason a clean starts late in Dubai. Sort it out when you book rather than on the day.`,
        ],
        list: [
          `Tell building security or reception that a cleaner is expected, and register them as a visitor if your tower requires it.`,
          `Share the gate code or community pass details for gated villa communities.`,
          `Say where visitors can park, especially if the cleaner is bringing carpet or upholstery equipment.`,
          `If you will be out, leave the key or access card with reception, or share the door code.`,
          `Give a phone number that will be answered if the cleaner is held at the gate.`,
        ],
      },
      {
        h: 'Tell the cleaner what you want',
        p: [
          `A two minute message saves a lot of guessing. Say which rooms matter most, which surfaces need special care such as marble, natural wood or a delicate hob, and whether there are rooms to skip. If you have a product you prefer for a particular surface, leave it out on the counter. If someone in the home has allergies or asthma, mention that too.`,
        ],
      },
      {
        h: 'Pets and children',
        p: [
          `Let the cleaner know about pets before the visit. Keep dogs in one room or take them out for a walk during the clean, both for the comfort of the pet and so that doors can be opened freely. Cats usually hide and are fine. With small children at home, plan for one room at a time to be out of bounds while the floor dries.`,
        ],
      },
      {
        h: 'On the day and afterwards',
        p: [
          `If you are home, walk the cleaner through the house at the start and then leave them to work. At the end, look at the kitchen, the bathrooms and the floors, which are the places where the difference shows. If something is not right, say so straight away or within 24 hours. With Quick Clean, any area you are not happy with is cleaned again at no charge.`,
          `On a recurring plan the same cleaner returns each time, so the briefing gets shorter with every visit. After two or three cleans most customers stop preparing at all beyond picking things up off the floor.`,
        ],
      },
    ],
    faqs: [
      {
        q: `Should I clean before the cleaner arrives?`,
        a: `No. Tidy loose items away so surfaces and floors are clear, and leave the actual cleaning to the cleaner. That is what you are paying for.`,
      },
      {
        q: `Do I need to provide cleaning products?`,
        a: `It depends on the plan. On Standard and Premium we bring the cleaning supplies. On Basic the owner provides them. If you have a product you prefer, leave it out and tell us.`,
      },
      {
        q: `Do I need to be home during the clean?`,
        a: `No. Most customers give secure access instructions and come home to a clean house. You are welcome to stay if you prefer.`,
      },
      {
        q: `Should I tip my cleaner in Dubai?`,
        a: `Tipping is not required. It is a personal choice, and some customers tip after a particularly good clean or on a recurring plan around holidays.`,
      },
    ],
    services: ['residential-cleaning', 'deep-cleaning'],
  },

  {
    slug: 'cleaning-after-a-sandstorm-dubai',
    title: 'How to Clean Your Home After a Sandstorm in Dubai',
    short: 'Cleaning after a sandstorm',
    updatedAt: '2026-11-20',
    metaDescription: `Step by step cleaning after a Dubai sandstorm, covering balconies, window tracks, air conditioning filters, floors and soft furnishings.`,
    answer: `After a sandstorm, wait until the dust has settled, then work from the outside in and from the top down. Start with the balcony and the window tracks, rinse the air conditioning filters, dust high surfaces with a damp cloth, then vacuum and mop the floors last. Use damp cloths and a vacuum rather than a dry duster or a broom, which only lift the fine dust back into the air.`,
    sections: [
      {
        h: 'Before the storm arrives',
        p: [
          `A few minutes of preparation halves the cleaning afterwards. Close all windows and balcony doors and check that they are latched. Bring cushions, rugs and laundry in from the balcony. Lay a rolled towel along the bottom of balcony doors and any window that does not seal well. If your air conditioning has a fresh air setting, switch it to recirculate until the storm has passed.`,
        ],
      },
      {
        h: 'Wait for the dust to settle',
        p: [
          `Fine dust stays in the air for hours after the wind drops. If you clean too early it simply settles again on the surfaces you have just wiped. Wait until the air outside looks clear, which is often the next morning, before you start on the balcony and the windows.`,
        ],
      },
      {
        h: 'Step by step, from the outside in',
        p: [`Follow this order so you are never cleaning the same surface twice.`],
        list: [
          `Sweep the balcony gently, then wash the floor with water and wipe the railings and furniture.`,
          `Vacuum the sand out of window and balcony door tracks, then wipe them with a damp cloth.`,
          `Wipe the window sills and the inside of the glass.`,
          `Remove the air conditioning filters, rinse them under running water, let them dry fully and refit them.`,
          `Wipe the air conditioning vents and the tops of doors, wardrobes and shelves with a damp cloth.`,
          `Dust tables, counters, electronics and other surfaces, rinsing the cloth often.`,
          `Vacuum sofas, cushions, curtains and mattresses.`,
          `Vacuum all floors, including under the furniture, then mop hard floors with clean water changed often.`,
        ],
      },
      {
        h: 'Mistakes that make it worse',
        p: [`Sand is abrasive and the fine dust is very light, so some habits do real harm.`],
        list: [
          `Using a dry duster or a feather duster, which throws the dust back into the air.`,
          `Sweeping indoor floors with a broom instead of vacuuming.`,
          `Wiping glass, screens or polished surfaces with a dry cloth, which can scratch them.`,
          `Mopping before vacuuming, which turns the dust into mud in the grout lines.`,
          `Forgetting the air conditioning filters, so the unit blows dust around for weeks.`,
        ],
      },
      {
        h: 'Carpets, sofas and curtains',
        p: [
          `Soft furnishings hold more dust than any hard surface. Vacuum them slowly, going over each area more than once. If people in the home are sneezing or the room smells dusty a few days later, the dust is in the fabric, and a professional carpet and upholstery clean is the fix. With Quick Clean that service starts at ${fmt(startingPrices.carpetUpholstery)}.`,
        ],
      },
      {
        h: 'Villas and ground floor homes',
        p: [
          `Homes at ground level take in far more sand than apartments on high floors. After a storm, hose down the patio and the paths before anyone walks the sand inside, clear the tracks of every sliding door, and sweep the garage. Outdoor glass and window frames can be rinsed with water first and then wiped, never wiped dry. Check the outdoor air conditioning units for a layer of sand on the fins, and have them serviced if the cooling drops.`,
        ],
      },
      {
        h: 'When to call in a cleaner',
        p: [
          `If the storm was heavy, if a window or balcony door was left open, or if someone in the home has asthma or allergies, a professional clean is worth it. Ask for a deep clean rather than a regular visit if dust has reached inside cupboards and wardrobes. Storms are most common from late winter through spring and again in summer, so many households time a deep clean for the end of the dusty season.`,
        ],
      },
    ],
    faqs: [
      {
        q: `How soon after a sandstorm should I clean?`,
        a: `Wait until the dust has settled and the air outside is clear, usually the next morning. Cleaning during the storm or straight after it means the dust settles again on clean surfaces.`,
      },
      {
        q: `How do I get sand out of window tracks?`,
        a: `Vacuum the loose sand first with a narrow nozzle, loosen what is left with a small dry brush, vacuum again and finish with a damp cloth.`,
      },
      {
        q: `Should I clean my air conditioning after a sandstorm?`,
        a: `Yes. Rinse and dry the filters and wipe the vents after any heavy storm. If the air still smells dusty or the cooling is weaker, book a service with an air conditioning company.`,
      },
      {
        q: `Is a regular clean enough after a sandstorm?`,
        a: `After a light storm with the windows shut, yes. After a heavy storm, or if a door or window was open, a deep clean is the better choice because dust will have reached inside cupboards, tracks and soft furnishings.`,
      },
    ],
    services: ['deep-cleaning', 'carpet-upholstery-cleaning', 'window-glass-cleaning'],
  },
];

/* ---------------- Lookups ---------------- */

export function getGuide(slug) {
  return guides.find((g) => g.slug === slug) || null;
}

/** Guides that mention a service, for the "Related guides" block on service pages. */
export function guidesForService(serviceSlug) {
  return guides.filter((g) => g.services.includes(serviceSlug));
}

/** Other guides to read next: those sharing a service first, then the rest. */
export function relatedGuides(guide, limit = 3) {
  const others = guides.filter((g) => g.slug !== guide.slug);
  const shared = others.filter((g) => g.services.some((s) => guide.services.includes(s)));
  const rest = others.filter((g) => !shared.includes(g));
  return [...shared, ...rest].slice(0, limit);
}

/** Three guides for the area page at position `index` in the areas list.
 *  The window slides by one per area, so links are spread evenly. */
export function guidesForArea(index, count = 3) {
  const start = ((index % guides.length) + guides.length) % guides.length;
  return Array.from({ length: count }, (_, k) => guides[(start + k) % guides.length]);
}

export function guidesUpdatedAt() {
  return guides.map((g) => g.updatedAt).sort().at(-1);
}

/** Every visible string of a guide, for the copy check and word counts. */
export function guideStrings(guide) {
  return [
    ['title', guide.title],
    ['short', guide.short],
    ['metaDescription', guide.metaDescription],
    ['answer', guide.answer],
    ...guide.sections.flatMap((s, i) => [
      [`sections[${i}].h`, s.h],
      ...s.p.map((p, j) => [`sections[${i}].p[${j}]`, p]),
      ...(s.list || []).map((l, j) => [`sections[${i}].list[${j}]`, l]),
    ]),
    ...guide.faqs.flatMap((f, i) => [
      [`faqs[${i}].q`, f.q],
      [`faqs[${i}].a`, f.a],
    ]),
  ];
}

export function guideWordCount(guide) {
  return guideStrings(guide)
    .filter(([field]) => field !== 'metaDescription' && field !== 'short')
    .map(([, text]) => text)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
}
