const fs = require('fs');
const path = require('path');

const root = __dirname;
const failures = [];
const requiredSourceAssets = ['resources/icon.svg','resources/splash.svg'];
for (const rel of requiredSourceAssets) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    failures.push('Missing native artwork source: ' + rel);
    continue;
  }
  const svg = fs.readFileSync(full,'utf8');
  if (!svg.includes('<svg') || !svg.includes('viewBox=')) {
    failures.push('Invalid native artwork source: ' + rel);
  }
}

const requiredWeb = [
  'www/index.html',
  'www/app-shell.css',
  'www/prayer-native.js',
  'www/readings-native.js',
  'www/calendar-native.js',
  'www/bible-native.js',
  'www/prayer-life-native.js',
  'www/home-native.js',
  'www/agpeya-local-source.js',
  'www/agpeya-data.js'
];

for (const rel of requiredWeb) {
  if (!fs.existsSync(path.join(root, rel))) failures.push('Missing packaged asset: ' + rel);
}

const indexPath = path.join(root, 'www/index.html');
if (fs.existsSync(indexPath)) {
  const html = fs.readFileSync(indexPath, 'utf8');
  if (!html.includes('id="home"')) failures.push('Native index is not the current app shell.');
  if (!html.includes('window.COPTIC_API_ORIGIN=')) {
    failures.push('Native API origin was not injected.');
  } else {
    const originMatch = html.match(/window\.COPTIC_API_ORIGIN=("(?:[^"\\]|\\.)*")/);
    if (!originMatch) {
      failures.push('Native API origin injection could not be parsed.');
    } else {
      try {
        const apiOrigin = JSON.parse(originMatch[1]);
        const parsed = new URL(apiOrigin);
        if (parsed.protocol !== 'https:' || parsed.origin !== apiOrigin) {
          failures.push('Native API origin must be a clean HTTPS origin.');
        }
        if (/vercel\.app$/i.test(parsed.hostname)) {
          failures.push('Native API origin must not use a Vercel preview domain.');
        }
      } catch (e) {
        failures.push('Native API origin is invalid.');
      }
    }
  }
  if (!html.includes('prayer-life-native.js')) failures.push('Prayer Life client is missing from native index.');
  if (!html.includes('agpeya-local-source.js')) failures.push('Agpeya source is missing from native index.');
  if (!html.includes('agpeya-data.js')) failures.push('Agpeya correction layer is missing from native index.');
  if (!html.includes('prayer-native.js')) failures.push('Agpeya reader is missing from native index.');
}

const config = require('./capacitor.config');
if (!config.appId || config.appId === 'com.example.app') failures.push('Capacitor appId is not configured.');
if (config.appId !== 'org.copticdailyprayer.app') failures.push('Capacitor appId changed. Confirm the final store identity before changing it.');
if (config.appName !== 'Coptic Prayer') failures.push('Capacitor appName must remain Coptic Prayer for this release.');
if (config.webDir !== 'www') failures.push('Capacitor webDir must be www.');
if (!config.server || config.server.hostname !== 'copticdailyprayer.app') failures.push('Capacitor hostname must remain copticdailyprayer.app.');
if (!config.server || config.server.androidScheme !== 'https') failures.push('Android scheme must remain HTTPS.');
if (config.android && config.android.allowMixedContent) failures.push('Android mixed content must remain disabled.');

for (const name of ['home-native.js','calendar-native.js','readings-native.js']) {
  const clientPath = path.join(root,'www',name);
  if (!fs.existsSync(clientPath)) continue;
  const source = fs.readFileSync(clientPath,'utf8');
  if (!source.includes("window.COPTIC_API_ORIGIN||''")) {
    failures.push(name + ' is missing configurable Church API origin support.');
  }
  if (source.includes("fetch('/api/church")) {
    failures.push(name + ' contains a hard-coded same-origin Church API request.');
  }
}

const prayerLifePath = path.join(root,'www','prayer-life-native.js');
if (fs.existsSync(prayerLifePath)) {
  const source = fs.readFileSync(prayerLifePath,'utf8');
  for (const required of ['LocalNotifications','checkPermissions','requestPermissions','getPending','cancel','schedule']) {
    if (!source.includes(required)) failures.push('Prayer reminder client is missing native notification support: ' + required);
  }
}

for (const platform of ['ios', 'android']) {
  if (!fs.existsSync(path.join(root, platform))) {
    console.warn('Native project not generated yet: ' + platform + '/');
  }
}

if (failures.length) {
  console.error('\nNative verification failed:');
  failures.forEach(x => console.error('- ' + x));
  process.exit(1);
}

console.log('Native web package verification passed.');
