# Network and Data Flow Audit

Last reviewed: September 25, 2026

## Confirmed network paths

### Church data

`api/church.js` is a same-origin, read-only proxy to the public Coptic.io API. It accepts only allowlisted calendar, season, readings, Synaxarium, celebrations, and fasting requests. No Prayer Life, Father of Confession, confession, intercessor, or prayer-history data is included by this endpoint.

### Legacy browser push

The repository contains a legacy Web Push backend:

- `api/push-config.js`
- `api/push-subscription.js`
- `api/push-dispatch.js`
- push handling in `sw.js`

The configuration endpoint currently advertises `scheduledDeliveryAvailable:false` and `publicKey:null`, so the feature is intentionally dormant in the current deployment configuration.

If fully configured in the future, the subscription endpoint is capable of storing a browser push subscription endpoint/keys, selected reminder times, timezone, and update timestamp in server-side KV storage. It does not accept Father of Confession, confession, intercessor, or prayer-history data.

## Native reminder architecture

The native app uses Capacitor Local Notifications. Personal Prayer Rule reminder times are scheduled locally on the device. Native reminders should not use the legacy Web Push backend.

## Release decision

For the first native App Store / Play Store release:

- Keep native reminders local-only.
- Do not enable the legacy server-side Web Push system as part of the native build.
- Do not send Prayer Life or confession-related localStorage data to analytics or remote APIs.
- Re-audit browser push before intentionally enabling it on the web.
- Keep the Church-data proxy read-only and narrowly allowlisted.

## Still required before store submission

Audit client-side calls across all application scripts, verify deployed environment configuration, publish the final user-facing Privacy Policy, and complete store privacy/data-safety disclosures from the verified production build.
