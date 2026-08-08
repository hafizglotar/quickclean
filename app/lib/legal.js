/* ============================================================
   Terms & Conditions content.
   ------------------------------------------------------------
   ⚠️  IMPORTANT — READ BEFORE LAUNCH
   This is a well-structured STARTING POINT written to match what
   the rest of this website actually promises. It is NOT legal
   advice and has not been reviewed by a UAE-qualified lawyer.
   Have a Dubai legal advisor review it before you publish, and
   confirm the commercial decisions flagged with "CONFIRM:" below.

   Content lives here (not in JSX) for the same reason as
   business.js: one place to edit, and the page + structured data
   stay in sync automatically.

   Block shapes accepted by the renderer:
     { p:   'a paragraph' }
     { list: ['item', 'item'] }        → bulleted
     { list: [...], ordered: true }    → numbered
   ============================================================ */

import { business, currency } from './business';

// Shown on the page and used for JSON-LD dateModified. Update whenever
// the terms change — an accurate date is what makes them enforceable.
export const termsUpdated = '2026-08-08';

export const termsIntro = `These Terms and Conditions govern the cleaning services provided by ${business.legalName} ("${business.name}", "we", "us", "our") to you, our customer ("you", "your"). By booking a service with us — online, by phone, or over WhatsApp — you confirm that you have read, understood, and agree to be bound by these terms.`;

export const termsSections = [
  {
    id: 'about-us',
    heading: 'Who we are',
    blocks: [
      {
        p: `${business.legalName} is a professional cleaning company operating in ${business.address.city}, ${business.address.countryName}, under ${business.license.authority} trade licence ${business.license.number}.`,
      },
      {
        p: `You can reach us at ${business.telephoneDisplay}, on WhatsApp, or by email at ${business.email}. Our registered address is ${business.address.street}, ${business.address.city}.`,
      },
    ],
  },
  {
    id: 'services',
    heading: 'Our services',
    blocks: [
      {
        p: 'We provide deep cleaning, domestic (residential) cleaning, office and commercial cleaning, move-in and move-out cleaning, carpet and upholstery cleaning, and window and glass cleaning, within our published service area in Dubai.',
      },
      {
        p: 'Each service follows a defined checklist, which is published on the relevant service page of this website. The checklist for your booking forms part of these terms. If you need work that falls outside it, tell us before the visit so we can quote and schedule it properly.',
      },
      {
        p: 'We reserve the right to decline or discontinue a booking where the property, the task, or the conditions on site fall outside the scope of the service booked.',
      },
    ],
  },
  {
    id: 'booking-quotes',
    heading: 'Bookings and quotes',
    blocks: [
      {
        p: 'A booking is confirmed only once you receive a confirmation from us by email, SMS, or WhatsApp. Requesting a quote does not reserve a time slot.',
      },
      {
        p: 'Quotes are based on the information you give us about the property — its type, size, number of bedrooms and bathrooms, and its general condition. If the property differs materially from what was described on arrival, we will contact you before starting and either agree a revised price or reschedule. We will never carry out chargeable extra work without your agreement.',
      },
      {
        p: 'Arrival times are estimates. Traffic and access conditions in Dubai can affect timing, and we will keep you informed if our crew is running late.',
      },
    ],
  },
  {
    id: 'pricing-payment',
    heading: 'Pricing and payment',
    blocks: [
      {
        // CONFIRM: whether your displayed prices include VAT. UAE consumer
        // pricing is normally shown VAT-inclusive — check with your accountant
        // and add your TRN here once registered.
        p: `All prices are quoted in UAE dirhams (${currency.code}) and are inclusive of VAT where applicable. The flat rate shown to you before you confirm is the price you pay for the service as described — we do not use hourly meters or add surprise charges.`,
      },
      {
        p: 'Payment is due after the service has been completed. We accept credit and debit cards, bank transfer, and cash. We do not take payment before the work is done.',
      },
      {
        p: 'For recurring plans, the discounted per-visit rate applies for as long as the agreed schedule is maintained. There is no minimum term and no lock-in — you can pause, change, or stop a recurring plan at any time.',
      },
      {
        p: 'Commercial and office cleaning is quoted individually following a site walkthrough, and payment terms for those contracts are set out in your written quotation.',
      },
    ],
  },
  {
    id: 'cancellations',
    heading: 'Cancellations, rescheduling and access',
    blocks: [
      {
        p: 'You can reschedule or cancel a booking at any time at no charge. There are no contracts and no cancellation fees. We simply ask for as much notice as you can reasonably give, so we can offer the slot to someone else.',
      },
      {
        // CONFIRM: this lockout charge is standard in the industry but it is a
        // commercial decision. Set it to zero if you would rather absorb it.
        p: 'If our crew arrives at the agreed time and cannot access the property, we will try to reach you immediately. If we are unable to gain access and cannot reach you within 30 minutes, the visit may be treated as a call-out and charged at up to 50% of the booking value to cover the crew’s time and travel. This is not a cancellation fee — cancelling in advance always remains free.',
      },
      {
        p: 'Please make sure we have working access instructions, and that water and electricity are available at the property. We cannot complete most cleaning tasks without both.',
      },
      {
        p: 'We may need to reschedule in circumstances outside our control, including severe weather, building access restrictions, or crew illness. We will offer you the earliest alternative slot and you will never be charged for a visit we could not make.',
      },
    ],
  },
  {
    id: 'guarantee',
    heading: 'Our 100% Spotless Guarantee',
    blocks: [
      {
        p: 'If you are not satisfied with any area we have cleaned, tell us within 24 hours of the visit and we will return and re-clean that area free of charge. This is our 100% Spotless Guarantee and it applies to every service we offer.',
      },
      {
        p: 'To make a claim under the guarantee, contact us by phone, WhatsApp, or email with your booking reference and a description of the areas concerned. Photographs help us resolve things faster. We will agree a return visit at the earliest time that suits you.',
      },
      {
        p: 'The guarantee covers the quality of the cleaning work carried out under the checklist for the service you booked. It does not extend to results that cannot be achieved by cleaning — for example, permanent staining, worn or damaged surfaces, or discolouration that predates our visit.',
      },
    ],
  },
  {
    id: 'exclusions',
    heading: 'What we do not clean',
    blocks: [
      {
        p: 'For the safety of our crews and the protection of your property, the following are outside the scope of our standard services:',
      },
      {
        list: [
          'Biohazards, bodily fluids, human or animal waste, needles, and drug paraphernalia',
          'Mould remediation, pest control, and post-fire, flood, or sewage restoration',
          'Exterior windows or façades on high-rise buildings requiring rope access or specialist permits',
          'Any work requiring us to climb above standard step-ladder height, or onto roofs and exposed ledges',
          'Lifting or moving heavy furniture, appliances, or items our crew cannot safely handle',
          'Cleaning inside properties in a hoarded or severely unsanitary condition without a prior site assessment',
          'Handling, cleaning, or moving firearms, ammunition, valuables, or items of significant sentimental value',
        ],
      },
      {
        p: 'Some of these can be arranged as a specialist service after a site assessment. Ask us and we will tell you honestly whether we can help or refer you to someone who can.',
      },
    ],
  },
  {
    id: 'your-responsibilities',
    heading: 'Your responsibilities',
    blocks: [
      { p: 'To help us do a good job safely, please:' },
      {
        list: [
          'Secure cash, jewellery, documents, and other valuables before the visit',
          'Tell us in advance about pets on site, and restrain any animal that may be anxious around strangers',
          'Tell us about any hazard, defect, fault, or fragile item we should know about — including loose fittings, faulty electrics, or surfaces needing special care',
          'Provide clear access and, where relevant, arrange parking or a visitor pass for the crew',
          'Make sure someone aged 18 or over is contactable for the duration of the visit',
        ],
      },
      {
        p: 'We are unable to accept responsibility for damage arising from a pre-existing defect or from a hazard we were not told about.',
      },
    ],
  },
  {
    id: 'liability',
    heading: 'Damage, insurance and liability',
    blocks: [
      {
        p: 'Quick Clean holds public liability insurance, and our cleaners are directly employed, background-checked, trained, and covered under that policy.',
      },
      {
        p: 'If something is damaged during a visit, report it to us within 24 hours of the visit so we can investigate while the facts are fresh. We will repair, replace, or compensate for the item as appropriate. Reports made after 24 hours are much harder to verify and we may not be able to accept them.',
      },
      {
        p: 'Except where the law does not allow it to be limited, our total liability arising from any single booking is limited to the greater of the value of that booking or the amount recoverable under our insurance policy. We are not liable for indirect or consequential loss, including loss of income or opportunity.',
      },
      {
        p: 'Nothing in these terms limits or excludes liability for death or personal injury caused by our negligence, for fraud, or for anything else that cannot lawfully be limited under the laws of the United Arab Emirates.',
      },
    ],
  },
  {
    id: 'staff',
    heading: 'Our staff',
    blocks: [
      {
        p: 'Our cleaners are our employees, sponsored and employed by us in accordance with UAE labour law. We do not use freelance or unlicensed labour.',
      },
      {
        p: 'You agree not to directly employ, engage, or solicit any member of our staff — whether for cleaning or any other work — during the period they work with us and for twelve months afterwards, other than through us. Recruiting and training a cleaner represents a real cost to us, and if this happens we may charge a placement fee to recover it.',
      },
      {
        p: 'Our crews have the right to work in a safe and respectful environment. We reserve the right to withdraw our team from any property, and to end our relationship with a customer, where a crew member is subjected to unsafe conditions, harassment, or abuse. In that situation the visit will be charged in full.',
      },
    ],
  },
  {
    id: 'your-information',
    heading: 'Your information and privacy',
    blocks: [
      {
        p: 'When you request a quote or make a booking, we collect your name, contact details, property address and access details, and any notes you give us about the job. We use this information only to quote for, schedule, deliver, and follow up on your cleaning service, and to meet our legal and tax obligations in the UAE.',
      },
      {
        p: 'We do not sell your personal information, and we do not share it with third parties for their own marketing. We share it only with our own crew and with service providers who help us operate — for example payment processing — and only to the extent they need it.',
      },
      {
        p: 'Access details such as key codes are treated as confidential, shared only with the crew attending your property, and removed when you stop using our services.',
      },
      {
        p: 'We keep your information for as long as you are a customer and for as long afterwards as UAE law requires us to retain records. You can ask us to correct or delete your information, or to stop contacting you, at any time — just email us and we will action it.',
      },
    ],
  },
  {
    id: 'complaints',
    heading: 'Complaints',
    blocks: [
      {
        p: 'If something goes wrong, tell us first — most issues are resolved the same day. Contact us by phone, WhatsApp, or email with your booking reference and what happened.',
      },
      {
        p: 'We aim to acknowledge every complaint within one working day and to resolve it within five working days. If we need longer, we will tell you why and keep you updated.',
      },
    ],
  },
  {
    id: 'changes',
    heading: 'Changes to these terms',
    blocks: [
      {
        p: 'We may update these terms from time to time to reflect changes in our services or in the law. The version published on this page at the time you make a booking is the version that applies to that booking.',
      },
      {
        p: 'The date at the top of this page tells you when these terms were last updated. Material changes affecting existing recurring customers will be notified directly.',
      },
    ],
  },
  {
    id: 'governing-law',
    heading: 'Governing law',
    blocks: [
      {
        p: 'These terms, and any dispute arising out of or in connection with them or with any service we provide, are governed by the federal laws of the United Arab Emirates and the laws of the Emirate of Dubai.',
      },
      {
        p: 'The courts of Dubai have exclusive jurisdiction over any such dispute. If any provision of these terms is found to be unenforceable, the remaining provisions continue in full effect.',
      },
    ],
  },
];
