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

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({error:'Method not allowed'});
  }

  const path = typeof req.query.path === 'string' ? req.query.path : '';
  const upstreamPath = path.replace(/%3F/ig, '?').replace(/%3D/ig, '=');
  if (!ALLOWED.some(rx => rx.test(upstreamPath))) {
    return res.status(400).json({error:'Unsupported Church-data request'});
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const upstream = await fetch('https://api.coptic.io/api' + upstreamPath, {
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
