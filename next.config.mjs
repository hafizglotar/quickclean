import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Pin the workspace root so Next doesn't pick up a stray parent lockfile.
  turbopack: { root: __dirname },
  // Canonical host is https://www.quickclean.ae. Send the bare apex to www
  // with a 301 so search engines consolidate signals on one host. Vercel's
  // domain settings must agree (see README → Domains).
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'quickclean.ae' }],
        destination: 'https://www.quickclean.ae/:path*',
        permanent: true,
      },
    ];
  },
  // Long-cache the immutable static assets for better Core Web Vitals (a ranking factor).
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
