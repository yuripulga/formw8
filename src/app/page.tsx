"use client";

import React, { useState } from "react";
import { useI18n } from "@/i18n/context";
import { useWizard } from "@/context/wizard-context";
import { isValidCpf, isValidCnpj } from "@/lib/brazil-api";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SupportModal } from "@/components/SupportModal";
import { StepName } from "@/components/wizard/StepName";
import { StepEntityType } from "@/components/wizard/StepEntityType";
import { StepTaxAddress } from "@/components/wizard/StepTaxAddress";
import { StepConfirmation } from "@/components/wizard/StepConfirmation";
import { ArrowRight, ArrowLeft, RotateCcw, Heart } from "lucide-react";

export default function Home() {
  const { t } = useI18n();
  const {
    step,
    totalSteps,
    formData,
    setEntityType,
    nextStep,
    prevStep,
    resetWizard,
  } = useWizard();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showManualAddress, setShowManualAddress] = useState<boolean>(false);
  const [showSupportModal, setShowSupportModal] = useState<boolean>(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const isPJ = formData.entityType === "PJ";

  const handleNextStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.userName?.trim()) {
        newErrors.userName = t.wizard.validation.nameRequired;
      }
    } else if (step === 2) {
      if (!formData.entityType) {
        return;
      }
    } else if (step === 3) {
      if (isPJ) {
        const cnpjDigits = (formData.taxId || "").replace(/\D/g, "");
        if (!cnpjDigits) {
          newErrors.taxId = t.wizard.validation.taxIdRequired;
        } else if (cnpjDigits.length === 11) {
          newErrors.taxId = t.wizard.validation.taxIdCpfInPjError || t.wizard.validation.taxIdInvalidPJ;
        } else if (cnpjDigits.length !== 14 || !isValidCnpj(cnpjDigits)) {
          newErrors.taxId = t.wizard.validation.taxIdInvalidPJ;
        }
        if (!formData.companyName?.trim()) {
          newErrors.companyName = t.wizard.validation.companyNameRequired;
        }
      } else {
        const cpfDigits = (formData.taxId || "").replace(/\D/g, "");
        if (!cpfDigits) {
          newErrors.taxId = t.wizard.validation.taxIdRequired;
        } else if (cpfDigits.length > 11 || (formData.taxId || "").includes("/")) {
          newErrors.taxId = t.wizard.validation.taxIdCnpjInPfError || t.wizard.validation.taxIdInvalidPF;
        } else if (cpfDigits.length !== 11 || !isValidCpf(cpfDigits)) {
          newErrors.taxId = t.wizard.validation.taxIdInvalidPF;
        }
      }

      const cepDigits = (formData.addressZip || "").replace(/\D/g, "");
      if (!cepDigits) {
        newErrors.addressZip = t.wizard.validation.zipRequired;
      } else if (cepDigits.length !== 8) {
        newErrors.addressZip = t.wizard.validation.zipInvalid;
      }

      if (!formData.addressStreet?.trim()) {
        newErrors.addressStreet = t.wizard.validation.addressRequired;
      }
      if (!formData.addressCity?.trim()) {
        newErrors.addressCity = t.wizard.validation.cityRequired;
      }
      if (!formData.addressState?.trim()) {
        newErrors.addressState = t.wizard.validation.stateRequired;
      } else if (formData.addressState.trim().length !== 2) {
        newErrors.addressState = t.wizard.validation.stateInvalid;
      }

      // If any address error occurred, reveal manual address fields
      if (newErrors.addressStreet || newErrors.addressCity || newErrors.addressState || newErrors.addressZip) {
        setShowManualAddress(true);
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setDirection("next");
    nextStep();
  };

  const handlePrevStep = () => {
    setDirection("prev");
    prevStep();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNextStep();
    }
  };

  const handleEntityTypeSelect = (type: "PF" | "PJ", isMei?: boolean) => {
    setEntityType(type, isMei);
    setDirection("next");
    nextStep();
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto w-full py-2">
        {/* Animated Step Container with Slide & Fade */}
        <div
          key={step}
          className={`w-full ${
            step === 1 ? "space-y-2 sm:space-y-3" : "space-y-6 sm:space-y-8"
          } ${
            direction === "next" ? "animate-step-next" : "animate-step-prev"
          }`}
        >
          {/* Step 1: User Name */}
          {step === 1 && (
            <StepName
              error={errors.userName}
              onClearError={() => setErrors((prev) => ({ ...prev, userName: "" }))}
              onKeyDown={handleInputKeyDown}
            />
          )}

          {/* Step 2: Entity Type Selection */}
          {step === 2 && (
            <StepEntityType onSelect={handleEntityTypeSelect} />
          )}

          {/* Step 3: Tax Identification & Address */}
          {step === 3 && (
            <StepTaxAddress
              errors={errors}
              setErrors={setErrors}
              onKeyDown={handleInputKeyDown}
              showManualAddress={showManualAddress}
              setShowManualAddress={setShowManualAddress}
            />
          )}

          {/* Step 4: Preview, Platform Copy & Download */}
          {step === 4 && (
            <StepConfirmation onOpenSupportModal={() => setShowSupportModal(true)} />
          )}

          {/* Bottom Navigation Controls */}
          <div className={`${step === 1 ? "pt-1 sm:pt-1.5" : "pt-4"} space-y-3 sm:space-y-0`}>
            {/* Mobile Only (< sm): Centered Step Counter / Support Button Row */}
            <div className="flex sm:hidden justify-center items-center w-full">
              {step < 4 ? (
                <div className="flex flex-col items-center gap-1 text-center">
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
                  onClick={() => setShowSupportModal(true)}
                  style={{ backgroundColor: "var(--brand-highlight, #FFE600)" }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-900 shadow-sm active:scale-95 transition-transform cursor-pointer whitespace-nowrap"
                >
                  <Heart className="w-3.5 h-3.5 fill-slate-900 stroke-slate-900" />
                  <span>{t.footer.links.supportPix}</span>
                </button>
              )}
            </div>

            {/* Navigation Buttons Row */}
            <div className="flex items-center justify-between gap-4">
              {/* Left Action: Voltar (Steps > 1) or Callout (Step === 1) */}
              <div className="flex-1 sm:min-w-[140px] flex justify-start items-center min-w-0">
                {step > 1 ? (
                  <Button
                    onClick={handlePrevStep}
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

              {/* Desktop Only (>= sm): Center Step Counter */}
              <div className="hidden sm:flex flex-col items-center justify-center shrink-0">
                {step < 4 ? (
                  <div className="w-28 sm:w-32 flex flex-col items-center gap-1 text-center">
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
                    onClick={() => setShowSupportModal(true)}
                    style={{ backgroundColor: "var(--brand-highlight, #FFE600)" }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-900 shadow-sm active:scale-95 transition-transform cursor-pointer whitespace-nowrap"
                  >
                    <Heart className="w-3.5 h-3.5 fill-slate-900 stroke-slate-900" />
                    <span>{t.footer.links.supportPix}</span>
                  </button>
                )}
              </div>

              {/* Right Action: Avançar (Steps 1-3) or Começar Novamente (Step 4) */}
              <div className="flex-1 sm:min-w-[140px] flex justify-end shrink-0 min-w-0">
                {step < 4 ? (
                  <Button
                    onClick={handleNextStep}
                    variant="primary"
                    size="md"
                    className="whitespace-nowrap px-4 sm:px-5"
                  >
                    <span>{t.common.next}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={resetWizard}
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
        </div>
      </div>

      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </AppShell>
  );
}
