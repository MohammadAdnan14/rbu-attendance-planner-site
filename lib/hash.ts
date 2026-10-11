import { createHash } from "node:crypto";

export function visitorFromRequest(request: Request): string {
  const salt = process.env.HASH_SALT;
  if (!salt) throw new Error("HASH_SALT is not configured.");
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  return createHash("sha256").update(`${salt}${ip}${userAgent}`).digest("hex");
}
