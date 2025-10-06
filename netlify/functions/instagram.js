// Netlify serverless function to fetch latest Instagram posts securely
// Requires env vars:
// - INSTAGRAM_USER_ID (IG user id)
// - INSTAGRAM_ACCESS_TOKEN (long-lived token)
// Optional:
// - INSTAGRAM_GRAPH_DOMAIN (default: graph.instagram.com or use graph.facebook.com for Business accounts)

export default async (req, context) => {
  const userId = process.env.INSTAGRAM_USER_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const graphDomain = process.env.INSTAGRAM_GRAPH_DOMAIN || 'https://graph.instagram.com';

  if (!userId || !accessToken) {
    return new Response(
      JSON.stringify({ error: 'Server not configured: missing INSTAGRAM_USER_ID or INSTAGRAM_ACCESS_TOKEN' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }

  const fields = [
    'id',
    'media_type',
    'media_url',
    'thumbnail_url',
    'permalink',
    'caption',
    'timestamp',
  ].join(',');

  const url = `${graphDomain.replace(/\/$/, '')}/${userId}/media?fields=${encodeURIComponent(fields)}&limit=5&access_token=${encodeURIComponent(accessToken)}`;

  try {
    const igRes = await fetch(url, { headers: { accept: 'application/json' } });

    // Pass through JSON even if non-200 to help debugging
    const text = await igRes.text();
    const body = (() => { try { return JSON.parse(text); } catch { return { raw: text }; } })();

    const status = igRes.status;
    const headers = {
      'content-type': 'application/json',
      // Cache for a short time at edge and browser to reduce quota while keeping fresh
      'cache-control': 'public, s-maxage=300, max-age=120',
    };

    return new Response(JSON.stringify(body?.data ? body : { data: body?.data || body }), { status, headers });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to fetch Instagram', message: String(e) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
};
