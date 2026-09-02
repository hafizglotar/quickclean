/* ============================================================
   Quick Clean — central icon set
   ------------------------------------------------------------
   Every icon on the site comes from react-icons (Lucide for the
   UI set, Font Awesome for the filled review stars). They render
   as real inline SVG, inherit `currentColor`, and stay crisp at
   any size — no emoji, no raster images.
   ============================================================ */

import {
  LuArrowRight,
  LuBuilding2,
  LuCheck,
  LuChevronDown,
  LuCircleCheckBig,
  LuGrid2X2,
  LuHouse,
  LuMinus,
  LuPackage,
  LuPhone,
  LuPlus,
  LuShieldCheck,
  LuSofa,
  LuSparkles,
  LuZap,
} from 'react-icons/lu';
import { FaStar } from 'react-icons/fa6';

/* ---------------- Primitives ---------------- */

export function Check({ size = 18, strokeWidth = 3 }) {
  return <LuCheck size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}

export function Phone({ size = 18 }) {
  return <LuPhone size={size} aria-hidden="true" />;
}

export function ArrowRight({ size = 17 }) {
  return <LuArrowRight size={size} strokeWidth={2.5} aria-hidden="true" />;
}

export function ChevronDown({ className = '', size = 14 }) {
  return <LuChevronDown className={className} size={size} strokeWidth={2.5} aria-hidden="true" />;
}

export function Minus({ size = 17 }) {
  return <LuMinus size={size} strokeWidth={3} aria-hidden="true" />;
}

export function Plus({ size = 17 }) {
  return <LuPlus size={size} strokeWidth={3} aria-hidden="true" />;
}

export function Star({ size = 15 }) {
  return <FaStar size={size} aria-hidden="true" />;
}

export function ShieldCheck({ size = 16 }) {
  return <LuShieldCheck size={size} strokeWidth={2.25} aria-hidden="true" />;
}

export function Bolt({ size = 16 }) {
  return <LuZap size={size} strokeWidth={2.25} aria-hidden="true" />;
}

export function CircleCheck({ size = 18 }) {
  return <LuCircleCheckBig size={size} strokeWidth={2.5} aria-hidden="true" />;
}

/* A 5-star row. Use `decorative` where the adjacent text already states the rating. */
export function Stars({ size = 15, label = '5 out of 5 stars', decorative = false }) {
  const a11y = decorative ? { 'aria-hidden': 'true' } : { role: 'img', 'aria-label': label };
  return (
    <span className="stars" {...a11y}>
      {[0, 1, 2, 3, 4].map((i) => (
        <FaStar key={i} size={size} aria-hidden="true" />
      ))}
    </span>
  );
}

/* ---------------- Service icons ---------------- */
// Keyed by the `icon` field on each service in lib/business.js.
const SERVICE_ICONS = {
  home: LuHouse,
  sparkle: LuSparkles,
  box: LuPackage,
  building: LuBuilding2,
  sofa: LuSofa,
  window: LuGrid2X2,
};

export function ServiceIcon({ name, size = 26 }) {
  const Icon = SERVICE_ICONS[name] || LuSparkles;
  return <Icon size={size} strokeWidth={1.9} aria-hidden="true" />;
}

/* ---------------- Logo ---------------- */

export function Logo({ light = false }) {
  return (
    <span className={`logo${light ? ' logo-light' : ''}`}>
      <span className="logo-mark" aria-hidden="true">
        <LuCheck size={21} strokeWidth={3} />
      </span>
      <span className="logo-text">
        Quick<strong>Clean</strong>
      </span>
    </span>
  );
}
