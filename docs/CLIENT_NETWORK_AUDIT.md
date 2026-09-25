# Client Network Audit

Last reviewed: September 25, 2026

This audit covers the current client scripts on the native-release branch.

## Automatic application requests

### Same-origin Church data

The Home, Calendar, and Readings clients request only the same-origin `/api/church` proxy for calendar, fasting, lectionary, Synaxarium, and celebration content. The proxy is read-only and allowlisted.

### Bible text

`bible-native.js` retrieves WEBU chapter HTML directly from `https://ebible.org/engwebu/` when a mapped Bible chapter is opened. This means the device makes a normal HTTPS request to eBible.org. No Prayer Life localStorage content is intentionally included in that request.

## User-initiated external navigation

The app contains links that open external source/reference sites, including Coptic.io documentation, CopticChurch.net, and SUSCopts. These are user-initiated navigations.

Father of Confession scheduling links are user-entered and open only when the user chooses to open them.

Some legacy Prayer Life/confession tools can construct Google Calendar URLs. Those URLs may contain event information when the user intentionally chooses the calendar action. Native release QA must verify that sensitive confession details are not placed into external calendar URLs. The newer native confession reminder uses the generic label `Prayer Life reminder`.

## Browser push

Legacy browser Web Push code exists but its configuration endpoint currently reports scheduled delivery unavailable and no public key. Native reminders use Capacitor Local Notifications instead.

## No evidence found in audited client paths

The audited clients did not show advertising SDK calls, behavioral analytics calls, `sendBeacon`, WebSocket telemetry, or automatic transmission of Father of Confession/intercessor/confession-history localStorage records.

## Release actions

- Keep native reminders local.
- Prefer generic wording for any external calendar event.
- Verify the legacy confession/calendar path is not exposed in the native UI.
- Document the direct eBible.org Bible request in the final privacy review.
- Repeat this audit against the final release commit and deployed environment before completing Apple/Google privacy disclosures.
