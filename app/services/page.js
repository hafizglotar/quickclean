import Header from '../components/Header';
import Footer from '../components/Footer';
import StickyCta from '../components/StickyCta';
import Animations from '../components/Animations';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceCard from '../components/ServiceCard';
import QuoteSection from '../components/QuoteSection';
import { WhyUs } from '../components/Sections';
import { business, services, SITE_URL, shareImages } from '../lib/business';
import { servicesIndexGraph } from '../lib/jsonld';
import JsonLd from '../components/seo/JsonLd';
import { ArrowRight } from '../components/icons';

const title = `Cleaning Services in ${business.address.city}, ${business.address.region}`;
const description = `Every cleaning service from Quick Clean in ${business.address.city}: residential, deep, move out, office, carpet and window cleaning, at flat upfront prices.`;

export const metadata = {
  title,
  description,
  alternates: { canonical: '/services' },
  openGraph: { title: `${title} | ${business.name}`, description, url: `${SITE_URL}/services`, type: 'website', locale: 'en-AE', siteName: business.name, images: shareImages },
  twitter: { card: 'summary_large_image', title: `${title} | ${business.name}`, description, images: shareImages },
};

export default function ServicesIndex() {
  return (
    <>
      <JsonLd data={servicesIndexGraph()} />
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
              Quick Clean provides professional home and office cleaning services in Dubai,
  including residential cleaning, deep cleaning, move-in and move-out cleaning,
  carpet and upholstery cleaning, and window cleaning.
            </p>
            <div className="subpage-hero-cta">
              <a href="#quote" className="btn btn-primary btn-lg">
                Get a free quote <ArrowRight />
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
        <QuoteSection />
      </main>
      <Footer />
      <StickyCta />
      <Animations />
    </>
  );
}
