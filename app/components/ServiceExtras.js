import RichText from './RichText';
import { getServiceExtras } from '../lib/service-extras';

/* Additive section for a service page: a short quotable answer, context
   paragraphs that link to related areas, services, guides and pricing, and
   extra customer questions. It is placed below the existing copy and FAQ and
   changes none of them. These questions are visible on the page only; the
   page's existing FAQPage JSON-LD is left exactly as it was. */
export default function ServiceExtras({ slug, name }) {
  const extras = getServiceExtras(slug);
  if (!extras) return null;
  return (
    <section className="section service-extras" id="quick-answer">
      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">Quick answer</span>
          <h2>{name} in Dubai at a Glance</h2>
        </div>
        <div className="prose reveal">
          <p className="quick-answer">{extras.quickAnswer}</p>
          {extras.context.map((parts, i) => (
            <RichText parts={parts} key={i} />
          ))}
        </div>
        <h3 className="extras-faq-title reveal">More Questions About {name}</h3>
        <div className="faq-list">
          {extras.faqs.map((f) => (
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
