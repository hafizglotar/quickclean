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
import Footer from './components/Footer';
import StickyCta from './components/StickyCta';
import Animations from './components/Animations';
import { homePageGraph } from './lib/jsonld';

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageGraph()) }}
      />
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
        <QuoteSection />
        <Faq />
      </main>
      <Footer />
      <StickyCta />
      <Animations />
    </>
  );
}
