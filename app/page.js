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
        <Faq />
      </main>
      <Footer />
      <StickyCta />
      <Animations />
    </>
  );
}
