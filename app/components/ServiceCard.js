import Link from 'next/link';
import { fromLabel } from '../lib/business';
import { ArrowRight, ServiceIcon } from './icons';

export default function ServiceCard({ s }) {
  return (
    <Link href={`/services/${s.slug}`} className="service-card" aria-label={`${s.title} — learn more`}>
      <div className="service-icon" aria-hidden="true">
        <ServiceIcon name={s.icon} size={26} />
      </div>
      <h3>{s.title}</h3>
      <p>{s.desc}</p>
      <div className="service-foot">
        <span className="service-from">{fromLabel(s)}</span>
        <span className="service-more">
          Learn more <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
}
