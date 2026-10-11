import * as React from "react";
import { Container } from "./ui/Container";
import { Card } from "./ui/Card";
import { SectionHeading } from "./ui/SectionHeading";
import { Badge } from "./ui/Badge";
import { Globe, LayoutDashboard, CheckSquare, Sparkles } from "lucide-react";

export function HowItWorks() {
  return (
    <section
      className="py-16 sm:py-24 border-t border-[var(--border-color)]"
      id="how-it-works"
    >
      <Container size="lg">
        <SectionHeading
          badge="How It Works"
          title="Simple, automatic, and instantaneous"
          subtitle="Keep your overall attendance above 75% and each individual course above 60% with zero effort."
        />

        {/* Goals Banner */}
        <div className="max-w-2xl mx-auto mb-12 p-4 rounded-2xl glass-panel flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
          <div className="flex items-center gap-2">
            <Badge variant="accent" size="sm">
              Overall Goal
            </Badge>
            <span className="text-sm font-semibold text-[var(--text-color)]">
              Maintain 75%+ across all courses
            </span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-[var(--border-color)]" />
          <div className="flex items-center gap-2">
            <Badge variant="safe" size="sm">
              Subject Goal
            </Badge>
            <span className="text-sm font-semibold text-[var(--text-color)]">
              Maintain 60%+ in every individual subject
            </span>
          </div>
        </div>

        {/* Three Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card hoverable className="relative flex flex-col items-start">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-color)]/10 text-[var(--accent-color)] flex items-center justify-center font-bold text-base mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-color)] mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[var(--text-muted)]" />
              Open the attendance page
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Log in to your college portal and navigate to your attendance page
              as usual.
            </p>
          </Card>

          <Card hoverable className="relative flex flex-col items-start">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-color)]/10 text-[var(--accent-color)] flex items-center justify-center font-bold text-base mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-color)] mb-2 flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-[var(--text-muted)]" />
              The planner appears
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              The extension automatically reads your course table and injects
              the dashboard directly on the page.
            </p>
          </Card>

          <Card hoverable className="relative flex flex-col items-start">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-color)]/10 text-[var(--accent-color)] flex items-center justify-center font-bold text-base mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-color)] mb-2 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-[var(--text-muted)]" />
              Read your numbers
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              See safe bunk margins, required classes, and medical leave credits
              calculated instantly.
            </p>
          </Card>
        </div>

        {/* Simulator Callout Note */}
        <div className="max-w-2xl mx-auto p-4 rounded-xl glass-panel flex items-center gap-3 text-center sm:text-left justify-center">
          <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 hidden sm:block" />
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            <strong className="text-[var(--text-color)]">
              What-If Simulator:
            </strong>{" "}
            Click the crystal ball (<span className="text-sm">🔮</span>) in the
            header to simulate attending, claiming leaves, or missing upcoming
            classes.
          </p>
        </div>
      </Container>
    </section>
  );
}
