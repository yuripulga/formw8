import React, { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "info" | "alert" | "success";
  className?: string;
}

const badgeVariants = {
  info: "bg-slate-100 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300",
  alert: "bg-amber-50 dark:bg-zinc-800 border-amber-200 dark:border-zinc-700 text-amber-900 dark:text-zinc-200",
  success: "bg-slate-100 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200",
};


export function Badge({ children, variant = "info", className = "" }: BadgeProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${badgeVariants[variant]} ${className}`}>
      {children}
    </div>
  );
}
