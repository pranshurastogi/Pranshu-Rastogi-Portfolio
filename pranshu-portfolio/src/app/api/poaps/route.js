// src/app/api/poaps/[address]/route.js
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { address } = params;

  try {
    const res = await fetch(
      `https://api.poap.tech/actions/scan/${address}`,
      { headers: { "Content-Type": "application/json" } }
    );
    if (!res.ok) {
      return NextResponse.json(
        { error: `POAP API returned ${res.status}` },
        { status: 502 }
      );
    }
    const data = await res.json();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        // allow your frontend to consume it
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    });
  } catch (err) {
    console.error("API Route error:", err);
    return NextResponse.json(
      { error: "Failed to fetch POAPs" },
      { status: 500 }
    );
  }
}
