import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { readStats } from "@/lib/stats";

export async function GET() {
  try {
    const data = {
      ...(await readStats()),
      showPlaceholder: siteConfig.stats.showPlaceholder,
      placeholderTotal: siteConfig.stats.placeholderTotal,
    };
    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=3600" },
    });
  } catch {
    return NextResponse.json(
      { error: "Stats are temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
