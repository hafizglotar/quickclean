import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StickyCta from '../../components/StickyCta';
import Animations from '../../components/Animations';
import Breadcrumbs from '../../components/Breadcrumbs';
import ServiceCard from '../../components/ServiceCard';
import QuoteSection from '../../components/QuoteSection';
import GuideCards from '../../components/GuideCards';
import JsonLd from '../../components/seo/JsonLd';
import { ArrowRight } from '../../components/icons';
import { business, services, SITE_URL } from '../../lib/business';
import { GUIDES_PATH, guides, getGuide, guidePath, relatedGuides } from '../../lib/guides';
import { guidePageGraph } from '../../lib/jsonld';

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const url = `${SITE_URL}${guidePath(slug)}`;
  const title = `${guide.title} | ${business.name}`;
  return {
    title: { absolute: title },
    description: guide.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: guide.metaDescription,
      url,
      type: 'article',
      locale: 'en-AE',
      siteName: business.name,
      modifiedTime: guide.updatedAt,
    },
    twitter: { card: 'summary_large_image', title, description: guide.metaDescription },
  };
}

const longDate = (iso) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(iso),
  );

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const relatedServices = services.filter((s) => guide.services.includes(s.slug));

  return (
    <>
      <JsonLd data={guidePageGraph(slug)} />
      <Header />
      <main>
        <section className="subpage-hero">
          <div className="hero-bg" aria-hidden="true" />
          <div className="container">
            <Breadcrumbs
              items={[
                { name: 'Home', href: '/' },
                { name: 'Guides', href: GUIDES_PATH },
                { name: guide.short, href: guidePath(slug) },
              ]}
            />
            <span className="kicker">Guide</span>
            <h1>{guide.title}</h1>
            <p className="section-lead guide-answer">{guide.answer}</p>
            <p className="guide-meta">
              By the {business.name} team. Updated <time dateTime={guide.updatedAt}>{longDate(guide.updatedAt)}</time>.
            </p>
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

        <section className="section guide-body">
          <div className="container">
            <article className="prose guide-prose">
              {guide.sections.map((s) => (
                <section key={s.h}>
                  <h2>{s.h}</h2>
                  {s.p.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                  {s.list && (
                    <ul>
                      {s.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </article>
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="container">
            <div className="section-head reveal">
              <span className="kicker">FAQ</span>
              <h2>Common Questions</h2>
            </div>
            <div className="faq-list">
              {guide.faqs.map((f) => (
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

        <section className="section services related">
          <div className="container">
            <div className="section-head reveal">
              <span className="kicker">Related services</span>
              <h2>Services Mentioned in This Guide</h2>
            </div>
            <div className="services-grid">
              {relatedServices.map((s) => (
                <ServiceCard s={s} key={s.slug} />
              ))}
            </div>
          </div>
        </section>

        <section className="section services">
          <div className="container">
            <div className="section-head reveal">
              <span className="kicker">Keep reading</span>
              <h2>More Cleaning Guides</h2>
            </div>
            <GuideCards list={relatedGuides(guide)} />
          </div>
        </section>

        <QuoteSection />
      </main>
      <Footer />
      <StickyCta />
      <Animations />
    </>
  );
}
