"use client";

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { W8FormData, EntityType } from "@/lib/schemas/w8-form-schema";
import { sanitizeASCII } from "@/lib/sanitizer";
import { deriveChapter4Status } from "@/lib/fatca";

interface WizardContextType {
  step: number;
  totalSteps: number;
  formData: Partial<W8FormData>;
  setUserName: (name: string) => void;
  setEntityType: (type: EntityType, isMei?: boolean) => void;
  updateFormData: (data: Partial<W8FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetWizard: () => void;
  sanitizedUserName: string;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;


  const [formData, setFormData] = useState<Partial<W8FormData>>({
    countryOfCitizenship: "Brazil",
    countryOfIncorporation: "Brazil",
    chapter3Classification: "Corporation",
    chapter4Status: "ActiveNFFE",
    isMei: false,
    claimTreaty: false,
    outputMode: "pdf",
  });

  const sanitizedUserName = sanitizeASCII(formData.userName || "");

  // Browser history integration: each wizard step is a history entry, so the
  // browser Back/Forward buttons move between steps instead of leaving the page.
  // The form data itself never leaves memory (zero-data architecture).
  const isPopNavigation = useRef(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      const target = Number(event.state?.wizardStep);
      if (Number.isInteger(target) && target >= 1 && target <= totalSteps) {
        isPopNavigation.current = true;
        setStep(target);
      }
    };
    window.history.replaceState({ ...window.history.state, wizardStep: 1 }, "");
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isPopNavigation.current) {
      isPopNavigation.current = false;
      return;
    }
    window.history.pushState({ ...window.history.state, wizardStep: step }, "");
  }, [step]);

  // Warn before leaving/reloading the page while there is unsaved typed data.
  const hasTypedData = Boolean(
    formData.userName?.trim() || formData.taxId?.trim() || formData.addressStreet?.trim()
  );
  useEffect(() => {
    if (!hasTypedData) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [hasTypedData]);

  const setUserName = (name: string) => {
    setFormData((prev) => ({ ...prev, userName: name }));
  };

  const setEntityType = (type: EntityType, isMei: boolean = false) => {
    setFormData((prev) => {
      const isSwitching = prev.entityType !== type;
      return {
        ...prev,
        entityType: type,
        isMei,
        taxId: isSwitching ? "" : prev.taxId,
        companyName: type === "PF" ? undefined : (isSwitching ? "" : prev.companyName),
        chapter3Classification: type === "PJ" ? "Corporation" : "Individual",
        chapter4Status: type === "PJ" ? deriveChapter4Status(prev) : "Individual",
      };
    });
  };

  const updateFormData = (data: Partial<W8FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const goToStep = (targetStep: number) => {
    if (targetStep >= 1 && targetStep <= totalSteps) {
      setStep(targetStep);
    }
  };

  const resetWizard = () => {
    setStep(1);
    setFormData({
      userName: "",
      entityType: undefined,
      countryOfCitizenship: "Brazil",
      countryOfIncorporation: "Brazil",
      chapter3Classification: "Corporation",
      chapter4Status: "ActiveNFFE",
      isHolding: false,
      passiveIncomeAtLeast50: false,
      passiveAssetsAtLeast50: false,
      claimTreaty: false,
      outputMode: "pdf",
    });
  };

  const value = {
    step,
    totalSteps,
    formData,
    setUserName,
    setEntityType,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    resetWizard,
    sanitizedUserName,
  };

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
