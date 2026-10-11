"use client";

import * as React from "react";
import { Container } from "./ui/Container";
import { siteConfig } from "@/config/site";
import { Users } from "lucide-react";

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
  const [loading, setLoading] = React.useState(true);

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
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const showPlaceholder =
    stats?.showPlaceholder ?? siteConfig.stats.showPlaceholder;
  const displayTotal = showPlaceholder
    ? stats?.placeholderTotal || siteConfig.stats.placeholderTotal
    : `${stats?.total || 0}+ Downloads`;

  return (
    <section className="py-8 sm:py-12 border-y border-[var(--border-color)] bg-[var(--card-bg)]/40">
      <Container size="md">
        {/* Fixed height container to prevent layout shift */}
        <div className="min-h-[76px] flex flex-col items-center justify-center text-center">
          {loading ? (
            <div className="flex flex-col items-center animate-pulse gap-2">
              <div className="h-8 w-44 bg-[var(--card-hover)] rounded-lg" />
              <div className="h-4 w-72 bg-[var(--card-hover)]/70 rounded-md" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-color)]">
                <Users className="w-6 h-6 text-[var(--accent-color)]" />
                <span>{displayTotal}</span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-[var(--text-muted)]">
                {siteConfig.stats.footnote}
              </p>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
