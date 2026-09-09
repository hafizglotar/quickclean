import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StickyCta from '../../components/StickyCta';
import Animations from '../../components/Animations';
import Breadcrumbs from '../../components/Breadcrumbs';
import ServiceCard from '../../components/ServiceCard';
import QuoteSection from '../../components/QuoteSection';
import { WhyUs, HowItWorks, Reviews } from '../../components/Sections';
import { ArrowRight, Check, ServiceIcon, Star } from '../../components/icons';
import { business, services, getService, currency, SITE_URL } from '../../lib/business';
import { getServiceContent } from '../../lib/services-content';
import { servicePageGraph } from '../../lib/jsonld';

// Pre-render one static page per service at build time.
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const svc = getService(slug);
  const content = getServiceContent(slug);
  if (!svc || !content) return {};

  const place = `${business.address.city}, ${business.address.region}`;
  const title = `${svc.title} in ${place}`;
    description: content.subhead,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${title} | ${business.name}`,
      description: content.subhead,
      url: `${SITE_URL}/services/${slug}`,
      type: 'website',
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const svc = getService(slug);
  const content = getServiceContent(slug);
  if (!svc || !content) notFound();

  const place = `${business.address.city}, ${business.address.region}`;
  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageGraph(slug)) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="svc-hero">
          <div className="hero-bg" aria-hidden="true" />
          <div className="container svc-hero-grid">
            <div className="svc-hero-copy">
              <Breadcrumbs
                items={[
                  { name: 'Home', href: '/' },
                  { name: 'Services', href: '/services' },
                  { name: svc.title, href: `/services/${slug}` },
                ]}
              />
              <span className="svc-badge">
                <ServiceIcon name={svc.icon} size={16} /> {content.serviceType}
              </span>
              <h1>
                {svc.title} in {place}
              </h1>
              <p className="section-lead">{content.subhead}</p>
              <div className="subpage-hero-cta">
                <a href="#quote" className="btn btn-primary btn-lg">
                  Get a free quote <ArrowRight />
                </a>
                <a href={`tel:${business.telephone}`} className="btn btn-ghost btn-lg">
                  Call {business.telephoneDisplay}
                </a>
              </div>
              <ul className="hero-trust">
                <li>
                  <Check /> 100% Spotless Guarantee
                </li>
                <li>
                  <Check /> Insured &amp; bonded pros
                </li>
                <li>
                  <Check /> No contracts
                </li>
              </ul>
            </div>

            <aside className="svc-hero-card">
              <div className="svc-facts">
                <div className="svc-fact">
                  <span>Starting price</span>
                  <strong>{svc.price ? currency.format(svc.price) : 'Custom quote'}</strong>
                </div>
                <div className="svc-fact">
                  <span>Availability</span>
                  <strong>{content.turnaround}</strong>
                </div>
                <div className="svc-fact">
                  <span>Rating</span>
                  <strong className="fact-rating">
                    <Star size={13} /> {business.rating.value}/5 (
                    {business.rating.count.toLocaleString()}+)
                  </strong>
                </div>
                <div className="svc-fact">
                  <span>Guarantee</span>
                  <strong>Free re-clean in 24h</strong>
                </div>
              </div>
              <a href="#quote" className="btn btn-primary btn-block btn-lg">
                Book this service <ArrowRight />
              </a>
              <p className="qc-note">Flat price confirmed before you pay. Cancel free anytime.</p>
            </aside>
          </div>
        </section>

        {/* Intro + what's included */}
        <section className="section svc-includes">
          <div className="container">
            <div className="section-head reveal">
              <span className="kicker">What you get</span>
              <h2>What&apos;s included in your {svc.title.toLowerCase()}</h2>
              <p className="section-lead">{content.intro}</p>
            </div>
            <ul className="includes-grid">
              {content.includes.map((item) => (
                <li className="include-item reveal" key={item}>
                  <Check size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="ideal-for reveal">
              <span className="ideal-label">Ideal for:</span>
              <div className="chips">
                {content.idealFor.map((c) => (
                  <span className="chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <WhyUs />
        <HowItWorks />
        <Reviews />

        {/* Service-specific FAQ */}
        <section className="section faq" id="faq">
          <div className="container">
            <div className="section-head reveal">
              <span className="kicker">{svc.title} FAQ</span>
              <h2>Questions about {svc.title.toLowerCase()}</h2>
            </div>
            <div className="faq-list">
              {content.faqs.map((f) => (
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

        {/* Related services */}
        <section className="section services related">
          <div className="container">
            <div className="section-head reveal">
              <span className="kicker">More services</span>
              <h2>Explore other cleaning services</h2>
            </div>
            <div className="services-grid">
              {related.map((s) => (
                <ServiceCard s={s} key={s.slug} />
              ))}
            </div>
          </div>
        </section>

        <QuoteSection />
      </main>
      <Footer />
      <StickyCta />
      <Animations />
    </>
  );
}
