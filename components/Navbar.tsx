"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { Download, MousePointerClick, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [showAlert, setShowAlert] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDownloadClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setShowAlert(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowAlert(false);
    }, 4500);

    const element = document.getElementById("platforms");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      window.dispatchEvent(new CustomEvent("highlight-platforms"));
    } else {
      window.location.href = "/#platforms";
    }
  };

  const dismissAlert = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowAlert(false);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full glass-header">
      <Container size="lg">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90 cursor-pointer select-none"
            title="Scroll to top"
          >
            <Image
              src="/icon48.png"
              alt="RBU Attendance Planner Logo"
              width={32}
              height={32}
              className="rounded-lg shadow-sm"
              priority
            />
            <span className="font-semibold text-base sm:text-lg tracking-tight text-[var(--text-color)]">
              RBU Attendance Planner
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDownloadClick}
              className="hidden sm:inline-flex items-center"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </Container>

      {/* On-Site Floating Alert Banner */}
      {showAlert && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-4 sm:right-8 z-50 max-w-sm sm:max-w-md w-[calc(100%-2rem)] animate-in fade-in slide-in-from-top-3 duration-300 pointer-events-auto"
        >
          <div className="glass-panel p-4 rounded-2xl bg-white/95 dark:bg-[var(--card-bg)]/95 border border-indigo-500/35 dark:border-indigo-400/40 shadow-2xl shadow-indigo-500/20 backdrop-blur-xl flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
              <MousePointerClick className="w-5 h-5 animate-pulse" />
            </div>

            <div className="flex-1 pr-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm text-[var(--text-color)]">
                  Choose Your Browser
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  Select Below
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Please select which browser you want to download for (Chrome, Edge, Firefox, or Safari) from the choices below.
              </p>
            </div>

            <button
              type="button"
              onClick={dismissAlert}
              className="text-[var(--text-muted)] hover:text-[var(--text-color)] p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
