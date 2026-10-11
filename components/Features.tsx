"use client";

import * as React from "react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { Badge } from "./ui/Badge";
import {
  Sparkles,
  Calculator,
  ShieldCheck,
  Move,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react";

export function Features() {
  // Interactive mini-simulator state for the showcase card
  const [attended, setAttended] = React.useState(32);
  const [total, setTotal] = React.useState(38);
  const [medicalLeaves, setMedicalLeaves] = React.useState(0);

  const percentage = total > 0 ? (attended / total) * 100 : 0;
  const isSafe = percentage >= 75;
  const safeBunks = isSafe
    ? Math.max(0, Math.floor((attended - 0.75 * total) / 0.75))
    : 0;
  const neededToAttend = !isSafe
    ? Math.max(0, Math.ceil((0.75 * total - attended) / 0.25))
    : 0;

  const handleAttend = () => {
    setAttended((a) => a + 1);
    setTotal((t) => t + 1);
  };

  const handleClaimLeave = () => {
    setAttended((a) => a + 1);
    setMedicalLeaves((m) => m + 1);
  };

  const handleMiss = () => {
    setTotal((t) => t + 1);
  };

  const handleReset = () => {
    setAttended(32);
    setTotal(38);
    setMedicalLeaves(0);
  };

  return (
    <section className="py-16 sm:py-24" id="features">
      <Container size="lg">
        <SectionHeading
          badge="Core Capabilities"
          title="Engineered Specifically for RBU Attendance"
          subtitle="Stop guessing your attendance percentage. Everything you need to plan bunks and recover shortages with mathematical certainty."
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bento Card 1: Interactive What-If Simulator (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 rounded-2xl glass-panel p-6 sm:p-7 border border-[var(--border-color)] bg-white/90 dark:bg-[var(--card-bg)]/80 shadow-md dark:shadow-none hover:border-[var(--accent-color)]/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold shadow-xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--text-color)]">
                      Interactive What-If Simulator
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      Try clicking the simulation controls below
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg text-[var(--text-muted)] hover:text-[var(--text-color)] hover:bg-[var(--card-hover)] border border-[var(--border-color)] transition-colors cursor-pointer"
                  title="Reset simulator"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-5 leading-relaxed">
                Simulate upcoming classes before stepping out of the lecture
                hall. Test what happens to your percentage if you attend, claim
                a medical leave, or take an unexcused absence.
              </p>

              {/* Live Interactive Course Card Preview */}
              <div className="rounded-xl border border-[var(--border-color)] bg-slate-50/90 dark:bg-black/30 p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[var(--text-muted)]">
                      Subject Simulation Preview
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-[var(--text-color)]">
                      Distributed Systems & Cloud Computing
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-2xl font-black ${
                        isSafe
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-amber-700 dark:text-amber-400"
                      }`}
                    >
                      {percentage.toFixed(1)}%
                    </span>
                    <Badge
                      variant={isSafe ? "safe" : "warning"}
                      size="sm"
                      className="text-xs font-semibold"
                    >
                      {isSafe ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          {safeBunks} Safe Bunks
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3" />
                          Need {neededToAttend}
                        </>
                      )}
                    </Badge>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden mb-2 relative">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      isSafe ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                    style={{
                      width: `${Math.min(100, Math.max(0, percentage))}%`,
                    }}
                  />
                  {/* 75% Threshold Marker Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-900/60 dark:bg-white/80 z-10"
                    style={{ left: "75%" }}
                    title="75% Target Threshold"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] mb-4">
                  <span>
                    Attended:{" "}
                    <strong className="text-[var(--text-color)]">
                      {attended}
                    </strong>{" "}
                    / Total:{" "}
                    <strong className="text-[var(--text-color)]">
                      {total}
                    </strong>
                    {medicalLeaves > 0 && ` (${medicalLeaves} Leaves)`}
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    75% Threshold Goal
                  </span>
                </div>

                {/* Simulator Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={handleAttend}
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300/80 hover:bg-emerald-100 hover:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60 dark:hover:bg-emerald-900/50 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Attend</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClaimLeave}
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-300/80 hover:bg-indigo-100 hover:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/60 dark:hover:bg-indigo-900/50 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Claim Leave</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleMiss}
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-300/80 hover:bg-rose-100 hover:border-rose-500 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60 dark:hover:bg-rose-900/50 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <Minus className="w-3.5 h-3.5" />
                    <span>Miss Class</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Shortage Recovery Goals */}
          <div className="rounded-2xl glass-panel p-6 border border-[var(--border-color)] bg-white/90 dark:bg-[var(--card-bg)]/80 shadow-md dark:shadow-none hover:border-[var(--accent-color)]/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-color)] mb-2">
                Actionable Recovery Goals
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-5">
                If your attendance drops below 75%, stop worrying. The planner
                prescribes the exact combination of classes to recover.
              </p>

              {/* Shortage Course Pill Preview */}
              <div className="rounded-xl border border-amber-300/60 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-color)]">
                    EC302: Signal Processing
                  </span>
                  <span className="text-xs font-extrabold text-amber-700 dark:text-amber-400">
                    71.4%
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] px-2.5 py-1.5 rounded-lg bg-white/80 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <span className="text-[var(--text-muted)]">
                      Recovery Option 1
                    </span>
                    <span className="font-bold text-indigo-700 dark:text-indigo-400">
                      Attend next 3 classes
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] px-2.5 py-1.5 rounded-lg bg-white/80 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <span className="text-[var(--text-muted)]">
                      Recovery Option 2
                    </span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                      Claim 2 Medical Leaves
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border-color)]/60 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span>Real-time calculation updates dynamically</span>
            </div>
          </div>

          {/* Bento Card 3: Safe-to-Skip Count */}
          <div className="rounded-2xl glass-panel p-6 border border-[var(--border-color)] bg-white/90 dark:bg-[var(--card-bg)]/80 shadow-md dark:shadow-none hover:border-[var(--accent-color)]/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-color)] mb-2">
                Safe-to-Skip Margins
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                Know with mathematical certainty how many lectures you can miss
                without breaching the 75% boundary.
              </p>

              {/* Safe Margin Widget */}
              <div className="p-3.5 rounded-xl border border-emerald-300/60 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[var(--text-muted)] block">
                    Remaining Safe Buffer
                  </span>
                  <span className="text-xl font-black text-emerald-700 dark:text-emerald-400">
                    +4 Classes Safe
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold block">
                    Stays at 75.8%
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    Threshold protected
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 4: Draggable & Minimizable Window */}
          <div className="rounded-2xl glass-panel p-6 border border-[var(--border-color)] bg-white/90 dark:bg-[var(--card-bg)]/80 shadow-md dark:shadow-none hover:border-[var(--accent-color)]/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                <Move className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-color)] mb-2">
                Movable Obsidian Overlay
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                Floats right over your college portal without obstructing
                tables. Drag anywhere or collapse into a micro pill.
              </p>

              {/* Mini Header Pill Preview */}
              <div className="p-3 rounded-xl border border-[var(--border-color)] bg-slate-50 dark:bg-black/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    ⋮⋮
                  </span>
                  <span className="text-xs font-semibold text-[var(--text-color)]">
                    RBU Planner
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-[var(--text-muted)] font-medium">
                    Draggable
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 5: Privacy Shield */}
          <div className="rounded-2xl glass-panel p-6 border border-[var(--border-color)] bg-white/90 dark:bg-[var(--card-bg)]/80 shadow-md dark:shadow-none hover:border-[var(--accent-color)]/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-color)] mb-2">
                100% Client-Side Privacy
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                Runs entirely in your local browser tab DOM. Zero server calls,
                zero telemetry, and no credentials ever leave your computer.
              </p>

              {/* Privacy Metric Pill */}
              <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-950/20 flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-800 dark:text-indigo-300">
                  Network Footprint:
                </span>
                <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400">
                  0 KB Transmitted
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
