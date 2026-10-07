import React, { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantClasses = {
  primary: "btn-brand-primary font-bold",
  secondary: "btn-brand-secondary font-semibold",
  ghost: "btn-brand-ghost font-medium",
  outline: "btn-brand-outline font-semibold",
};

const sizeClasses = {
  sm: "px-3.5 py-2 text-xs rounded-xl",
  md: "px-5 py-2.5 text-xs font-bold rounded-xl",
  lg: "px-7 py-3.5 text-sm font-bold rounded-2xl",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2.5 transition-all duration-150 cursor-pointer active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none focus:ring-2 focus:ring-slate-900/20 dark:focus:ring-white/20 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}


