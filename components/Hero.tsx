import * as React from "react";
import Image from "next/image";
import { Container } from "./ui/Container";
import { Badge } from "./ui/Badge";
import { PlatformButtons } from "./PlatformButtons";
import { siteConfig } from "@/config/site";
import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
      {/* Background ambient gradient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] bg-[var(--accent-color)]/10 blur-[130px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Container size="lg">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <Badge variant="accent" size="md" className="mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {siteConfig.badge}
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-color)] leading-[1.15]">
            {siteConfig.headline}
          </h1>

          <p className="mt-5 text-base sm:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
            {siteConfig.subline}
          </p>
        </div>

        {/* Four Platform Buttons */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
          <PlatformButtons />
        </div>

        {/* Hero Product Screenshot Showcase */}
        <div className="relative max-w-4xl mx-auto">
          <div className="glass-panel p-2 sm:p-3 rounded-2xl shadow-2xl overflow-hidden border border-[var(--border-color)]">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-[var(--card-bg)]">
              <Image
                src="/screenshots/ss_1.png"
                alt="RBU Attendance Planner dashboard overlay showing attendance stats, skippable classes, and recommendations"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
