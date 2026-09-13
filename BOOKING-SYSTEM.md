# Booking system

The booking system is shared across customer demos and is designed so a salon can be upgraded by changing its booking tier instead of rebuilding the site.

## Tier 1 — default

Public form:
- Customer name
- Pet name
- Phone
- Email
- Service
- Preferred date
- Preferred 2-hour window, by default `08:00-10:00`, `10:00-12:00`, `12:00-14:00`, `14:00-16:00`, `16:00-18:00`, `18:00-20:00`, or `No preference`
- Optional notes
- Customer does not choose the exact appointment time

Dashboard:
- Shared simple dashboard at `/booking-admin/`
- Shows new/confirmed/cancelled/completed requests
- Groomer sees the requested date and preferred window
- Groomer chooses the exact date + time and clicks Confirm
- A time outside the requested window is allowed, but the dashboard warns the groomer

Automation:
- `POST /api/bookings` saves the request and can notify the salon through Zapier
- No Google Calendar event is created when the customer submits the request
- `POST /api/booking-action` with `action: "confirm"` sends `booking.confirmed`
- Zapier then creates/updates the exact Google Calendar appointment and immediately sends the customer confirmation email

## Tier 2

Everything in Tier 1, plus:
- `reschedule` is enabled in addition to confirm/cancel/complete
- Zapier can branch on `booking.rescheduled` and `booking.cancelled` for customer email/WhatsApp messages and reminders
- Customer history and richer communication can be added without changing the public booking flow

## Tier 3

Everything in Tier 2, plus:
- Public available-time selector
- `POST /api/availability` asks the configured availability provider for live slots
- Customer chooses an exact available slot before submitting
- This is the layer for real-time scheduling, staff/service durations, blocked times and calendar availability

## One-switch customer upgrade

Future customer profiles contain:

```js
booking: {
  tier: 1,
  enabled: false,
  apiBase: null,
  submitPath: '/api/bookings',
  availabilityPath: '/api/availability',
  preferredWindows: [
    '08:00-10:00',
    '10:00-12:00',
    '12:00-14:00',
    '14:00-16:00',
    '16:00-18:00',
    '18:00-20:00',
    'any'
  ]
}
```

Change only `tier: 1` → `2` or `3` for the product upgrade. A salon can also override `preferredWindows` to match its opening hours. `enabled` should become `true` only after a secure backend endpoint is deployed and connected. `apiBase` is the public API origin. Never put Zapier webhook URLs, Google credentials, booking-store tokens or admin tokens in `profile.js`.

Legacy/current customer demos without an explicit `booking` block inherit Tier 1 behavior from `demos/booking-system.js`.

## Persistent request store

The simple dashboard requires a Redis-compatible REST store. The included adapter supports the common Upstash/Vercel variable names as well as neutral names.

```text
BOOKING_STORE_URL=https://...
BOOKING_STORE_TOKEN=<secret>
```

Also accepted:

```text
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

or:

```text
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

Requests are stored per business slug. The browser never receives the store credentials.

## Server environment variables

Global defaults:

```text
BOOKING_TIER_DEFAULT=1
ZAPIER_BOOKING_WEBHOOK_URL=https://hooks.zapier.com/...
BOOKING_ALLOWED_ORIGINS=https://customer-domain.example,https://dropshectorernesto-lang.github.io
BOOKING_ADMIN_TOKEN=<long-random-secret>
BOOKING_STORE_URL=https://...
BOOKING_STORE_TOKEN=<secret>
BOOKING_AVAILABILITY_URL=https://...              # Tier 3 only
```

Per-customer overrides are supported for tier, webhook, admin token and availability by converting the customer slug to uppercase underscores. Example for `mai-friends`:

```text
BOOKING_TIER_MAI_FRIENDS=2
ZAPIER_BOOKING_WEBHOOK_MAI_FRIENDS=https://hooks.zapier.com/...
BOOKING_ADMIN_TOKEN_MAI_FRIENDS=<long-random-secret>
BOOKING_AVAILABILITY_URL_MAI_FRIENDS=https://...
```

## Dashboard URL

The dashboard is intentionally simple and `noindex,nofollow`.

```text
/booking-admin/?business=customer-slug&api=https://your-booking-api.example
```

The groomer only needs the salon access key. The access key is sent to the API as a Bearer token and is kept only in the browser session.

## Zapier payloads

New request:

```json
{
  "event": "booking.requested",
  "bookingId": "uuid",
  "tier": 1,
  "business": { "slug": "customer-slug", "name": "Customer Name" },
  "customer": { "name": "Maria", "phone": "+34...", "email": "maria@example.com" },
  "pet": { "name": "Luna" },
  "appointment": {
    "service": "FULL GROOM",
    "date": "2026-09-18",
    "preferredWindow": "14:00-16:00",
    "time": null,
    "createCalendar": false
  }
}
```

Groomer confirmation:

```json
{
  "event": "booking.confirmed",
  "bookingId": "uuid",
  "appointment": {
    "requestedDate": "2026-09-18",
    "preferredWindow": "14:00-16:00",
    "date": "2026-09-18",
    "time": "15:30",
    "outsidePreferredWindow": false
  },
  "calendarAction": "create_or_update",
  "customerNotification": true
}
```

## Zapier Tier 1 recipe

Use one Catch Hook trigger with paths/filters based on `event`:
1. `booking.requested` → notify the salon of the new request. Do **not** create a calendar appointment yet.
2. `booking.confirmed` → create/update the exact Google Calendar event using `appointment.date` + `appointment.time`, then send the customer confirmation email immediately.

The webhook URL stays in the server environment, never in browser JavaScript.

## Hosting note

The public/demo site is hosted on GitHub Pages, which is static and cannot execute the `/api/*` server functions. The frontend booking UI and dashboard shell can be deployed there, but real persistence, notifications and calendar/customer confirmations require the `api/` directory to be deployed on a serverless host and connected to the store + Zapier. Production customer profiles then receive the secure API origin through `booking.apiBase`.
