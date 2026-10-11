import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { getRedis } from "../lib/redis";

async function main() {
  const readline = createInterface({ input, output });
  const answer = await readline.question(
    "⚠️  Are you sure you want to reset testing counts (Safari downloads & click counters) to 0? [y/N]: "
  );
  readline.close();

  if (!/^y(es)?$/i.test(answer.trim())) {
    console.log("Operation cancelled. No changes made.");
    return;
  }

  const redis = getRedis();

  // Reset Safari counters
  await redis.set("counter:safari_downloads", 0);
  await redis.set("counter:safari_downloads:updatedAt", new Date().toISOString());

  // Reset internal click trackers
  await redis.set("clicks:safari", 0);
  await redis.set("clicks:chrome", 0);
  await redis.set("clicks:edge", 0);
  await redis.set("clicks:firefox", 0);

  console.log("\n✓ Successfully reset testing counts to 0!");
  console.log("  - counter:safari_downloads -> 0");
  console.log("  - clicks:safari            -> 0");
  console.log("  - clicks:chrome            -> 0");
  console.log("  - clicks:edge              -> 0");
  console.log("  - clicks:firefox           -> 0\n");
}

main().catch((error: unknown) => {
  console.error(
    error instanceof Error ? error.message : "Failed to reset statistics."
  );
  process.exitCode = 1;
});
