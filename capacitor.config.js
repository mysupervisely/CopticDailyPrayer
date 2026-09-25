const config = {
  appId: 'org.copticdailyprayer.app',
  appName: 'Coptic Prayer',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    hostname: 'copticdailyprayer.app',
    androidScheme: 'https'
  },
  ios: { contentInset: 'automatic' },
  android: { allowMixedContent: false }
};

module.exports = config;
