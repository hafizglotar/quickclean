import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StickyCta from '../../components/StickyCta';
import Animations from '../../components/Animations';
import Breadcrumbs from '../../components/Breadcrumbs';
import ServiceCard from '../../components/ServiceCard';
import QuoteSection from '../../components/QuoteSection';
import AreasServed from '../../components/AreasServed';
import JsonLd from '../../components/seo/JsonLd';
import { PricingMatrix } from '../../components/PricingTable';
import { WhyUs, HowItWorks } from '../../components/Sections';
import { ArrowRight, Check } from '../../components/icons';
import { business, services, SITE_URL } from '../../lib/business';
import { areas, areaDisplayName, areaPath, getArea } from '../../lib/areas';
import { currency, lowestPackagePrice } from '../../lib/pricing';
import { areaPageGraph } from '../../lib/jsonld';

/* Public URL is /cleaning-services-<area>; next.config.mjs rewrites it here
   and redirects the bare /areas/<area> path to the public one. */

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }) {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) return {};

  const url = `${SITE_URL}${areaPath(slug)}`;
  const title = `House Cleaning Services in ${area.name} | ${business.name}`;
  const description = area.metaDescription;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: 'en-AE',
      siteName: business.name,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function AreaPage({ params }) {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const h1 = `House Cleaning Services in ${area.name}`;
  const fullName = areaDisplayName(area);

  return (
    <>
      <JsonLd data={areaPageGraph(slug)} />
      <Header />
      <main>
        {/* Hero */}
        <section className="subpage-hero">
          <div className="hero-bg" aria-hidden="true" />
          <div className="container">
            <Breadcrumbs
              items={[
                { name: 'Home', href: '/' },
                { name: h1, href: areaPath(slug) },
              ]}
            />
            <span className="kicker">{area.containedIn === 'Dubai' ? `${area.containedIn} · ` : ''}Area we serve</span>
            <h1>{h1}</h1>
            <p className="section-lead">
              Vetted, insured cleaners in {fullName} with flat prices by home size from{' '}
              {currency.format(lowestPackagePrice)}, same-day slots and a 100% Spotless
              Guarantee. Book online in 60 seconds.
            </p>
            <ul className="hero-trust">
              <li>
                <Check /> Flat price by home size
              </li>
              <li>
                <Check /> Insured &amp; bonded pros
              </li>
              <li>
                <Check /> No contracts
              </li>
            </ul>
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

        {/* Intro copy */}
        <section className="section area-intro">
          <div className="container">
            <div className="section-head reveal">
              <span className="kicker">Cleaning in {area.name}</span>
              <h2>What to Expect From Our Cleaners in {fullName}</h2>
            </div>
            <div className="prose reveal">
              {area.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Area price table */}
        <section className="section price-by-size" id="prices">
          <div className="container">
            <div className="section-head reveal">
              <span className="kicker">Prices in {area.name}</span>
              <h2>Cleaning Prices in {area.name} by Property Size</h2>
              <p className="section-lead">
                All prices in {currency.code}, per visit, for the home sizes most common in{' '}
                {fullName}. Recurring plans save up to 20% on every clean after the first.
              </p>
            </div>
            <div className="reveal">
              <PricingMatrix
                sizes={area.propertySizeKeys}
                caption={`Cleaning prices in ${area.name} by clean type and property size, in ${currency.code}`}
              />
            </div>
          </div>
        </section>

        {/* All six services */}
        <section className="section services">
          <div className="container">
            <div className="section-head reveal">
              <span className="kicker">Our services</span>
              <h2>Cleaning Services Available in {area.name}</h2>
            </div>
            <div className="services-grid">
              {services.map((s) => (
                <ServiceCard s={s} key={s.slug} />
              ))}
            </div>
          </div>
        </section>

        <WhyUs />
        <HowItWorks />

        {/* Area FAQ */}
        <section className="section faq" id="faq">
          <div className="container">
            <div className="section-head reveal">
              <span className="kicker">{area.name} FAQ</span>
              <h2>Frequently Asked Questions About Cleaning in {area.name}</h2>
            </div>
            <div className="faq-list">
              {area.faqs.map((f) => (
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

        <QuoteSection />
        <AreasServed exclude={slug} kicker="Nearby" />
      </main>
      <Footer />
      <StickyCta />
      <Animations />
    </>
  );
}
