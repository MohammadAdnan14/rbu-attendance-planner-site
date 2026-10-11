import * as React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "full";
}

export function Container({
  children,
  className = "",
  size = "md",
  ...props
}: ContainerProps) {
  const sizeStyles = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    full: "max-w-7xl",
  }[size];

  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
