"use client";

import * as React from "react";
import Image from "next/image";
import { Coffee, QrCode, X } from "lucide-react";

export function ColdBrew() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <div className="p-4 rounded-2xl glass-panel border border-[var(--border-color)] bg-[var(--card-bg)]/60">
        <div className="flex items-center gap-2 mb-1.5">
          <Coffee className="w-4 h-4 text-amber-500" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-color)]">
            Support the Creator
          </h4>
        </div>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3">
          100% free with zero ads. If this tool saved you from attendance
          headaches, buy me a cold brew to support maintenance.
        </p>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-[var(--card-hover)] hover:bg-[var(--accent-color)] hover:text-white text-[var(--text-color)] border border-[var(--border-color)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)]"
          aria-expanded={isOpen}
          aria-controls="cold-brew-modal"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>{isOpen ? "Hide QR Code" : "Buy me a cold brew (UPI)"}</span>
        </button>
      </div>

      {/* Slide-out/Dropdown QR Drawer */}
      {isOpen && (
        <div
          id="cold-brew-modal"
          className="mt-3 p-4 rounded-2xl glass-panel border border-[var(--border-color)] flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200 shadow-2xl bg-[var(--header-bg)]"
        >
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-[var(--text-color)]">
              Scan with any UPI App
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors p-1"
              aria-label="Close QR Drawer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative w-40 h-40 bg-white p-2 rounded-xl shadow-inner mb-2">
            <Image
              src="/qr.png"
              alt="UPI QR Code for donation to support RBU Attendance Planner"
              width={160}
              height={160}
              className="object-contain"
            />
          </div>

          <p className="text-[11px] text-[var(--text-muted)]">
            Thank you for keeping this student project alive! ☕
          </p>
        </div>
      )}
    </div>
  );
}
