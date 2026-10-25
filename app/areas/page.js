import Header from '../components/Header';
import Footer from '../components/Footer';
import StickyCta from '../components/StickyCta';
import Animations from '../components/Animations';
import Breadcrumbs from '../components/Breadcrumbs';
import QuoteSection from '../components/QuoteSection';
import JsonLd from '../components/seo/JsonLd';
import { AreaChips } from '../components/AreasServed';
import { WhyUs } from '../components/Sections';
import { ArrowRight, Check } from '../components/icons';
import { business, SITE_URL } from '../lib/business';
import { AREAS_HUB_PATH, areas, areasByRegion } from '../lib/areas';
import { currency, lowestPackagePrice } from '../lib/pricing';
import { areasIndexGraph } from '../lib/jsonld';

const url = `${SITE_URL}${AREAS_HUB_PATH}`;
const title = 'Areas We Serve in Dubai, Sharjah and Ajman';
const description = `House cleaning in ${areas.length} communities across Dubai, Sharjah and Ajman, with flat prices by home size and a page for each area.`;

export const metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | ${business.name}`, description, url, type: 'website', locale: 'en-AE', siteName: business.name },
  twitter: { card: 'summary_large_image', title: `${title} | ${business.name}`, description },
};

export default function AreasHubPage() {
  const groups = areasByRegion();
  return (
    <>
      <JsonLd data={areasIndexGraph()} />
      <Header />
      <main>
        <section className="subpage-hero">
          <div className="hero-bg" aria-hidden="true" />
          <div className="container">
            <Breadcrumbs
              items={[
                { name: 'Home', href: '/' },
                { name: 'Areas we serve', href: AREAS_HUB_PATH },
              ]}
            />
            <span className="kicker">Where we work</span>
            <h1>House Cleaning Services Across Dubai, Sharjah and Ajman</h1>
            <p className="section-lead">
              Quick Clean cleans homes in {areas.length} communities, from the Marina towers to the
              villa districts along Al Qudra Road and out to Sharjah and Ajman. Every area has its own
              page with local notes, the price table for the home sizes found there and answers to the
              questions residents ask. Prices start at {currency.format(lowestPackagePrice)} and are
              the same flat rates everywhere, with no travel surcharge.
            </p>
            <ul className="hero-trust">
              <li>
                <Check /> Flat price by home size
              </li>
              <li>
                <Check /> Same cleaner on recurring plans
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

        <section className="section">
          <div className="container">
            {groups.map((g) => (
              <div className="areas-hub-group reveal" key={g.name}>
                <h2>{g.name}</h2>
                <AreaChips list={g.areas} showAll={false} />
              </div>
            ))}
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
