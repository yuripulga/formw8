import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressBar({ currentStep, totalSteps, className = "" }: ProgressBarProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {/* Segmented bar */}
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex gap-1">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber <= currentStep;
          return (
            <div
              key={stepNumber}
              style={{
                backgroundColor: isCompleted ? "var(--brand-highlight, #FFE600)" : undefined,
              }}
              className={`h-full flex-1 rounded-full transition-all duration-300 ${
                isCompleted
                  ? "shadow-sm"
                  : "bg-slate-200/80 dark:bg-zinc-800/80"
              }`}
            />

          );
        })}
      </div>
    </div>
  );
}
