# Native release

Coptic Prayer uses Capacitor so the existing web app remains the source of truth for iOS, Android, and web.

## Product model

The app is free. There are no ads, subscriptions, or prayer-content paywalls. A voluntary Support Coptic Prayer option may be added later after current Apple and Google store-payment rules are verified.

## Native identity

- App name: Coptic Prayer
- App ID: org.copticdailyprayer.app
- Initial version: 1.0.0

## Build prerequisites

iOS compilation and signing require a Mac with Xcode. Android compilation requires Android Studio and the Android SDK.

## First native build

1. Clone this branch.
2. Run npm install.
3. Set `COPTIC_NATIVE_API_ORIGIN` to the permanent HTTPS production origin (origin only, with no path), then create the packaged web directory with `npm run native:prepare`. Native packaging intentionally fails if this is missing or points to a `vercel.app` preview URL.
4. Run `npm run native:init` once. This creates both native projects, syncs plugins/assets, and runs the verification gate.
5. Run `npm run native:sync` after web changes. It now verifies the packaged app after every sync.
6. Open Xcode with npm run native:ios.
7. Open Android Studio with npm run native:android.

Never commit signing certificates, provisioning profiles, keystores, passwords, or developer-account credentials.

## Release path

First development builds, then device QA, native prayer reminders, icons and launch assets, TestFlight and Google Play testing, store privacy/metadata, then version 1.0 submission.


## Current native release gates

- The native package uses `app.html` as `www/index.html`.
- Church-data requests are routed to an HTTPS API origin during native packaging.
- Android mixed content remains disabled.
- `npm run native:verify` fails if core packaged assets, the Home shell, Prayer Life client, or native API configuration is missing.
- The verifier warns until the generated `ios/` and `android/` projects exist.
- Before store registration, confirm the final bundle/application ID. The current `org.copticdailyprayer.app` value is provisional and the verifier protects it from accidental drift. Once the store identity is intentionally finalized, update the configuration and verifier together.
- Native packaging requires the permanent production API origin and refuses Vercel preview URLs, preventing an accidental store build against a temporary deployment.
