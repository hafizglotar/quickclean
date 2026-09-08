/* ============================================================
   WhatsApp credential smoke test
   ------------------------------------------------------------
   Run:  npm run whatsapp:test
   ------------------------------------------------------------
   Sends Meta's pre-approved `hello_world` template to your
   number. It deliberately does NOT touch the quote form, so a
   pass here proves your credentials + recipient are good and
   narrows any remaining problem down to the template.
   ============================================================ */

import fs from 'node:fs';
import path from 'node:path';

const GRAPH_BASE = process.env.WHATSAPP_GRAPH_BASE || 'https://graph.facebook.com';
const API_VERSION = process.env.WHATSAPP_API_VERSION || 'v21.0';
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

// business.js is ESM inside Next's bundler but plain CJS to bare node, so read
// the fallback recipient out of it textually rather than importing it.
function recipientFromBusiness() {
  try {
    const file = path.join(process.cwd(), 'app', 'lib', 'business.js');
    const m = fs.readFileSync(file, 'utf8').match(/whatsapp:\s*'([^']*)'/);
    return m ? m[1] : '';
  } catch {
    return '';
  }
}

const rawRecipient = (process.env.WHATSAPP_TO || recipientFromBusiness() || '').split(',')[0].trim();
const recipient = rawRecipient.replace(/\D/g, '');

const bad = [];
if (!PHONE_NUMBER_ID) bad.push('WHATSAPP_PHONE_NUMBER_ID');
if (!TOKEN) bad.push('WHATSAPP_ACCESS_TOKEN');
if (!recipient) bad.push('a recipient (WHATSAPP_TO or business.whatsapp)');

if (bad.length) {
  console.error('\n  Missing: ' + bad.join(', '));
  console.error('  Create .env.local from .env.example and fill it in, then re-run.\n');
  process.exit(1);
}

if (recipient.startsWith('0') || recipient.length < 8) {
  console.error(
    `\n  "${rawRecipient}" is not international format.` +
      '\n  Drop the leading 0 and add the country code: 0311 622 9099 -> 923116229099\n'
  );
  process.exit(1);
}

// Meta error codes that actually come up during first-time setup.
const HINTS = {
  190: 'Access token is invalid or expired. Temporary tokens last 24h — generate a fresh one, or create a permanent System User token.',
  100: 'Usually a wrong WHATSAPP_PHONE_NUMBER_ID. Copy the "Phone number ID" (a long number), not the phone number itself.',
  131030:
    'Recipient is not in your allowed list. On a test number you must add this number under "To" in WhatsApp > API Setup and confirm the code.',
  132001: 'Template not found. Check the name and language match WhatsApp Manager exactly.',
  131026: 'Message undeliverable — the recipient may not have WhatsApp, or has not accepted messages from your test number yet.',
  133010: 'The sender number is not registered for the Cloud API yet.',
};

console.log(`\n  Sending hello_world -> ${recipient}`);
console.log(`  via ${GRAPH_BASE}/${API_VERSION}/${PHONE_NUMBER_ID}/messages\n`);

const res = await fetch(`${GRAPH_BASE}/${API_VERSION}/${PHONE_NUMBER_ID}/messages`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messaging_product: 'whatsapp',
    to: recipient,
    type: 'template',
    // hello_world is pre-approved on every account and takes no variables.
    template: { name: 'hello_world', language: { code: 'en_US' } },
  }),
});

const payload = await res.json().catch(() => null);

if (res.ok) {
  console.log('  SUCCESS — Meta accepted the message.');
  console.log('  Message id:', payload?.messages?.[0]?.id ?? '(none returned)');
  console.log('\n  Check WhatsApp on that phone. If it arrives, your credentials are good');
  console.log('  and the only thing left for the form is the new_quote_request template.\n');
  process.exit(0);
}

const err = payload?.error ?? {};
console.error(`  FAILED (HTTP ${res.status})`);
console.error('  Meta says :', err.message ?? JSON.stringify(payload));
if (err.code) console.error('  Error code:', err.code, err.error_subcode ? `/ ${err.error_subcode}` : '');
if (err.error_data?.details) console.error('  Details   :', err.error_data.details);
if (HINTS[err.code]) console.error('\n  Likely fix:', HINTS[err.code]);
console.error('');
process.exit(1);
