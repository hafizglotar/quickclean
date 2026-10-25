'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { cleanTypes, currency, flatRate, propertySizes } from '../lib/pricing';
import { ArrowRight, Minus, Plus } from './icons';

const MAX_BEDROOMS = propertySizes.length;
const MAX_BATHROOMS = 5;

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

/* Instant price checker. Every figure comes from flatRate() in lib/pricing.js,
   the same matrix the pricing page prints, so the result can never undercut a
   "from AED" price shown elsewhere on the site. */
export default function PriceCalculator() {
  const [beds, setBeds] = useState(2);
  const [baths, setBaths] = useState(1);
  const [type, setType] = useState('standard');

  const price = flatRate({ bedrooms: beds, bathrooms: baths, cleanType: type });

  const priceEl = useRef(null);
  const prev = useRef(price);

  useEffect(() => {
    const el = priceEl.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.textContent = currency.format(price);
      prev.current = price;
      return;
    }
    const obj = { v: prev.current };
    const tween = gsap.to(obj, {
      v: price,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = currency.format(Math.round(obj.v));
      },
      onComplete: () => {
        prev.current = price;
      },
    });
    return () => tween.kill();
  }, [price]);

  return (
    <div className="quote-card">
      <h3>Instant price check</h3>
      <p className="quote-card-sub">See your flat rate — no surprises.</p>

      <div className="qc-row">
        <label>Bedrooms</label>
        <div className="qc-stepper">
          <button
            type="button"
            aria-label="fewer bedrooms"
            onClick={() => setBeds((v) => clamp(v - 1, 1, MAX_BEDROOMS))}
          >
            <Minus />
          </button>
          <span>{beds}</span>
          <button
            type="button"
            aria-label="more bedrooms"
            onClick={() => setBeds((v) => clamp(v + 1, 1, MAX_BEDROOMS))}
          >
            <Plus />
          </button>
        </div>
      </div>

      <div className="qc-row">
        <label>Bathrooms</label>
        <div className="qc-stepper">
          <button
            type="button"
            aria-label="fewer bathrooms"
            onClick={() => setBaths((v) => clamp(v - 1, 1, MAX_BATHROOMS))}
          >
            <Minus />
          </button>
          <span>{baths}</span>
          <button
            type="button"
            aria-label="more bathrooms"
            onClick={() => setBaths((v) => clamp(v + 1, 1, MAX_BATHROOMS))}
          >
            <Plus />
          </button>
        </div>
      </div>

      <div className="qc-row">
        <label htmlFor="qcType">Clean type</label>
        <select id="qcType" value={type} onChange={(e) => setType(e.target.value)}>
          {cleanTypes.map((t) => (
            <option key={t.key} value={t.key}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="qc-total">
        <span>Your flat rate</span>
        <strong ref={priceEl}>{currency.format(price)}</strong>
      </div>

      <a href="#quote" className="btn btn-primary btn-block">
        Book this clean <ArrowRight />
      </a>
      <p className="qc-note">Final price confirmed before you pay. Cancel free anytime.</p>
    </div>
  );
}
