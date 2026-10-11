"use client";

import * as React from "react";
import Image from "next/image";
import { Coffee, ChevronDown } from "lucide-react";

export function ColdBrew() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium glass-panel text-[var(--text-color)] hover:bg-[var(--card-hover)] hover:border-[var(--accent-color)]/30 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)]"
        aria-expanded={isOpen}
        aria-controls="cold-brew-drawer"
      >
        <Coffee className="w-4 h-4 text-amber-500" />
        <span>Buy me a cold brew</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          id="cold-brew-drawer"
          className="mt-4 p-5 rounded-2xl glass-panel border border-[var(--border-color)] flex flex-col items-center text-center max-w-xs animate-in fade-in zoom-in-95 duration-200 shadow-xl"
        >
          <div className="relative w-48 h-48 bg-white p-3 rounded-xl shadow-inner mb-3">
            <Image
              src="/qr.png"
              alt="UPI QR Code for donation to support RBU Attendance Planner"
              width={180}
              height={180}
              className="object-contain"
            />
          </div>
          <p className="text-xs font-medium text-[var(--text-color)]">
            Scan with any UPI app
          </p>
          <p className="text-[11px] text-[var(--text-muted)] mt-1">
            Thank you for supporting this free student project!
          </p>
        </div>
      )}
    </div>
  );
}
