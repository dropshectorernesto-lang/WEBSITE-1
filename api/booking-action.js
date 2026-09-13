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

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error:'method_not_allowed' });
  try {
    const body = await readJson(req);
    const businessSlug = clean(body.businessSlug, 80).toLowerCase();
    if (!/^[a-z0-9][a-z0-9-]{0,79}$/.test(businessSlug)) return res.status(400).json({ error:'invalid_business' });
    if (getTier(businessSlug) < 2) return res.status(403).json({ error:'tier_2_required' });

    const expected = getAdminToken(businessSlug);
    const supplied = clean(req.headers.authorization, 500).replace(/^Bearer\s+/i, '');
    if (!expected || supplied !== expected) return res.status(401).json({ error:'unauthorized' });

    const action = clean(body.action, 30).toLowerCase();
    if (!['confirm','cancel','complete','reschedule'].includes(action)) return res.status(400).json({ error:'invalid_action' });

    const bookingId = clean(body.bookingId, 120);
    if (!bookingId) return res.status(400).json({ error:'booking_id_required' });

    const webhook = getWebhook(businessSlug);
    if (!webhook) return res.status(503).json({ error:'booking_not_configured' });

    const payload = {
      event:'booking.status_changed',
      business:{ slug:businessSlug },
      bookingId,
      action,
      appointment:{
        date:clean(body.date, 20) || null,
        time:clean(body.time, 80) || null
      },
      customer:{
        name:clean(body.name, 120) || null,
        email:clean(body.email, 160) || null,
        phone:clean(body.phone, 80) || null
      },
      changedAt:new Date().toISOString()
    };

    const response = await fetch(webhook, {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body:JSON.stringify(payload)
    });
    if (!response.ok) return res.status(502).json({ error:'automation_failed' });
    return res.status(200).json({ ok:true, action });
  } catch (error) {
    console.error('booking_action_error', error);
    return res.status(500).json({ error:'server_error' });
  }
};