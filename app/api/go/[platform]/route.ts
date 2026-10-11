import { NextResponse } from "next/server";
import { platforms } from "@/config/platforms";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params;

  if (platform !== "chrome" && platform !== "edge" && platform !== "firefox") {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }

  const storePlatform = platform as "chrome" | "edge" | "firefox";
  const storeUrl = platforms[storePlatform].storeUrl;

  if (!storeUrl || storeUrl === "#") {
    return NextResponse.redirect(new URL(`/${platform}`, request.url), 302);
  }

  // Click tracking will be wired in Phase 6 with Redis
  return NextResponse.redirect(storeUrl, 302);
}
