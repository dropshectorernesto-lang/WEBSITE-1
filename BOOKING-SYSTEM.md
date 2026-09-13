# Booking system

The booking system is shared across customer demos and is designed so a salon can be upgraded by changing its booking tier instead of rebuilding the site.

## Tier 1 — default

Public form:
- Customer name
- Pet name
- Phone
- Service
- Preferred date
- Optional notes
- No public time-slot selection

Automation:
- `POST /api/bookings`
- Secure server-side forward to the salon's Zapier webhook
- Zapier sends the salon notification
- Zapier creates an all-day Google Calendar event on the requested date
- Salon contacts the customer and chooses the exact time itself

## Tier 2

Everything in Tier 1, plus:
- Optional customer email field is exposed automatically
- Server supports booking status actions through `POST /api/booking-action`
- Supported actions: `confirm`, `reschedule`, `cancel`, `complete`
- Zapier can branch on `booking.status_changed` to send customer email/WhatsApp confirmations and reminders
- Exact appointment time is still controlled by the salon rather than selected from the public form

## Tier 3

Everything in Tier 2, plus:
- Public available-time selector
- `POST /api/availability` asks the configured availability provider for live slots
- Customer must choose an available slot before submitting
- This is the layer for real-time scheduling, staff/service durations, blocked times and calendar availability

## One-switch customer upgrade

Future customer profiles contain:

```js
booking: {
  tier: 1,
  enabled: false,
  apiBase: null,
  submitPath: '/api/bookings',
  availabilityPath: '/api/availability'
}
```

Change only `tier: 1` → `2` or `3` for the product upgrade. `enabled` should become `true` only after a secure backend endpoint is deployed and connected. `apiBase` is the public API origin, for example a Vercel/Cloudflare serverless domain. Never put Zapier webhook URLs, Google credentials or admin tokens in `profile.js`.

Legacy/current customer demos without an explicit `booking` block inherit Tier 1 behavior from `demos/booking-system.js`.

## Server environment variables

The API reads secrets only from server-side environment variables.

Global defaults:

```text
BOOKING_TIER_DEFAULT=1
ZAPIER_BOOKING_WEBHOOK_URL=https://hooks.zapier.com/...
BOOKING_ALLOWED_ORIGINS=https://customer-domain.example,https://dropshectorernesto-lang.github.io
BOOKING_ADMIN_TOKEN=<long-random-secret>          # Tier 2+
BOOKING_AVAILABILITY_URL=https://...              # Tier 3 only
```

Per-customer overrides are supported by converting the customer slug to uppercase underscores. Example for `mai-friends`:

```text
BOOKING_TIER_MAI_FRIENDS=2
ZAPIER_BOOKING_WEBHOOK_MAI_FRIENDS=https://hooks.zapier.com/...
BOOKING_ADMIN_TOKEN_MAI_FRIENDS=<long-random-secret>
BOOKING_AVAILABILITY_URL_MAI_FRIENDS=https://...
```

## Zapier payloads

New request event:

```json
{
  "event": "booking.requested",
  "bookingId": "uuid",
  "tier": 1,
  "business": { "slug": "customer-slug", "name": "Customer Name" },
  "customer": { "name": "Maria", "phone": "+34...", "email": "" },
  "pet": { "name": "Luna" },
  "appointment": { "service": "FULL GROOM", "date": "2026-09-18", "time": null, "allDay": true },
  "notes": "",
  "locale": "es",
  "requestedAt": "ISO timestamp"
}
```

Tier 2 status event:

```json
{
  "event": "booking.status_changed",
  "business": { "slug": "customer-slug" },
  "bookingId": "uuid",
  "action": "confirm",
  "appointment": { "date": "2026-09-18", "time": "16:30" }
}
```

## Zapier Tier 1 recipe

Use one Catch Hook trigger and two actions:
1. Send the salon a new-booking notification.
2. Create a Google Calendar all-day event using `appointment.date` with the customer, pet, service, phone and notes in the event description.

The webhook URL stays in the server environment, never in browser JavaScript.

## Hosting note

The existing public/demo site is hosted on GitHub Pages, which is static and cannot execute the `/api/*` server functions. The frontend tier system is live there in safe demo mode. To send real Zapier notifications and calendar events, deploy the `api/` directory on a serverless host (for example Vercel or Cloudflare) and set each production customer's `booking.enabled` + `booking.apiBase`.
