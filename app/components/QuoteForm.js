'use client';

import { useState } from 'react';
import { CircleCheck } from './icons';

const SERVICES = [
  'Standard Clean',
  'Deep Clean',
  'Move in / out',
  'Office / Commercial',
  'Carpet & Upholstery',
];

const EMPTY = { name: '', email: '', phone: '', service: '', zip: '', notes: '' };

export default function QuoteForm() {
  const [values, setValues] = useState(EMPTY);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  // Which channels the server actually reached, so the confirmation can be honest.
  const [delivered, setDelivered] = useState({ whatsapp: false, recorded: false });

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending' || status === 'sent') return;

    const next = {};
    if (!values.name.trim()) next.name = true;
    if (!/.+@.+\..+/.test(values.email)) next.email = true;
    if (!values.service) next.service = true;
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('sending');

    // Our own route does the sending, so unlike a third-party endpoint we get a
    // real status back and can tell the visitor the truth.
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, honeypot }),
      });
      if (!res.ok) throw new Error(`Quote request failed: ${res.status}`);
      const result = await res.json().catch(() => ({}));
      setDelivered({ whatsapp: !!result.whatsapp, recorded: !!result.recorded });
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const sending = status === 'sending';
  const sent = status === 'sent';

  return (
    <form className="quote-form reveal" onSubmit={handleSubmit} noValidate>
      <h3>Get my free quote</h3>

      <div className="field">
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Jamie Rivera"
          value={values.name}
          onChange={update('name')}
          aria-invalid={errors.name || undefined}
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
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={update('email')}
            aria-invalid={errors.email || undefined}
            className={errors.email ? 'invalid' : ''}
          />
        </div>
        <div className="field">
          <label htmlFor="phone">
            Phone <span>(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 123-4567"
            value={values.phone}
            onChange={update('phone')}
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="service">Service</label>
          <select
            id="service"
            name="service"
            required
            value={values.service}
            onChange={update('service')}
            aria-invalid={errors.service || undefined}
            className={errors.service ? 'invalid' : ''}
          >
            <option value="">Choose…</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="zip">
            Zip code <span>(optional)</span>
          </label>
          <input
            id="zip"
            name="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="0000"
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

      {/* Spam trap — real people never see it, so it must come back empty. */}
      <input
        type="text"
        name="cd_website"
        hidden
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />

      <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={sending || sent}>
        {sent ? 'Request sent' : sending ? 'Sending…' : 'Send my free quote'}
      </button>
      <p className="form-fineprint">
        By submitting you agree to be contacted about your quote. We never share your info.
      </p>
      {sent && (
        <p className="form-success" role="status">
          <CircleCheck size={19} />
          <span>
            {delivered.whatsapp
              ? 'Thanks! Your request went straight to our WhatsApp — we’ll reply within 15 minutes.'
              : 'Thanks! We’ve got your request — we’ll reply within 15 minutes.'}
          </span>
        </p>
      )}
      {status === 'error' && (
        <p className="form-error" role="alert">
          Something went wrong sending your request. Please try again, or call us and we&apos;ll
          take the details over the phone.
        </p>
      )}
    </form>
  );
}
