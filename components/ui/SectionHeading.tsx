import * as React from "react";
import { Badge } from "./Badge";

export interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`mb-10 sm:mb-14 ${
        isCenter ? "text-center mx-auto max-w-2xl" : "text-left max-w-2xl"
      } ${className}`}
    >
      {badge && (
        <div className={`mb-3 ${isCenter ? "flex justify-center" : ""}`}>
          <Badge variant="accent">{badge}</Badge>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-color)]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
