import { business } from '../lib/business';
import { ArrowRight, Check, Stars } from './icons';
import PriceCalculator from './PriceCalculator';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow reveal-hero">
            <Stars size={13} decorative /> Rated{' '}
            {business.rating.value}/5 by {business.rating.count.toLocaleString()}+ customers
          </span>
          <h1 className="hero-title">
            <span className="reveal-hero-line">A spotless home,</span>
            <span className="reveal-hero-line">
              without lifting <em>a finger.</em>
            </span>
          </h1>
          <p className="hero-sub reveal-hero">
            Vetted, insured cleaners. Flat upfront pricing. And a 100% satisfaction
            guarantee — if it&apos;s not perfect, we re-clean it free. Book in 60 seconds.
          </p>
          <div className="hero-cta reveal-hero">
            <a href="#quote" className="btn btn-primary btn-lg">
              Get My Free Quote <ArrowRight />
            </a>
            <a href="#how" className="btn btn-ghost btn-lg">
              See how it works
            </a>
          </div>
          <ul className="hero-trust reveal-hero">
            <li>
              <Check /> No contracts
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
