/* ============================================================
   POST /api/quote — server-side quote handler
   ------------------------------------------------------------
   Sends the lead straight to your WhatsApp via Meta's Cloud API,
   and records it in CrewDesk as a backup. Runs on the server so
   the access token is never exposed to the browser — none of
   these vars may be prefixed NEXT_PUBLIC_.

   Required env (see .env.example):
     WHATSAPP_PHONE_NUMBER_ID   sender number's ID from Meta
     WHATSAPP_ACCESS_TOKEN      permanent access token
     WHATSAPP_TO                your number(s), comma separated
   ============================================================ */

import { business } from '../../lib/business';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CREWDESK_ENDPOINT =
  process.env.CREWDESK_ENDPOINT ||
  'https://crewdesk-web.vercel.app/api/f/reporting/quote-form-quick-clean';

const CREWDESK_FIELDS = {
  name: 'f_cmtk1tk7f0002k204fzcknkcv',
  email: 'f_cmtk1tk7f0004k2048m5iegar',
  phone: 'f_cmtk1tk7g0006k204pkb9xb77',
  service: 'f_cmtk1tk7f0003k204f0yvxpf3',
  zip: 'f_cmtk1tk7f0005k204v85zkczt',
  notes: 'f_cmtk1tk7g0007k2045ylx7vza',
  honeypot: 'cd_website',
};

// WHATSAPP_GRAPH_BASE only exists so the send path can be pointed at a mock
// during testing. Leave it unset in production.
const GRAPH_BASE = process.env.WHATSAPP_GRAPH_BASE || 'https://graph.facebook.com';
const API_VERSION = process.env.WHATSAPP_API_VERSION || 'v21.0';
const TEMPLATE_NAME = process.env.WHATSAPP_TEMPLATE_NAME || 'new_quote_request';
const TEMPLATE_LANG = process.env.WHATSAPP_TEMPLATE_LANG || 'en';

function recipients() {
  // Env var wins so each environment can point somewhere different;
  // otherwise fall back to the number configured in lib/business.js.
  const entries = String(process.env.WHATSAPP_TO || business.whatsapp || '')
    .split(',')
    .map((n) => n.trim())
    .filter(Boolean);

  return entries.map((entry) => {
    const digits = entry.replace(/\D/g, '');
    // Meta needs E.164: country code first, no national trunk prefix. Writing
    // the number the local way (0311... instead of 92311...) is the usual
    // mistake and Meta rejects it unhelpfully, so fail loudly here instead.
    if (digits.startsWith('0') || digits.length < 8) {
      throw new Error(
        `"${entry}" is not a valid WhatsApp recipient — use international format, ` +
          'country code first and no leading zero (0311 622 9099 -> 923116229099)'
      );
    }
    return digits;
  });
}

/* Meta rejects template parameters that are empty, or that contain newlines,
   tabs, or four-plus consecutive spaces — so flatten whitespace and always
   fall back to a placeholder for the optional fields. */
function param(value, fallback = '-') {
  const clean = String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, 400);
  return clean || fallback;
}

async function sendWhatsApp(lead) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const to = recipients();

  if (!phoneNumberId || !token || to.length === 0) {
    throw new Error(
      'WhatsApp is not configured — set WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN, and a recipient (business.whatsapp or WHATSAPP_TO)'
    );
  }

  // Order must match the {{1}}..{{6}} placeholders in the approved template.
  const parameters = [
    param(lead.name),
    param(lead.email),
    param(lead.phone, 'Not given'),
    param(lead.service),
    param(lead.zip, 'Not given'),
    param(lead.notes, 'None'),
  ].map((text) => ({ type: 'text', text }));

  const url = `${GRAPH_BASE}/${API_VERSION}/${phoneNumberId}/messages`;

  return Promise.all(
    to.map(async (recipient) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: recipient,
          type: 'template',
          template: {
            name: TEMPLATE_NAME,
            language: { code: TEMPLATE_LANG },
            components: [{ type: 'body', parameters }],
          },
        }),
      });

      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        const detail = payload?.error ? JSON.stringify(payload.error) : `HTTP ${res.status}`;
        throw new Error(`WhatsApp send to ${recipient} failed: ${detail}`);
      }
      return payload;
    })
  );
}

/* Server-side there is no CORS, so unlike the browser we can read CrewDesk's
   303 and tell ok=1 from error=invalid. */
async function recordInCrewDesk(lead) {
  const body = new URLSearchParams({
    [CREWDESK_FIELDS.name]: lead.name,
    [CREWDESK_FIELDS.email]: lead.email,
    [CREWDESK_FIELDS.phone]: lead.phone,
    [CREWDESK_FIELDS.service]: lead.service,
    [CREWDESK_FIELDS.zip]: lead.zip,
    [CREWDESK_FIELDS.notes]: lead.notes,
    [CREWDESK_FIELDS.honeypot]: '',
  });

  const res = await fetch(CREWDESK_ENDPOINT, {
    method: 'POST',
    redirect: 'manual',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body,
  });

  const location = res.headers.get('location') || '';
  if (!location.includes('ok=1')) {
    throw new Error(`CrewDesk did not accept the lead: ${res.status} ${location || '(no redirect)'}`);
  }
  return true;
}

/* A small in-memory throttle. Serverless instances are short-lived and not
   shared between regions, so this only blunts casual abuse of an endpoint that
   costs money per message — put a real rate limit or WAF in front if needed. */
const HITS = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(key) {
  const now = Date.now();
  if (HITS.size > 1000) HITS.clear();
  const recent = (HITS.get(key) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  HITS.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Honeypot: a bot filled the hidden field. Answer as if it worked.
  if (String(data?.[CREWDESK_FIELDS.honeypot] ?? data?.honeypot ?? '').trim()) {
    return Response.json({ ok: true });
  }

  const str = (v) => String(v ?? '').trim();
  const lead = {
    name: str(data.name),
    email: str(data.email),
    phone: str(data.phone),
    service: str(data.service),
    // The form sends `area` (Area / Community); older payloads sent `zip`.
    zip: str(data.area ?? data.zip),
    notes: str(data.notes).slice(0, 2000),
  };

  const invalid = [];
  if (!lead.name) invalid.push('name');
  if (!/.+@.+\..+/.test(lead.email)) invalid.push('email');
  if (!lead.service) invalid.push('service');
  if (invalid.length) {
    return Response.json({ error: 'Missing or invalid fields', fields: invalid }, { status: 400 });
  }

  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return Response.json({ error: 'Too many requests, please try again shortly' }, { status: 429 });
  }

  const [whatsapp, crewdesk] = await Promise.allSettled([
    sendWhatsApp(lead),
    recordInCrewDesk(lead),
  ]);

  if (whatsapp.status === 'rejected') console.error('[quote] WhatsApp:', whatsapp.reason?.message);
  if (crewdesk.status === 'rejected') console.error('[quote] CrewDesk:', crewdesk.reason?.message);

  // Only a real failure if the lead reached neither channel.
  if (whatsapp.status === 'rejected' && crewdesk.status === 'rejected') {
    return Response.json({ error: 'Could not deliver your request' }, { status: 502 });
  }

  return Response.json({
    ok: true,
    whatsapp: whatsapp.status === 'fulfilled',
    recorded: crewdesk.status === 'fulfilled',
  });
}
