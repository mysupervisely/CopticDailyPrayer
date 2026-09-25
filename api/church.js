// Same-origin Vercel proxy for the public Coptic.io API.
// Only approved read-only Church-data routes are allowed.
const ALLOWED = [
  /^\/calendar\/\d{4}-\d{2}-\d{2}$/,
  /^\/season\/\d{4}-\d{2}-\d{2}$/,
  /^\/readings\/\d{4}-\d{2}-\d{2}(\?detailed=true)?$/,
  /^\/synaxarium\/\d{4}-\d{2}-\d{2}(\?detailed=true)?$/,
  /^\/celebrations\/\d{4}-\d{2}-\d{2}$/,
  /^\/fasting\/\d{4}-\d{2}-\d{2}$/
];

const CORS_ORIGINS = new Set([
  'https://copticdailyprayer.app',
  'capacitor://localhost',
  'http://localhost'
]);

function applyCors(req, res) {
  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : '';
  if (CORS_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type');
    return true;
  }
  return !origin;
}

module.exports = async function handler(req, res) {
  const corsAllowed = applyCors(req, res);
  if (req.method === 'OPTIONS') {
    return corsAllowed ? res.status(204).end() : res.status(403).end();
  }
  if (!corsAllowed) {
    return res.status(403).json({error:'Origin not allowed'});
  }
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    return res.status(405).json({error:'Method not allowed'});
  }

  const path = typeof req.query.path === 'string' ? req.query.path : '';
  if (!ALLOWED.some(rx => rx.test(path))) {
    return res.status(400).json({error:'Unsupported Church-data request'});
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const upstream = await fetch('https://api.coptic.io/api' + path, {
      headers: {'Accept':'application/json'},
      signal: controller.signal
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      return res.status(502).json({error:`Coptic.io returned ${upstream.status}`});
    }

    res.setHeader('Content-Type','application/json; charset=utf-8');
    res.setHeader('Cache-Control','s-maxage=300, stale-while-revalidate=3600');
    return res.status(200).send(text);
  } catch (err) {
    const message = err && err.name === 'AbortError'
      ? 'Coptic.io timed out'
      : 'Coptic.io could not be reached';
    return res.status(502).json({error:message});
  } finally {
    clearTimeout(timer);
  }
};
