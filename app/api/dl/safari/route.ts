import { NextResponse } from "next/server";
import { visitorFromRequest } from "@/lib/hash";
import { countOnce } from "@/lib/stats";
import { getRedis } from "@/lib/redis";

export async function GET(request: Request) {
  try {
    const counted = await countOnce(
      "safari_download",
      visitorFromRequest(request),
      ["counter:safari_downloads", "clicks:safari"]
    );
    if (counted)
      await getRedis().set(
        "counter:safari_downloads:updatedAt",
        new Date().toISOString()
      );
  } catch {
    // A failed metric must never prevent a visitor from downloading the extension.
  }
  const fileUrl = new URL("/files/safari-extension.zip", request.url);
  return NextResponse.redirect(fileUrl, 302);
}
