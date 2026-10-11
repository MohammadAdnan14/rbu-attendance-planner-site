import { Redis } from "@upstash/redis";

let redis: Redis | undefined;

export function getRedis(): Redis {
  if (redis) return redis;
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    throw new Error("Upstash Redis is not configured.");
  }
  redis = Redis.fromEnv();
  return redis;
}
