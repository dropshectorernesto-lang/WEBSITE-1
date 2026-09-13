const crypto = require('crypto');

const readJson = async (req) => {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
};

const clean = (value, max = 500) => String(value || '').trim().slice(0, max);
const slugKey = (slug) => clean(slug, 80).toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_|_$/g, '');
const getTier = (slug) => {
  const specific = process.env[`BOOKING_TIER_${slugKey(slug)}`];
  const value = Number(specific || process.env.BOOKING_TIER_DEFAULT || 1);
  return Math.max(1, Math.min(3, Number.isFinite(value) ? value : 1));
};
const getWebhook = (slug) => process.env[`ZAPIER_BOOKING_WEBHOOK_${slugKey(slug)}`] || process.env.ZAPIER_BOOKING_WEBHOOK_URL || '';

const allowedOrigin = (origin, host) => {
  if (!origin) return true;
  const configured = String(process.env.BOOKING_ALLOWED_ORIGINS || '').split(',').map((item) => item.trim()).filter(Boolean);
  if (configured.length) return configured.includes(origin);
  try { return new URL(origin).host === host; } catch (_) { return false; }
};

module.exports = async (req, res) => {
  const origin = req.headers.origin || '';
  const host = req.headers['x-forwarded-host'] || req.headers.host || '';
  if (origin && allowedOrigin(origin, host)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');

  if (req.method === 'OPTIONS') return allowedOrigin(origin, host) ? res.status(204).end() : res.status(403).end();
  if (req.method !== 'POST') return res.status(405).json({ error:'method_not_allowed' });
  if (!allowedOrigin(origin, host)) return res.status(403).json({ error:'origin_not_allowed' });

  try {
    const body = await readJson(req);

    // Honeypot for automated spam. Real forms leave this blank.
    if (clean(body.website, 120)) return res.status(202).json({ ok:true });

    const businessSlug = clean(body.businessSlug, 80).toLowerCase();
    const name = clean(body.name, 120);
    const petName = clean(body.petName, 120);
    const phone = clean(body.phone, 80);
    const email = clean(body.email, 160);
    const service = clean(body.service, 160);
    const date = clean(body.date, 20);
    const notes = clean(body.notes, 1200);
    const locale = ['en','de','es','ca'].includes(clean(body.locale, 5)) ? clean(body.locale, 5) : 'en';
    const mode = clean(body.mode, 24);

    if (!/^[a-z0-9][a-z0-9-]{0,79}$/.test(businessSlug)) return res.status(400).json({ error:'invalid_business' });
    if (!name || !petName || !phone || !service || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({ error:'missing_required_fields' });

    const requestedDate = new Date(`${date}T23:59:59Z`);
    if (Number.isNaN(requestedDate.getTime()) || requestedDate < new Date(Date.now() - 86400000)) return res.status(400).json({ error:'invalid_date' });

    const tier = getTier(businessSlug);
    const time = tier >= 3 ? clean(body.time, 80) : '';
    if (tier >= 3 && !time) return res.status(400).json({ error:'time_required' });

    const webhook = getWebhook(businessSlug);
    if (!webhook) return res.status(503).json({ error:'booking_not_configured' });

    const bookingId = crypto.randomUUID();
    const payload = {
      event:'booking.requested',
      bookingId,
      tier,
      business:{ slug:businessSlug, name:clean(body.businessName, 160) || businessSlug },
      customer:{ name, phone, email },
      pet:{ name:petName },
      appointment:{ service, date, time:time || null, allDay:tier < 3 },
      notes,
      locale,
      source:{ mode, url:clean(body.sourceUrl, 500) },
      requestedAt:new Date().toISOString()
    };

    const zapierResponse = await fetch(webhook, {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body:JSON.stringify(payload)
    });

    if (!zapierResponse.ok) return res.status(502).json({ error:'automation_failed' });
    return res.status(201).json({ ok:true, bookingId, tier });
  } catch (error) {
    console.error('booking_submit_error', error);
    return res.status(500).json({ error:'server_error' });
  }
};