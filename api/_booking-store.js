const clean = (value, max = 500) => String(value || '').trim().slice(0, max);

const config = () => ({
  url: clean(
    process.env.BOOKING_STORE_URL ||
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL || '',
    1000
  ).replace(/\/$/, ''),
  token: clean(
    process.env.BOOKING_STORE_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN || '',
    1000
  )
});

const command = async (args) => {
  const { url, token } = config();
  if (!url || !token) {
    const error = new Error('booking_store_not_configured');
    error.code = 'booking_store_not_configured';
    throw error;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(args)
  });

  if (!response.ok) {
    const error = new Error('booking_store_failed');
    error.code = 'booking_store_failed';
    throw error;
  }

  const payload = await response.json();
  if (payload?.error) {
    const error = new Error(String(payload.error));
    error.code = 'booking_store_failed';
    throw error;
  }
  return payload?.result;
};

const bookingKey = (slug, id) => `booking:${slug}:${id}`;
const indexKey = (slug) => `booking:index:${slug}`;

const parseRecord = (value) => {
  if (!value) return null;
  try { return JSON.parse(value); } catch (_) { return null; }
};

const saveBooking = async (record) => {
  await command(['SET', bookingKey(record.businessSlug, record.id), JSON.stringify(record)]);
  return record;
};

const createBooking = async (record) => {
  await saveBooking(record);
  await command(['LPUSH', indexKey(record.businessSlug), record.id]);
  await command(['LTRIM', indexKey(record.businessSlug), 0, 499]);
  return record;
};

const getBooking = async (slug, id) => {
  return parseRecord(await command(['GET', bookingKey(slug, id)]));
};

const listBookings = async (slug, limit = 100) => {
  const safeLimit = Math.max(1, Math.min(200, Number(limit) || 100));
  const ids = await command(['LRANGE', indexKey(slug), 0, safeLimit - 1]);
  if (!Array.isArray(ids) || ids.length === 0) return [];

  const values = await command(['MGET', ...ids.map((id) => bookingKey(slug, id))]);
  if (!Array.isArray(values)) return [];
  return values.map(parseRecord).filter(Boolean);
};

module.exports = {
  createBooking,
  getBooking,
  listBookings,
  saveBooking
};
