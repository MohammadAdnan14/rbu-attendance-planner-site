import { fetchEdgeInstalls, fetchFirefoxInstalls } from "../lib/stats-fetchers";
import { platforms } from "../config/platforms";

async function main() {
  console.log("=== Testing Phase 7 Automated Stats Fetchers ===\n");

  // 1. Test Edge
  console.log("1. Testing Microsoft Edge Fetcher...");
  try {
    const edgeId = "nlekpgmfiionjeeejjhfaepkbaajaiee";
    const count = await fetchEdgeInstalls(edgeId);
    console.log(`✓ Edge API success! activeInstallCount = ${count}\n`);
  } catch (err) {
    console.error(`✗ Edge API error:`, err, "\n");
  }

  // 2. Test Firefox
  console.log("2. Testing Mozilla Firefox (AMO) Fetcher...");
  try {
    const amoSlug = platforms.firefox.amoSlug ?? "rbu-attendance-planner";
    const res = await fetchFirefoxInstalls(amoSlug);
    if (res.pending) {
      console.log(
        `✓ Firefox AMO handler success! Status: Pending Store Approval (safely handled)\n`
      );
    } else {
      console.log(`✓ Firefox AMO API success! count = ${res.count}\n`);
    }
  } catch (err) {
    console.error(`✗ Firefox API error:`, err, "\n");
  }

  console.log("3. Google Chrome:");
  console.log(
    "✓ Manual entry policy: run `npm run set-stat -- chrome <count>` weekly.\n"
  );

  console.log("=== Test Complete ===");
}

main().catch(console.error);
