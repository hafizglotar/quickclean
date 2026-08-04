import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { SITE_URL, LOCALE, business, placeLabel } from './lib/business';
import { fullGraph } from './lib/jsonld';

// Self-hosted Google fonts via next/font — zero layout shift, faster LCP (a ranking signal).
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

// Leads with the flagship service AND the city — the two things every local
// query contains — and still fits Google's ~60-character title display.
const title = `Deep Cleaning Dubai | Home & Office Cleaning | ${business.name}`;

// ---- SEO metadata (Next.js Metadata API) ----
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${business.name}`,
  },
  description: business.description,
  applicationName: business.name,
  generator: 'Next.js',
  keywords: [
    // Flagship service + city (the highest-intent local queries)
    'deep cleaning Dubai',
    'deep cleaning services Dubai',
    'deep cleaning company Dubai',
    'villa deep cleaning Dubai',
    'apartment deep cleaning Dubai',
    'office deep cleaning Dubai',
    'home deep cleaning Dubai',
    // The other two pillars
    'domestic cleaning Dubai',
    'residential cleaning Dubai',
    'house cleaning Dubai',
    'home cleaning services Dubai',
    'maid service Dubai',
    'office cleaning Dubai',
    'commercial cleaning Dubai',
    'cleaning company in Dubai',
    'cleaning services Dubai',
    // Supporting services
    'move in move out cleaning Dubai',
    'move out cleaning Dubai',
    'sofa cleaning Dubai',
    'mattress cleaning Dubai',
    'carpet cleaning Dubai',
    // Community-level "near me" intent
    ...business.areaServed.slice(0, 6).map((c) => `deep cleaning ${c}`),
    'deep cleaning near me',
    'cleaning company near me Dubai',
  ],
  authors: [{ name: business.name, url: SITE_URL }],
  creator: business.name,
  publisher: business.legalName,
  category: 'Home Services',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: LOCALE.ogLocale,
    url: SITE_URL,
    siteName: business.name,
    title,
    description: business.description,
    // opengraph-image.js generates the image automatically.
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: business.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.webmanifest',
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  // Add your real verification tokens (or set via env) when you have them.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  // Classic geo meta tags. Google no longer uses them, but Bing and several
  // AI crawlers still read them — cheap, unambiguous geographic targeting.
  other: {
    'geo.region': `${business.address.country}-DU`,
    'geo.placename': placeLabel,
    'geo.position': `${business.geo.latitude};${business.geo.longitude}`,
    ICBM: `${business.geo.latitude}, ${business.geo.longitude}`,
  },
};

export const viewport = {
  themeColor: '#0d9488',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

export default function RootLayout({ children }) {
  return (
    <html lang={LOCALE.lang} className={`${jakarta.variable} ${inter.variable}`}>
      <body>
        {/* JSON-LD: Organization + WebSite + LocalBusiness + WebPage + Breadcrumb + FAQ.
            Documented Next.js pattern — rendered in the tree, hoisted by the framework. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(fullGraph()) }}
        />
        {children}
      </body>
    </html>
  );
}
