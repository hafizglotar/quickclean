# Semantic SEO changes

Phase 2 and Phase 3 of the semantic SEO brief, on the `semantic-seo` branch. This branch is not merged. Nothing here is live until it is merged into `main`.

- Date: 21 November 2026
- Audit this work is based on: `SEO_AUDIT.md`

## 1. Scope of this pass

The audit found that most of Phase 2 already existed on the live site. This pass adds only what was missing and could be built without new business data. Items that need answers from the owner are listed in section 6 and were not built.

| Brief item | Result |
|---|---|
| A. Organization, LocalBusiness, Service, BreadcrumbList, FAQPage schema | Already live on every relevant page. **No schema was added or changed**, because any new node would duplicate an existing one. |
| B. Pillar and cluster map | Written in section 2. |
| B. Contextual internal links with descriptive anchors | **Added** on 41 pages. |
| B. Related services block on service pages | Already live. Not duplicated. |
| C. FAQ per service with customer questions | **Added** 4 new questions per service, on time taken, materials, areas covered and one service specific question. |
| C. Quick answer paragraph of 40 to 60 words | **Added** to all 6 service pages. |
| C. Related entity mentions | **Added** to all 6 service pages, as two paragraphs naming Dubai areas, property types, related services and guides. |
| D. `llms.txt` | Already live and generated at build time. The new service content was added to `llms-full.txt` through the generator. |
| D. Key facts as plain text | Already true. No change. |

## 2. Pillar and cluster map

**Pillar: House cleaning in Dubai** (`/`)

| Cluster | Hub page | Pages in the cluster |
|---|---|---|
| **Services** | `/services` | Residential cleaning, deep cleaning, move in and move out cleaning, office and commercial cleaning, carpet and upholstery cleaning, window and glass cleaning |
| **Areas** | `/areas` | 27 pages at `/cleaning-services-{area}`, grouped as Marina and the coast, Downtown and central Dubai, New Dubai and the south, villa communities, Old Dubai and the east, Northern Emirates |
| **Pricing** | `/pricing` | Supported by the guides on cleaning cost and on hourly against flat rate pricing |
| **Guides** | `/guides` | 8 guides. Each supports one or more service pages. |
| **Company** | `/about`, `/contact` | Trust and conversion pages |

**How the clusters link after this pass**

- Every service page links in its text to 3 to 5 area pages, 2 to 3 other services, 1 guide and, where it fits, the pricing page.
- Every area page and every guide links in its text to the pillar, the pricing page, three core services, the about page and the contact page.
- Guide pages already linked to the services they cover, and service pages already listed their guides.

**Anchor text rule used to separate the two competing pages.** The audit flagged the home page and the residential cleaning page as targeting the same search. New links to the home page use "house cleaning across Dubai". New links to the residential page use "weekly or two weekly home cleaning", "regular home cleaning" or "recurring" wording. Neither page's title or H1 was touched.

## 3. What was added

### Service pages (6 pages)

A new section titled "{Service} in Dubai at a Glance", placed below the existing copy and the existing FAQ. It contains:

1. A quick answer of 48 to 59 words that states the price or pricing method, what is covered and how long it takes.
2. Two paragraphs that connect the service to named Dubai areas, property types, related services and a guide, with links inside the sentences.
3. Four new questions under the heading "More Questions About {Service}".

Each service page grew by 349 to 402 words.

### Area pages (27 pages) and guide pages (8 pages)

A short closing section titled "Booking a Cleaner in {Area}" on area pages and "Booking a Cleaner" on guides. Two paragraphs with seven in-text links: the home page, the pricing page, residential cleaning, deep cleaning, move out cleaning, the about page and the contact page.

Each of these pages grew by 103 to 113 words.

### Effect on the weakly linked pages from the audit

| Page | Pages linking in from body text, before | After |
|---|---|---|
| `/about` | 0 | 35 |
| `/contact` | 0 | 36 |
| `/pricing` | 2 | 39 |

### Pages not changed at all

`/`, `/pricing`, `/services`, `/about`, `/contact`, `/areas`, `/guides`.

## 4. Files changed

| File | Type | Purpose |
|---|---|---|
| `app/lib/service-extras.js` | New | Quick answers, context paragraphs and extra questions for the 6 services. Prices are read from `pricing.js`. |
| `app/components/ServiceExtras.js` | New | Renders the new service section. |
| `app/components/RichText.js` | New | Renders a paragraph with links inside it. |
| `app/components/NextSteps.js` | New | The closing link section for area and guide pages. |
| `scripts/check-service-extras.mjs` | New | Build check: quick answer is 40 to 60 words, no special characters, every link target exists. |
| `app/services/[slug]/page.js` | Edited | Two lines: import and render the new section. |
| `app/areas/[area]/page.js` | Edited | Two lines: import and render the closing section. |
| `app/guides/[slug]/page.js` | Edited | Two lines: import and render the closing section. |
| `app/globals.css` | Edited | Four new rules for links in body text and the quick answer. No existing rule changed. |
| `package.json` | Edited | Adds the new check to `prebuild` and `test`. |
| `scripts/build-llms-full.mjs` | Edited | Adds the new service content to `llms-full.txt`. |
| `public/llms-full.txt` | Generated | Rebuilt by the script above. |
| `SEO_AUDIT.md`, `SEO_CHANGES.md` | New | Reports. |

Not touched: `next.config.mjs`, `app/robots.js`, `app/sitemap.js`, `app/lib/jsonld.js`, `app/layout.js`, every metadata export, every existing data file.

## 5. Verification

`npm run lint` and `npm run build` both pass on the branch with no errors.

The branch build was crawled locally and compared, page by page, with the live site for all 48 sitemap URLs.

| Protected item | Result |
|---|---|
| `<title>` | Identical on 48 of 48 pages |
| Meta description, robots, Open Graph and Twitter tags | Identical on 48 of 48 pages |
| Canonical link | Identical on 48 of 48 pages |
| hreflang | None before, none after |
| H1 | Identical on 48 of 48 pages |
| JSON-LD | Byte for byte identical on 48 of 48 pages |
| Existing H2 headings | All present, same order. New H2s were only added. |
| Existing visible text | 8,192 text nodes on the live site, 0 missing on the branch, order unchanged |
| Sitemap | Same 48 URLs in the same order |
| `robots.txt` | Identical |
| URLs, routes, redirects, rewrites | No file that defines them was edited |

### Rendered schema for two sample pages

Both are unchanged from the live site. They are shown here as rendered by the branch build.

### `/services/deep-cleaning`

Site wide nodes on this page: ['Organization', 'HomeAndConstructionBusiness'], unchanged. Page level graph as rendered on the branch build:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.quickclean.ae/services/deep-cleaning/#service",
      "name": "Deep Cleaning in Dubai",
      "serviceType": "Deep Cleaning",
      "description": "Professional deep cleaning services in Dubai for homes that need a detailed top-to-bottom clean, including baseboards, grout, appliances, vents, and hard-to-reach areas.",
      "url": "https://www.quickclean.ae/services/deep-cleaning",
      "provider": {
        "@id": "https://www.quickclean.ae/#business"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Dubai"
        },
        {
          "@type": "City",
          "name": "Sharjah"
        },
        {
          "@type": "City",
          "name": "Ajman"
        }
      ],
      "category": "Cleaning service"
    },
    {
      "@type": "WebPage",
      "@id": "https://www.quickclean.ae/services/deep-cleaning/#webpage",
      "url": "https://www.quickclean.ae/services/deep-cleaning",
      "name": "Deep Cleaning in Dubai",
      "description": "Professional deep cleaning services in Dubai for homes that need a detailed top-to-bottom clean, including baseboards, grout, appliances, vents, and hard-to-reach areas.",
      "isPartOf": {
        "@id": "https://www.quickclean.ae/#website"
      },
      "about": {
        "@id": "https://www.quickclean.ae/services/deep-cleaning/#service"
      },
      "breadcrumb": {
        "@id": "https://www.quickclean.ae/services/deep-cleaning/#breadcrumb"
      },
      "inLanguage": "en-AE"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.quickclean.ae/services/deep-cleaning/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.quickclean.ae"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://www.quickclean.ae/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Deep Cleaning",
          "item": "https://www.quickclean.ae/services/deep-cleaning"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.quickclean.ae/services/deep-cleaning/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the difference between standard and deep cleaning in Dubai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Standard cleaning is designed to maintain an already tidy home, while deep cleaning in Dubai is more detailed and time-intensive. It targets built-up grime, baseboards, grout, vents, and areas behind or inside appliances."
          }
        },
        "... 2 more questions, unchanged ..."
      ]
    }
  ]
}
```

### `/cleaning-services-jvc`

Site wide nodes on this page: ['Organization', 'HomeAndConstructionBusiness'], unchanged. Page level graph as rendered on the branch build:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.quickclean.ae/cleaning-services-jvc/#service",
      "name": "House Cleaning Services in JVC",
      "serviceType": "House cleaning",
      "description": "House cleaning in JVC for apartments, townhouses and villas. Flat prices by home size, easy access and parking, and help with dust in new homes.",
      "url": "https://www.quickclean.ae/cleaning-services-jvc",
      "provider": {
        "@id": "https://www.quickclean.ae/#business"
      },
      "areaServed": {
        "@type": "City",
        "name": "JVC",
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": "Dubai"
        }
      },
      "category": "Cleaning service",
      "offers": {
        "@type": "AggregateOffer",
        "url": "https://www.quickclean.ae/cleaning-services-jvc",
        "priceCurrency": "AED",
        "lowPrice": 200,
        "highPrice": 1050,
        "offerCount": 24
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Cleaning services in JVC",
        "itemListElement": [
          {
            "@type": "Offer",
            "url": "https://www.quickclean.ae/services/residential-cleaning",
            "price": 200,
            "priceCurrency": "AED",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://www.quickclean.ae/services/residential-cleaning/#service",
              "name": "Residential Cleaning"
            }
          },
          {
            "@type": "Offer",
            "url": "https://www.quickclean.ae/services/deep-cleaning",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://www.quickclean.ae/services/deep-cleaning/#service",
              "name": "Deep Cleaning"
            }
          },
          {
            "@type": "Offer",
            "url": "https://www.quickclean.ae/services/move-in-move-out-cleaning",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://www.quickclean.ae/services/move-in-move-out-cleaning/#service",
              "name": "Move In / Move Out Cleaning"
            }
          },
          {
            "@type": "Offer",
            "url": "https://www.quickclean.ae/services/office-commercial-cleaning",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://www.quickclean.ae/services/office-commercial-cleaning/#service",
              "name": "Office & Commercial Cleaning"
            }
          },
          {
            "@type": "Offer",
            "url": "https://www.quickclean.ae/services/carpet-upholstery-cleaning",
            "price": 89,
            "priceCurrency": "AED",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://www.quickclean.ae/services/carpet-upholstery-cleaning/#service",
              "name": "Carpet & Upholstery Cleaning"
            }
          },
          {
            "@type": "Offer",
            "url": "https://www.quickclean.ae/services/window-glass-cleaning",
            "price": 69,
            "priceCurrency": "AED",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://www.quickclean.ae/services/window-glass-cleaning/#service",
              "name": "Window & Glass Cleaning"
            }
          }
        ]
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.quickclean.ae/cleaning-services-jvc/#webpage",
      "url": "https://www.quickclean.ae/cleaning-services-jvc",
      "name": "House Cleaning Services in JVC",
      "description": "House cleaning in JVC for apartments, townhouses and villas. Flat prices by home size, easy access and parking, and help with dust in new homes.",
      "isPartOf": {
        "@id": "https://www.quickclean.ae/#website"
      },
      "about": {
        "@id": "https://www.quickclean.ae/cleaning-services-jvc/#service"
      },
      "breadcrumb": {
        "@id": "https://www.quickclean.ae/cleaning-services-jvc/#breadcrumb"
      },
      "inLanguage": "en-AE"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.quickclean.ae/cleaning-services-jvc/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.quickclean.ae"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Areas we serve",
          "item": "https://www.quickclean.ae/areas"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "House Cleaning Services in JVC",
          "item": "https://www.quickclean.ae/cleaning-services-jvc"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.quickclean.ae/cleaning-services-jvc/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does house cleaning cost in JVC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It is a flat rate by home size, from a studio apartment to a large villa. The table on this page shows the rate for each plan, and you see your price before you book."
          }
        },
        "... 4 more questions, unchanged ..."
      ]
    }
  ]
}
```

## 6. Not done, and why

| Item | Reason |
|---|---|
| **The new service questions are not in the FAQPage schema.** | Rule 6 forbids changing existing JSON-LD, and a second FAQPage node on one page is invalid. The questions are visible on the page only. Merging them into the existing FAQPage node is a small change once approved. |
| **FAQPage schema on `/pricing` and `/contact`.** | Those pages show the same 19 questions as the home page. Marking them up would put identical FAQ schema on three URLs. A short page specific FAQ would be better, but that means changing existing copy, which rule 5 forbids. |
| **Street address, `sameAs`, real map coordinates, opening hours.** | Needs data from the owner. Reported in the audit, section 9. |
| **Offers on the deep cleaning and move in or move out Service schema.** | Needs real starting prices. |
| **New service pages**, such as holiday home cleaning, villa cleaning, sofa cleaning, maid service. | The owner has not confirmed which of these the business sells. |
| **New area pages**, such as JBR, Dubai Creek Harbour, Meydan. | The owner has not confirmed which are served. |

## 7. One inconsistency noticed and left alone

Each service page shows "Supplies: Eco-friendly, included" in its fact card. The price card says that on the Basic plan the owner provides the supplies. The new residential cleaning question answers this by plan. The existing fact card was not edited, because rule 5 forbids changing existing copy. The owner should decide which statement is correct.

## 8. How to release

Merge `semantic-seo` into `main`. Vercel deploys `main` to production. After the deploy, resubmit the 41 changed URLs through IndexNow.
