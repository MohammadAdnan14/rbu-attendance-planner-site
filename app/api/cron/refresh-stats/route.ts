import { NextResponse } from "next/server";
import {
  fetchEdgeInstalls,
  fetchFirefoxInstalls,
  sendFailureAlertEmail,
} from "@/lib/stats-fetchers";
import { updateStat } from "@/lib/stats";
import { platforms } from "@/config/platforms";

export const dynamic = "force-dynamic";

async function handleRefresh(request: Request) {
  // 1. Authorize via CRON_SECRET if configured in environment
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: "Unauthorized. Missing or invalid Bearer CRON_SECRET token." },
      { status: 401 }
    );
  }

  const results = {
    updated: [] as string[],
    skipped: [] as string[],
    errors: [] as string[],
  };

  // 2. Fetch Microsoft Edge install count (Auto)
  try {
    const edgeStoreUrl = platforms.edge.storeUrl;
    const match = edgeStoreUrl.match(/detail\/[^\/]+\/([a-z0-9]+)/i);
    const edgeExtensionId = match
      ? match[1]
      : "nlekpgmfiionjeeejjhfaepkbaajaiee";

    const edgeCount = await fetchEdgeInstalls(edgeExtensionId);
    await updateStat("edge", edgeCount);
    results.updated.push(`edge (${edgeCount} active installs)`);
  } catch (err) {
    const msg = `Edge refresh failed: ${err instanceof Error ? err.message : String(err)}`;
    console.error(`[Cron Refresh] ${msg}`);
    results.errors.push(msg);
    // Keep last good value in Redis (no destructive action)
  }

  // 3. Fetch Mozilla Firefox user count (Auto)
  try {
    const storeUrl = platforms.firefox.storeUrl as string;
    const isFirefoxLive = storeUrl && storeUrl !== "#";
    const amoSlug = platforms.firefox.amoSlug;

    if (!isFirefoxLive || !amoSlug) {
      results.skipped.push("firefox (store listing unconfigured or #)");
    } else {
      const { count, pending } = await fetchFirefoxInstalls(amoSlug);
      if (pending) {
        results.skipped.push("firefox (AMO listing pending store approval)");
      } else if (count !== null) {
        await updateStat("firefox", count);
        results.updated.push(`firefox (${count} users)`);
      }
    }
  } catch (err) {
    const msg = `Firefox refresh failed: ${err instanceof Error ? err.message : String(err)}`;
    console.error(`[Cron Refresh] ${msg}`);
    results.errors.push(msg);
    // Keep last good value in Redis
  }

  // 4. Chrome (Manual by design)
  results.skipped.push(
    "chrome (manual sync via npm run set-stat -- chrome <count>)"
  );

  // 5. Send one failure email per run if any error occurred
  let alertEmailSent = false;
  if (results.errors.length > 0) {
    alertEmailSent = await sendFailureAlertEmail({
      errors: results.errors,
      context: "Vercel Daily Refresh Cron (/api/cron/refresh-stats)",
    });
  }

  const hasErrors = results.errors.length > 0;
  return NextResponse.json(
    {
      success: !hasErrors,
      timestamp: new Date().toISOString(),
      results,
      alertEmailSent,
    },
    { status: hasErrors ? 207 : 200 }
  );
}

export async function GET(request: Request) {
  return handleRefresh(request);
}

export async function POST(request: Request) {
  return handleRefresh(request);
}
