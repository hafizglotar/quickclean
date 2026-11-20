import Header from '../components/Header';
import Footer from '../components/Footer';
import StickyCta from '../components/StickyCta';
import Animations from '../components/Animations';
import Breadcrumbs from '../components/Breadcrumbs';
import QuoteSection from '../components/QuoteSection';
import GuideCards from '../components/GuideCards';
import JsonLd from '../components/seo/JsonLd';
import { business, shareImages, SITE_URL } from '../lib/business';
import { GUIDES_PATH, guides } from '../lib/guides';
import AreasServed from '../components/AreasServed';
import { guidesIndexGraph } from '../lib/jsonld';

const url = `${SITE_URL}${GUIDES_PATH}`;
const title = 'Cleaning Guides for Dubai Homes';
const description =
  'Plain answers on cleaning costs, deep cleans, move out checklists, holiday home turnovers and keeping a Dubai home clean through dust and humidity.';

export const metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | ${business.name}`, description, url, type: 'website', locale: 'en-AE', siteName: business.name, images: shareImages },
  twitter: { card: 'summary_large_image', title: `${title} | ${business.name}`, description, images: shareImages },
};

export default function GuidesHubPage() {
  return (
    <>
      <JsonLd data={guidesIndexGraph()} />
      <Header />
      <main>
        <section className="subpage-hero">
          <div className="hero-bg" aria-hidden="true" />
          <div className="container">
            <Breadcrumbs
              items={[
                { name: 'Home', href: '/' },
                { name: 'Guides', href: GUIDES_PATH },
              ]}
            />
            <span className="kicker">Guides</span>
            <h1>{title}</h1>
            <p className="section-lead">
              Straight answers to the questions people ask before they book a cleaner in Dubai. What
              a clean costs, which kind of clean a home needs, how to hand a rented home back and how
              to keep on top of sand, humidity and limescale. Every price quoted in these guides is
              read from our published price card.
            </p>
          </div>
        </section>

        <section className="section services">
          <div className="container">
            <GuideCards list={guides} />
          </div>
        </section>

        <AreasServed />
        <QuoteSection />
      </main>
      <Footer />
      <StickyCta />
      <Animations />
    </>
  );
}
