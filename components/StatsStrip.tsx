"use client";

import * as React from "react";
import { Container } from "./ui/Container";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Zap, CheckCircle2 } from "lucide-react";

interface StatsResponse {
  total: number;
  platforms: {
    firefox: { count: number | null; updatedAt: string | null };
    chrome: { count: number | null; updatedAt: string | null };
    edge: { count: number | null; updatedAt: string | null };
    safari: { count: number | null; updatedAt: string | null };
  };
  showPlaceholder: boolean;
  placeholderTotal?: string;
}

export function StatsStrip() {
  const [stats, setStats] = React.useState<StatsResponse | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    fetch("/api/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch stats");
        return res.json();
      })
      .then((data: StatsResponse) => {
        if (isMounted) {
          setStats(data);
        }
      })
      .catch(() => {
        // Fallback gracefully
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const showPlaceholder =
    stats?.showPlaceholder ?? siteConfig.stats.showPlaceholder;
  const displayTotal = showPlaceholder ? "100+" : `${stats?.total || 100}+`;

  return (
    <section className="py-12 sm:py-16 border-y border-[var(--border-color)] bg-gradient-to-b from-[var(--card-bg)]/20 via-[var(--card-bg)]/50 to-[var(--card-bg)]/20 relative overflow-hidden">
      {/* Background glow accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[180px] bg-indigo-500/10 blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Container size="lg">
        {/* Main Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Epic Grand Number */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left relative">
            {/* Ambient backlight glow */}
            <div
              className="absolute -top-6 -left-6 w-52 h-52 bg-indigo-500/15 dark:bg-indigo-500/30 rounded-full blur-3xl pointer-events-none -z-10"
              aria-hidden="true"
            />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60 mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Official Student Milestone
            </div>

            <div className="relative group/counter cursor-default mb-2">
              <div className="flex items-baseline gap-3">
                {/* Grand Milestone Figure */}
                <span className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none bg-gradient-to-b from-slate-950 via-slate-800 to-indigo-900 dark:from-white dark:via-slate-100 dark:to-indigo-300 bg-clip-text text-transparent drop-shadow-sm select-none transition-transform duration-300 group-hover/counter:scale-[1.02]">
                  {displayTotal}
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-2xl sm:text-3xl font-black tracking-tight text-indigo-600 dark:text-indigo-400 leading-tight">
                    Downloads
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Across RBU Campus
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)] max-w-sm leading-relaxed">
              Trusted by students across Ramdeobaba University to stay above the
              attendance threshold with zero manual math.
            </p>

            <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
              {siteConfig.stats.footnote}
            </div>
          </div>

          {/* Right Column: 4 Platform Counter Badges + Trust Signals */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between hover:border-[var(--accent-color)]/30 hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Chrome
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[var(--text-color)]">
                Live
              </div>
              <div className="text-[11px] text-[var(--text-muted)] mt-1 truncate">
                Web Store Listing
              </div>
            </div>

            <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between hover:border-[var(--accent-color)]/30 hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Edge
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[var(--text-color)]">
                Live
              </div>
              <div className="text-[11px] text-[var(--text-muted)] mt-1 truncate">
                Microsoft Add-ons
              </div>
            </div>

            <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between hover:border-[var(--accent-color)]/30 hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Firefox
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[var(--text-color)]">
                Live
              </div>
              <div className="text-[11px] text-[var(--text-muted)] mt-1 truncate">
                AMO Store Listing
              </div>
            </div>

            <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between hover:border-[var(--accent-color)]/30 hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Safari
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[var(--text-color)]">
                macOS
              </div>
              <div className="text-[11px] text-[var(--text-muted)] mt-1 truncate">
                Direct Unpacked Zip
              </div>
            </div>
          </div>
        </div>

        {/* Quality Signals Strip */}
        <div className="mt-8 pt-6 border-t border-[var(--border-color)]/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs text-[var(--text-muted)]">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-[var(--text-color)]">
                100% Client-Side
              </strong>{" "}
              — Zero telemetry, no data leaves your device
            </span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs text-[var(--text-muted)]">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong className="text-[var(--text-color)]">
                Instant Calculation
              </strong>{" "}
              — Dynamic calculations load with the page
            </span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs text-[var(--text-muted)]">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>
              <strong className="text-[var(--text-color)]">
                Formula Verified
              </strong>{" "}
              — Tested against official college thresholds
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
