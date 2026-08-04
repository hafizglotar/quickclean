import Header from '../components/Header';
import Footer from '../components/Footer';
import StickyCta from '../components/StickyCta';
import Animations from '../components/Animations';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceCard from '../components/ServiceCard';
import QuoteSection from '../components/QuoteSection';
import ServiceAreas from '../components/ServiceAreas';
import { WhyUs } from '../components/Sections';
import { business, services, SITE_URL } from '../lib/business';
import { servicesIndexGraph } from '../lib/jsonld';

const title = `Deep Cleaning, Domestic & Office Cleaning in ${business.address.city}`;
const description = `Every cleaning service from Quick Clean in ${business.address.city} — deep cleaning (our specialty), domestic cleaning, office and commercial cleaning, move-out, carpet, and window cleaning. Vetted pros, flat pricing, 100% satisfaction guarantee.`;

export const metadata = {
  title,
  description,
  alternates: { canonical: '/services' },
  openGraph: { title: `${title} | ${business.name}`, description, url: `${SITE_URL}/services`, type: 'website' },
};

export default function ServicesIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesIndexGraph()) }}
      />
      <Header />
      <main>
        <section className="subpage-hero">
          <div className="hero-bg" aria-hidden="true" />
          <div className="container">
            <Breadcrumbs
              items={[
                { name: 'Home', href: '/' },
                { name: 'Services', href: '/services' },
              ]}
            />
            <span className="kicker">Our services</span>
            <h1>{title}</h1>
            <p className="section-lead">
              Deep cleaning is our specialty, and we cover everything around it — regular
              domestic cleaning, office and commercial contracts, and end-of-tenancy work.
              Every service is backed by our 100% Spotless Guarantee, flat upfront pricing,
              and no contracts.
            </p>
            <div className="subpage-hero-cta">
              <a href="#quote" className="btn btn-primary btn-lg">
                Get a free quote →
              </a>
              <a href={`tel:${business.telephone}`} className="btn btn-ghost btn-lg">
                Call {business.telephoneDisplay}
              </a>
            </div>
          </div>
        </section>

        <section className="section services-list">
          <div className="container">
            <div className="services-grid">
              {services.map((s) => (
                <ServiceCard s={s} key={s.slug} />
              ))}
            </div>
          </div>
        </section>

        <WhyUs />
        <ServiceAreas />
        <QuoteSection />
      </main>
      <Footer />
      <StickyCta />
      <Animations />
    </>
  );
}
