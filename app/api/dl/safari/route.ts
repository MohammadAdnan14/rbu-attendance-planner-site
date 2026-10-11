import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET(request: Request) {
  try {
    // Every request is one ZIP download: three downloads means +3.
    const redis = getRedis();
    await redis.incrby("counter:safari_downloads", 1);
    await redis.incrby("clicks:safari", 1);
    await redis.set(
      "counter:safari_downloads:updatedAt",
      new Date().toISOString()
    );
  } catch {
    // A failed metric must never prevent a visitor from downloading the extension.
  }
  const fileUrl = new URL("/files/safari-extension.zip", request.url);
  return NextResponse.redirect(fileUrl, 302);
}
