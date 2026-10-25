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

   Shapes:

   rating       { value: <number>, count: <number of reviews>, best: 5 }
   stats        [{ value: <number>, suffix: '' | '%' | 's', label: '<what it counts>' }]
   trustLogos   ['<client name>', ...]   (only with the client's written permission)
   testimonials [{ initials: '<AB>', name: '<First L.>', meta: '<plan · area>',
                   quote: '<verbatim review text>' }]

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
