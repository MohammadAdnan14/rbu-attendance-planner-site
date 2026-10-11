import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({
  children,
  className = "",
  hoverable = false,
  ...props
}: CardProps) {
  return (
    <div
      className={`glass-panel rounded-2xl p-6 transition-all duration-200 bg-white dark:bg-[var(--card-bg)] border border-slate-200/90 dark:border-[var(--border-color)] shadow-sm dark:shadow-none ${
        hoverable
          ? "hover:bg-[var(--card-hover)] hover:border-[var(--accent-color)]/30 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-none"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
