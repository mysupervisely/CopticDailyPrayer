const fs = require('fs');
const path = require('path');

const root = __dirname;
const failures = [];
const requiredWeb = [
  'www/index.html',
  'www/app-shell.css',
  'www/prayer-native.js',
  'www/readings-native.js',
  'www/calendar-native.js',
  'www/bible-native.js',
  'www/prayer-life-native.js',
  'www/home-native.js'
];

for (const rel of requiredWeb) {
  if (!fs.existsSync(path.join(root, rel))) failures.push('Missing packaged asset: ' + rel);
}

const indexPath = path.join(root, 'www/index.html');
if (fs.existsSync(indexPath)) {
  const html = fs.readFileSync(indexPath, 'utf8');
  if (!html.includes('id="home"')) failures.push('Native index is not the current app shell.');
  if (!html.includes('window.COPTIC_API_ORIGIN=')) failures.push('Native API origin was not injected.');
  if (!html.includes('prayer-life-native.js')) failures.push('Prayer Life client is missing from native index.');
}

const config = require('./capacitor.config');
if (!config.appId || config.appId === 'com.example.app') failures.push('Capacitor appId is not configured.');
if (config.webDir !== 'www') failures.push('Capacitor webDir must be www.');
if (config.android && config.android.allowMixedContent) failures.push('Android mixed content must remain disabled.');

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
