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
