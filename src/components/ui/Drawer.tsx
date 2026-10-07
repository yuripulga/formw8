import React, { ReactNode } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

interface DrawerProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ContextDrawer({ title, children, className = "" }: DrawerProps) {
  return (
    <details className={`mt-6 drawer-brand group overflow-hidden transition-all ${className}`}>
      <summary className="p-4 text-xs font-semibold text-heading-theme hover:text-slate-900 dark:hover:text-white flex items-center justify-between gap-2 cursor-pointer list-none select-none transition-colors">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 shrink-0 text-muted-theme" />
          <span>{title}</span>
        </div>
        <ChevronDown className="w-4 h-4 shrink-0 text-muted-theme group-open:rotate-180 transition-transform duration-200" />
      </summary>
      <div className="px-4 pb-4 pt-1 text-xs text-muted-theme leading-relaxed font-normal">
        {children}
      </div>
    </details>
  );
}


