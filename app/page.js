import Header from './components/Header';
import Hero from './components/Hero';
import {
  TrustBar,
  Stats,
  Services,
  WhyUs,
  HowItWorks,
  Pricing,
  Reviews,
  Faq,
} from './components/Sections';
import QuoteSection from './components/QuoteSection';
import GoogleReviews from './components/GoogleReviews';
import Footer from './components/Footer';
import StickyCta from './components/StickyCta';
import Animations from './components/Animations';
import { homePageGraph } from './lib/jsonld';
import JsonLd from './components/seo/JsonLd';
import GuideCards from './components/GuideCards';
import { ArrowRight } from './components/icons';
import { GUIDES_PATH, guides } from './lib/guides';

export default function Home() {
  return (
    <>
      <JsonLd data={homePageGraph()} />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Stats />
        <Services />
        <WhyUs />
        <HowItWorks />
        <Pricing />
        <Reviews />
        <GoogleReviews />
        <QuoteSection />
        <section className="section services" id="guides">
          <div className="container">
            <div className="section-head reveal">
              <span className="kicker">Guides</span>
              <h2>Cleaning Guides for Dubai Homes</h2>
            </div>
            <GuideCards list={guides.slice(0, 3)} />
            <p className="guides-all">
              <a href={GUIDES_PATH} className="btn btn-ghost">
                All {guides.length} guides <ArrowRight />
              </a>
            </p>
          </div>
        </section>
        <Faq />
      </main>
      <Footer />
      <StickyCta />
      <Animations />
    </>
  );
}
