import React, { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: ReactNode;
  isSuccess?: boolean;
  isLoading?: boolean;
  highlighted?: boolean;
  reserveHelperSpace?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      icon,
      isSuccess,
      isLoading,
      highlighted,
      reserveHelperSpace = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = props.id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="space-y-1 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold uppercase tracking-wider text-muted-theme cursor-pointer"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-4 text-zinc-400/60 dark:text-zinc-500/50 pointer-events-none transition-colors">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`w-full px-4 py-3 input-brand placeholder:text-zinc-400/45 dark:placeholder:text-zinc-500/35 text-base font-medium transition-all duration-300 ${
              icon ? "pl-11" : ""
            } ${
              isSuccess || isLoading
                ? "pr-11"
                : ""
            } ${
              highlighted
                ? "!border-emerald-500 !ring-2 !ring-emerald-500/30 dark:!border-emerald-400"
                : ""
            } ${
              isSuccess
                ? "!border-emerald-500 !ring-1 !ring-emerald-500/25 dark:!border-emerald-400 dark:!ring-emerald-400/25"
                : ""
            } ${
              error
                ? "!border-red-500 !ring-1 !ring-red-500/25 dark:!border-red-400 dark:!ring-red-400/25 text-red-900 dark:text-red-100"
                : ""
            } ${className}`}
            {...props}
          />
          {isLoading ? (
            <div className="absolute right-4 text-emerald-600 dark:text-emerald-400 pointer-events-none animate-fadeIn">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : isSuccess ? (
            <div className="absolute right-4 text-emerald-600 dark:text-emerald-400 pointer-events-none animate-fadeIn transition-opacity">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          ) : null}
        </div>
        {/* Helper & Error container with aria-live */}
        {(helperText || error || reserveHelperSpace) ? (
          <div
            aria-live="polite"
            className={`${reserveHelperSpace ? "min-h-[1.25rem]" : ""} text-xs leading-relaxed flex items-center pt-0.5`}
          >
            {error ? (
              <p id={errorId} className="text-red-500 dark:text-red-400 font-semibold animate-fadeIn flex items-center gap-1">
                <span>{error}</span>
              </p>
            ) : helperText ? (
              <p id={helperId} className="text-muted-theme animate-fadeIn">{helperText}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
