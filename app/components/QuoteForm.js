'use client';

import { useState } from 'react';
import { business } from '../lib/business';
import { CircleCheck, WhatsApp } from './icons';

/* ------------------------------------------------------------
   Quote requests go to WhatsApp, and are recorded in CrewDesk as
   a backup so nothing is lost if the visitor never presses send
   in WhatsApp. The `name` of every CrewDesk field must stay
   exactly as issued — the ids map each answer to its column.
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

/* The pre-filled WhatsApp message. Plain newlines survive url-encoding. */
function whatsappMessage(v) {
  const lines = [
    `Hi ${business.name}! I'd like a free quote.`,
    '',
    `Name: ${v.name.trim()}`,
    `Email: ${v.email.trim()}`,
  ];
  if (v.phone.trim()) lines.push(`Phone: ${v.phone.trim()}`);
  lines.push(`Service: ${v.service}`);
  if (v.zip.trim()) lines.push(`Zip code: ${v.zip.trim()}`);
  if (v.notes.trim()) lines.push(`Notes: ${v.notes.trim()}`);
  return lines.join('\n');
}

// wa.me wants the number as digits only, so strip anything else defensively.
function whatsappUrl(v) {
  const number = String(business.whatsapp).replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(whatsappMessage(v))}`;
}

/* CrewDesk answers every post with a 303 redirect and sends no
   Access-Control-Allow-Origin on it, so a cors-mode fetch would reject even on
   success. We post the same url-encoded body a plain form would, in no-cors
   mode: the request is delivered and the response stays opaque. */
function recordInCrewDesk(v) {
  const body = new URLSearchParams({
    [FIELDS.name]: v.name.trim(),
    [FIELDS.email]: v.email.trim(),
    [FIELDS.phone]: v.phone.trim(),
    [FIELDS.service]: v.service,
    [FIELDS.zip]: v.zip.trim(),
    [FIELDS.notes]: v.notes.trim(),
    [FIELDS.honeypot]: '',
  });

  return fetch(ENDPOINT, {
    method: 'POST',
    mode: 'no-cors', // note: no-cors requires the default redirect mode
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body,
  });
}

export default function QuoteForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sent | error

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const next = {};
    if (!values.name.trim()) next.name = true;
    if (!/.+@.+\..+/.test(values.email)) next.email = true;
    if (!values.service) next.service = true;
    setErrors(next);
    if (Object.keys(next).length) return;

    // Open WhatsApp FIRST and synchronously. Anything awaited before this would
    // put the call outside the click gesture and browsers would block the tab.
    try {
      const url = whatsappUrl(values);
      const opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (!opened) window.location.href = url; // popup blocked — navigate instead
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }

    // Backup record, fire-and-forget: WhatsApp is the path that matters, so a
    // CrewDesk hiccup must never show the visitor an error.
    recordInCrewDesk(values).catch((err) => console.error(err));
  };

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

      <button type="submit" className="btn btn-primary btn-block btn-lg">
        <WhatsApp size={19} /> {sent ? 'Open WhatsApp again' : 'Send on WhatsApp'}
      </button>
      <p className="form-fineprint">
        Opens WhatsApp with your details filled in — just press send. We never share your info.
      </p>
      {sent && (
        <p className="form-success" role="status">
          <CircleCheck size={19} />
          <span>
            WhatsApp is opening with your details — press send and we&apos;ll reply within 15
            minutes.
          </span>
        </p>
      )}
      {status === 'error' && (
        <p className="form-error" role="alert">
          We couldn&apos;t open WhatsApp. Please call us on {business.telephoneDisplay} and
          we&apos;ll take the details over the phone.
        </p>
      )}
    </form>
  );
}
