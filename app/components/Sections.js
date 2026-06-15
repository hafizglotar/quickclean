import Link from 'next/link';
import { business, currency, stats, trustLogos, services, whyPoints, steps, plans, reviews, faqs } from '../lib/business';
import { Check } from './icons';
import ServiceCard from './ServiceCard';

export function TrustBar() {
  return (
    <section className="trustbar" aria-label="Trusted by">
      <div className="container trustbar-inner">
        <span>As trusted by teams at</span>
        <div className="trustbar-logos">
          {trustLogos.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="stats" aria-label="Quick Clean by the numbers">
      <div className="container stats-grid">
        {stats.map((s) => (
          <div className="stat reveal" key={s.label}>
            <strong className="stat-num" data-count={s.value} data-suffix={s.suffix}>
              {s.value.toLocaleString()}
              {s.suffix}
            </strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">What we clean</span>
          <h2>One team for every clean.</h2>
          <p className="section-lead">
            Pick what you need today — switch or add anytime. Every service is backed by the
            same satisfaction guarantee.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s) => (
            <ServiceCard s={s} key={s.slug} />
          ))}
        </div>
        <div className="services-cta reveal">
          <Link href="/services" className="btn btn-ghost btn-lg">
            View all cleaning services →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section className="section why" aria-label="Why choose Quick Clean">
      <div className="container why-grid">
        <div className="why-copy reveal">
          <span className="kicker">Why Quick Clean</span>
          <h2>You get results, not excuses.</h2>
          <p className="section-lead">
            We built Quick Clean to fix everything people hate about hiring a cleaner — the
            no-shows, the surprise fees, the rushed jobs.
          </p>
          <ul className="why-list">
            {whyPoints.map((p) => (
              <li key={p.title}>
                <strong>{p.title}</strong>
                {p.body}
              </li>
            ))}
          </ul>
          <a href="#quote" className="btn btn-primary btn-lg">
            Claim your guaranteed clean →
          </a>
        </div>
        <div className="why-visual reveal">
          <div className="guarantee-badge">
            <div className="gb-ring">
              <span className="gb-pct">100%</span>
              <span className="gb-label">
                Spotless
                <br />
                Guarantee
              </span>
            </div>
          </div>
          <div className="why-floaters" aria-hidden="true">
            <span className="floater f1">★ {business.rating.value} average rating</span>
            <span className="floater f2">⚡ Booked in 60s</span>
            <span className="floater f3">🛡️ Fully insured</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="section how" id="how">
      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">How it works</span>
          <h2>Booked in 60 seconds. Done by today.</h2>
          <p className="section-lead">
            No phone tag, no awkward in-home estimates. Three steps and you&apos;re set.
          </p>
        </div>

        <div className="steps">
          {steps.map((s, i) => (
            <div className="step" key={s.title}>
              <span className="step-num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">Simple pricing</span>
          <h2>Flat rates. Zero surprises.</h2>
          <p className="section-lead">
            Save up to 20% on recurring plans. Cancel or reschedule anytime — no contracts, ever.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <article className={`plan${plan.featured ? ' plan-featured' : ''}`} key={plan.name}>
              {plan.featured && <span className="plan-tag">Most popular</span>}
              <h3>{plan.name}</h3>
              <div className="plan-price">
                <span>{currency.symbol}</span>
                {plan.price}
                <small>{plan.period}</small>
              </div>
              <p className="plan-desc">{plan.desc}</p>
              <ul className="plan-feats">
                {plan.feats.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a href="#quote" className={`btn ${plan.featured ? 'btn-primary' : 'btn-ghost'} btn-block`}>
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
        <p className="pricing-note reveal">
          Prices vary by home size and location. Your exact flat rate is shown before you confirm — always.
        </p>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">Real customers</span>
          <h2>{business.rating.count.toLocaleString()}+ five-star cleans and counting.</h2>
        </div>

        <div className="reviews-grid">
          {reviews.map((r) => (
            <figure className="review" key={r.name}>
              <div className="stars" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <blockquote>{r.quote}</blockquote>
              <figcaption>
                <span className="avatar" aria-hidden="true">
                  {r.initials}
                </span>
                <div>
                  <strong>{r.name}</strong>
                  <small>{r.meta}</small>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">Good to know</span>
          <h2>Questions, answered.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((f) => (
            <details className="faq-item" key={f.q}>
              <summary>
                {f.q}
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
