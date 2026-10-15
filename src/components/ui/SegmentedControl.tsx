"use client";

import React, { useRef } from "react";

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  /** Visible label above the options; it also names the radio group for screen readers. */
  label: string;
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

/** Compact radio group (2 to 3 short options side by side) with arrow-key navigation. */
export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  const groupId = React.useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (from: number, step: number) => {
    const next = (from + step + options.length) % options.length;
    buttons.current[next]?.focus();
    onChange(options[next].value);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      move(index, 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      move(index, -1);
    }
  };

  return (
    <div className="space-y-1.5">
      <span
        id={`${groupId}-label`}
        className="block text-xs font-bold uppercase tracking-wider text-muted-theme"
      >
        {label}
      </span>
      <div role="radiogroup" aria-labelledby={`${groupId}-label`} className="inline-flex gap-2">
        {options.map((option, index) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              ref={(el) => {
                buttons.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(option.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`px-3.5 py-1.5 rounded-xl border text-xs sm:text-sm font-semibold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                selected
                  ? "border-emerald-600 dark:border-emerald-500 bg-emerald-500/[0.06] text-heading-theme shadow-sm"
                  : "border-theme bg-app-surface text-muted-theme opacity-80 hover:opacity-100"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
