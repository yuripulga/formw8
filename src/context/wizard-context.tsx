"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { W8FormData, EntityType } from "@/lib/schemas/w8-form-schema";
import { sanitizeASCII } from "@/lib/sanitizer";

interface WizardContextType {
  step: number;
  totalSteps: number;
  formData: Partial<W8FormData>;
  setUserName: (name: string) => void;
  setEntityType: (type: EntityType) => void;
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
    claimTreaty: false,
    outputMode: "pdf",
  });

  const sanitizedUserName = sanitizeASCII(formData.userName || "");

  const setUserName = (name: string) => {
    setFormData((prev) => ({ ...prev, userName: name }));
  };

  const setEntityType = (type: EntityType) => {
    setFormData((prev) => ({
      ...prev,
      entityType: type,
      chapter3Classification: type === "PJ" ? "Corporation" : "Individual",
      chapter4Status: type === "PJ" ? "ActiveNFFE" : "Individual",
    }));
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
