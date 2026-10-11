"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";
import { Copy, Check } from "lucide-react";

export function CopyPromptButton({ className = "" }: { className?: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    const text = siteConfig.stuckPrompt;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-[var(--accent-color)] hover:brightness-110 text-white shadow-sm transition-all active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] ${className}`}
      aria-label="Copy prompt for AI assistant"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-300" />
          <span>Copied to clipboard!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>Copy prompt</span>
        </>
      )}
    </button>
  );
}
