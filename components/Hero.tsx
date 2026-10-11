"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "./ui/Container";
import { Badge } from "./ui/Badge";
import { PlatformButtons } from "./PlatformButtons";
import { siteConfig } from "@/config/site";
import { Sparkles, Lock, CheckCircle2 } from "lucide-react";

const showcaseScreenshots = [
  {
    id: "ss_1",
    label: "Dashboard Overlay",
    src: "/screenshots/ss_1.png",
    caption:
      "Obsidian Glass dashboard injected directly into the attendance table",
  },
  {
    id: "ss_2",
    label: "What-If Simulator",
    src: "/screenshots/ss_2.png",
    caption:
      "Simulate upcoming classes with +Attend, +Claim, and -Miss controls",
  },
  {
    id: "ss_3",
    label: "Safe Bunk Margins",
    src: "/screenshots/ss_3.png",
    caption: "Instant calculation of safe bunkable classes per course",
  },
  {
    id: "ss_4",
    label: "Attend & Leave Goals",
    src: "/screenshots/ss_4.png",
    caption: "Actionable recommendation badges for shortage courses",
  },
  {
    id: "ss_5",
    label: "Course File Table",
    src: "/screenshots/ss_5.png",
    caption: "Clean non-intrusive integration that never blocks portal data",
  },
];

export function Hero() {
  const [activeTab, setActiveTab] = React.useState(0);
  const activeShot = showcaseScreenshots[activeTab];

  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      {/* Background ambient gradient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[400px] bg-[var(--accent-color)]/15 blur-[140px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Container size="lg">
        {/* Top Pitch */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <Badge
            variant="accent"
            size="md"
            className="mb-6 shadow-sm hover:scale-105 transition-transform cursor-default"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {siteConfig.badge}
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-color)] leading-[1.12]">
            Stop Doing{" "}
            <span className="inline-block cursor-pointer transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5 text-[var(--text-color)]">
              Attendance
            </span>{" "}
            <br className="hidden sm:inline" />
            Math on a Calculator
          </h1>

          <p className="mt-6 text-base sm:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
            Know how many classes you can{" "}
            <span className="inline-block font-semibold text-emerald-600 dark:text-emerald-400 cursor-pointer transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 hover:text-emerald-700 dark:hover:text-emerald-300 hover:drop-shadow-[0_2px_10px_rgba(16,185,129,0.4)]">
              Skip Safely
            </span>
            , or{" "}
            <span className="inline-block font-semibold text-indigo-600 dark:text-indigo-400 cursor-pointer transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 hover:text-indigo-700 dark:hover:text-indigo-300 hover:drop-shadow-[0_2px_10px_rgba(99,102,241,0.4)]">
              Need to Attend
            </span>
          </p>
        </div>

        {/* Four Platform Buttons */}
        <div className="max-w-3xl mx-auto mb-14 sm:mb-20">
          <PlatformButtons />
        </div>

        {/* Interactive Mockup & Realistic Browser Chrome */}
        <div className="relative max-w-5xl mx-auto">
          {/* Screenshot Switcher Tabs */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 overflow-x-auto py-1 px-2 no-scrollbar">
            {showcaseScreenshots.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === idx
                    ? "bg-[var(--accent-color)] text-white shadow-md shadow-[var(--accent-color)]/25 scale-102"
                    : "glass-panel text-[var(--text-muted)] hover:text-[var(--text-color)] hover:bg-[var(--card-hover)]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Browser Window Wrapper */}
          <div className="relative group rounded-2xl glass-panel p-2 sm:p-3 shadow-2xl border border-[var(--border-color)] transition-all duration-300 hover:border-[var(--accent-color)]/40 hover:shadow-[var(--accent-color)]/10">
            {/* macOS Browser Header */}
            <div className="flex items-center justify-between px-3 py-2.5 mb-2 rounded-xl bg-[var(--header-bg)] border border-[var(--border-color)]">
              {/* Traffic light window controls */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>

              {/* Fake URL Bar */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[var(--bg-color)]/80 border border-[var(--border-color)] text-[11px] text-[var(--text-muted)] max-w-xs sm:max-w-md w-full justify-center">
                <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
                <span className="truncate">
                  rcoem.in/studentCourseFileNew.htm
                </span>
              </div>

              {/* Active Extension Indicator */}
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-semibold text-emerald-500 hidden sm:inline">
                  Planner Active
                </span>
              </div>
            </div>

            {/* Product Screenshot */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-[var(--card-bg)] shadow-inner">
              <Image
                src={activeShot.src}
                alt={activeShot.caption}
                fill
                priority={activeTab === 0}
                className="object-cover object-top transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
              />

              {/* Floating Live Annotations (Responsive) */}
              <div className="absolute top-4 right-4 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel text-xs font-semibold text-indigo-400 border border-indigo-500/30 shadow-lg backdrop-blur-md animate-in fade-in duration-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Simulation Engine Active</span>
              </div>

              <div className="absolute bottom-4 left-4 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel text-xs font-semibold text-emerald-400 border border-emerald-500/30 shadow-lg backdrop-blur-md animate-in fade-in duration-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>4 Safe Bunks Remaining</span>
              </div>
            </div>

            {/* Caption bar */}
            <div className="mt-2.5 px-2 flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>{activeShot.caption}</span>
              <span className="text-[11px] opacity-75">
                {activeTab + 1} of {showcaseScreenshots.length}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
