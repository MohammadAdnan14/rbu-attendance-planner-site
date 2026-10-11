import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui/Container";
import { ColdBrew } from "./ColdBrew";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border-color)] bg-[var(--card-bg)]/30 py-12 sm:py-16">
      <Container size="lg">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Cold Brew Donation Drawer */}
          <ColdBrew />

          {/* Thank You Note */}
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md leading-relaxed">
            Crafted with{" "}
            <Heart className="w-3.5 h-3.5 inline text-rose-500 fill-rose-500" />{" "}
            by students, for students at Ramdeobaba University.
          </p>

          {/* Navigation & Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--text-muted)]">
            <Link
              href="/chrome"
              className="hover:text-[var(--text-color)] transition-colors"
            >
              Chrome
            </Link>
            <Link
              href="/edge"
              className="hover:text-[var(--text-color)] transition-colors"
            >
              Edge
            </Link>
            <Link
              href="/firefox"
              className="hover:text-[var(--text-color)] transition-colors"
            >
              Firefox
            </Link>
            <Link
              href="/safari"
              className="hover:text-[var(--text-color)] transition-colors"
            >
              Safari (Mac)
            </Link>
            <a
              href="https://github.com/MohammadAdnan14/Attendace-App"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--text-color)] transition-colors"
            >
              <svg
                className="w-3.5 h-3.5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              Source Code & Issues
            </a>
          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="pt-6 border-t border-[var(--border-color)]/60 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-[var(--text-muted)] gap-2">
            <div className="flex items-center gap-2">
              <Image
                src="/icon16.png"
                alt="Icon"
                width={16}
                height={16}
                className="opacity-70"
              />
              <span>RBU Attendance Planner — MIT License</span>
            </div>
            <span>
              Free and open source. Not officially affiliated with RBU.
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
