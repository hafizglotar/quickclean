import Link from 'next/link';
import { AREAS_HUB_PATH, areaPath, areas, featuredAreas, nearbyAreas } from '../lib/areas';

/* Chips linking to a list of area pages. With no `list` it shows the featured
   areas plus a link to the hub page that lists every area. */
export function AreaChips({ list, exclude, showAll = true }) {
  const items = (list || featuredAreas()).filter((a) => a.slug !== exclude);
  return (
    <ul className="chips">
      {items.map((a) => (
        <li key={a.slug}>
          <Link href={areaPath(a.slug)} className="chip">
            {a.name}
          </Link>
        </li>
      ))}
      {showAll && (
        <li>
          <Link href={AREAS_HUB_PATH} className="chip chip-all">
            All {areas.length} areas
          </Link>
        </li>
      )}
    </ul>
  );
}

/* "Areas we serve" section. On an area page pass `area` and it shows that
   area's nearby communities; on service pages it shows the featured areas.
   Both end with a link to the /areas hub. */
export default function AreasServed({ area, kicker = 'Where we work', title }) {
  const list = area ? nearbyAreas(area) : featuredAreas();
  const heading =
    title || (area ? `Other Areas Near ${area.name}` : 'House Cleaning Services Across Dubai, Sharjah and Ajman');
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
          <AreaChips list={list} exclude={area?.slug} />
        </div>
      </div>
    </section>
  );
}
