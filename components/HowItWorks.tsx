import * as React from "react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { Badge } from "./ui/Badge";
import {
  Globe,
  LayoutDashboard,
  CheckSquare,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export function HowItWorks() {
  return (
    <section
      className="py-16 sm:py-24 border-t border-[var(--border-color)]"
      id="how-it-works"
    >
      <Container size="lg">
        <SectionHeading
          badge="How It Works"
          title="Instant Calculation in Three Simple Steps"
          subtitle="Designed around official RBU criteria: effortlessly keep your overall aggregate above 75% and each individual course above 60% without opening a calculator."
        />

        {/* Dual Benchmark Threshold Cards */}
        <div className="max-w-3xl mx-auto mb-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-[var(--card-bg)]/80 border border-slate-200/90 dark:border-[var(--border-color)] shadow-sm dark:shadow-none flex items-center gap-4 transition-all hover:border-indigo-500/40">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-black text-xl shrink-0 shadow-xs">
              75%
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="accent" size="sm">
                  Overall Target
                </Badge>
                <span className="text-xs font-bold text-[var(--text-color)]">
                  Aggregate Minimum
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Calculates safe bunks across all enrolled subjects combined.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-[var(--card-bg)]/80 border border-slate-200/90 dark:border-[var(--border-color)] shadow-sm dark:shadow-none flex items-center gap-4 transition-all hover:border-emerald-500/40">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 flex items-center justify-center font-black text-xl shrink-0 shadow-xs">
              60%
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="safe" size="sm">
                  Subject Target
                </Badge>
                <span className="text-xs font-bold text-[var(--text-color)]">
                  Per-Course Minimum
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Flags any individual subject falling below 60% eligibility.
              </p>
            </div>
          </div>
        </div>

        {/* Connected 3-Step Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative">
          {/* Step 1 */}
          <div className="relative rounded-2xl bg-white/90 dark:bg-[var(--card-bg)]/80 border border-slate-200/90 dark:border-[var(--border-color)] p-6 shadow-sm dark:shadow-none hover:shadow-md hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold font-mono tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-800/60">
                  STEP 01
                </span>
                <Globe className="w-5 h-5 text-[var(--text-muted)] group-hover:text-indigo-500 transition-colors" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[var(--text-color)] mb-2">
                Open Attendance Page
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                Sign in to your college portal and navigate to your regular
                course file attendance page.
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--border-color)]/60 text-[11px] font-mono text-[var(--text-muted)] truncate bg-slate-50 dark:bg-black/30 px-2.5 py-1.5 rounded-lg border border-[var(--border-color)]">
              rcoem.in/studentCourseFileNew.htm
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative rounded-2xl bg-white/90 dark:bg-[var(--card-bg)]/80 border border-slate-200/90 dark:border-[var(--border-color)] p-6 shadow-sm dark:shadow-none hover:shadow-md hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold font-mono tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-800/60">
                  STEP 02
                </span>
                <LayoutDashboard className="w-5 h-5 text-[var(--text-muted)] group-hover:text-indigo-500 transition-colors" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[var(--text-color)] mb-2">
                Planner Injects Automatically
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                No setup required. The extension immediately parses your course
                table and renders the overlay dashboard.
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--border-color)]/60 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-50/60 dark:bg-emerald-950/30 px-2.5 py-1.5 rounded-lg border border-emerald-200/60 dark:border-emerald-800/40">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Instant DOM Parsing</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative rounded-2xl bg-white/90 dark:bg-[var(--card-bg)]/80 border border-slate-200/90 dark:border-[var(--border-color)] p-6 shadow-sm dark:shadow-none hover:shadow-md hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold font-mono tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-800/60">
                  STEP 03
                </span>
                <CheckSquare className="w-5 h-5 text-[var(--text-muted)] group-hover:text-indigo-500 transition-colors" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[var(--text-color)] mb-2">
                Read Numbers & Simulate
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                See exact safe bunk margins, shortage remedies, and simulate
                upcoming lectures with the What-If engine.
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--border-color)]/60 text-[11px] font-semibold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5 bg-indigo-50/60 dark:bg-indigo-950/30 px-2.5 py-1.5 rounded-lg border border-indigo-200/60 dark:border-indigo-800/40">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Safe Margins & What-If Active</span>
            </div>
          </div>
        </div>

        {/* What-If Simulation Helper Banner */}
        <div className="max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-[var(--card-bg)]/80 border border-slate-200/90 dark:border-[var(--border-color)] shadow-sm dark:shadow-none flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[var(--text-color)]">
                Try the What-If Engine
              </h4>
              <p className="text-xs text-[var(--text-muted)]">
                Click the crystal ball (
                <span className="font-semibold text-[var(--text-color)]">
                  🔮
                </span>
                ) in the dashboard header to simulate attending, claiming
                leaves, or missing upcoming lectures.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">
            100% Client-Side
          </span>
        </div>
      </Container>
    </section>
  );
}
