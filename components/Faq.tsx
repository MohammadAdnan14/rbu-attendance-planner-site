"use client";

import * as React from "react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    q: "Is my data safe?",
    a: "Yes. Everything runs 100% locally in your browser DOM. No external network requests, no analytics, no telemetry, and no student data ever leaves your device.",
  },
  {
    q: "What permissions does it need?",
    a: "None on Chrome. It requests zero invasive browser permissions and only activates on the official rcoem.in attendance page.",
  },
  {
    q: "Which browsers are supported?",
    a: "Chrome, Microsoft Edge, Mozilla Firefox, and Apple Safari on macOS (Sonoma & Sequoia). It also works seamlessly on Chromium-based browsers such as Brave, Arc, Opera, and Vivaldi.",
  },
  {
    q: "Is it free?",
    a: "Yes, completely free and open source under the MIT License. If it helps you plan your semester, you can optionally support maintenance by buying the creator a cold brew in the footer.",
  },
  {
    q: "Does it work on phones?",
    a: "Browser extensions run in desktop browsers. For mobile viewing, use your desktop browser where the extension is installed.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      className="py-16 sm:py-24 border-t border-[var(--border-color)]"
      id="faq"
    >
      <Container size="md">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about privacy, permissions, and browser compatibility."
        />

        <div className="space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-base font-semibold text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--text-muted)] shrink-0 ml-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[var(--accent-color)]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="px-5 pb-5 pt-1 text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-color)]/50"
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
