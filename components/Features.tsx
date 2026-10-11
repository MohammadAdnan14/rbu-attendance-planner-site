import * as React from "react";
import { Container } from "./ui/Container";
import { Card } from "./ui/Card";
import { SectionHeading } from "./ui/SectionHeading";
import {
  CheckCircle2,
  Calculator,
  Sparkles,
  Move,
  SunMoon,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: CheckCircle2,
    title: "Safe-to-skip count per subject",
    description:
      "Shows the exact number of classes you can safely skip while keeping attendance above the required threshold.",
  },
  {
    icon: Calculator,
    title: "Attend or leave requirements",
    description:
      "Calculates the exact number of upcoming classes you need to attend or medical leaves to claim to reach your target.",
  },
  {
    icon: Sparkles,
    title: "What-if simulator",
    description:
      "Test upcoming scenarios in real time with attend, claim leave, and miss simulation controls.",
  },
  {
    icon: Move,
    title: "Draggable, minimizable window",
    description:
      "Reposition the dashboard anywhere on your screen or collapse it into a compact floating pill.",
  },
  {
    icon: SunMoon,
    title: "Dark and light themes",
    description:
      "Switch effortlessly between Obsidian Glass dark mode and Clean Slate light mode.",
  },
  {
    icon: ShieldCheck,
    title: "Runs locally, 100% private",
    description:
      "Calculations run entirely in your browser DOM. No data leaves your machine and zero permissions are required.",
  },
];

export function Features() {
  return (
    <section className="py-16 sm:py-24" id="features">
      <Container size="lg">
        <SectionHeading
          badge="Features"
          title="Everything you need to manage your attendance"
          subtitle="Built to answer your everyday attendance questions without manual calculations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                hoverable
                className="flex flex-col justify-between group transition-all duration-300 hover:border-[var(--accent-color)]/35 hover:shadow-lg hover:shadow-[var(--accent-color)]/5"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-color)]/10 text-[var(--accent-color)] flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--accent-color)] group-hover:text-white shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-color)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
