import { NextResponse } from 'next/server';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const message = (body.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Capture to PostHog (optional)
    try {
      const key = process.env.POSTHOG_API_KEY;
      const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
      if (key) {
        await fetch(`${host}/capture/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_key: key,
            event: 'contact_form_submission',
            properties: { name, email, message, source: 'portfolio' },
          }),
        });
      }
    } catch {}

    // Proxy to Formspree (if configured)
    const endpoint = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/xjkwggdp';
    let formspreeOk = false;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });
      formspreeOk = res.ok;
    } catch {}

    // Always return success to avoid UX block; message stored via PostHog when configured
    return NextResponse.json({ ok: true, delivered: formspreeOk });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }
}
