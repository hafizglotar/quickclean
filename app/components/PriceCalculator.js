'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  bedroomRange,
  cleanTypes,
  currency,
  flatRate,
  propertyTypes,
  sizeFor,
} from '../lib/pricing';
import { ArrowRight, Minus, Plus } from './icons';

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

/* Instant price checker. Every figure comes from flatRate() in lib/pricing.js,
   the same matrix the pricing page prints, so the result always matches the
   published plan card for that unit type. */
export default function PriceCalculator() {
  const [propertyType, setPropertyType] = useState('apartment');
  const [beds, setBeds] = useState(2);
  const [plan, setPlan] = useState('standard');

  const range = bedroomRange(propertyType);
  const size = sizeFor(propertyType, beds);
  const price = flatRate({ propertyType, bedrooms: beds, cleanType: plan });

  const priceEl = useRef(null);
  const prev = useRef(price);

  const changeType = (next) => {
    setPropertyType(next);
    const r = bedroomRange(next);
    setBeds((v) => clamp(v, r.min, r.max));
  };

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
        <label htmlFor="qcProperty">Property</label>
        <select id="qcProperty" value={propertyType} onChange={(e) => changeType(e.target.value)}>
          {propertyTypes.map((t) => (
            <option key={t.key} value={t.key}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="qc-row">
        <label>Bedrooms</label>
        <div className="qc-stepper">
          <button
            type="button"
            aria-label="fewer bedrooms"
            onClick={() => setBeds((v) => clamp(v - 1, range.min, range.max))}
          >
            <Minus />
          </button>
          <span>{propertyType === 'apartment' && size.bedrooms === 1 ? 'Studio / 1' : size.bedrooms}</span>
          <button
            type="button"
            aria-label="more bedrooms"
            onClick={() => setBeds((v) => clamp(v + 1, range.min, range.max))}
          >
            <Plus />
          </button>
        </div>
      </div>

      <div className="qc-row">
        <label htmlFor="qcType">Plan</label>
        <select id="qcType" value={plan} onChange={(e) => setPlan(e.target.value)}>
          {cleanTypes.map((t) => (
            <option key={t.key} value={t.key}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="qc-total">
        <span>{size.label}</span>
        <strong ref={priceEl}>{currency.format(price)}</strong>
      </div>

      <a href="#quote" className="btn btn-primary btn-block">
        Book this clean <ArrowRight />
      </a>
      <p className="qc-note">Final price confirmed before you pay. Cancel free anytime.</p>
    </div>
  );
}
