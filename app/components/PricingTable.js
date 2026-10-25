import Link from 'next/link';
import { getService } from '../lib/business';
import { addOnSlugs, cleanTypes, currency, packages, propertySizes } from '../lib/pricing';
import { ArrowRight, Check } from './icons';

/* Full matrix: every clean type priced against every property size.
   Scrolls horizontally on small screens rather than squashing. */
export function PricingMatrix({ sizes, caption }) {
  const rows = sizes ? propertySizes.filter((s) => sizes.includes(s.key)) : propertySizes;
  return (
    <div className="price-matrix-wrap">
      <table className="price-matrix">
        <caption className="sr-only">
          {caption || `Cleaning prices by clean type and property size, in ${currency.code}`}
        </caption>
        <thead>
          <tr>
            <th scope="col">Property size</th>
            {cleanTypes.map((t) => (
              <th scope="col" key={t.key} className={t.featured ? 'is-featured' : undefined}>
                {t.name}
                {t.featured && <span className="matrix-tag">Most popular</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((size) => {
            const i = propertySizes.indexOf(size);
            return (
              <tr key={size.key}>
                <th scope="row">{size.label}</th>
                {cleanTypes.map((t) => (
                  <td key={t.key} className={t.featured ? 'is-featured' : undefined}>
                    {currency.format(t.prices[i])}
                  </td>
                ))}
              </tr>
            );
          })}
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
      {packages.map((tier) => (
        <article className={`plan${tier.featured ? ' plan-featured' : ''}`} key={tier.key}>
          {tier.featured && <span className="plan-tag">Most popular</span>}
          <h3>{tier.name}</h3>
          <div className="plan-price">
            <span>{currency.symbol}</span>
            {tier.from}
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
  const addOns = addOnSlugs.map(getService).filter(Boolean);
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
