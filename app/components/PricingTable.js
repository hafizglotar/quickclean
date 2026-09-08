import Link from 'next/link';
import {
  currency,
  getService,
  pricingAddOnSlugs,
  pricingSizes,
  pricingTiers,
  tierFrom,
} from '../lib/business';
import { ArrowRight, Check } from './icons';

/* Full matrix: every package priced against every property size.
   Scrolls horizontally on small screens rather than squashing. */
export function PricingMatrix() {
  return (
    <div className="price-matrix-wrap">
      <table className="price-matrix">
        <caption className="sr-only">
          Cleaning prices by package and property size, in {currency.code}
        </caption>
        <thead>
          <tr>
            <th scope="col">Property size</th>
            {pricingTiers.map((t) => (
              <th scope="col" key={t.slug} className={t.featured ? 'is-featured' : undefined}>
                {t.name}
                {t.featured && <span className="matrix-tag">Most popular</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pricingSizes.map((size, i) => (
            <tr key={size}>
              <th scope="row">{size}</th>
              {pricingTiers.map((t) => (
                <td key={t.slug} className={t.featured ? 'is-featured' : undefined}>
                  {currency.format(t.prices[i])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* The three package cards. `compact` drops the full feature list for the
   home-page teaser, where the detail lives on /pricing instead. */
export function PricingCards({ compact = false }) {
  return (
    <div className="pricing-grid">
      {pricingTiers.map((tier) => (
        <article className={`plan${tier.featured ? ' plan-featured' : ''}`} key={tier.slug}>
          {tier.featured && <span className="plan-tag">Most popular</span>}
          <h3>{tier.name}</h3>
          <div className="plan-price">
            <span>{currency.symbol}</span>
            {tierFrom(tier)}
            <small>/ visit</small>
          </div>
          <p className="plan-desc">{tier.desc}</p>
          {!compact && (
            <ul className="plan-feats">
              {tier.feats.map((f) => (
                <li key={f}>
                  <Check size={15} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}
          <a
            href="#quote"
            className={`btn ${tier.featured ? 'btn-primary' : 'btn-ghost'} btn-block`}
          >
            {tier.cta}
          </a>
        </article>
      ))}
    </div>
  );
}

/* Extras, priced straight off the service catalogue so they never drift. */
export function PricingAddOns() {
  const addOns = pricingAddOnSlugs.map(getService).filter(Boolean);
  if (!addOns.length) return null;

  return (
    <div className="addons reveal">
      <h3>Add to any package</h3>
      <ul className="addon-list">
        {addOns.map((s) => (
          <li key={s.slug}>
            <Link href={`/services/${s.slug}`}>
              <strong>{s.title}</strong>
              <span>{s.desc}</span>
            </Link>
            <span className="addon-price">From {currency.format(s.price)}</span>
          </li>
        ))}
        <li>
          <Link href="/services/office-commercial-cleaning">
            <strong>Office &amp; commercial</strong>
            <span>After-hours cleaning on a schedule that suits your team.</span>
          </Link>
          <span className="addon-price">Custom quote</span>
        </li>
      </ul>
      <p className="addon-note">
        Post-construction and developer handover cleans are quoted per square foot after a
        free site visit.{' '}
        <a href="#quote">
          Request a quote <ArrowRight size={14} />
        </a>
      </p>
    </div>
  );
}
