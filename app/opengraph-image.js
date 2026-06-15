import { ImageResponse } from 'next/og';
import { business } from './lib/business';

export const alt = `${business.name} — ${business.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Dynamically rendered social-share card (used for og:image AND twitter:image).
// Note: every multi-child element declares display:flex (Satori requirement),
// and we avoid emoji/symbol glyphs so it renders without any network font fetch.
export default function OpengraphImage() {
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
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
            A spotless home, without lifting a finger.
          </div>
          <div style={{ fontSize: 34, color: '#c4ddd9', fontWeight: 500, marginTop: 22 }}>
            Vetted pros · Flat pricing · 100% satisfaction guarantee
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, color: '#5eead4' }}>
          Rated 4.9/5 · 2,300+ reviews · Book in 60 seconds
        </div>
      </div>
    ),
    { ...size }
  );
}
