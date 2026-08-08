import { SITE_URL, services } from './lib/business';
import { termsUpdated } from './lib/legal';

// Generates /sitemap.xml
export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/terms`,
      // Use the real edit date, not the build date — legal pages should not
      // look freshly changed every time the site is deployed.
      lastModified: new Date(`${termsUpdated}T00:00:00Z`),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
