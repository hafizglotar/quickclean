import { ImageResponse } from 'next/og';
import { business, getService, services } from '../../lib/business';
import { getServiceContent } from '../../lib/services-content';

// One social-share card per service, so a shared /services/<slug> link shows
// that service's name instead of the generic home-page card. Next wires this
// file into both og:image and twitter:image for the segment.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateImageMetadata({ params }) {
  const { slug } = await params;
  const svc = getService(slug);
  return [
    {
      id: 'card',
      alt: svc ? `${svc.name} in ${business.address.city} — ${business.name}` : business.name,
      size,
      contentType,
    },
  ];
}

// Every multi-child element declares display:flex (Satori requirement), and
// no emoji/symbol glyphs are used so it renders without a network font fetch.
export default async function ServiceOpengraphImage({ params }) {
  const { slug } = await params;
  const svc = getService(slug);
  const content = getServiceContent(slug);
  const name = svc ? svc.name : 'Cleaning Services';
  const tagline = content ? content.subhead : business.description;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: 'linear-gradient(135deg, #0f3d3a 0%, #0f766e 55%, #0d9488 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              height: 60,
              borderRadius: 16,
              background: '#14b8a6',
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            Q
          </div>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
            <span>Quick</span>
            <span style={{ color: '#5eead4' }}>Clean</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: name.length > 24 ? 64 : 78,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1040,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 30,
              color: '#c4ddd9',
              fontWeight: 500,
              marginTop: 22,
              maxWidth: 1040,
              lineHeight: 1.3,
            }}
          >
            {tagline.length > 120 ? `${tagline.slice(0, 117).trimEnd()}...` : tagline}
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, color: '#5eead4' }}>
          Quick Clean · Dubai
        </div>
      </div>
    ),
    { ...size }
  );
}
