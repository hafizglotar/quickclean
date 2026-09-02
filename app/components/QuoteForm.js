'use client';

import { useState } from 'react';
import { ArrowRight, Check, CircleCheck } from './icons';

const SERVICES = [
  'Standard clean',
  'Deep clean',
  'Move in / out',
  'Office / commercial',
  'Carpet & upholstery',
];

export default function QuoteForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    service: SERVICES[0],
    zip: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = true;
    if (!/.+@.+\..+/.test(values.email)) next.email = true;
    if (!values.phone.trim()) next.phone = true;
    setErrors(next);
    if (Object.keys(next).length) return;

    // Front-end demo. Wire this up to your backend / email service / CRM.
    // e.g. await fetch('/api/quote', { method: 'POST', body: JSON.stringify(values) })
    setSent(true);
  };

  return (
    <form className="quote-form reveal" onSubmit={handleSubmit} noValidate>
      <h3>Get my free quote</h3>

      <div className="field">
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Jamie Rivera"
          value={values.name}
          onChange={update('name')}
          className={errors.name ? 'invalid' : ''}
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@email.com"
            value={values.email}
            onChange={update('email')}
            className={errors.email ? 'invalid' : ''}
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={values.phone}
            onChange={update('phone')}
            className={errors.phone ? 'invalid' : ''}
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="service">Service</label>
          <select id="service" name="service" value={values.service} onChange={update('service')}>
            {SERVICES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="zip">Zip code</label>
          <input
            id="zip"
            name="zip"
            type="text"
            inputMode="numeric"
            placeholder="00000"
            value={values.zip}
            onChange={update('zip')}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="notes">
          Anything we should know? <span>(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={2}
          placeholder="Pets, parking, preferred days…"
          value={values.notes}
          onChange={update('notes')}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={sent}>
        {sent ? (
          <>
            Sent <Check size={16} />
          </>
        ) : (
          <>
            Send my free quote <ArrowRight />
          </>
        )}
      </button>
      <p className="form-fineprint">
        By submitting you agree to be contacted about your quote. We never share your info.
      </p>
      {sent && (
        <p className="form-success">
          <CircleCheck size={19} />
          <span>Thanks! Your quote request is in — we&apos;ll text you within 15 minutes.</span>
        </p>
      )}
    </form>
  );
}
