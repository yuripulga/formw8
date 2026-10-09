import React, { forwardRef, ReactNode } from "react";
import { Check } from "lucide-react";

export interface OptionCardProps {
  title: string;
  description?: string;
  selected?: boolean;
  onClick: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  icon?: ReactNode;
  id?: string;
}

export const OptionCard = forwardRef<HTMLButtonElement, OptionCardProps>(function OptionCard(
  { title, description, selected = false, onClick, onKeyDown, icon, id },
  ref
) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const current = e.currentTarget;
      const group = current.closest('[role="radiogroup"]') || current.parentElement;
      if (group) {
        const radios = Array.from(group.querySelectorAll<HTMLButtonElement>('[role="radio"]'));
        const index = radios.indexOf(current);
        if (index !== -1 && radios.length > 1) {
          const next = radios[(index + 1) % radios.length];
          next?.focus();
          next?.click();
        }
      }
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const current = e.currentTarget;
      const group = current.closest('[role="radiogroup"]') || current.parentElement;
      if (group) {
        const radios = Array.from(group.querySelectorAll<HTMLButtonElement>('[role="radio"]'));
        const index = radios.indexOf(current);
        if (index !== -1 && radios.length > 1) {
          const prev = radios[(index - 1 + radios.length) % radios.length];
          prev?.focus();
          prev?.click();
        }
      }
    }
  };

  return (
    <button
      ref={ref}
      id={id}
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
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
                ? "bg-emerald-700 dark:bg-emerald-600 text-white shadow-sm"
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
            ? "bg-emerald-700 dark:bg-emerald-600 border-emerald-700 dark:border-emerald-600 text-white"
            : "border-theme text-transparent group-hover:border-slate-400 dark:group-hover:border-slate-600"
        }`}
      >
        <Check className="w-4 h-4 stroke-[3]" />
      </div>
    </button>
  );
});
