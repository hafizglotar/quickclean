'use client';

import { useState } from 'react';
import { ArrowRight, Check, CircleCheck } from './icons';

/* ------------------------------------------------------------
   CrewDesk form endpoint.
   The `name` of every input must stay exactly as CrewDesk issued
   it — the ids below are what map each answer to its column.
   ------------------------------------------------------------ */
const ENDPOINT =
  'https://crewdesk-web.vercel.app/api/f/reporting/quote-form-quick-clean';

const FIELDS = {
  name: 'f_cmtk1tk7f0002k204fzcknkcv',
  email: 'f_cmtk1tk7f0004k2048m5iegar',
  phone: 'f_cmtk1tk7g0006k204pkb9xb77',
  service: 'f_cmtk1tk7f0003k204f0yvxpf3',
  zip: 'f_cmtk1tk7f0005k204v85zkczt',
  notes: 'f_cmtk1tk7g0007k2045ylx7vza',
  // Spam trap — must be submitted empty.
  honeypot: 'cd_website',
};

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
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

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

    // CrewDesk answers every post with a 303 redirect (?ok=1 or ?error=invalid)
    // and sends no Access-Control-Allow-Origin on it, so a cors-mode fetch would
    // reject even on success. We send the same url-encoded body a plain <form>
    // would, in no-cors mode: the request is delivered and the response stays
    // opaque, which keeps the user on the page with our own success state.
    // A rejected promise therefore means the request never left the browser.
    const body = new URLSearchParams({
      [FIELDS.name]: values.name.trim(),
      [FIELDS.email]: values.email.trim(),
      [FIELDS.phone]: values.phone.trim(),
      [FIELDS.service]: values.service,
      [FIELDS.zip]: values.zip.trim(),
      [FIELDS.notes]: values.notes.trim(),
      [FIELDS.honeypot]: '',
    });

    try {
      await fetch(ENDPOINT, {
        method: 'POST',
        mode: 'no-cors', // note: no-cors requires the default redirect mode
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body,
      });
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const sending = status === 'sending';
  const sent = status === 'sent';

  return (
    /* action/method are the no-JS fallback: the same post the handler makes. */
    <form
      className="quote-form reveal"
      action={ENDPOINT}
      method="post"
      acceptCharset="utf-8"
      onSubmit={handleSubmit}
      noValidate
    >
      <h3>Get my free quote</h3>

      <div className="field">
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name={FIELDS.name}
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
            name={FIELDS.email}
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
            name={FIELDS.phone}
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
            name={FIELDS.service}
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
            name={FIELDS.zip}
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
          name={FIELDS.notes}
          rows={2}
          placeholder="Pets, parking, preferred days…"
          value={values.notes}
          onChange={update('notes')}
        />
      </div>

      {/* Spam trap — real people never see it, so it must come back empty. */}
      <input
        type="text"
        name={FIELDS.honeypot}
        hidden
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />

      <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={sending || sent}>
        {sent ? (
          <>
            Sent <Check size={16} />
          </>
        ) : sending ? (
          'Sending…'
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
        <p className="form-success" role="status">
          <CircleCheck size={19} />
          <span>Thanks! Your quote request is in — we&apos;ll be in touch within 15 minutes.</span>
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
