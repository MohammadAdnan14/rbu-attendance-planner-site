import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Counting logic will be wired in Phase 6 with Redis
  const fileUrl = new URL("/files/safari-extension.zip", request.url);
  return NextResponse.redirect(fileUrl, 302);
}
