import { NextResponse } from "next/server";
import type { AQIData } from "../../types/aqi";
import { cityMapping } from "../../lib/cityMapping";

const TOKEN = process.env.WAQI_API_TOKEN;
const cache: Record<string, { timestamp: number; data: AQIData }> = {};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");

    if (!city) {
      return NextResponse.json({ error: "City required" }, { status: 400 });
    }

    const cityKey = city.toLowerCase();

    // If city isn't in mapping, return structured error
    if (!cityMapping[cityKey]) {
      return NextResponse.json({ error: "Sorry, the API doesn't support this city yet." }, { status: 404 });
    }

    if (!TOKEN) {
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    if (cache[cityKey] && Date.now() - cache[cityKey].timestamp < 90000) {
      return NextResponse.json(cache[cityKey].data);
    }

    const res = await fetch(`https://api.waqi.info/feed/${cityKey}/?token=${TOKEN}`, { cache: "no-store" });
    if (!res.ok) return NextResponse.json({ error: "API failed" }, { status: 502 });

    const json = await res.json();
    if (json.status !== "ok") return NextResponse.json({ error: "API returned error" }, { status: 502 });

    const d = json.data;
    const response: AQIData = {
      aqi: d.aqi,
      dominant: d.dominentpol,
      forecast: d.forecast?.daily || {},
      updated: new Date().toISOString(),
    };

    cache[cityKey] = { timestamp: Date.now(), data: response };
    return NextResponse.json(response);

  } catch {
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}