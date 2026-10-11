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
    // Graceful fallback to placeholder data when Redis is not yet configured
    return NextResponse.json(
      {
        total: 100,
        platforms: {
          firefox: { count: null, updatedAt: null },
          chrome: { count: null, updatedAt: null },
          edge: { count: null, updatedAt: null },
          safari: { count: 0, updatedAt: "2026-10-11T00:00:00Z" },
        },
        showPlaceholder: siteConfig.stats.showPlaceholder,
        placeholderTotal: siteConfig.stats.placeholderTotal,
      },
      {
        headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
      }
    );
  }
}
