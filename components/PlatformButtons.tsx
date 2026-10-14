"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "./ui/Badge";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

type BrowserKey = "chrome" | "edge" | "firefox" | "safari" | null;

const platformData = [
  {
    id: "chrome",
    name: "Chrome",
    href: "/chrome",
    subtitle: "Also for Brave, Arc & Opera",
  },
  {
    id: "edge",
    name: "Edge",
    href: "/edge",
    subtitle: "Microsoft Edge Add-ons",
  },
  {
    id: "firefox",
    name: "Firefox",
    href: "/firefox",
    subtitle: "Firefox Add-ons (AMO)",
    isLive: true,
  },
  {
    id: "safari",
    name: "Safari",
    href: "/safari",
    subtitle: "macOS Sonoma & Sequoia",
  },
] as const;

function getBrowserSnapshot(): BrowserKey {
  if (typeof window === "undefined" || !navigator?.userAgent) return null;
  const ua = navigator.userAgent;

  // Detect Edge before Chrome because Edge includes "Chrome" in UA
  if (/edg/i.test(ua)) return "edge";
  if (/firefox/i.test(ua)) return "firefox";
  if (/safari/i.test(ua) && !/chrome|chromium/i.test(ua)) return "safari";
  if (/chrome|chromium/i.test(ua)) return "chrome";
  return null;
}

const emptySubscribe = () => () => {};

export function PlatformButtons({ className = "" }: { className?: string }) {
  const [isHighlighted, setIsHighlighted] = React.useState(false);
  const detectedBrowser = React.useSyncExternalStore(
    emptySubscribe,
    getBrowserSnapshot,
    () => null
  );

  React.useEffect(() => {
    const onHighlight = () => {
      setIsHighlighted(true);
      const timer = setTimeout(() => setIsHighlighted(false), 2600);
      return () => clearTimeout(timer);
    };

    window.addEventListener("highlight-platforms", onHighlight);
    return () => window.removeEventListener("highlight-platforms", onHighlight);
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <div
        id="platforms"
        className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full scroll-mt-28 transition-all duration-300 ${
          isHighlighted
            ? "ring-4 ring-indigo-500/40 dark:ring-indigo-400/40 rounded-2xl shadow-xl shadow-indigo-500/20"
            : ""
        }`}
      >
        {platformData.map((platform) => {
          const isDetected = detectedBrowser === platform.id;
          const isLive = "isLive" in platform && platform.isLive;

          return (
            <Link
              key={platform.id}
              href={platform.href}
              className={`group relative flex flex-col justify-between p-4 rounded-2xl glass-panel bg-white/95 dark:bg-[var(--card-bg)] border border-slate-200/90 dark:border-[var(--border-color)] transition-all duration-200 hover:-translate-y-1 hover:border-indigo-500/60 dark:hover:border-indigo-400/60 hover:bg-[var(--card-hover)] hover:shadow-xl hover:shadow-indigo-500/25 dark:hover:shadow-indigo-500/35 ${
                isDetected
                  ? "ring-2 ring-[var(--accent-color)] border-transparent shadow-lg shadow-indigo-500/20"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="font-semibold text-base sm:text-lg text-[var(--text-color)] group-hover:text-[var(--accent-color)] transition-colors">
                  {platform.name}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-color)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <div>
                <p className="text-xs text-[var(--text-muted)] mb-2 line-clamp-1">
                  {platform.subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {isDetected && (
                    <Badge variant="accent" size="sm">
                      Your browser
                    </Badge>
                  )}
                  {isLive && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Live
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Firefox Live Status Note */}
      <div className="mt-3.5 px-4 py-2.5 rounded-xl border border-emerald-300/80 dark:border-emerald-500/30 bg-emerald-50/90 dark:bg-emerald-500/10 text-xs text-emerald-950 dark:text-emerald-200 flex items-center justify-center gap-2 text-center shadow-xs">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span>
          <strong className="font-semibold">Firefox note:</strong> The Firefox extension is now live on Mozilla Add-ons!
        </span>
      </div>
    </div>
  );
}
