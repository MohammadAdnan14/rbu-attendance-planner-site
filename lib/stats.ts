import { getRedis } from "@/lib/redis";

export const statPlatforms = ["firefox", "chrome", "edge"] as const;
export type StatPlatform = (typeof statPlatforms)[number];
export type StatRecord = { count: number; updatedAt: string };
export type PlatformStat = { count: number | null; updatedAt: string | null };

function isStatRecord(value: unknown): value is StatRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as StatRecord).count === "number" &&
    typeof (value as StatRecord).updatedAt === "string"
  );
}

function asCounter(value: unknown): number {
  const counter = typeof value === "number" ? value : Number(value);
  return Number.isFinite(counter) && counter >= 0 ? counter : 0;
}

export async function readStats() {
  const redis = getRedis();
  const [firefox, chrome, edge, safariCount, safariUpdatedAt] =
    await redis.mget<[unknown, unknown, unknown, unknown, unknown]>(
      "stats:firefox",
      "stats:chrome",
      "stats:edge",
      "counter:safari_downloads",
      "counter:safari_downloads:updatedAt"
    );
  const stored = { firefox, chrome, edge };
  const platforms = Object.fromEntries(
    statPlatforms.map((platform) => {
      const value = stored[platform];
      return [
        platform,
        isStatRecord(value)
          ? { count: value.count, updatedAt: value.updatedAt }
          : { count: null, updatedAt: null },
      ];
    })
  ) as Record<StatPlatform, PlatformStat>;
  const safari: PlatformStat = {
    count: asCounter(safariCount),
    updatedAt: typeof safariUpdatedAt === "string" ? safariUpdatedAt : null,
  };
  const total = [...Object.values(platforms), safari].reduce(
    (sum, platform) => sum + (platform.count ?? 0),
    0
  );
  return { total, platforms: { ...platforms, safari } };
}

/** Counts one event per visitor/kind per hour. Returns false for a repeat visit. */
export async function countOnce(kind: string, hash: string, keys: string[]) {
  const redis = getRedis();
  const claimed = await redis.set(`dedupe:${kind}:${hash}`, "1", {
    nx: true,
    ex: 3600,
  });
  if (claimed !== "OK") return false;
  await redis.incrby(keys[0], 1);
  if (keys[1]) await redis.incrby(keys[1], 1);
  return true;
}

/** Updates a platform stat record in Redis with a fresh timestamp. */
export async function updateStat(
  platform: StatPlatform,
  count: number
): Promise<StatRecord> {
  const redis = getRedis();
  const value: StatRecord = { count, updatedAt: new Date().toISOString() };
  await redis.set(`stats:${platform}`, value);
  return value;
}
