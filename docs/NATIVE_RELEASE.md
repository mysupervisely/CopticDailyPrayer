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
3. Create the packaged web directory with npm run native:prepare.
4. Run npx cap add ios and npx cap add android once.
5. Run npm run native:sync after web changes.
6. Open Xcode with npm run native:ios.
7. Open Android Studio with npm run native:android.

Never commit signing certificates, provisioning profiles, keystores, passwords, or developer-account credentials.

## Release path

First development builds, then device QA, native prayer reminders, icons and launch assets, TestFlight and Google Play testing, store privacy/metadata, then version 1.0 submission.
