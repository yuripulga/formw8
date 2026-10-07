import React, { ReactNode } from "react";
import { Check } from "lucide-react";

interface OptionCardProps {
  title: string;
  description?: string;
  selected?: boolean;
  onClick: () => void;
  icon?: ReactNode;
}

export function OptionCard({
  title,
  description,
  selected = false,
  onClick,
  icon,
}: OptionCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`w-full p-5 sm:p-6 text-left transition-all duration-150 cursor-pointer flex items-center justify-between gap-4 group ${
        selected
          ? "option-card-brand-selected"
          : "option-card-brand"
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        {icon && (
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              selected
                ? "bg-[#15803d] dark:bg-[#16a34a] text-white shadow-sm"
                : "bg-drawer-surface text-muted-theme group-hover:text-heading-theme"
            }`}
          >
            {icon}
          </div>
        )}
        <div className="space-y-1">
          <div className="font-bold text-base tracking-tight leading-snug">{title}</div>
          {description && (
            <p className="text-xs text-muted-theme leading-relaxed font-normal">{description}</p>
          )}
        </div>
      </div>

      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all ${
          selected
            ? "bg-[#15803d] dark:bg-[#16a34a] border-[#15803d] dark:border-[#16a34a] text-white"
            : "border-theme text-transparent group-hover:border-slate-400 dark:group-hover:border-slate-600"
        }`}
      >
        <Check className="w-4 h-4 stroke-[3]" />
      </div>

    </button>
  );
}

