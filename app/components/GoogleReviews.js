import { business } from '../lib/business';
import { GBP_PLACE_ID } from '../lib/social-proof';

/* Placeholder for live Google reviews.
   Reads NEXT_PUBLIC_GBP_PLACE_ID and renders nothing until it is set. Once a
   Google Business Profile exists, drop the place ID into .env.local / Vercel
   and this section links straight to its reviews. It deliberately shows no
   star count or review total of its own — those must come from Google. */
export default function GoogleReviews() {
  if (!GBP_PLACE_ID) return null;

  const reviewsUrl = `https://search.google.com/local/reviews?placeid=${encodeURIComponent(
    GBP_PLACE_ID
  )}`;

  return (
    <section className="section reviews" id="reviews" aria-label="Google reviews">
      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">Google reviews</span>
          <h2>Read what customers say about {business.name} on Google.</h2>
          <p className="section-lead">
            Our reviews are published on our Google Business Profile, where every one is
            written by a verified Google account.
          </p>
          <a
            href={reviewsUrl}
            className="btn btn-ghost btn-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            See our Google reviews
          </a>
        </div>
      </div>
    </section>
  );
}
