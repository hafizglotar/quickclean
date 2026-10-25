/* ============================================================
   Social proof — ratings, stats, client logos and testimonials
   ------------------------------------------------------------
   TODO: replace with real Google reviews.

   Everything in this file is UNVERIFIED until a real source exists
   (Google Business Profile reviews, signed client permissions for
   logos, audited job counts). Each export is therefore empty, and
   every component that reads it renders nothing while it is empty.
   Fill an array in and its section appears again — nothing else
   needs to change.

   Shapes (the previous placeholder values, kept only as examples):

   rating       { value: 4.9, count: 2300, best: 5 }
   stats        [{ value: 47000, suffix: '',  label: 'Cleans completed' },
                 { value: 2300,  suffix: '',  label: '5-star reviews' },
                 { value: 98,    suffix: '%', label: 'Re-book rate' },
                 { value: 60,    suffix: 's', label: 'To book online' }]
   trustLogos   ['Northside Realty', 'Brightwork Offices', 'Maple Property Co.',
                 'Harbor Dental', 'Lumen Studios']
   testimonials [{ initials: 'SM', name: 'Sarah M.', meta: 'Bi-weekly plan · Downtown',
                   quote: '...' }]

   No AggregateRating / Review schema is emitted from this data.
   ============================================================ */

/** Overall rating shown in the hero and footer. null until verified. */
export const rating = null;

/** "By the numbers" counters. Empty until audited figures exist. */
export const stats = [];

/** "As trusted by teams at" logo strip. Empty until clients give permission. */
export const trustLogos = [];

/** Customer testimonials. Empty until real Google reviews are wired in. */
export const testimonials = [];

/* Google Business Profile place ID. When set, components/GoogleReviews.js
   renders a link to the live Google reviews; when unset it renders nothing. */
export const GBP_PLACE_ID = process.env.NEXT_PUBLIC_GBP_PLACE_ID || '';

/** Whether any reviews section exists on the site (drives nav/footer links). */
export const hasReviews = testimonials.length > 0 || Boolean(GBP_PLACE_ID);
