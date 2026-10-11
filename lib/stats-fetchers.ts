/**
 * Automated fetchers for browser store counters and cron error alerts.
 */

export interface FirefoxFetchResult {
  count: number | null;
  pending: boolean;
}

/**
 * Fetches active installs directly from Microsoft Edge Add-ons catalog API.
 * Endpoint: https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/<extensionId>
 */
export async function fetchEdgeInstalls(extensionId: string): Promise<number> {
  const url = `https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/${extensionId}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "RBU-Attendance-Planner-Bot/1.0 (+https://rbu-attendance-planner-site.vercel.app)",
      Accept: "application/json",
    },
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    throw new Error(`Edge store API error (${res.status} ${res.statusText})`);
  }

  const data = (await res.json()) as { activeInstallCount?: unknown };
  const count = Number(data.activeInstallCount);

  if (!Number.isFinite(count) || count < 0) {
    throw new Error(
      `Invalid activeInstallCount from Edge API: ${JSON.stringify(data.activeInstallCount)}`
    );
  }

  return count;
}

/**
 * Fetches user statistics from the official Mozilla Add-ons (AMO) API.
 * Endpoint: https://addons.mozilla.org/api/v5/addons/addon/<slug>/
 */
export async function fetchFirefoxInstalls(
  slug: string
): Promise<FirefoxFetchResult> {
  const url = `https://addons.mozilla.org/api/v5/addons/addon/${slug}/`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "RBU-Attendance-Planner-Bot/1.0 (+https://rbu-attendance-planner-site.vercel.app)",
      Accept: "application/json",
    },
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });

  // When unapproved or pending review, AMO returns 401 or 404
  if (res.status === 401 || res.status === 404) {
    return { count: null, pending: true };
  }

  if (!res.ok) {
    throw new Error(`Mozilla AMO API error (${res.status} ${res.statusText})`);
  }

  const data = (await res.json()) as {
    average_daily_users?: unknown;
    weekly_downloads?: unknown;
  };

  const count = Number(data.average_daily_users ?? data.weekly_downloads);

  if (!Number.isFinite(count) || count < 0) {
    throw new Error(
      `Invalid user count from Mozilla AMO API: ${JSON.stringify(data)}`
    );
  }

  return { count, pending: false };
}

/**
 * Sends a failure alert email using Resend API when the cron refresh fails.
 * Policy: 1 email per failure run, keeping last known good database values.
 */
export async function sendFailureAlertEmail({
  errors,
  context,
}: {
  errors: string[];
  context: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.ALERT_EMAIL || "0xadnandalal@gmail.com";
  const from = process.env.RESEND_FROM || "onboarding@resend.dev";

  if (!apiKey) {
    console.warn(
      "[Cron Alert] RESEND_API_KEY is not configured in environment. Alert email skipped."
    );
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: recipient,
        subject: `[Alert] RBU Attendance Planner: Daily Stats Refresh Failed (${new Date().toLocaleDateString()})`,
        text: `The daily automated stats refresh encountered errors during execution:\n\nContext: ${context}\n\nErrors encountered:\n${errors.map((e) => `• ${e}`).join("\n")}\n\nNote: All existing database values were safely preserved (Keep Last Good Value policy).\nTimestamp: ${new Date().toISOString()}`,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(
        `[Cron Alert] Resend API error (${res.status}): ${errText}`
      );
      return false;
    }

    console.log(`[Cron Alert] Failure alert email sent to ${recipient}`);
    return true;
  } catch (err) {
    console.error("[Cron Alert] Failed to send alert email via Resend:", err);
    return false;
  }
}
