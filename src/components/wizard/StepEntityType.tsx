"use client";

import React, { useState, useEffect, useRef } from "react";
import { useI18n } from "@/i18n/context";
import { useWizard } from "@/context/wizard-context";
import { OptionCard } from "@/components/ui/OptionCard";
import { deriveChapter4Status } from "@/lib/fatca";
import { User, Store, Building2, HelpCircle, AlertCircle } from "lucide-react";

interface StepEntityTypeProps {
  onSelect: (type: "PF" | "PJ", isMei?: boolean) => void;
}

export function StepEntityType({ onSelect }: StepEntityTypeProps) {
  const { t } = useI18n();
  const { formData, setEntityType, updateFormData, sanitizedUserName } = useWizard();
  const [showTaxHelp, setShowTaxHelp] = useState<boolean>(false);
  
  const initialSelection = formData.entityType === "PJ"
    ? "PJ"
    : formData.isMei
    ? "MEI"
    : formData.entityType === "PF"
    ? "PF"
    : null;

  const [selectedOption, setSelectedOption] = useState<"PF" | "MEI" | "PJ" | null>(initialSelection);

  const pfRef = useRef<HTMLButtonElement>(null);
  const meiRef = useRef<HTMLButtonElement>(null);
  const pjRef = useRef<HTMLButtonElement>(null);

  const displayName = sanitizedUserName || formData.userName || "";

  // Auto-focus on mount
  useEffect(() => {
    if (selectedOption === "PJ") {
      pjRef.current?.focus();
    } else if (selectedOption === "MEI") {
      meiRef.current?.focus();
    } else {
      pfRef.current?.focus();
    }
  }, [selectedOption]);

  const handleSelectPF = () => {
    setSelectedOption("PF");
    setEntityType("PF", false);
    onSelect("PF", false);
  };

  const setHoldingState = (next: {
    isHolding: boolean;
    passiveIncomeAtLeast50: boolean;
    passiveAssetsAtLeast50: boolean;
  }) => {
    updateFormData({ ...next, chapter4Status: deriveChapter4Status(next) });
  };

  const handleSelectMEI = () => {
    setSelectedOption("MEI");
    setEntityType("PF", true);
    onSelect("PF", true);
  };

  const handleSelectPJ = () => {
    if (selectedOption === "PJ") {
      // If already selected and clicked again, advance
      onSelect("PJ", false);
      return;
    }
    setSelectedOption("PJ");
    setEntityType("PJ", false);
  };

  const handleKeyDownGroup = (e: React.KeyboardEvent) => {
    if (e.key === "1") {
      e.preventDefault();
      pfRef.current?.focus();
      handleSelectPF();
    } else if (e.key === "2") {
      e.preventDefault();
      meiRef.current?.focus();
      handleSelectMEI();
    } else if (e.key === "3") {
      e.preventDefault();
      pjRef.current?.focus();
      handleSelectPJ();
    }
  };

  const handleKeyDownPF = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      meiRef.current?.focus();
      handleSelectMEI();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelectPF();
    }
  };

  const handleKeyDownMEI = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      pjRef.current?.focus();
      handleSelectPJ();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      pfRef.current?.focus();
      handleSelectPF();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelectMEI();
    }
  };

  const handleKeyDownPJ = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      meiRef.current?.focus();
      handleSelectMEI();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelectPJ();
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5" onKeyDown={handleKeyDownGroup}>
      <div className="space-y-1.5 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-heading-theme tracking-tight leading-tight">
          {t.wizard.stepEntityType.question.replace("{{name}}", displayName)}
        </h1>
        {t.wizard.stepEntityType.subtitle ? (
          <p className="text-sm sm:text-base text-muted-theme">
            {t.wizard.stepEntityType.subtitle}
          </p>
        ) : null}
      </div>

      <div
        role="radiogroup"
        aria-label={t.wizard.stepEntityType.question.replace("{{name}}", displayName)}
        className="grid grid-cols-1 gap-2.5 pt-0"
      >
        <OptionCard
          ref={pfRef}
          title={t.wizard.stepEntityType.optionPF}
          description={t.wizard.stepEntityType.descriptionPF}
          icon={<User className="w-6 h-6" />}
          selected={selectedOption === "PF"}
          onClick={handleSelectPF}
          onKeyDown={handleKeyDownPF}
        />

        <OptionCard
          ref={meiRef}
          title={t.wizard.stepEntityType.optionMei}
          description={t.wizard.stepEntityType.descriptionMei}
          icon={<Store className="w-6 h-6" />}
          selected={selectedOption === "MEI"}
          onClick={handleSelectMEI}
          onKeyDown={handleKeyDownMEI}
        />

        <OptionCard
          ref={pjRef}
          title={t.wizard.stepEntityType.optionPJ}
          description={t.wizard.stepEntityType.descriptionPJ}
          icon={<Building2 className="w-6 h-6" />}
          selected={selectedOption === "PJ"}
          onClick={handleSelectPJ}
          onKeyDown={handleKeyDownPJ}
        />
      </div>

      {/* Side-by-side buttons for PJ (Holding / Passive vs Services / Active) */}
      {selectedOption === "PJ" && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-card-surface border border-theme space-y-3 animate-fadeIn text-left">
          <div>
            <span className="text-xs font-bold text-heading-theme uppercase tracking-wider">
              {t.wizard.stepEntityType.segmentSectionTitle}
            </span>
          </div>

          <div
            role="radiogroup"
            aria-label={t.wizard.stepEntityType.segmentSectionTitle}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5"
          >
            {/* Left Button: Holding / Receita Passiva */}
            <button
              type="button"
              role="radio"
              aria-checked={Boolean(formData.isHolding)}
              onClick={() =>
                setHoldingState({
                  isHolding: true,
                  passiveIncomeAtLeast50: Boolean(formData.passiveIncomeAtLeast50),
                  passiveAssetsAtLeast50: Boolean(formData.passiveAssetsAtLeast50),
                })
              }
              className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                formData.isHolding
                  ? "border-emerald-600 dark:border-emerald-500 bg-emerald-500/[0.04] shadow-sm"
                  : "border-theme bg-app-surface opacity-80 hover:opacity-100"
              }`}
            >
              <div className="text-xs sm:text-sm font-bold text-heading-theme">
                {t.wizard.stepEntityType.segmentHoldingTitle}
              </div>
              <p className="text-xs text-muted-theme leading-relaxed">
                {t.wizard.stepEntityType.segmentHoldingSubtitle}
              </p>
            </button>

            {/* Right Button: Prestação de Serviços (Normal Flow) */}
            <button
              type="button"
              role="radio"
              aria-checked={!formData.isHolding}
              onClick={() =>
                setHoldingState({
                  isHolding: false,
                  passiveIncomeAtLeast50: false,
                  passiveAssetsAtLeast50: false,
                })
              }
              className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                !formData.isHolding
                  ? "border-emerald-600 dark:border-emerald-500 bg-emerald-500/[0.04] shadow-sm"
                  : "border-theme bg-app-surface opacity-80 hover:opacity-100"
              }`}
            >
              <div className="text-xs sm:text-sm font-bold text-heading-theme">
                {t.wizard.stepEntityType.segmentServicesTitle}
              </div>
              <p className="text-xs text-muted-theme leading-relaxed">
                {t.wizard.stepEntityType.segmentServicesSubtitle}
              </p>
            </button>
          </div>

          {formData.isHolding && (
            <div className="space-y-2.5 pt-1 animate-fadeIn">
              <p className="text-xs text-muted-theme leading-relaxed">
                {t.wizard.stepEntityType.holdingQuestionsHint}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(
                  [
                    ["passiveIncomeAtLeast50", t.wizard.stepEntityType.holdingIncomeQuestion],
                    ["passiveAssetsAtLeast50", t.wizard.stepEntityType.holdingAssetsQuestion],
                  ] as const
                ).map(([field, question]) => {
                  const on = Boolean(formData[field]);
                  return (
                    <div
                      key={field}
                      className="p-3 sm:p-3.5 rounded-xl border border-theme bg-app-surface flex flex-col justify-between gap-2.5"
                    >
                      <p className="text-xs sm:text-sm text-heading-theme font-medium leading-relaxed">
                        {question}
                      </p>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={on}
                        aria-label={question}
                        onClick={() =>
                          setHoldingState({
                            isHolding: true,
                            passiveIncomeAtLeast50: Boolean(formData.passiveIncomeAtLeast50),
                            passiveAssetsAtLeast50: Boolean(formData.passiveAssetsAtLeast50),
                            [field]: !on,
                          })
                        }
                        className={`self-end inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                          on
                            ? "border-emerald-600 dark:border-emerald-500 bg-emerald-500/10 text-heading-theme"
                            : "border-theme text-muted-theme"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`w-2.5 h-2.5 rounded-full ${
                            on ? "bg-emerald-600 dark:bg-emerald-400" : "bg-slate-400"
                          }`}
                        />
                        {on
                          ? t.wizard.stepEntityType.holdingAnswerYes
                          : t.wizard.stepEntityType.holdingAnswerNo}
                      </button>
                    </div>
                  );
                })}
              </div>
              <p role="status" aria-live="polite" className="text-xs font-semibold text-heading-theme">
                {formData.chapter4Status === "PassiveNFFE"
                  ? t.wizard.stepEntityType.holdingResultPassive
                  : t.wizard.stepEntityType.holdingResultActive}
              </p>
            </div>
          )}

          <p className="text-xs text-muted-theme leading-relaxed pt-0.5">
            {t.wizard.stepEntityType.pjCorporationNotice}
          </p>

          {formData.chapter4Status === "PassiveNFFE" && (
            <div className="flex items-start gap-2 pt-1 text-xs text-muted-theme leading-relaxed animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
              <p>{t.wizard.stepEntityType.passiveNffeAlert}</p>
            </div>
          )}
        </div>
      )}

      {/* Discreet Help Link */}
      <div className="pt-1 flex flex-col items-center justify-center text-center">
        <button
          type="button"
          onClick={() => setShowTaxHelp(!showTaxHelp)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-theme hover:text-heading-theme transition-colors underline cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{t.wizard.stepEntityType.helpLink}</span>
        </button>

        {showTaxHelp && (
          <div className="mt-3 p-4 rounded-xl bg-card-surface border border-theme space-y-2 text-xs animate-fadeIn text-left w-full">
            <h3 className="font-bold text-heading-theme text-sm">
              {t.wizard.stepEntityType.helpTitle}
            </h3>
            <p className="text-muted-theme leading-relaxed">
              {t.wizard.stepEntityType.helpPF}
            </p>
            <p className="text-muted-theme leading-relaxed">
              {t.wizard.stepEntityType.helpMei}
            </p>
            <p className="text-muted-theme leading-relaxed">
              {t.wizard.stepEntityType.helpPJ}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

