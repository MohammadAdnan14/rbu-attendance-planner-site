"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { Download } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
              href="#platforms"
              className="hidden sm:inline-flex"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
