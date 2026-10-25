/* ============================================================
   /api/indexnow — submit URLs to IndexNow after a deploy
   ------------------------------------------------------------
   POST  { urls?: string[], dryRun?: boolean }
         Authorization: Bearer <INDEXNOW_SUBMIT_TOKEN or INDEXNOW_KEY>
         No `urls` -> every URL in sitemap.xml. Only URLs on SITE_URL
         are accepted (IndexNow rejects anything else anyway).
   GET   configuration status, no secrets.

   Env: INDEXNOW_KEY must equal the file name of public/<key>.txt.
   See README → IndexNow for the curl commands.
   ============================================================ */

import { SITE_URL } from '../../lib/business';
import sitemap from '../../sitemap';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10000; // IndexNow's per-request limit

const json = (body, status = 200) =>
  new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

function config() {
  const key = process.env.INDEXNOW_KEY || '';
  const host = new URL(SITE_URL).host;
  return {
    key,
    host,
    keyLocation: key ? `${SITE_URL}/${key}.txt` : null,
    token: process.env.INDEXNOW_SUBMIT_TOKEN || key,
  };
}

function authorized(request, token) {
  if (!token) return false;
  const header = request.headers.get('authorization') || '';
  const bearer = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  return bearer.length > 0 && bearer === token;
}

function sitemapUrls() {
  return sitemap().map((entry) => entry.url);
}

function cleanUrls(list) {
  const seen = new Set();
  const good = [];
  const bad = [];
  for (const raw of list) {
    const value = String(raw || '').trim();
    if (!value) continue;
    if (!value.startsWith(`${SITE_URL}/`) && value !== SITE_URL) {
      bad.push(value);
      continue;
    }
    if (!seen.has(value)) {
      seen.add(value);
      good.push(value);
    }
  }
  return { good: good.slice(0, MAX_URLS), bad };
}

export async function GET() {
  const { key, host, keyLocation } = config();
  return json({
    configured: Boolean(key),
    host,
    keyLocation,
    usage: 'POST with "Authorization: Bearer <token>" and an optional JSON body {"urls": [...], "dryRun": true}',
  });
}

export async function POST(request) {
  const { key, host, keyLocation, token } = config();

  if (!key) {
    return json({ error: 'INDEXNOW_KEY is not set on the server' }, 503);
  }
  if (!authorized(request, token)) {
    return json({ error: 'Unauthorized' }, 401);
  }

  let body = {};
  try {
    const text = await request.text();
    body = text ? JSON.parse(text) : {};
  } catch {
    return json({ error: 'Body must be JSON' }, 400);
  }

  const requested = Array.isArray(body.urls) && body.urls.length ? body.urls : sitemapUrls();
  const { good, bad } = cleanUrls(requested);
  if (!good.length) {
    return json({ error: 'No valid URLs to submit', rejected: bad }, 422);
  }

  const payload = { host, key, keyLocation, urlList: good };

  if (body.dryRun) {
    return json({ dryRun: true, endpoint: INDEXNOW_ENDPOINT, payload, rejected: bad });
  }

  let upstream;
  try {
    upstream = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    return json({ error: 'IndexNow request failed', detail: String(err) }, 502);
  }

  const detail = await upstream.text().catch(() => '');
  return json(
    {
      ok: upstream.ok,
      status: upstream.status,
      submitted: good.length,
      rejected: bad,
      detail: detail.slice(0, 500),
    },
    upstream.ok ? 200 : 502
  );
}
