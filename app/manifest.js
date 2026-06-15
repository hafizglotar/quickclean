import { business } from './lib/business';

// Generates /manifest.webmanifest (PWA + installability + richer mobile presence)
export default function manifest() {
  return {
    name: `${business.name} — ${business.tagline}`,
    short_name: business.name,
    description: business.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0d9488',
    lang: 'en-US',
    categories: ['business', 'lifestyle', 'productivity'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
  };
}
