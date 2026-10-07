// src/app/api/poaps/[address]/route.js
import { NextResponse } from "next/server";

// The POAP API requires a key: https://documentation.poap.tech/docs/api-keys
// Set POAP_API_KEY in Vercel (Project → Settings → Environment Variables).
const POAP_API_KEY = process.env.POAP_API_KEY;

// Ethereum address or ENS name only — never forward arbitrary paths upstream
const VALID_ADDRESS = /^(0x[a-fA-F0-9]{40}|[a-z0-9-]+(\.[a-z0-9-]+)*\.eth)$/;

export async function GET(request, { params }) {
  const { address } = await params;

  if (!VALID_ADDRESS.test(address)) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 });
  }
  if (!POAP_API_KEY) {
    console.error("[poaps] POAP_API_KEY is not set");
    return NextResponse.json({ error: "POAP API key not configured" }, { status: 503 });
  }

  try {
    const res = await fetch(`https://api.poap.tech/actions/scan/${address}`, {
      headers: { Accept: "application/json", "X-API-Key": POAP_API_KEY },
      // POAPs change rarely — cache upstream responses for an hour
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: `POAP API returned ${res.status}` },
        { status: 502 }
      );
    }
    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch (err) {
    console.error("[poaps] fetch failed:", err);
    return NextResponse.json({ error: "Failed to fetch POAPs" }, { status: 500 });
  }
}
