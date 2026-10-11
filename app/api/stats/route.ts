import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export async function GET() {
  const data = {
    total: 100,
    platforms: {
      firefox: { count: null, updatedAt: null },
      chrome: { count: null, updatedAt: null },
      edge: { count: null, updatedAt: null },
      safari: { count: 0, updatedAt: "2026-10-11T00:00:00Z" },
    },
    showPlaceholder: siteConfig.stats.showPlaceholder,
    placeholderTotal: siteConfig.stats.placeholderTotal,
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=300, stale-while-revalidate=3600",
    },
  });
}
