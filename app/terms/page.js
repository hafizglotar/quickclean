import Header from '../components/Header';
import Footer from '../components/Footer';
import Animations from '../components/Animations';
import Breadcrumbs from '../components/Breadcrumbs';
import { business, SITE_URL } from '../lib/business';
import { termsIntro, termsSections, termsUpdated } from '../lib/legal';
import { termsPageGraph } from '../lib/jsonld';

const title = 'Terms & Conditions';
const description = `The terms and conditions governing cleaning services provided by ${business.legalName} in ${business.address.city}, ${business.address.countryName} — bookings, pricing, cancellations, our 100% Spotless Guarantee, liability, and governing law.`;

export const metadata = {
  title,
  description,
  alternates: { canonical: '/terms' },
  openGraph: {
    title: `${title} | ${business.name}`,
    description,
    url: `${SITE_URL}/terms`,
    type: 'website',
  },
  // `robots` is deliberately not set — this page inherits the site-wide
  // index/follow rules from the root layout.
};

// Rendered in UTC so the date never shifts by a day depending on where the
// page is built or viewed from.
const updatedLabel = new Date(`${termsUpdated}T00:00:00Z`).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

function Block({ block }) {
  if (block.list) {
    const List = block.ordered ? 'ol' : 'ul';
    return (
      <List className={block.ordered ? 'legal-list legal-list-ordered' : 'legal-list'}>
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </List>
    );
  }
  return <p>{block.p}</p>;
}

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            termsPageGraph({ title, description, dateModified: termsUpdated })
          ),
        }}
      />
      {/* Header and Footer live on every page, so their quote CTA has to be an
          absolute link — there is no #quote section on this page. */}
      <Header quoteHref="/#quote" />
      <main>
        <section className="subpage-hero">
          <div className="hero-bg" aria-hidden="true" />
          <div className="container">
            <Breadcrumbs
              items={[
                { name: 'Home', href: '/' },
                { name: title, href: '/terms' },
              ]}
            />
            <span className="kicker">Legal</span>
            <h1>{title}</h1>
            <p className="legal-updated">
              Last updated <time dateTime={termsUpdated}>{updatedLabel}</time>
            </p>
            <p className="section-lead">{termsIntro}</p>
          </div>
        </section>

        <section className="section legal">
          <div className="container legal-grid">
            <nav className="legal-toc" aria-label="On this page">
              <h2 className="legal-toc-title">On this page</h2>
              <ol>
                {termsSections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>
                      <span aria-hidden="true">{i + 1}.</span> {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="legal-body">
              {termsSections.map((s, i) => (
                <section className="legal-section" id={s.id} key={s.id}>
                  <h2>
                    <span className="legal-num" aria-hidden="true">
                      {i + 1}.
                    </span>
                    {s.heading}
                  </h2>
                  {s.blocks.map((block, bi) => (
                    <Block block={block} key={bi} />
                  ))}
                </section>
              ))}

              <aside className="legal-contact">
                <h2>Questions about these terms?</h2>
                <p>
                  We would rather explain something than have you guess. Call us, send a
                  WhatsApp, or drop us an email and a real person will answer.
                </p>
                <div className="legal-contact-links">
                  <a href={`tel:${business.telephone}`} className="btn btn-primary">
                    {business.telephoneDisplay}
                  </a>
                  <a
                    href={`https://wa.me/${business.whatsapp}`}
                    className="btn btn-ghost"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp us
                  </a>
                  <a href={`mailto:${business.email}`} className="btn btn-ghost">
                    {business.email}
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer quoteHref="/#quote" />
      <Animations />
    </>
  );
}
