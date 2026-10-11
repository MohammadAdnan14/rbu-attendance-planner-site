import { NextResponse } from "next/server";
import { platforms } from "@/config/platforms";
import { visitorFromRequest } from "@/lib/hash";
import { countOnce } from "@/lib/stats";

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

  if (!storeUrl || (storeUrl as string) === "#") {
    return NextResponse.redirect(new URL(`/${platform}`, request.url), 302);
  }

  try {
    await countOnce(`go:${platform}`, visitorFromRequest(request), [
      `clicks:${platform}`,
    ]);
  } catch {
    // Store navigation remains available if analytics is temporarily unavailable.
  }
  return NextResponse.redirect(storeUrl, 302);
}
