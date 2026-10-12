"use client";

import React, { useState } from "react";
import { useI18n } from "@/i18n/context";
import { useWizard } from "@/context/wizard-context";
import { validateStep } from "@/lib/validation";
import { AppShell } from "@/components/layout/AppShell";
import { SupportModal } from "@/components/SupportModal";
import { StepName } from "@/components/wizard/StepName";
import { StepEntityType } from "@/components/wizard/StepEntityType";
import { StepTaxAddress } from "@/components/wizard/StepTaxAddress";
import { StepConfirmation } from "@/components/wizard/StepConfirmation";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";

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
    if (step === 2 && !formData.entityType) {
      return;
    }

    const validationKeys = validateStep(step, formData);
    const newErrors: Record<string, string> = {};
    for (const [field, key] of Object.entries(validationKeys)) {
      newErrors[field] =
        (t.wizard.validation as Record<string, string>)[key] ?? key;
    }

    // If any address error occurred, reveal manual address fields
    if (
      newErrors.addressStreet ||
      newErrors.addressCity ||
      newErrors.addressState ||
      newErrors.addressZip
    ) {
      setShowManualAddress(true);
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
      // Prevent the same Enter press from also activating the control that
      // receives focus on the next step (it used to auto-select "Pessoa Fisica").
      e.preventDefault();
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

          <WizardNavigation
            step={step}
            totalSteps={totalSteps}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            onRestart={resetWizard}
            onOpenSupport={() => setShowSupportModal(true)}
          />
        </div>
      </div>

      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </AppShell>
  );
}
