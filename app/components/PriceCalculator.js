'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { currency } from '../lib/business';

const BASE = 79;
const PER_BED = 18;
const PER_BATH = 15;

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

export default function PriceCalculator() {
  const [beds, setBeds] = useState(2);
  const [baths, setBaths] = useState(1);
  // Deep clean is the flagship service, so it is the default selection.
  const [type, setType] = useState(1.5);

  const priceEl = useRef(null);
  const prev = useRef(150);

  const raw = (BASE + beds * PER_BED + baths * PER_BATH) * type;
  const price = Math.round(raw / 5) * 5; // round to nearest 5

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
      <h3>Instant deep clean price</h3>
      <p className="quote-card-sub">See your flat rate — no surprises.</p>

      <div className="qc-row">
        <label>Bedrooms</label>
        <div className="qc-stepper">
          <button type="button" aria-label="fewer bedrooms" onClick={() => setBeds((v) => clamp(v - 1, 1, 6))}>
            −
          </button>
          <span>{beds}</span>
          <button type="button" aria-label="more bedrooms" onClick={() => setBeds((v) => clamp(v + 1, 1, 6))}>
            +
          </button>
        </div>
      </div>

      <div className="qc-row">
        <label>Bathrooms</label>
        <div className="qc-stepper">
          <button type="button" aria-label="fewer bathrooms" onClick={() => setBaths((v) => clamp(v - 1, 1, 5))}>
            −
          </button>
          <span>{baths}</span>
          <button type="button" aria-label="more bathrooms" onClick={() => setBaths((v) => clamp(v + 1, 1, 5))}>
            +
          </button>
        </div>
      </div>

      <div className="qc-row">
        <label htmlFor="qcType">Clean type</label>
        <select id="qcType" value={type} onChange={(e) => setType(parseFloat(e.target.value))}>
          <option value={1.5}>Deep clean — most booked</option>
          <option value={1}>Domestic (standard) clean</option>
          <option value={1.35}>Move in / out deep clean</option>
        </select>
      </div>

      <div className="qc-total">
        <span>Your flat rate</span>
        <strong ref={priceEl}>{currency.format(price)}</strong>
      </div>

      <a href="#quote" className="btn btn-primary btn-block">
        Book this clean →
      </a>
      <p className="qc-note">
        Final price confirmed before you pay. Cancel free anytime.
        <br />
        Office or commercial space? <a href="#quote">Request a free walkthrough →</a>
      </p>
    </div>
  );
}
