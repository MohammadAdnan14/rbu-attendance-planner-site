import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui/Container";
import { ColdBrew } from "./ColdBrew";
import { Heart, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 dark:border-[var(--border-color)] bg-slate-100/70 dark:bg-[#0b0e14]/90 pt-14 pb-10">
      <Container size="lg">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-12 border-b border-slate-200/80 dark:border-[var(--border-color)]/60">
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/icon48.png"
                alt="RBU Attendance Planner Icon"
                width={28}
                height={28}
                className="rounded-lg shadow-sm"
              />
              <span className="font-bold text-base tracking-tight text-[var(--text-color)]">
                RBU Attendance Planner
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed max-w-sm">
              The intelligent, real-time attendance calculator and
              &ldquo;What-If&rdquo; simulator for students at Ramdeobaba
              University.
            </p>

            <div className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>by students, for students.</span>
            </div>

            <div className="pt-1 text-xs text-[var(--text-muted)] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>Direct Contact:</span>
              <a
                href="mailto:0xadnandalal@gmail.com"
                className="font-medium text-[var(--text-color)] hover:text-indigo-600 dark:hover:text-indigo-400 underline decoration-slate-300 dark:decoration-slate-700 underline-offset-2 transition-colors"
              >
                0xadnandalal@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Platform Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-color)]">
              Platforms
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-muted)]">
              <li>
                <Link
                  href="/chrome"
                  className="hover:text-[var(--accent-color)] transition-colors"
                >
                  Chrome / Brave / Arc
                </Link>
              </li>
              <li>
                <Link
                  href="/edge"
                  className="hover:text-[var(--accent-color)] transition-colors"
                >
                  Microsoft Edge
                </Link>
              </li>
              <li>
                <Link
                  href="/firefox"
                  className="hover:text-[var(--accent-color)] transition-colors"
                >
                  Mozilla Firefox
                </Link>
              </li>
              <li>
                <Link
                  href="/safari"
                  className="hover:text-[var(--accent-color)] transition-colors"
                >
                  Apple Safari (macOS)
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/MohammadAdnan14/Attendace-App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-color)] transition-colors"
                >
                  GitHub Repository & Issues
                </a>
              </li>
            </ul>
          </div>

          {/* Blended Support Widget Column */}
          <div className="md:col-span-4">
            <ColdBrew />
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Image
              src="/icon16.png"
              alt="Favicon"
              width={16}
              height={16}
              className="opacity-70"
            />
            <span>RBU Attendance Planner — MIT Open Source License</span>
          </div>
          <span>
            Independent student project. Not officially affiliated with RBU.
          </span>
        </div>
      </Container>
    </footer>
  );
}
