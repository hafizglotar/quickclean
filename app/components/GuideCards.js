import Link from 'next/link';
import { guidePath } from '../lib/guides';
import { ArrowRight } from './icons';

/* Card grid linking to guides. Used on the /guides hub, at the foot of each
   guide and on the service pages a guide relates to. */
export default function GuideCards({ list }) {
  return (
    <div className="services-grid">
      {list.map((g) => (
        <Link href={guidePath(g.slug)} className="service-card guide-card" key={g.slug}>
          <h3>{g.title}</h3>
          <p>{g.metaDescription}</p>
          <div className="service-foot">
            <span className="service-more">
              Read the guide <ArrowRight size={15} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
