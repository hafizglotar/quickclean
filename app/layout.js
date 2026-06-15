import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { SITE_URL, business } from './lib/business';
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

const title = `${business.name} — ${business.tagline} | Book in 60 Seconds`;

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
    'house cleaning',
    'cleaning service',
    'maid service',
    'deep cleaning',
    'move out cleaning',
    'office cleaning',
    'commercial cleaning',
    'residential cleaning',
    `cleaning service ${business.address.city}`,
    `house cleaners ${business.address.city}`,
    'cleaning company near me',
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
    locale: 'en_US',
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
};

export const viewport = {
  themeColor: '#0d9488',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
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
