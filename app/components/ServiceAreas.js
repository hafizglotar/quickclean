import { business } from '../lib/business';

/**
 * Geographic coverage section — the visible half of the "GEO" work.
 * The same community list feeds `areaServed` in the LocalBusiness schema, so
 * what a person reads and what a crawler parses always agree.
 */
export default function ServiceAreas() {
  return (
    <section className="section areas" id="areas">
      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">Where we work</span>
          <h2>Deep cleaning across every part of Dubai.</h2>
          <p className="section-lead">
            Our crews cover the whole emirate — from Marina and JLT towers to Downtown
            and Business Bay apartments, and out to the villa communities in Arabian
            Ranches, Dubai Hills, and DAMAC Hills. Same flat pricing, same guarantee,
            wherever you are.
          </p>
        </div>

        <ul className="areas-grid reveal">
          {business.areaServed.map((a) => (
            <li className="area-chip" key={a}>
              {a}
            </li>
          ))}
        </ul>

        <p className="areas-note reveal">
          Don&apos;t see your community? We almost certainly cover it —{' '}
          <a href="#quote">ask for a quote</a> and we&apos;ll confirm within minutes.
        </p>
      </div>
    </section>
  );
}
