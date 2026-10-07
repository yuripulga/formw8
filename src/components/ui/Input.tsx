import React, { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: ReactNode;
  isSuccess?: boolean;
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
      reserveHelperSpace = false,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-1 w-full">
        {label && (
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-theme">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-4 text-muted-theme pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full px-4 py-3 input-brand placeholder-slate-400 dark:placeholder-slate-500 text-base font-medium transition-all duration-300 ${
              icon ? "pl-11" : ""
            } ${
              isSuccess
                ? "pr-11 !border-emerald-500 !ring-1 !ring-emerald-500/25 dark:!border-emerald-400 dark:!ring-emerald-400/25"
                : ""
            } ${
              error
                ? "!border-red-500 !ring-1 !ring-red-500/25 dark:!border-red-400 dark:!ring-red-400/25 text-red-900 dark:text-red-100"
                : ""
            } ${className}`}
            {...props}
          />
          {isSuccess && (
            <div className="absolute right-4 text-emerald-600 dark:text-emerald-400 pointer-events-none animate-fadeIn transition-opacity">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          )}
        </div>
        {/* Helper & Error container */}
        {(helperText || error || reserveHelperSpace) ? (
          <div className={`${reserveHelperSpace ? "min-h-[1.25rem]" : ""} text-xs leading-relaxed flex items-center pt-0.5`}>
            {error ? (
              <p className="text-red-500 dark:text-red-400 font-semibold animate-fadeIn flex items-center gap-1">
                <span>{error}</span>
              </p>
            ) : helperText ? (
              <p className="text-muted-theme animate-fadeIn">{helperText}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
