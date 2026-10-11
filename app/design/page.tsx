import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sparkles,
  Download,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Design System Showcase — RBU Attendance Planner",
  description:
    "Temporary design token and base component verification showcase for dark and light themes.",
};

export default function DesignShowcasePage() {
  return (
    <main className="py-12 sm:py-16">
      <Container size="lg">
        {/* Header bar with Theme Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 mb-10 border-b border-[var(--border-color)]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="accent">Phase 2 Verification</Badge>
              <span className="text-xs text-[var(--text-muted)]">
                Temporary `/_design` Page
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-color)]">
              Design System & Tokens
            </h1>
            <p className="mt-1 text-sm sm:text-base text-[var(--text-muted)]">
              Obsidian Glass (Dark) and Clean Slate (Light) design tokens, type
              scale, and base components.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto p-2 rounded-xl glass-panel">
            <span className="text-xs font-medium text-[var(--text-muted)] px-1">
              Toggle Theme:
            </span>
            <ThemeToggle />
          </div>
        </div>

        {/* Section 1: Color Tokens */}
        <section className="mb-14">
          <SectionHeading
            align="left"
            title="Theme Color Tokens"
            subtitle="Tokens adapt dynamically between Clean Slate (light) and Obsidian Glass (dark)."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="glass-panel p-4 rounded-xl flex flex-col justify-between">
              <div className="w-full h-10 rounded-lg bg-[var(--bg-color)] border border-[var(--border-color)] mb-3 shadow-inner" />
              <div>
                <div className="text-xs font-semibold text-[var(--text-color)]">
                  --bg-color
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  Page Canvas
                </div>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl flex flex-col justify-between">
              <div className="w-full h-10 rounded-lg bg-[var(--card-bg)] border border-[var(--border-color)] mb-3" />
              <div>
                <div className="text-xs font-semibold text-[var(--text-color)]">
                  --card-bg
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  Glass Card Surface
                </div>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl flex flex-col justify-between">
              <div className="w-full h-10 rounded-lg bg-[var(--accent-color)] mb-3" />
              <div>
                <div className="text-xs font-semibold text-[var(--text-color)]">
                  --accent-color
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  Indigo Brand
                </div>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl flex flex-col justify-between">
              <div className="w-full h-10 rounded-lg bg-[var(--text-color)] mb-3" />
              <div>
                <div className="text-xs font-semibold text-[var(--text-color)]">
                  --text-color
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  High Contrast Text
                </div>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl flex flex-col justify-between">
              <div className="w-full h-10 rounded-lg bg-[var(--text-muted)] mb-3" />
              <div>
                <div className="text-xs font-semibold text-[var(--text-color)]">
                  --text-muted
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  Muted Labels
                </div>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl flex flex-col justify-between">
              <div className="w-full h-10 rounded-lg bg-[var(--header-bg)] border border-[var(--border-color)] mb-3" />
              <div>
                <div className="text-xs font-semibold text-[var(--text-color)]">
                  --header-bg
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  Glass Header
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Badges (Product Recommendations) */}
        <section className="mb-14">
          <SectionHeading
            align="left"
            title="Recommendation Badges"
            subtitle="Exact colors and states specified for attendance advice and simulation status."
          />
          <Card className="flex flex-wrap gap-3 items-center">
            <Badge variant="neutral">Neutral State</Badge>
            <Badge variant="accent">
              <Sparkles className="w-3.5 h-3.5" />
              Built for RBU
            </Badge>
            <Badge variant="attend">
              <ArrowRight className="w-3.5 h-3.5" />
              Attend: +3 classes
            </Badge>
            <Badge variant="leave">
              <Calendar className="w-3.5 h-3.5" />
              Claim Leave: +2 present
            </Badge>
            <Badge variant="safe">
              <CheckCircle2 className="w-3.5 h-3.5" />✓ You can safely skip 4
              classes
            </Badge>
            <Badge variant="warning">
              <AlertCircle className="w-3.5 h-3.5" />ℹ Cannot miss next class
            </Badge>
          </Card>
        </section>

        {/* Section 3: Buttons */}
        <section className="mb-14">
          <SectionHeading
            align="left"
            title="Buttons & Actions"
            subtitle="Interactive button variants, sizes, and states."
          />
          <div className="space-y-6">
            <Card>
              <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-4">
                Variants (Medium Size)
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary">
                  <Download className="w-4 h-4" />
                  Primary Action
                </Button>
                <Button variant="secondary">
                  <Layers className="w-4 h-4" />
                  Secondary Glass
                </Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
              </div>
            </Card>

            <Card>
              <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-4">
                Sizes
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary" size="sm">
                  Small (sm)
                </Button>
                <Button variant="primary" size="md">
                  Medium (md)
                </Button>
                <Button variant="primary" size="lg">
                  Large (lg)
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Section 4: Cards */}
        <section className="mb-14">
          <SectionHeading
            align="left"
            title="Cards & Glass Surfaces"
            subtitle="Obsidian Glass and Clean Slate elevated containers with optional hover interactions."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card hoverable>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="safe">Safe Zone</Badge>
                <span className="text-xs text-[var(--text-muted)]">
                  Hoverable
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-color)] mb-1">
                Linear Algebra & Calculus
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                24 / 28 conducted classes (85.71%). Attendance is well above the
                60% threshold.
              </p>
              <div className="pt-3 border-t border-[var(--border-color)] flex justify-between items-center text-xs">
                <span className="text-[var(--text-muted)]">Margin</span>
                <span className="font-semibold text-emerald-500">
                  4 bunks remaining
                </span>
              </div>
            </Card>

            <Card hoverable>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="attend">Shortage Alert</Badge>
                <span className="text-xs text-[var(--text-muted)]">
                  Hoverable
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-color)] mb-1">
                Data Structures & Algorithms
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                14 / 26 conducted classes (53.85%). Needs immediate attendance
                action.
              </p>
              <div className="pt-3 border-t border-[var(--border-color)] flex justify-between items-center text-xs">
                <span className="text-[var(--text-muted)]">Action Needed</span>
                <span className="font-semibold text-sky-400">
                  Attend next 4 classes
                </span>
              </div>
            </Card>
          </div>
        </section>

        {/* Section 5: Typography & Accessibility */}
        <section className="mb-14">
          <SectionHeading
            align="left"
            title="Typography & Contrast Pass"
            subtitle="Inter type scale and WCAG AA contrast verification in both themes."
          />
          <Card className="space-y-4">
            <div>
              <div className="text-xs font-mono text-[var(--text-muted)] mb-1">
                Display Headline (text-3xl sm:text-4xl font-bold)
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-color)] tracking-tight">
                Stop doing attendance math on a calculator.
              </h1>
            </div>
            <div>
              <div className="text-xs font-mono text-[var(--text-muted)] mb-1">
                Section Subtitle (text-base sm:text-lg text-[var(--text-muted)])
              </div>
              <p className="text-base sm:text-lg text-[var(--text-muted)]">
                Know how many classes you can skip safely, or need to attend.
              </p>
            </div>
            <div>
              <div className="text-xs font-mono text-[var(--text-muted)] mb-1">
                Small Label (text-xs text-[var(--text-muted)])
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Chrome, Edge and Firefox counts are active users from each
                store.
              </p>
            </div>
          </Card>
        </section>
      </Container>
    </main>
  );
}
