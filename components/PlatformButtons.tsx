"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "./ui/Badge";
import { ArrowUpRight } from "lucide-react";

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
    subtitle: "Mozilla Add-ons Store",
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
  const detectedBrowser = React.useSyncExternalStore(
    emptySubscribe,
    getBrowserSnapshot,
    () => null
  );

  return (
    <div
      id="platforms"
      className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full ${className}`}
    >
      {platformData.map((platform) => {
        const isDetected = detectedBrowser === platform.id;

        return (
          <Link
            key={platform.id}
            href={platform.href}
            className={`group relative flex flex-col justify-between p-4 rounded-2xl glass-panel transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent-color)]/40 hover:bg-[var(--card-hover)] ${
              isDetected
                ? "ring-2 ring-[var(--accent-color)] border-transparent shadow-lg shadow-[var(--accent-color)]/10"
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
              {isDetected && (
                <Badge variant="accent" size="sm" className="mt-1">
                  Your browser
                </Badge>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
