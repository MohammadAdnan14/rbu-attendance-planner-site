import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "accent" | "attend" | "leave" | "safe" | "warning";
  size?: "sm" | "md";
}

export function Badge({
  children,
  className = "",
  variant = "neutral",
  size = "md",
  ...props
}: BadgeProps) {
  const sizeStyles = {
    sm: "text-xs px-2 py-0.5 rounded-md font-medium",
    md: "text-xs sm:text-sm px-2.5 py-1 rounded-lg font-medium",
  }[size];

  const variantStyles = {
    neutral:
      "bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--border-color)]",
    accent:
      "bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/25",
    attend:
      "bg-[var(--badge-attend-bg)] text-[var(--badge-attend-text)] border border-[var(--badge-attend-border)]",
    leave:
      "bg-[var(--badge-leave-bg)] text-[var(--badge-leave-text)] border border-[var(--badge-leave-border)]",
    safe: "bg-[var(--badge-safe-bg)] text-[var(--badge-safe-text)] border border-[var(--badge-safe-border)]",
    warning:
      "bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)] border border-[var(--badge-warning-border)]",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 transition-colors ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
