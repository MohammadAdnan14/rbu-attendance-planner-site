import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { getRedis } from "../lib/redis";
import {
  statPlatforms,
  type StatPlatform,
  type StatRecord,
} from "../lib/stats";

async function main() {
  const [platformInput, countInput] = process.argv.slice(2);
  if (!statPlatforms.includes(platformInput as StatPlatform)) {
    console.error("Platform must be chrome, edge, or firefox.");
    process.exitCode = 1;
    return;
  }

  const count = Number(countInput);
  if (!Number.isInteger(count) || count <= 0) {
    console.error("Count must be an integer above 0.");
    process.exitCode = 1;
    return;
  }

  const platform = platformInput as StatPlatform;
  const redis = getRedis();
  const key = `stats:${platform}`;
  const current = await redis.get<StatRecord>(key);
  if (current && count < current.count) {
    const readline = createInterface({ input, output });
    const answer = await readline.question(
      `The current ${platform} count is ${current.count}. Lower it to ${count}? [y/N] `
    );
    readline.close();
    if (!/^y(es)?$/i.test(answer.trim())) {
      console.log("No changes made.");
      return;
    }
  }

  const value: StatRecord = { count, updatedAt: new Date().toISOString() };
  await redis.set(key, value);
  console.log(`Stored ${key}: ${JSON.stringify(value)}`);
}

main().catch((error: unknown) => {
  console.error(
    error instanceof Error ? error.message : "Unable to update the statistic."
  );
  process.exitCode = 1;
});
