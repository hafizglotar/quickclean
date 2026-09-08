import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StickyCta from '../components/StickyCta';
import Animations from '../components/Animations';
import Breadcrumbs from '../components/Breadcrumbs';
import QuoteSection from '../components/QuoteSection';
import { Reviews, Stats, WhyUs } from '../components/Sections';
import { ArrowRight, Check } from '../components/icons';
import { business, SITE_URL, stats } from '../lib/business';
import { aboutPageGraph } from '../lib/jsonld';

const place = `${business.address.city}, ${business.address.region}`;
const years = new Date().getFullYear() - business.foundingYear;

const title = `About ${business.name}`;
const description = `${business.name} has cleaned homes and offices across ${place} since ${business.foundingYear}. Vetted, insured cleaners, flat upfront pricing, and a 100% satisfaction guarantee.`;

export const metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `${title} | ${business.name}`,
    description,
    url: `${SITE_URL}/about`,
    type: 'website',
  },
};

const values = [
  {
    title: 'We show up',
    body: 'No-shows are the number one complaint about cleaners. Every booking is confirmed with a named pro and a time window, and we call you if anything changes.',
  },
  {
    title: 'We quote before we clean',
    body: 'You see the full flat price before you confirm. No hourly meters running while someone chats, and no invoice surprises afterwards.',
  },
  {
    title: 'We hire carefully',
    body: 'Every cleaner is interviewed in person, reference-checked, background-checked, trained on our checklist, and rated by customers after each visit.',
  },
  {
    title: 'We fix our mistakes',
    body: 'If any area is not right, tell us within 24 hours and we re-clean it free. We are fully insured and bonded for the rare occasion something goes wrong.',
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageGraph()) }}
      />
      <Header />
      <main>
        <section className="subpage-hero">
          <div className="hero-bg" aria-hidden="true" />
          <div className="container">
            <Breadcrumbs
              items={[
                { name: 'Home', href: '/' },
                { name: 'About', href: '/about' },
              ]}
            />
            <span className="kicker">Who we are</span>
            <h1>
              Cleaning {place} since {business.foundingYear}.
            </h1>
            <p className="section-lead">
              {business.name} started with one van and a simple promise: turn up when we say,
              charge what we quoted, and leave the place spotless. {years} years and{' '}
              {stats[0].value.toLocaleString()} cleans later, that promise has not changed.
            </p>
            <div className="subpage-hero-cta">
              <a href="#quote" className="btn btn-primary btn-lg">
                Get a free quote <ArrowRight />
              </a>
              <Link href="/pricing" className="btn btn-ghost btn-lg">
                See our prices
              </Link>
            </div>
          </div>
        </section>

        <Stats />

        <section className="section about-values">
          <div className="container">
            <div className="section-head reveal">
              <span className="kicker">What we stand for</span>
              <h2>Four rules we do not bend.</h2>
              <p className="section-lead">
                We built {business.name} around the things people told us they hated about hiring
                a cleaner. These are the fixes.
              </p>
            </div>
            <div className="value-grid">
              {values.map((v) => (
                <article className="value-card reveal" key={v.title}>
                  <span className="value-ic" aria-hidden="true">
                    <Check size={15} />
                  </span>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-areas">
          <div className="container">
            <div className="section-head reveal">
              <span className="kicker">Where we work</span>
              <h2>Serving {business.areaServed.length} communities.</h2>
              <p className="section-lead">
                Our teams cover {place} and the surrounding towns. Not sure if you are in range?
                Send your zip code and we will confirm the same day.
              </p>
            </div>
            <ul className="chips reveal">
              {business.areaServed.map((city) => (
                <li className="chip" key={city}>
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <WhyUs />
        <Reviews />
        <QuoteSection />
      </main>
      <Footer />
      <StickyCta />
      <Animations />
    </>
  );
}
