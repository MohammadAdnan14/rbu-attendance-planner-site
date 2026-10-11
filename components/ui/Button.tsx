import * as React from "react";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  href,
  external,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5 shadow-sm",
  }[size];

  const variantStyles = {
    primary:
      "bg-[var(--accent-color)] hover:brightness-110 text-white shadow-sm active:scale-[0.98]",
    secondary:
      "bg-[var(--card-bg)] hover:bg-[var(--card-hover)] text-[var(--text-color)] border border-[var(--border-color)] active:scale-[0.98]",
    outline:
      "bg-transparent hover:bg-[var(--card-hover)] text-[var(--text-color)] border border-[var(--border-color)] hover:border-[var(--accent-color)]",
    ghost:
      "bg-transparent hover:bg-[var(--card-hover)] text-[var(--text-muted)] hover:text-[var(--text-color)]",
  }[variant];

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
