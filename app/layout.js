import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { SITE_URL, business } from './lib/business';
import { fullGraph } from './lib/jsonld';

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

const GA_ID = 'G-B8VTY7HQFH';

const title = `House Cleaning Services in Dubai | Quick Clean`;
const description =
  'Professional house cleaning service in Dubai. Book residential, deep, move-in/move-out and commercial cleaning with upfront pricing and a satisfaction guarantee.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${business.name}`,
  },
  description,
  applicationName: business.name,
  generator: 'Next.js',
  authors: [{ name: business.name, url: SITE_URL }],
  creator: business.name,
  publisher: business.name,
  category: 'Home Services',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en-AE',
    url: SITE_URL,
    siteName: business.name,
    title,
    description: business.description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  verification: {
    google: '5DWjxPGuQ-ewPBtXnLXjumx42NVkUE9Ql4utDML2zDg',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(fullGraph()) }}
        />
        {children}

        <Analytics />
        <SpeedInsights />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
