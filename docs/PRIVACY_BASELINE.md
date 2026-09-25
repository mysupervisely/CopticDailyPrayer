# Coptic Prayer Privacy Baseline

Last reviewed: September 25, 2026

Coptic Prayer is designed to minimize collection of personal information.

## Local spiritual data

The following features currently use storage on the user's device:

- Personal Prayer Rule selections
- Prayer reminder times
- Jesus Prayer and Lord Have Mercy counts/history
- Prayer rhythm/history
- Intercessor selections
- Father of Confession information entered by the user
- Confession schedule/history entered by the user

These features must remain local-only unless a future feature is separately designed, disclosed, reviewed, and explicitly enabled by the user.

## Notifications

Native prayer reminders use local notifications scheduled on the device. Reminder times do not need to be sent to a Coptic Prayer server.

The web service worker contains support for browser push notifications. Before public release, verify whether any production subscription endpoint exists. Do not describe browser push as local-only unless that audit is complete.

## Accounts and tracking

The current application has no required user account in the prayer-life workflow and should not add advertising or behavioral tracking as part of the native release.

## Release requirements

Before App Store or Google Play submission:

1. Audit all network requests and production API endpoints.
2. Confirm exactly what data leaves the device.
3. Publish a user-facing Privacy Policy at a stable public URL.
4. Complete Apple privacy disclosures and Google Play Data Safety from the verified implementation, not assumptions.
5. Re-review any future voluntary support/payment integration before enabling it.
6. Never include Father of Confession or confession-related content in analytics, logs, crash metadata, notification payloads, or support-payment metadata.

This file is an engineering baseline, not the final public Privacy Policy.
