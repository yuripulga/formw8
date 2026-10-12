"use client";

import React, { useEffect, useState } from "react";
import { useI18n } from "@/i18n/context";
import { useWizard } from "@/context/wizard-context";
import { validateStep } from "@/lib/validation";
import { trackEvent } from "@/lib/metrics";
import { siteJsonLd } from "@/lib/seo";
import type { Locale } from "@/i18n/config";
import { AppShell } from "@/components/layout/AppShell";
import { SupportModal } from "@/components/SupportModal";
import { StepName } from "@/components/wizard/StepName";
import { StepEntityType } from "@/components/wizard/StepEntityType";
import { StepTaxAddress } from "@/components/wizard/StepTaxAddress";
import { StepConfirmation } from "@/components/wizard/StepConfirmation";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";

export function HomePage({ locale }: { locale: Locale }) {
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

  // Anonymous counters: one visit per page load and one hit per wizard step reached.
  useEffect(() => {
    trackEvent("visit");
  }, []);

  useEffect(() => {
    if (step === 2) trackEvent("wizard_step_2");
    if (step === 3) trackEvent("wizard_step_3");
    if (step === 4) {
      trackEvent("wizard_step_4");
      if (formData.entityType === "PJ") {
        trackEvent(formData.chapter4Status === "PassiveNFFE" ? "entity_pj_passive" : "entity_pj_active");
      } else {
        trackEvent(formData.isMei ? "entity_mei" : "entity_pf");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd(locale)).replace(/</g, "\\u003c") }}
      />
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
