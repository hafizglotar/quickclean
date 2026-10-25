# Quick Clean — quickclean.ae

Conversion-focused website for Quick Clean, a house and office cleaning company in Dubai.
Built with Next.js (App Router, plain JavaScript) and GSAP, deployed on Vercel.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (runs prebuild scripts first)
npm run lint
```

Copy `.env.example` to `.env.local` and fill in the values before testing the quote form.

## Canonical host and domains

The canonical host is **https://www.quickclean.ae**. Every absolute URL on the site
(canonical tags, Open Graph, sitemap, structured data, llms.txt) uses the `www` host.

`next.config.mjs` 301-redirects any request that arrives on the bare apex
`quickclean.ae` to `https://www.quickclean.ae/<same path>`. For that redirect to be
reachable, Vercel must route the apex to this project as well:

1. Vercel → Project → **Settings → Domains**.
2. Add both `www.quickclean.ae` and `quickclean.ae`.
3. Set `www.quickclean.ae` as the **primary** domain.
4. Set `quickclean.ae` to **Redirect to `www.quickclean.ae`** (308/301). Vercel then
   answers the apex at the edge; the Next.js redirect is the fallback for any other
   path to this deployment.

## Content and data

All business facts live in `app/lib/` and feed the visible pages, the metadata, the
structured data, the sitemap and the `llms.txt` files, so a change made once shows up
everywhere.

| File | Holds |
|---|---|
| `app/lib/business.js` | Name, phone, email, address, hours, social links, FAQs, `pageUpdatedAt` |
| `app/lib/pricing.js` | Every price: size matrix, starting prices, `flatRate()` |
| `app/lib/services-content.js` | Long-form copy, FAQs and `updatedAt` per service page |
| `app/lib/areas.js` | Copy, FAQs and `updatedAt` per area page (`/cleaning-services-<area>`) |
| `app/lib/social-proof.js` | Ratings, stats, logos, testimonials (empty until verified) |

`updatedAt` / `pageUpdatedAt` feed `<lastmod>` in `sitemap.xml`. Bump the date when you
change a page.

### llms.txt and llms-full.txt

`scripts/build-llms-full.mjs` generates `public/llms.txt` (summary) and
`public/llms-full.txt` (the full text of every service and area page) from the data
files. It runs automatically as `prebuild`, so every `npm run build` and every Vercel
deploy refreshes both files. Run it on its own with `npm run llms`. Do not edit the two
files by hand; edit the data files instead.

## IndexNow

IndexNow tells Bing, Yandex and other participating engines about new or changed URLs
immediately. Setup:

1. The key file lives at `public/<key>.txt` and the same key is `INDEXNOW_KEY` in
   `.env.example`. Add `INDEXNOW_KEY` (and, ideally, a random `INDEXNOW_SUBMIT_TOKEN`)
   to the Vercel project's environment variables.
2. After each deploy that changes content, submit the URLs:

```bash
# Submit every URL in the sitemap
curl -X POST https://www.quickclean.ae/api/indexnow \
  -H "Authorization: Bearer $INDEXNOW_SUBMIT_TOKEN"

# Submit specific URLs
curl -X POST https://www.quickclean.ae/api/indexnow \
  -H "Authorization: Bearer $INDEXNOW_SUBMIT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"urls":["https://www.quickclean.ae/pricing","https://www.quickclean.ae/cleaning-services-jvc"]}'

# Preview the payload without sending it
curl -X POST https://www.quickclean.ae/api/indexnow \
  -H "Authorization: Bearer $INDEXNOW_SUBMIT_TOKEN" \
  -H "Content-Type: application/json" -d '{"dryRun":true}'
```

`GET /api/indexnow` reports whether the key is configured and where the key file is
expected. A `200` or `202` from IndexNow means accepted; `422` means a URL did not
belong to this host; `429` means too many submissions. Google does not use IndexNow;
request indexing for Google in Search Console.
