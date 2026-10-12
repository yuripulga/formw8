"use client";

import React from "react";
import { useI18n } from "@/i18n/context";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ArrowRight, ArrowLeft, RotateCcw, Heart } from "lucide-react";

interface WizardNavigationProps {
  step: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onRestart: () => void;
  onOpenSupport: () => void;
}

/**
 * Bottom navigation of the wizard: back / step counter (or support button on the
 * last step) / next (or restart on the last step).
 */
export function WizardNavigation({
  step,
  totalSteps,
  onNext,
  onPrev,
  onRestart,
  onOpenSupport,
}: WizardNavigationProps) {
  const { t } = useI18n();

  const centerSlot =
    step < totalSteps ? (
      <div className="sm:w-32 flex flex-col items-center gap-1 text-center">
        <span className="text-xs font-medium tracking-wider text-muted-theme uppercase whitespace-nowrap">
          {t.wizard.stepCounter
            .replace("{{current}}", String(step))
            .replace("{{total}}", String(totalSteps))}
        </span>
        <ProgressBar currentStep={step} totalSteps={totalSteps} />
      </div>
    ) : (
      <button
        type="button"
        onClick={onOpenSupport}
        style={{ backgroundColor: "var(--brand-highlight, #FFE600)" }}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-900 shadow-sm active:scale-95 transition-transform cursor-pointer whitespace-nowrap"
      >
        <Heart className="w-3.5 h-3.5 fill-slate-900 stroke-slate-900" />
        <span>{t.footer.links.supportPix}</span>
      </button>
    );

  return (
    <div className={`${step === 1 ? "pt-1 sm:pt-1.5" : "pt-4"} space-y-3 sm:space-y-0`}>
      {/* Mobile only (< sm): centered step counter / support button row */}
      <div className="flex sm:hidden justify-center items-center w-full">{centerSlot}</div>

      <div className="flex items-center justify-between gap-4">
        {/* Left: back (steps > 1) or privacy callout (step 1) */}
        <div className="flex-1 sm:min-w-[140px] flex justify-start items-center min-w-0">
          {step > 1 ? (
            <Button
              onClick={onPrev}
              variant="ghost"
              size="sm"
              aria-label={t.common.back}
              className="whitespace-nowrap px-3 sm:px-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.common.back}</span>
            </Button>
          ) : (
            <div className="relative flex items-center gap-1.5 -rotate-3 text-muted-theme select-none transition-transform hover:-rotate-1 cursor-default">
              <span className="font-handwritten text-xs sm:text-sm font-normal leading-tight tracking-tight whitespace-pre-line text-left">
                {t.wizard.noDataSavedCallout}
              </span>
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-muted-theme shrink-0 transform -rotate-12 translate-y-[-4px]"
                viewBox="0 0 36 36"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M 4 28 C 12 28, 22 22, 28 8" />
                <path d="M 20 8 L 28 8 L 28 16" transform="rotate(-25 28 8)" />
              </svg>
            </div>
          )}
        </div>

        {/* Desktop only (>= sm): centered step counter / support button */}
        <div className="hidden sm:flex flex-col items-center justify-center shrink-0">
          {centerSlot}
        </div>

        {/* Right: next (steps 1-3) or restart (last step) */}
        <div className="flex-1 sm:min-w-[140px] flex justify-end shrink-0 min-w-0">
          {step < totalSteps ? (
            <Button
              onClick={onNext}
              variant="primary"
              size="md"
              className="whitespace-nowrap px-4 sm:px-5"
            >
              <span>{t.common.next}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={onRestart}
              variant="outline"
              size="md"
              className="whitespace-nowrap gap-1.5 px-3 sm:px-4"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.common.restart}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
