const crypto = require('crypto');
const { createBooking, listBookings } = require('./_booking-store');

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
const getAdminToken = (slug) => process.env[`BOOKING_ADMIN_TOKEN_${slugKey(slug)}`] || process.env.BOOKING_ADMIN_TOKEN || '';

const allowedOrigin = (origin, host) => {
  if (!origin) return true;
  const configured = String(process.env.BOOKING_ALLOWED_ORIGINS || '').split(',').map((item) => item.trim()).filter(Boolean);
  if (configured.length) return configured.includes(origin);
  try { return new URL(origin).host === host; } catch (_) { return false; }
};

const businessSlugFromRequest = (req) => {
  const direct = req.query?.businessSlug;
  if (direct) return clean(direct, 80).toLowerCase();
  try {
    const url = new URL(req.url, 'https://booking.local');
    return clean(url.searchParams.get('businessSlug'), 80).toLowerCase();
  } catch (_) {
    return '';
  }
};

const sendAutomation = async (webhook, payload) => {
  if (!webhook) return { configured:false, ok:false };
  try {
    const response = await fetch(webhook, {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body:JSON.stringify(payload)
    });
    return { configured:true, ok:response.ok };
  } catch (_) {
    return { configured:true, ok:false };
  }
};

module.exports = async (req, res) => {
  const origin = req.headers.origin || '';
  const host = req.headers['x-forwarded-host'] || req.headers.host || '';
  if (origin && allowedOrigin(origin, host)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');

  if (req.method === 'OPTIONS') return allowedOrigin(origin, host) ? res.status(204).end() : res.status(403).end();
  if (!allowedOrigin(origin, host)) return res.status(403).json({ error:'origin_not_allowed' });

  if (req.method === 'GET') {
    try {
      const businessSlug = businessSlugFromRequest(req);
      if (!/^[a-z0-9][a-z0-9-]{0,79}$/.test(businessSlug)) return res.status(400).json({ error:'invalid_business' });

      const expected = getAdminToken(businessSlug);
      const supplied = clean(req.headers.authorization, 500).replace(/^Bearer\s+/i, '');
      if (!expected || supplied !== expected) return res.status(401).json({ error:'unauthorized' });

      const bookings = await listBookings(businessSlug, 150);
      return res.status(200).json({ ok:true, tier:getTier(businessSlug), bookings });
    } catch (error) {
      console.error('booking_list_error', error);
      if (error?.code === 'booking_store_not_configured') return res.status(503).json({ error:'booking_store_not_configured' });
      return res.status(500).json({ error:'server_error' });
    }
  }

  if (req.method !== 'POST') return res.status(405).json({ error:'method_not_allowed' });

  try {
    const body = await readJson(req);

    // Honeypot for automated spam. Real forms leave this blank.
    if (clean(body.website, 120)) return res.status(202).json({ ok:true });

    const businessSlug = clean(body.businessSlug, 80).toLowerCase();
    const name = clean(body.name, 120);
    const petName = clean(body.petName, 120);
    const phone = clean(body.phone, 80);
    const email = clean(body.email, 160).toLowerCase();
    const service = clean(body.service, 160);
    const date = clean(body.date, 20);
    const notes = clean(body.notes, 1200);
    const locale = ['en','de','es','ca'].includes(clean(body.locale, 5)) ? clean(body.locale, 5) : 'en';
    const mode = clean(body.mode, 24);

    if (!/^[a-z0-9][a-z0-9-]{0,79}$/.test(businessSlug)) return res.status(400).json({ error:'invalid_business' });
    if (!name || !petName || !phone || !email || !service || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({ error:'missing_required_fields' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error:'invalid_email' });

    const requestedDate = new Date(`${date}T23:59:59Z`);
    if (Number.isNaN(requestedDate.getTime()) || requestedDate < new Date(Date.now() - 86400000)) return res.status(400).json({ error:'invalid_date' });

    const tier = getTier(businessSlug);
    const preferredWindow = tier < 3 ? clean(body.preferredWindow, 40) : '';
    const time = tier >= 3 ? clean(body.time, 80) : '';
    if (tier < 3 && !preferredWindow) return res.status(400).json({ error:'preferred_window_required' });
    if (tier >= 3 && !time) return res.status(400).json({ error:'time_required' });

    const bookingId = crypto.randomUUID();
    const now = new Date().toISOString();
    const booking = {
      id:bookingId,
      businessSlug,
      businessName:clean(body.businessName, 160) || businessSlug,
      tier,
      status:'new',
      customer:{ name, phone, email },
      pet:{ name:petName },
      appointment:{
        service,
        requestedDate:date,
        preferredWindow:preferredWindow || null,
        requestedTime:tier >= 3 ? time : null,
        confirmedDate:null,
        confirmedTime:null
      },
      notes,
      locale,
      source:{ mode, url:clean(body.sourceUrl, 500) },
      requestedAt:now,
      updatedAt:now
    };

    await createBooking(booking);

    const automationPayload = {
      event:'booking.requested',
      bookingId,
      tier,
      business:{ slug:businessSlug, name:booking.businessName },
      customer:booking.customer,
      pet:booking.pet,
      appointment:{
        service,
        date,
        preferredWindow:preferredWindow || null,
        time:tier >= 3 ? time : null,
        createCalendar:false
      },
      notes,
      locale,
      source:booking.source,
      requestedAt:now
    };

    const automation = await sendAutomation(getWebhook(businessSlug), automationPayload);
    if (automation.configured && !automation.ok) console.error('booking_notification_failed', { businessSlug, bookingId });

    return res.status(201).json({ ok:true, bookingId, tier, notification:automation.ok ? 'sent' : automation.configured ? 'failed' : 'not_configured' });
  } catch (error) {
    console.error('booking_submit_error', error);
    if (error?.code === 'booking_store_not_configured') return res.status(503).json({ error:'booking_store_not_configured' });
    return res.status(500).json({ error:'server_error' });
  }
};
