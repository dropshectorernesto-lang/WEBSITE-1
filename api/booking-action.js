const { getBooking, saveBooking } = require('./_booking-store');

const clean = (value, max = 500) => String(value || '').trim().slice(0, max);
const slugKey = (slug) => clean(slug, 80).toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_|_$/g, '');
const getTier = (slug) => {
  const specific = process.env[`BOOKING_TIER_${slugKey(slug)}`];
  const value = Number(specific || process.env.BOOKING_TIER_DEFAULT || 1);
  return Math.max(1, Math.min(3, Number.isFinite(value) ? value : 1));
};
const getWebhook = (slug) => process.env[`ZAPIER_BOOKING_WEBHOOK_${slugKey(slug)}`] || process.env.ZAPIER_BOOKING_WEBHOOK_URL || '';
const getAdminToken = (slug) => process.env[`BOOKING_ADMIN_TOKEN_${slugKey(slug)}`] || process.env.BOOKING_ADMIN_TOKEN || '';

const readJson = async (req) => {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
};

const allowedOrigin = (origin, host) => {
  if (!origin) return true;
  const configured = String(process.env.BOOKING_ALLOWED_ORIGINS || '').split(',').map((item) => item.trim()).filter(Boolean);
  if (configured.length) return configured.includes(origin);
  try { return new URL(origin).host === host; } catch (_) { return false; }
};

const minutes = (value) => {
  const match = /^(\d{2}):(\d{2})$/.exec(String(value || ''));
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
};

const outsidePreferredWindow = (time, preferredWindow) => {
  if (!preferredWindow || preferredWindow === 'any') return false;
  const match = /^(\d{2}:\d{2})-(\d{2}:\d{2})$/.exec(preferredWindow);
  if (!match) return false;
  const exact = minutes(time);
  const start = minutes(match[1]);
  const end = minutes(match[2]);
  if (exact === null || start === null || end === null) return false;
  return exact < start || exact > end;
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
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');

  if (req.method === 'OPTIONS') return allowedOrigin(origin, host) ? res.status(204).end() : res.status(403).end();
  if (req.method !== 'POST') return res.status(405).json({ error:'method_not_allowed' });
  if (!allowedOrigin(origin, host)) return res.status(403).json({ error:'origin_not_allowed' });

  try {
    const body = await readJson(req);
    const businessSlug = clean(body.businessSlug, 80).toLowerCase();
    if (!/^[a-z0-9][a-z0-9-]{0,79}$/.test(businessSlug)) return res.status(400).json({ error:'invalid_business' });

    const tier = getTier(businessSlug);
    const expected = getAdminToken(businessSlug);
    const supplied = clean(req.headers.authorization, 500).replace(/^Bearer\s+/i, '');
    if (!expected || supplied !== expected) return res.status(401).json({ error:'unauthorized' });

    const action = clean(body.action, 30).toLowerCase();
    const allowedActions = tier >= 2 ? ['confirm','cancel','complete','reschedule'] : ['confirm','cancel','complete'];
    if (!allowedActions.includes(action)) return res.status(400).json({ error:'invalid_action' });

    const bookingId = clean(body.bookingId, 120);
    if (!bookingId) return res.status(400).json({ error:'booking_id_required' });

    const booking = await getBooking(businessSlug, bookingId);
    if (!booking) return res.status(404).json({ error:'booking_not_found' });

    const date = clean(body.date, 20) || booking.appointment?.confirmedDate || booking.appointment?.requestedDate || '';
    const time = clean(body.time, 20) || booking.appointment?.confirmedTime || booking.appointment?.requestedTime || '';

    if (['confirm','reschedule'].includes(action)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({ error:'date_required' });
      if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return res.status(400).json({ error:'time_required' });
    }

    const now = new Date().toISOString();
    const status = action === 'confirm' || action === 'reschedule' ? 'confirmed' : action === 'cancel' ? 'cancelled' : 'completed';
    booking.status = status;
    booking.updatedAt = now;
    booking.appointment = booking.appointment || {};
    if (['confirm','reschedule'].includes(action)) {
      booking.appointment.confirmedDate = date;
      booking.appointment.confirmedTime = time;
    }
    booking.appointment.outsidePreferredWindow = outsidePreferredWindow(time, booking.appointment.preferredWindow);
    await saveBooking(booking);

    const event = action === 'confirm' ? 'booking.confirmed' : action === 'reschedule' ? 'booking.rescheduled' : action === 'cancel' ? 'booking.cancelled' : 'booking.completed';
    const payload = {
      event,
      tier,
      business:{ slug:businessSlug, name:booking.businessName || businessSlug },
      bookingId,
      action,
      customer:booking.customer || {},
      pet:booking.pet || {},
      appointment:{
        service:booking.appointment.service || null,
        requestedDate:booking.appointment.requestedDate || null,
        preferredWindow:booking.appointment.preferredWindow || null,
        date:booking.appointment.confirmedDate || null,
        time:booking.appointment.confirmedTime || null,
        outsidePreferredWindow:booking.appointment.outsidePreferredWindow === true
      },
      notes:booking.notes || '',
      calendarAction:['confirm','reschedule'].includes(action) ? 'create_or_update' : action === 'cancel' ? 'cancel' : 'none',
      customerNotification:action === 'confirm' || (tier >= 2 && ['reschedule','cancel'].includes(action)),
      changedAt:now
    };

    const automation = await sendAutomation(getWebhook(businessSlug), payload);
    if (automation.configured && !automation.ok) console.error('booking_action_notification_failed', { businessSlug, bookingId, action });

    return res.status(200).json({ ok:true, action, booking, notification:automation.ok ? 'sent' : automation.configured ? 'failed' : 'not_configured' });
  } catch (error) {
    console.error('booking_action_error', error);
    if (error?.code === 'booking_store_not_configured') return res.status(503).json({ error:'booking_store_not_configured' });
    return res.status(500).json({ error:'server_error' });
  }
};
