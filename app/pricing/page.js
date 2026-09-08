import Header from '../components/Header';
import Footer from '../components/Footer';
import StickyCta from '../components/StickyCta';
import Animations from '../components/Animations';
import Breadcrumbs from '../components/Breadcrumbs';
import QuoteSection from '../components/QuoteSection';
import { Faq, HowItWorks } from '../components/Sections';
import { PricingAddOns, PricingCards, PricingMatrix } from '../components/PricingTable';
import { ArrowRight, Check } from '../components/icons';
import { business, currency, pricingTiers, SITE_URL } from '../lib/business';
import { pricingPageGraph } from '../lib/jsonld';

const place = `${business.address.city}, ${business.address.region}`;
const lowest = Math.min(...pricingTiers.flatMap((t) => t.prices));

const title = `Cleaning Prices in ${place} — From ${currency.format(lowest)}`;
const description = `Flat cleaning prices from ${business.name}, by property size. Basic, Standard and Premium packages from ${currency.format(
  lowest
)} per visit — studio apartments up to 6 bedroom villas. No hourly rates, no surprise fees.`;

export const metadata = {
  title,
  description,
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: `${title} | ${business.name}`,
    description,
    url: `${SITE_URL}/pricing`,
    type: 'website',
  },
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingPageGraph()) }}
      />
      <Header />
      <main>
        <section className="subpage-hero">
          <div className="hero-bg" aria-hidden="true" />
          <div className="container">
            <Breadcrumbs
              items={[
                { name: 'Home', href: '/' },
                { name: 'Pricing', href: '/pricing' },
              ]}
            />
            <span className="kicker">Simple pricing</span>
            <h1>{title}</h1>
            <p className="section-lead">
              Every clean is a flat rate based on the size of your home — never an hourly meter.
              You see the full price before you book, and it is the price you pay.
            </p>
            <ul className="hero-trust">
              <li>
                <Check /> No hourly rates
              </li>
              <li>
                <Check /> No contracts
              </li>
              <li>
                <Check /> 100% Spotless Guarantee
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

        {/* Packages */}
        <section className="section pricing" id="packages">
          <div className="container">
            <div className="section-head reveal">
              <span className="kicker">Choose a package</span>
              <h2>Three packages. One flat price.</h2>
              <p className="section-lead">
                Start with Basic for upkeep, Standard for the detail most homes need, or Premium
                for deep cleans, move-outs and handovers.
              </p>
            </div>
            <PricingCards />
          </div>
        </section>

        {/* Price by property size */}
        <section className="section price-by-size" id="price-list">
          <div className="container">
            <div className="section-head reveal">
              <span className="kicker">Full price list</span>
              <h2>Priced by property size.</h2>
              <p className="section-lead">
                All prices in {currency.code}, per visit. Recurring plans save up to 20% on every
                clean after the first.
              </p>
            </div>
            <div className="reveal">
              <PricingMatrix />
            </div>
            <PricingAddOns />
          </div>
        </section>

        <HowItWorks />
        <QuoteSection />
        <Faq />
      </main>
      <Footer />
      <StickyCta />
      <Animations />
    </>
  );
}
