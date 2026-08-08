/* ============================================================
   Structured data (JSON-LD) — the backbone of SEO, AEO & GEO.
   ------------------------------------------------------------
   • SEO: rich results (rating stars, FAQ, sitelinks, local pack)
   • AEO: machine-readable Q&A for answer engines
   • GEO (generative): explicit entities AI engines can cite
   • GEO (geographic): LocalBusiness + GeoCoordinates + areaServed
   We emit ONE @graph so every node is cross-linked by @id.
   ============================================================ */

import {
  SITE_URL,
  LOCALE,
  business,
  sameAs,
  services,
  reviews,
  faqs,
  getService,
  placeLabel,
} from './business';
import { getServiceContent } from './services-content';

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const LOCAL_ID = `${SITE_URL}/#localbusiness`;
const OG_IMAGE = `${SITE_URL}/opengraph-image`;

function openingHoursSpec() {
  return business.openingHours.map((o) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: o.days,
    opens: o.opens,
    closes: o.closes,
  }));
}

function postalAddress() {
  // The UAE has no postal codes, so `postalCode` is deliberately omitted —
  // emitting an empty or invented one is worse than leaving it out.
  return {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.regionName,
    addressCountry: business.address.country,
  };
}

/* Geographic targeting (the "GEO" in SEO/AEO/GEO): the emirate as a City node,
   then every community we serve as its own Place. This is what lets Google and
   AI engines answer "deep cleaning in Dubai Marina" with us. */
function areaServedNodes() {
  return [
    { '@type': 'City', name: business.address.city, '@id': `${SITE_URL}/#city` },
    ...business.areaServed.map((c) => ({
      '@type': 'Place',
      name: c,
      containedInPlace: { '@id': `${SITE_URL}/#city` },
    })),
  ];
}

export function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: business.name,
    legalName: business.legalName,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icon.svg`,
      caption: `${business.name} logo`,
    },
    image: OG_IMAGE,
    email: business.email,
    telephone: business.telephone,
    foundingDate: String(business.foundingYear),
    description: business.description,
    sameAs,
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name: business.name,
    description: business.description,
    publisher: { '@id': ORG_ID },
    inLanguage: LOCALE.lang,
  };
}

export function localBusinessNode() {
  return {
    // Multiple types so search + AI engines understand the entity precisely.
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'CleaningService'],
    '@id': LOCAL_ID,
    name: business.name,
    url: SITE_URL,
    image: OG_IMAGE,
    logo: `${SITE_URL}/icon.svg`,
    description: business.description,
    slogan: business.tagline,
    // Explicit topical entities — tells search + AI engines what we specialise in.
    knowsAbout: [
      'Deep cleaning',
      'Villa deep cleaning',
      'Apartment deep cleaning',
      'Office deep cleaning',
      'Domestic cleaning',
      'Residential cleaning',
      'Office cleaning',
      'Commercial cleaning',
      'Move out cleaning',
      'End of tenancy cleaning',
      'Sofa shampooing',
      'Mattress cleaning',
    ],
    telephone: business.telephone,
    email: business.email,
    priceRange: business.priceRange,
    currenciesAccepted: 'AED',
    paymentAccepted: 'Credit Card, Debit Card, Bank Transfer, Cash',
    foundingDate: String(business.foundingYear),
    parentOrganization: { '@id': ORG_ID },
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    areaServed: areaServedNodes(),
    hasMap: business.social.google,
    openingHoursSpecification: openingHoursSpec(),
    sameAs,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rating.value,
      reviewCount: business.rating.count,
      bestRating: business.rating.best,
      worstRating: 1,
    },
    makesOffer: services
      .filter((s) => s.price)
      .map((s) => ({
        '@type': 'Offer',
        priceCurrency: 'AED',
        price: s.price,
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'AED',
          minPrice: s.price,
        },
        itemOffered: { '@type': 'Service', name: s.title, description: s.desc },
      })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cleaning services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.desc,
          serviceType: s.title,
          provider: { '@id': LOCAL_ID },
          areaServed: areaServedNodes(),
        },
      })),
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
      author: { '@type': 'Person', name: r.name },
      reviewBody: r.quote,
    })),
  };
}

export function faqNode() {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbNode() {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    ],
  };
}

export function webPageNode() {
  return {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: `${business.name} — ${business.tagline}`,
    description: business.description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': LOCAL_ID },
    breadcrumb: { '@id': `${SITE_URL}/#breadcrumb` },
    inLanguage: LOCALE.lang,
    // Lets voice assistants read the headline answer aloud (AEO).
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.hero-title', '.hero-sub'],
    },
  };
}

/* ------------------------------------------------------------
   Service pages
   ------------------------------------------------------------ */

// Compact, self-contained provider so each service page resolves on its own.
function compactProvider() {
  return {
    '@type': ['LocalBusiness', 'CleaningService'],
    '@id': LOCAL_ID,
    name: business.name,
    url: SITE_URL,
    telephone: business.telephone,
    image: OG_IMAGE,
    priceRange: business.priceRange,
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rating.value,
      reviewCount: business.rating.count,
      bestRating: business.rating.best,
    },
  };
}

function breadcrumbList(id, items) {
  return {
    '@type': 'BreadcrumbList',
    '@id': id,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

function faqNodeFor(id, list) {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: list.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Full JSON-LD graph for a single /services/[slug] page. */
export function servicePageGraph(slug) {
  const svc = getService(slug);
  const content = getServiceContent(slug);
  if (!svc || !content) return null;
  const url = `${SITE_URL}/services/${slug}`;
  const name = `${svc.title} in ${placeLabel}`;

  const serviceNode = {
    '@type': 'Service',
    '@id': `${url}/#service`,
    name,
    serviceType: content.serviceType,
    description: content.subhead,
    url,
    provider: compactProvider(),
    areaServed: areaServedNodes(),
    category: 'Cleaning service',
    ...(svc.price
      ? {
          offers: {
            '@type': 'Offer',
            url,
            priceCurrency: 'AED',
            price: svc.price,
            availability: 'https://schema.org/InStock',
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'AED',
              minPrice: svc.price,
            },
          },
        }
      : {}),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      serviceNode,
      {
        '@type': 'WebPage',
        '@id': `${url}/#webpage`,
        url,
        name,
        description: content.subhead,
        isPartOf: { '@id': SITE_ID },
        about: { '@id': `${url}/#service` },
        breadcrumb: { '@id': `${url}/#breadcrumb` },
        inLanguage: LOCALE.lang,
      },
      breadcrumbList(`${url}/#breadcrumb`, [
        { name: 'Home', url: SITE_URL },
        { name: 'Services', url: `${SITE_URL}/services` },
        { name: svc.title, url },
      ]),
      faqNodeFor(`${url}/#faq`, content.faqs),
    ],
  };
}

/**
 * JSON-LD graph for the /terms page.
 * Note: schema.org has no `TermsOfService` type and no `termsOfService`
 * property on Organization — a plain WebPage plus a breadcrumb is the
 * correct, valid markup here.
 */
export function termsPageGraph({ title, description, dateModified }) {
  const url = `${SITE_URL}/terms`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}/#webpage`,
        url,
        name: title,
        description,
        isPartOf: { '@id': SITE_ID },
        about: { '@id': LOCAL_ID },
        publisher: { '@id': ORG_ID },
        dateModified,
        breadcrumb: { '@id': `${url}/#breadcrumb` },
        inLanguage: LOCALE.lang,
      },
      breadcrumbList(`${url}/#breadcrumb`, [
        { name: 'Home', url: SITE_URL },
        { name: 'Terms & Conditions', url },
      ]),
    ],
  };
}

/** JSON-LD graph for the /services index page. */
export function servicesIndexGraph() {
  const url = `${SITE_URL}/services`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}/#webpage`,
        url,
        name: `Deep Cleaning, Domestic & Office Cleaning in ${business.address.city}`,
        description: `Every cleaning service Quick Clean offers in ${business.address.city} — deep cleaning, domestic cleaning, office and commercial cleaning, move-out, carpet, and window cleaning.`,
        isPartOf: { '@id': SITE_ID },
        breadcrumb: { '@id': `${url}/#breadcrumb` },
        inLanguage: LOCALE.lang,
      },
      breadcrumbList(`${url}/#breadcrumb`, [
        { name: 'Home', url: SITE_URL },
        { name: 'Services', url },
      ]),
      {
        '@type': 'ItemList',
        '@id': `${url}/#list`,
        itemListElement: services.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: s.title,
          url: `${SITE_URL}/services/${s.slug}`,
        })),
      },
    ],
  };
}

/**
 * Site-wide graph — injected on EVERY page via the root layout.
 * Only entities that describe the business/site as a whole belong here.
 * Page-specific nodes (WebPage, BreadcrumbList, FAQPage) are emitted per page
 * so we never ship duplicate or mismatched page schema.
 */
export function fullGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationNode(), websiteNode(), localBusinessNode()],
  };
}

/** Page-level graph for the home page only. */
export function homePageGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [webPageNode(), breadcrumbNode(), faqNode()],
  };
}
