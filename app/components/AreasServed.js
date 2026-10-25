import Link from 'next/link';
import { areas, areaPath } from '../lib/areas';

/* Chips linking to every area page (optionally minus the current one). */
export function AreaChips({ exclude }) {
  return (
    <ul className="chips">
      {areas
        .filter((a) => a.slug !== exclude)
        .map((a) => (
          <li key={a.slug}>
            <Link href={areaPath(a.slug)} className="chip">
              {a.name}
            </Link>
          </li>
        ))}
    </ul>
  );
}

/* "Areas we serve" section, used on service pages and area pages so every
   location page is reachable within one click of every service. */
export default function AreasServed({ exclude, kicker = 'Where we work', title }) {
  const heading =
    title ||
    (exclude ? 'Other Areas We Serve' : 'House Cleaning Services Across Dubai, Sharjah & Ajman');
  return (
    <section className="section about-areas" aria-label="Areas we serve">
      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">{kicker}</span>
          <h2>{heading}</h2>
          <p className="section-lead">
            Flat prices by home size, the same vetted cleaners and the same 100% Spotless
            Guarantee in every community we cover.
          </p>
        </div>
        <div className="reveal">
          <AreaChips exclude={exclude} />
        </div>
      </div>
    </section>
  );
}
