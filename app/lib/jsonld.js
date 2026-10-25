/* ============================================================
   Structured data (JSON-LD) — the backbone of SEO, AEO & GEO.
   ------------------------------------------------------------
   • SEO: rich results (FAQ, breadcrumbs, sitelinks, local pack)
   • AEO: machine-readable Q&A for answer engines
   • GEO (generative): explicit entities AI engines can cite
   • GEO (geographic): HomeAndConstructionBusiness + areaServed

   The root layout emits the site-wide graph (Organization + the
   business node, @id …/#business) on EVERY page. Each page adds
   its own nodes (WebPage, BreadcrumbList, FAQPage, Service) and
   points at the business by @id rather than repeating it.

   No AggregateRating / Review schema is emitted anywhere: there is
   no verified review source yet. Rendered via components/seo/JsonLd.
   ============================================================ */

import {
  SITE_URL,
  business,
  currency,
  sameAs,
  services,
  faqs,
  getService,
  isPlaceholder,
} from './business.js';
import { cleanTypes, lowestPackagePrice, propertySizes } from './pricing.js';
import { getServiceContent } from './services-content.js';
import { AREAS_HUB_PATH, areaPath, areas, getArea } from './areas.js';

export const ORG_ID = `${SITE_URL}/#organization`;
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const SITE_ID = `${SITE_URL}/#website`;
export const OG_IMAGE = `${SITE_URL}/opengraph-image`;

export const serviceUrl = (slug) => `${SITE_URL}/services/${slug}`;

/* ---------------- Shared fragments ---------------- */

function openingHoursSpec() {
  return business.openingHours.map((o) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: o.days,
    opens: o.opens,
    closes: o.closes,
  }));
}

export function postalAddress() {
  const a = business.address;
  return {
    '@type': 'PostalAddress',
    // The street line is only emitted once the TODO placeholder is replaced.
    ...(a.street && !isPlaceholder(a.street) ? { streetAddress: a.street } : {}),
    addressLocality: a.city,
    ...(a.postalCode ? { postalCode: a.postalCode } : {}),
    addressCountry: a.country,
  };
}

export const cityList = (names = business.areaServed) =>
  names.map((name) => ({ '@type': 'City', name }));

function offer(price, url) {
  return {
    '@type': 'Offer',
    url,
    priceCurrency: currency.code,
    price,
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: currency.code,
      price,
    },
  };
}

export function breadcrumbList(id, items) {
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

export function faqPage(id, list) {
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

/* ---------------- Site-wide nodes (root layout) ---------------- */

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
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** The local business entity every page points at: …/#business */
export function businessNode() {
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': BUSINESS_ID,
    name: business.name,
    url: SITE_URL,
    image: OG_IMAGE,
    logo: `${SITE_URL}/icon.svg`,
    description: business.description,
    telephone: business.telephone,
    email: business.email,
    priceRange: business.priceRange,
    currenciesAccepted: currency.code,
    paymentAccepted: 'Credit Card, Debit Card',
    foundingDate: String(business.foundingYear),
    parentOrganization: { '@id': ORG_ID },
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    areaServed: cityList(),
    openingHoursSpecification: openingHoursSpec(),
    ...(sameAs.length ? { sameAs } : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cleaning services',
      itemListElement: services.map((s) => {
        const url = serviceUrl(s.slug);
        return {
          '@type': 'Offer',
          url,
          ...(s.price ? { price: s.price, priceCurrency: currency.code } : {}),
          itemOffered: {
            '@type': 'Service',
            '@id': `${url}/#service`,
            name: s.name || s.title,
            url,
            description: s.desc,
            serviceType: s.title,
            provider: { '@id': BUSINESS_ID },
            areaServed: cityList(),
          },
        };
      }),
    },
  };
}

/**
 * Site-wide graph — injected on EVERY page via the root layout.
 * Only entities that describe the business as a whole belong here.
 */
export function fullGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationNode(), businessNode()],
  };
}

/* ---------------- Home page ---------------- */

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name: business.name,
    description: business.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-AE',
  };
}

function homeWebPageNode() {
  return {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: `${business.name} — ${business.tagline}`,
    description: business.description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': BUSINESS_ID },
    breadcrumb: { '@id': `${SITE_URL}/#breadcrumb` },
    inLanguage: 'en-AE',
    // Lets voice assistants read the headline answer aloud (AEO).
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.hero-title', '.hero-sub'],
    },
  };
}

/** Page-level graph for the home page only: WebSite + FAQPage (+ page/breadcrumb). */
export function homePageGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(),
      homeWebPageNode(),
      breadcrumbList(`${SITE_URL}/#breadcrumb`, [{ name: 'Home', url: SITE_URL }]),
      faqPage(`${SITE_URL}/#faq`, faqs),
    ],
  };
}

/* ---------------- Service pages ---------------- */

/** Full JSON-LD graph for a single /services/[slug] page. */
export function servicePageGraph(slug) {
  const svc = getService(slug);
  const content = getServiceContent(slug);
  if (!svc || !content) return null;
  const url = serviceUrl(slug);
  const name = `${svc.name || svc.title} in ${business.address.city}`;

  const serviceNode = {
    '@type': 'Service',
    '@id': `${url}/#service`,
    name,
    serviceType: content.serviceType,
    description: content.subhead,
    url,
    provider: { '@id': BUSINESS_ID },
    areaServed: cityList(),
    category: 'Cleaning service',
    ...(svc.price ? { offers: offer(svc.price, url) } : {}),
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
        inLanguage: 'en-AE',
      },
      breadcrumbList(`${url}/#breadcrumb`, [
        { name: 'Home', url: SITE_URL },
        { name: 'Services', url: `${SITE_URL}/services` },
        { name: svc.name || svc.title, url },
      ]),
      faqPage(`${url}/#faq`, content.faqs),
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
        name: `Cleaning Services in ${business.address.city}, ${business.address.region}`,
        description: `Explore every cleaning service Quick Clean offers in ${business.address.city} — residential, deep, move-out, office, carpet, and window cleaning.`,
        isPartOf: { '@id': SITE_ID },
        breadcrumb: { '@id': `${url}/#breadcrumb` },
        inLanguage: 'en-AE',
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
          name: s.name || s.title,
          url: serviceUrl(s.slug),
        })),
      },
    ],
  };
}

/* ---------------- Area (location) pages ---------------- */

/** Full JSON-LD graph for /cleaning-services-<area>. */
export function areaPageGraph(slug) {
  const area = getArea(slug);
  if (!area) return null;
  const url = `${SITE_URL}${areaPath(slug)}`;
  const name = `House Cleaning Services in ${area.name}`;
  const place = {
    '@type': 'City',
    name: area.name,
    containedInPlace: { '@type': 'AdministrativeArea', name: area.containedIn },
  };
  const prices = cleanTypes.flatMap((t) =>
    t.prices.filter((_, i) => area.propertySizeKeys.includes(propertySizes[i].key))
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}/#service`,
        name,
        serviceType: 'House cleaning',
        description: area.metaDescription,
        url,
        provider: { '@id': BUSINESS_ID },
        areaServed: place,
        category: 'Cleaning service',
        offers: {
          '@type': 'AggregateOffer',
          url,
          priceCurrency: currency.code,
          lowPrice: Math.min(lowestPackagePrice, ...prices),
          highPrice: Math.max(...prices),
          offerCount: prices.length,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Cleaning services in ${area.name}`,
          itemListElement: services.map((s) => ({
            '@type': 'Offer',
            url: serviceUrl(s.slug),
            ...(s.price ? { price: s.price, priceCurrency: currency.code } : {}),
            itemOffered: { '@type': 'Service', '@id': `${serviceUrl(s.slug)}/#service`, name: s.name || s.title },
          })),
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}/#webpage`,
        url,
        name,
        description: area.metaDescription,
        isPartOf: { '@id': SITE_ID },
        about: { '@id': `${url}/#service` },
        breadcrumb: { '@id': `${url}/#breadcrumb` },
        inLanguage: 'en-AE',
      },
      breadcrumbList(`${url}/#breadcrumb`, [
        { name: 'Home', url: SITE_URL },
        { name, url },
      ]),
      faqPage(`${url}/#faq`, area.faqs),
    ],
  };
}

/** JSON-LD graph for the /areas hub page. */
export function areasIndexGraph() {
  const url = `${SITE_URL}${AREAS_HUB_PATH}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}/#webpage`,
        url,
        name: 'Areas We Serve in Dubai, Sharjah and Ajman',
        description: `Every community where ${business.name} provides house cleaning, with a page for each area.`,
        isPartOf: { '@id': SITE_ID },
        about: { '@id': BUSINESS_ID },
        breadcrumb: { '@id': `${url}/#breadcrumb` },
        inLanguage: 'en-AE',
      },
      breadcrumbList(`${url}/#breadcrumb`, [
        { name: 'Home', url: SITE_URL },
        { name: 'Areas we serve', url },
      ]),
      {
        '@type': 'ItemList',
        '@id': `${url}/#list`,
        itemListElement: areas.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `House Cleaning Services in ${a.name}`,
          url: `${SITE_URL}${areaPath(a.slug)}`,
        })),
      },
    ],
  };
}

/* ---------------- Pricing / About / Contact pages ---------------- */

/** Every clean type × property size as a concrete Offer, so search and answer
 *  engines can quote real prices rather than guessing from page text. */
export function pricingPageGraph() {
  const url = `${SITE_URL}/pricing`;
  const allPrices = cleanTypes.flatMap((t) => t.prices);

  const offers = cleanTypes.flatMap((tier) =>
    tier.prices.map((price, i) => ({
      '@type': 'Offer',
      '@id': `${url}/#offer-${tier.key}-${i + 1}`,
      name: `${tier.label} — ${propertySizes[i].label}`,
      description: `${tier.label} for a ${propertySizes[i].label.toLowerCase()}, flat rate per visit.`,
      priceCurrency: currency.code,
      price,
      availability: 'https://schema.org/InStock',
      url,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: currency.code,
        price,
        unitText: propertySizes[i].label,
      },
    }))
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}/#webpage`,
        url,
        name: `Cleaning Prices in ${business.address.city}, ${business.address.region}`,
        description: `Flat cleaning prices by unit type. Basic, Standard and Premium plans from ${currency.format(Math.min(...allPrices))}.`,
        isPartOf: { '@id': SITE_ID },
        breadcrumb: { '@id': `${url}/#breadcrumb` },
        inLanguage: 'en-AE',
      },
      breadcrumbList(`${url}/#breadcrumb`, [
        { name: 'Home', url: SITE_URL },
        { name: 'Pricing', url },
      ]),
      {
        '@type': 'OfferCatalog',
        '@id': `${url}/#catalog`,
        name: `${business.name} cleaning packages`,
        provider: { '@id': BUSINESS_ID },
        itemListElement: offers,
      },
      {
        '@type': 'AggregateOffer',
        '@id': `${url}/#aggregate`,
        priceCurrency: currency.code,
        lowPrice: Math.min(...allPrices),
        highPrice: Math.max(...allPrices),
        offerCount: allPrices.length,
        url,
      },
    ],
  };
}

export function aboutPageGraph() {
  const url = `${SITE_URL}/about`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${url}/#webpage`,
        url,
        name: `About ${business.name}`,
        description: business.description,
        isPartOf: { '@id': SITE_ID },
        about: { '@id': BUSINESS_ID },
        breadcrumb: { '@id': `${url}/#breadcrumb` },
        inLanguage: 'en-AE',
      },
      breadcrumbList(`${url}/#breadcrumb`, [
        { name: 'Home', url: SITE_URL },
        { name: 'About', url },
      ]),
    ],
  };
}

export function contactPageGraph() {
  const url = `${SITE_URL}/contact`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${url}/#webpage`,
        url,
        name: `Contact ${business.name}`,
        description: `Call, email or message ${business.name} for a free cleaning quote in ${business.address.city}.`,
        isPartOf: { '@id': SITE_ID },
        about: { '@id': BUSINESS_ID },
        breadcrumb: { '@id': `${url}/#breadcrumb` },
        inLanguage: 'en-AE',
      },
      breadcrumbList(`${url}/#breadcrumb`, [
        { name: 'Home', url: SITE_URL },
        { name: 'Contact', url },
      ]),
    ],
  };
}
