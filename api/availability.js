const clean = (value, max = 500) => String(value || '').trim().slice(0, max);
const slugKey = (slug) => clean(slug, 80).toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_|_$/g, '');
const getTier = (slug) => {
  const specific = process.env[`BOOKING_TIER_${slugKey(slug)}`];
  const value = Number(specific || process.env.BOOKING_TIER_DEFAULT || 1);
  return Math.max(1, Math.min(3, Number.isFinite(value) ? value : 1));
};
const getProvider = (slug) => process.env[`BOOKING_AVAILABILITY_URL_${slugKey(slug)}`] || process.env.BOOKING_AVAILABILITY_URL || '';

const allowedOrigin = (origin, host) => {
  if (!origin) return true;
  const configured = String(process.env.BOOKING_ALLOWED_ORIGINS || '').split(',').map((item) => item.trim()).filter(Boolean);
  if (configured.length) return configured.includes(origin);
  try { return new URL(origin).host === host; } catch (_) { return false; }
};

const readJson = async (req) => {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
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
    const businessSlug = clean(body.businessSlug, 80).toLowerCase();
    const date = clean(body.date, 20);
    const service = clean(body.service, 160);
    const locale = ['en','de','es','ca'].includes(clean(body.locale, 5)) ? clean(body.locale, 5) : 'en';

    if (!/^[a-z0-9][a-z0-9-]{0,79}$/.test(businessSlug)) return res.status(400).json({ error:'invalid_business' });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !service) return res.status(400).json({ error:'missing_required_fields' });
    if (getTier(businessSlug) < 3) return res.status(403).json({ error:'tier_3_required' });

    const providerUrl = getProvider(businessSlug);
    if (!providerUrl) return res.status(503).json({ error:'availability_not_configured', slots:[] });

    const providerResponse = await fetch(providerUrl, {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body:JSON.stringify({ businessSlug, date, service, locale })
    });
    if (!providerResponse.ok) return res.status(502).json({ error:'availability_provider_failed', slots:[] });

    const data = await providerResponse.json();
    const slots = Array.isArray(data?.slots) ? data.slots.slice(0, 100) : [];
    return res.status(200).json({ slots });
  } catch (error) {
    console.error('availability_error', error);
    return res.status(500).json({ error:'server_error', slots:[] });
  }
};