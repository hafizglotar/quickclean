import { business } from '../lib/business';
import { Check } from './icons';
import PriceCalculator from './PriceCalculator';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow reveal-hero">★★★★★ Rated {business.rating.value}/5 by {business.rating.count.toLocaleString()}+ customers</span>
          <h1 className="hero-title">
            <span className="reveal-hero-line">Deep cleaning in Dubai</span>
            <span className="reveal-hero-line">
              that reaches what others <em>miss.</em>
            </span>
          </h1>
          <p className="hero-sub reveal-hero">
            Apartments, villas, and offices across Dubai — deep cleaned by trained,
            insured crews. Inside the appliances, into the grout, behind the furniture.
            We also handle regular domestic and office cleaning. Flat prices in AED,
            booked in 60 seconds.
          </p>
          <div className="hero-cta reveal-hero">
            <a href="#quote" className="btn btn-primary btn-lg">
              Get My Free Quote →
            </a>
            <a href="#deep-clean" className="btn btn-ghost btn-lg">
              See what a deep clean covers
            </a>
          </div>
          <ul className="hero-trust reveal-hero">
            <li>
              <Check /> Homes &amp; offices
            </li>
            <li>
              <Check /> Insured &amp; bonded
            </li>
            <li>
              <Check /> Eco-friendly products
            </li>
          </ul>
        </div>

        <div className="hero-card reveal-hero">
          <PriceCalculator />
        </div>
      </div>
    </section>
  );
}
