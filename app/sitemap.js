import { SITE_URL, services, pageUpdatedAt } from './lib/business';
import { getServiceContent } from './lib/services-content';
import { AREAS_HUB_PATH, areas, areaPath, areasUpdatedAt } from './lib/areas';

/* Generates /sitemap.xml.
   lastModified comes from the `updatedAt` fields in the data files rather
   than the build time, so a redeploy with no content change does not tell
   crawlers every page is new. */
const date = (iso) => new Date(iso);

export default function sitemap() {
  return [
    { url: `${SITE_URL}/`, lastModified: date(pageUpdatedAt.home), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/pricing`, lastModified: date(pageUpdatedAt.pricing), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified: date(pageUpdatedAt.services), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: date(pageUpdatedAt.about), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: date(pageUpdatedAt.contact), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE_URL}${AREAS_HUB_PATH}`, lastModified: date(areasUpdatedAt()), changeFrequency: 'monthly', priority: 0.7 },
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: date(getServiceContent(s.slug)?.updatedAt || pageUpdatedAt.services),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    ...areas.map((a) => ({
      url: `${SITE_URL}${areaPath(a.slug)}`,
      lastModified: date(a.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
