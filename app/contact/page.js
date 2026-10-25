import Header from '../components/Header';
import Footer from '../components/Footer';
import Animations from '../components/Animations';
import Breadcrumbs from '../components/Breadcrumbs';
import QuoteSection from '../components/QuoteSection';
import MapEmbed from '../components/MapEmbed';
import { Faq } from '../components/Sections';
import { ArrowRight, Phone } from '../components/icons';
import {
  business,
  formatAddress,
  googleBusinessProfileUrl,
  hoursRows,
  mapsSearchUrl,
  SITE_URL,
} from '../lib/business';
import { contactPageGraph } from '../lib/jsonld';
import JsonLd from '../components/seo/JsonLd';

const place = `${business.address.city}, ${business.address.region}`;

const title = `Contact ${business.name}`;
const description = `Get in touch with ${business.name} in ${place}. Call ${business.telephoneDisplay}, email ${business.email}, or request a free cleaning quote online in 60 seconds.`;

export const metadata = {
  title,
  description,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `${title} | ${business.name}`,
    description,
    url: `${SITE_URL}/contact`,
    type: 'website',
  },
};

export default function ContactPage() {
  const rows = hoursRows();

  return (
    <>
      <JsonLd data={contactPageGraph()} />
      <Header />
      <main>
        <section className="subpage-hero">
          <div className="hero-bg" aria-hidden="true" />
          <div className="container">
            <Breadcrumbs
              items={[
                { name: 'Home', href: '/' },
                { name: 'Contact', href: '/contact' },
              ]}
            />
            <span className="kicker">Get in touch</span>
            <h1>Talk to a real person.</h1>
            <p className="section-lead">
              Questions about a clean, a quote, or a booking you already have? Call us, email us,
              or send the form below and we will reply within 15 minutes during opening hours.
            </p>
            <div className="subpage-hero-cta">
              <a href={`tel:${business.telephone}`} className="btn btn-primary btn-lg">
                <Phone size={18} /> {business.telephoneDisplay}
              </a>
              <a href="#quote" className="btn btn-ghost btn-lg">
                Request a quote <ArrowRight />
              </a>
            </div>
          </div>
        </section>

        <section className="section contact-details">
          <div className="container">
            <div className="contact-grid">
              <article className="contact-card reveal">
                <h2>Call or email</h2>
                <dl>
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:${business.telephone}`}>{business.telephoneDisplay}</a>
                  </dd>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${business.email}`}>{business.email}</a>
                  </dd>
                  {googleBusinessProfileUrl && (
                    <>
                      <dt>Google</dt>
                      <dd>
                        <a href={googleBusinessProfileUrl} target="_blank" rel="noopener noreferrer">
                          Google Business Profile
                        </a>
                      </dd>
                    </>
                  )}
                </dl>
              </article>

              <article className="contact-card reveal">
                <h2>Opening hours</h2>
                <dl>
                  {rows.map((r) => (
                    <div className="hours-row" key={r.days}>
                      <dt>{r.days}</dt>
                      <dd>{r.hours}</dd>
                    </div>
                  ))}
                </dl>
              </article>

              <article className="contact-card reveal">
                <h2>Visit the office</h2>
                <address>
                  {business.legalName}
                  <br />
                  {formatAddress()}
                </address>
                <a
                  className="contact-map-link"
                  href={mapsSearchUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps <ArrowRight size={14} />
                </a>
              </article>

              <article className="contact-card reveal">
                <h2>Areas we serve</h2>
                <ul className="chips">
                  {business.areaServed.map((city) => (
                    <li className="chip" key={city}>
                      {city}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
            <div className="reveal">
              <MapEmbed />
            </div>
          </div>
        </section>

        <QuoteSection />
        <Faq />
      </main>
      <Footer />
      <Animations />
    </>
  );
}
