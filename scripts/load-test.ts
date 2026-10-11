import { performance } from "perf_hooks";

interface LoadTestOptions {
  name: string;
  url: string;
  totalRequests: number;
  concurrency: number;
}

interface TestResult {
  name: string;
  total: number;
  successful: number;
  failed: number;
  durationMs: number;
  reqPerSec: number;
  minLatency: number;
  maxLatency: number;
  avgLatency: number;
  p95Latency: number;
}

async function runLoadTest(options: LoadTestOptions): Promise<TestResult> {
  const { name, url, totalRequests, concurrency } = options;
  console.log(`\n========================================`);
  console.log(`Starting Load Test: ${name}`);
  console.log(`URL: ${url}`);
  console.log(`Requests: ${totalRequests} | Concurrency: ${concurrency}`);
  console.log(`========================================`);

  const latencies: number[] = [];
  let successful = 0;
  let failed = 0;
  let inFlight = 0;
  let completed = 0;

  const startTime = performance.now();

  async function worker() {
    while (completed + inFlight < totalRequests) {
      inFlight++;
      const reqStart = performance.now();
      try {
        const res = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          },
        });
        const reqEnd = performance.now();
        const latency = reqEnd - reqStart;
        latencies.push(latency);

        if (res.ok) {
          successful++;
        } else {
          failed++;
          const text = await res.text().catch(() => "");
          console.error(`Request failed [${res.status}]: ${text.slice(0, 100)}`);
        }
      } catch (err: unknown) {
        failed++;
        console.error(`Request error: ${(err as Error)?.message}`);
      } finally {
        inFlight--;
        completed++;
        // Small 50ms pacing between clicks
        await new Promise((r) => setTimeout(r, 50));
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  const totalDuration = performance.now() - startTime;
  latencies.sort((a, b) => a - b);

  const minLatency = latencies.length ? latencies[0] : 0;
  const maxLatency = latencies.length ? latencies[latencies.length - 1] : 0;
  const avgLatency =
    latencies.length ? latencies.reduce((a, b) => a + b, 0) / latencies.length : 0;
  const p95Index = Math.floor(latencies.length * 0.95);
  const p95Latency = latencies.length ? latencies[p95Index] : 0;

  return {
    name,
    total: totalRequests,
    successful,
    failed,
    durationMs: Math.round(totalDuration),
    reqPerSec: Math.round((totalRequests / (totalDuration / 1000)) * 10) / 10,
    minLatency: Math.round(minLatency),
    maxLatency: Math.round(maxLatency),
    avgLatency: Math.round(avgLatency),
    p95Latency: Math.round(p95Latency),
  };
}

async function main() {
  const baseUrl =
    process.env.TEST_URL || "https://rbu-attendance-planner-site.vercel.app";

  console.log(`Targeting host: ${baseUrl}`);

  // Test 1: CDN Edge Cache Landing Page
  const staticResult = await runLoadTest({
    name: "Landing Page (Static Edge CDN)",
    url: `${baseUrl}/`,
    totalRequests: 50,
    concurrency: 10,
  });

  // Test 2: Upstash-backed /api/stats
  const apiResult = await runLoadTest({
    name: "Stats API (/api/stats with Upstash Redis)",
    url: `${baseUrl}/api/stats`,
    totalRequests: 30,
    concurrency: 5,
  });

  console.log("\n========================================");
  console.log("             LOAD TEST SUMMARY          ");
  console.log("========================================");
  console.table([staticResult, apiResult]);
}

main().catch(console.error);
