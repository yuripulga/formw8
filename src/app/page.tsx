"use client";

import React, { useState } from "react";
import { useI18n } from "@/i18n/context";
import { useWizard } from "@/context/wizard-context";
import { sanitizeASCII, wasSanitized } from "@/lib/sanitizer";
import { generateW8PDF } from "@/lib/pdf-engine";
import {
  fetchAddressByCep,
  fetchCompanyByCnpj,
  formatCnpj,
  formatCep,
  maskCpf,
  maskCnpj,
  maskCep,
  isValidCpf,
  isValidCnpj,
} from "@/lib/brazil-api";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { OptionCard } from "@/components/ui/OptionCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { HighlightedText } from "@/components/ui/HighlightedText";
import { PDFPreviewViewer } from "@/components/PDFPreviewViewer";
import { SupportModal } from "@/components/SupportModal";
import { TurnstileProtection } from "@/components/ui/TurnstileProtection";
import { useABTest, ABExperiment, trackAffiliateClick, trackWizardEvent } from "@/lib/ab-testing";
import { AFFILIATE_CONFIG } from "@/config/affiliates";

const subtitleExperiment: ABExperiment<"variantA" | "variantB" | "variantC"> = {
  id: "step1_subtitle_v1",
  variants: ["variantA", "variantB", "variantC"] as const,
  defaultVariant: "variantA",
};
import {
  ArrowRight,
  ArrowLeft,
  User,
  Building2,
  Download,
  MapPin,
  FileText,
  Loader2,
  HelpCircle,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  Heart,
  ExternalLink,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Home() {
  const { t } = useI18n();
  const { variant: subtitleVariant } = useABTest(subtitleExperiment);
  const {
    step,
    totalSteps,
    formData,
    setUserName,
    setEntityType,
    updateFormData,
    nextStep,
    prevStep,
    resetWizard,
    sanitizedUserName,
  } = useWizard();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [isSearchingCep, setIsSearchingCep] = useState<boolean>(false);
  const [isSearchingCnpj, setIsSearchingCnpj] = useState<boolean>(false);
  const [showManualAddress, setShowManualAddress] = useState<boolean>(false);
  const [showTaxHelp, setShowTaxHelp] = useState<boolean>(false);
  const [showSupportModal, setShowSupportModal] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [highlightedFields, setHighlightedFields] = useState<Record<string, boolean>>({});
  const [selectedPlatform, setSelectedPlatform] = useState<
    "irs" | "deel" | "rippling" | "upwork" | "google" | "steam"
  >("irs");
  const [showAllFields, setShowAllFields] = useState<boolean>(false);

  const handleCopy = (key: string, val: string) => {
    if (!val) return;
    navigator.clipboard.writeText(val);
    setCopiedField(key);
    setTimeout(() => {
      setCopiedField((current) => (current === key ? null : current));
    }, 2000);
  };

  const isPJ = formData.entityType === "PJ";
  const nameWasSanitized = wasSanitized(formData.userName || "");
  const streetWasSanitized = wasSanitized(formData.addressStreet || "");
  const cityWasSanitized = wasSanitized(formData.addressCity || "");

  const triggerFieldHighlight = (fieldKeys: string[]) => {
    const newHighlights: Record<string, boolean> = {};
    fieldKeys.forEach((k) => {
      newHighlights[k] = true;
    });
    setHighlightedFields(newHighlights);
    setTimeout(() => {
      setHighlightedFields({});
    }, 2000);
  };

  const handleTaxIdChange = async (val: string) => {
    const masked = isPJ ? maskCnpj(val) : maskCpf(val);
    updateFormData({ taxId: masked });
    if (errors.taxId) setErrors((prev) => ({ ...prev, taxId: "" }));

    if (isPJ) {
      const digits = val.replace(/\D/g, "");
      if (digits.length === 14) {
        try {
          setIsSearchingCnpj(true);
          const result = await fetchCompanyByCnpj(digits);
          if (result) {
            setShowManualAddress(true);
            updateFormData({
              taxId: formatCnpj(digits),
              companyName: result.companyName || formData.companyName,
              addressZip: result.zip ? formatCep(result.zip) : formData.addressZip,
              addressStreet: result.street || formData.addressStreet,
              addressCity: result.city || formData.addressCity,
              addressState: result.state || formData.addressState,
            });

            // Reseta feedback de erro para todos os campos preenchidos automaticamente
            setErrors((prev) => {
              const updated = { ...prev };
              delete updated.taxId;
              if (result.companyName) delete updated.companyName;
              if (result.zip) delete updated.addressZip;
              if (result.street) delete updated.addressStreet;
              if (result.city) delete updated.addressCity;
              if (result.state) delete updated.addressState;
              return updated;
            });

            triggerFieldHighlight([
              "taxId",
              "companyName",
              "addressZip",
              "addressStreet",
              "addressCity",
              "addressState",
            ]);
          }
        } catch {
          // Non-blocking fallback
        } finally {
          setIsSearchingCnpj(false);
        }
      }
    }
  };

  const handleCepChange = async (val: string) => {
    const masked = maskCep(val);
    updateFormData({ addressZip: masked });
    if (errors.addressZip) setErrors((prev) => ({ ...prev, addressZip: "" }));

    const rawCep = val.replace(/\D/g, "");
    if (rawCep.length === 8) {
      try {
        setIsSearchingCep(true);
        const result = await fetchAddressByCep(rawCep);
        if (result) {
          setShowManualAddress(true);
          updateFormData({
            addressZip: formatCep(rawCep),
            addressStreet: result.street || formData.addressStreet,
            addressCity: result.city || formData.addressCity,
            addressState: result.state || formData.addressState,
          });

          // Reseta feedback de erro para os campos preenchidos pelo CEP
          setErrors((prev) => {
            const updated = { ...prev };
            delete updated.addressZip;
            if (result.street) delete updated.addressStreet;
            if (result.city) delete updated.addressCity;
            if (result.state) delete updated.addressState;
            return updated;
          });

          triggerFieldHighlight(["addressZip", "addressStreet", "addressCity", "addressState"]);
        }
      } catch {
        // Non-blocking fallback
      } finally {
        setIsSearchingCep(false);
      }
    }
  };

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      const { pdfBytes, fileName } = await generateW8PDF(formData);
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      trackWizardEvent("pdf_download_success", "conversion");
      // Abre o modal de agradecimento e apoio voluntário Pix
      setShowSupportModal(true);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

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

      // Se houver qualquer erro de endereço, abre automaticamente a visualização dos campos manuais
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

  const sanitizedStreet = sanitizeASCII(formData.addressStreet || "");
  const sanitizedCity = sanitizeASCII(formData.addressCity || "");
  const sanitizedCompanyName = sanitizeASCII(formData.companyName || "");

  const hasAddressFilled = Boolean(
    formData.addressStreet ||
    formData.addressCity ||
    formData.addressState ||
    (formData.addressZip && formData.addressZip.replace(/\D/g, "").length >= 8) ||
    showManualAddress ||
    errors.addressStreet ||
    errors.addressCity ||
    errors.addressState
  );

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
          {/* Step 1: User Name Onboarding */}
          {step === 1 && (
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2.5 text-center sm:text-left">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-heading-theme tracking-tight leading-[1.1]">
                  <HighlightedText text={t.wizard.stepName.question} />
                </h1>
                {(() => {
                  const stepNameAny = t.wizard.stepName as unknown as {
                    subtitle?: string;
                    subtitles?: Record<string, string>;
                  };
                  const activeSubtitle =
                    stepNameAny.subtitles?.[subtitleVariant] || stepNameAny.subtitle;

                  return activeSubtitle ? (
                    <p className="text-sm sm:text-base text-muted-theme leading-relaxed">
                      <HighlightedText text={activeSubtitle} />
                    </p>
                  ) : null;
                })()}
              </div>

              <div className="pt-1.5 sm:pt-2">
                <Input
                  type="text"
                  id="user-name-input"
                  aria-label={t.wizard.stepName.question}
                  value={formData.userName || ""}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    if (errors.userName) setErrors((prev) => ({ ...prev, userName: "" }));
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder={t.wizard.stepName.placeholder}
                  helperText={
                    nameWasSanitized
                      ? `${t.common.sanitizedNotice} ${sanitizedUserName}`
                      : undefined
                  }
                  reserveHelperSpace={true}
                  error={errors.userName}
                  icon={<User className="w-5 h-5" />}
                  autoFocus
                />
                <TurnstileProtection />
              </div>
            </div>
          )}

          {/* Step 2: Entity Type Selection */}
          {step === 2 && (
            <div className="space-y-4 sm:space-y-5">
              <div className="space-y-1.5 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-heading-theme tracking-tight leading-tight">
                  {t.wizard.stepEntityType.question.replace(
                    "{{name}}",
                    sanitizedUserName || formData.userName || ""
                  )}
                </h1>
                {t.wizard.stepEntityType.subtitle ? (
                  <p className="text-sm sm:text-base text-muted-theme">
                    {t.wizard.stepEntityType.subtitle}
                  </p>
                ) : null}
              </div>

              <div
                role="radiogroup"
                aria-label={t.wizard.stepEntityType.question.replace("{{name}}", sanitizedUserName || formData.userName || "")}
                className="grid grid-cols-1 gap-2.5 pt-0"
              >
                <OptionCard
                  title={t.wizard.stepEntityType.optionPF}
                  description={t.wizard.stepEntityType.descriptionPF}
                  icon={<User className="w-6 h-6" />}
                  selected={formData.entityType === "PF"}
                  onClick={() => {
                    setEntityType("PF");
                    setDirection("next");
                    nextStep();
                  }}
                />

                <OptionCard
                  title={t.wizard.stepEntityType.optionPJ}
                  description={t.wizard.stepEntityType.descriptionPJ}
                  icon={<Building2 className="w-6 h-6" />}
                  selected={formData.entityType === "PJ"}
                  onClick={() => {
                    setEntityType("PJ");
                    setDirection("next");
                    nextStep();
                  }}
                />
              </div>

              {/* Discreet Help Link: 'Não sei essa resposta' (Centered horizontally) */}
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
                      {t.wizard.stepEntityType.helpPJ}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Tax Identification & Address */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-1.5 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-heading-theme tracking-tight leading-tight">
                  {t.wizard.stepTaxAndAddress.question}
                </h1>
                {t.wizard.stepTaxAndAddress.subtitle ? (
                  <p className="text-sm sm:text-base text-muted-theme">
                    {t.wizard.stepTaxAndAddress.subtitle}
                  </p>
                ) : null}
              </div>

              <div className="space-y-3">
                {/* For PJ: CNPJ Input First */}
                {isPJ ? (
                  <div className="space-y-2.5">
                    {/* Primary CNPJ Input */}
                    <Input
                      label={t.wizard.stepTaxAndAddress.taxIdLabelPJ}
                      placeholder={t.wizard.stepTaxAndAddress.taxIdPlaceholderPJ}
                      value={formData.taxId || ""}
                      onChange={(e) => handleTaxIdChange(e.target.value)}
                      helperText={
                        isSearchingCnpj
                          ? t.wizard.stepTaxAndAddress.cnpjSearching
                          : t.wizard.stepTaxAndAddress.explanation
                      }
                      error={errors.taxId}
                      isLoading={isSearchingCnpj}
                      isSuccess={Boolean(highlightedFields.taxId) && !isSearchingCnpj}
                      icon={<FileText className="w-5 h-5" />}
                      autoFocus
                    />

                    {/* Secondary Input: Razão Social (appears below only once populated by auto-complete or typed) */}
                    {(formData.companyName || (formData.taxId && formData.taxId.replace(/\D/g, "").length >= 14)) && (
                      <div className="animate-fadeIn">
                        <Input
                          label={t.wizard.stepTaxAndAddress.companyNameLabel}
                          placeholder={t.wizard.stepTaxAndAddress.companyNamePlaceholder}
                          value={formData.companyName || ""}
                          onChange={(e) => {
                            updateFormData({ companyName: e.target.value });
                            if (errors.companyName) setErrors((prev) => ({ ...prev, companyName: "" }));
                          }}
                          error={errors.companyName}
                          isSuccess={Boolean(highlightedFields.companyName)}
                          icon={<Building2 className="w-5 h-5" />}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  /* For PF: Single CPF Input */
                  <Input
                    label={t.wizard.stepTaxAndAddress.taxIdLabelPF}
                    placeholder={t.wizard.stepTaxAndAddress.taxIdPlaceholderPF}
                    value={formData.taxId || ""}
                    onChange={(e) => handleTaxIdChange(e.target.value)}
                    helperText={t.wizard.stepTaxAndAddress.explanation}
                    error={errors.taxId}
                    isSuccess={Boolean(highlightedFields.taxId)}
                    icon={<FileText className="w-5 h-5" />}
                    autoFocus
                  />
                )}

                {/* Address Section */}
                <div className="space-y-2.5 pt-0">
                  {/* CEP Input (Entry point for address) */}
                  <Input
                    label={t.wizard.stepTaxAndAddress.addressZipLabel}
                    placeholder={t.wizard.stepTaxAndAddress.addressZipPlaceholder}
                    value={formData.addressZip || ""}
                    onChange={(e) => handleCepChange(e.target.value)}
                    helperText={
                      isSearchingCep ? t.wizard.stepTaxAndAddress.cepSearching : undefined
                    }
                    error={errors.addressZip}
                    isLoading={isSearchingCep}
                    isSuccess={Boolean(highlightedFields.addressZip) && !isSearchingCep}
                    icon={<MapPin className="w-5 h-5" />}
                  />

                  {/* Progressive Address Fields (Revealed once CEP is filled or auto-filled or manual toggle clicked) */}
                  {hasAddressFilled ? (
                    <div className="space-y-2.5 animate-fadeIn">
                      {/* Street Address */}
                      <Input
                        label={t.wizard.stepTaxAndAddress.addressStreetLabel}
                        placeholder={t.wizard.stepTaxAndAddress.addressStreetPlaceholder}
                        value={formData.addressStreet || ""}
                        onChange={(e) => {
                          updateFormData({ addressStreet: e.target.value });
                          if (errors.addressStreet) setErrors((prev) => ({ ...prev, addressStreet: "" }));
                        }}
                        error={errors.addressStreet}
                        isSuccess={Boolean(highlightedFields.addressStreet)}
                      />

                      {/* City & State */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                        <div className="sm:col-span-2">
                          <Input
                            label={t.wizard.stepTaxAndAddress.addressCityLabel}
                            placeholder={t.wizard.stepTaxAndAddress.addressCityPlaceholder}
                            value={formData.addressCity || ""}
                            onChange={(e) => {
                              updateFormData({ addressCity: e.target.value });
                              if (errors.addressCity) setErrors((prev) => ({ ...prev, addressCity: "" }));
                            }}
                            error={errors.addressCity}
                            isSuccess={Boolean(highlightedFields.addressCity)}
                          />
                        </div>
                        <div>
                          <Input
                            label={t.wizard.stepTaxAndAddress.addressStateLabel}
                            placeholder={t.wizard.stepTaxAndAddress.addressStatePlaceholder}
                            value={formData.addressState || ""}
                            onChange={(e) => {
                              const uf = e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase();
                              updateFormData({ addressState: uf });
                              if (errors.addressState) setErrors((prev) => ({ ...prev, addressState: "" }));
                            }}
                            error={errors.addressState}
                            isSuccess={Boolean(highlightedFields.addressState)}
                            maxLength={2}
                          />
                        </div>
                      </div>

                      {/* Subtle ASCII Normalization Support Text */}
                      {(streetWasSanitized || cityWasSanitized) && (
                        <p className="text-xs text-muted-theme">
                          {t.common.sanitizedNotice}:{" "}
                          <span className="font-medium text-heading-theme">
                            {sanitizedStreet} {sanitizedCity ? `- ${sanitizedCity}` : ""}
                          </span>
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="pt-1 flex justify-center text-center">
                      <button
                        type="button"
                        onClick={() => setShowManualAddress(true)}
                        className="inline-flex items-center text-xs text-muted-theme hover:text-heading-theme transition-colors underline cursor-pointer"
                      >
                        {t.wizard.stepTaxAndAddress.manualAddressToggle}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Live PDF Preview & Official IRS Field Mapping */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3.5 text-left">
                {/* Left Column: Solid Like Badge with Highlighter SVG */}
                <div className="relative inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 shrink-0 select-none">
                  <svg
                    className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] pointer-events-none z-0 rotate-[-5deg]"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M 10 20 C 35 12, 70 14, 92 18 C 96 42, 94 72, 88 88 C 65 92, 30 90, 10 84 C 6 60, 8 36, 10 20 Z"
                      fill="var(--brand-highlight, #FFE600)"
                    />
                  </svg>
                  <ThumbsUp className="relative z-10 w-5 h-5 sm:w-5.5 sm:h-5.5 fill-[#1e293b] stroke-[#1e293b]" />
                </div>

                {/* Right Column: Title & Subtitle */}
                <div className="space-y-0.5">
                  <h1 className="text-2xl sm:text-3xl font-bold text-heading-theme tracking-tight leading-tight">
                    {t.wizard.stepConfirmation.question}
                  </h1>
                  {t.wizard.stepConfirmation.subtitle ? (
                    <p className="text-sm sm:text-base text-muted-theme">
                      {t.wizard.stepConfirmation.subtitle}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Primary PDF Download Action (Placed Above PDF Viewer) */}
              <div className="pt-1">
                <Button
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  variant="primary"
                  size="lg"
                  className="w-full justify-center text-base"
                >
                  {isGeneratingPdf ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t.common.generatingPdf}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>{t.wizard.stepConfirmation.pdfAction}</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Live Pre-Filled Official PDF Viewer */}
              <div className="pt-1">
                <PDFPreviewViewer formData={formData} />
              </div>

              {/* Educational Field Guide - Clean floating cards with Platform Selector */}
              <div className="space-y-4 pt-2">
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-theme">
                    {t.wizard.stepConfirmation.officialFormLabel}: {isPJ
                      ? t.wizard.stepConfirmation.formTypePJ
                      : t.wizard.stepConfirmation.formTypePF}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-heading-theme">
                    {t.wizard.stepConfirmation.mappingTitle}
                  </h3>
                </div>

                {/* Interactive Platform Selector */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {(
                      [
                        { id: "irs", label: t.wizard.stepConfirmation.platforms.irs },
                        { id: "deel", label: t.wizard.stepConfirmation.platforms.deel },
                        { id: "rippling", label: t.wizard.stepConfirmation.platforms.rippling },
                        { id: "upwork", label: t.wizard.stepConfirmation.platforms.upwork },
                        { id: "google", label: t.wizard.stepConfirmation.platforms.google },
                        { id: "steam", label: t.wizard.stepConfirmation.platforms.steam },
                      ] as const
                    ).map((p) => {
                      const isActive = selectedPlatform === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setSelectedPlatform(p.id)}
                          style={{
                            backgroundColor: isActive
                              ? "var(--brand-highlight, #FFE600)"
                              : undefined,
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isActive
                              ? "text-slate-900 shadow-xs scale-100"
                              : "bg-card-surface border border-theme text-body-theme hover:text-heading-theme active:scale-95"
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Contextual Platform Guidance Banner */}
                  <div className="p-3 rounded-xl bg-app-surface border border-theme/60 text-xs text-muted-theme leading-relaxed flex items-start gap-2">
                    <span className="shrink-0 text-sm">💡</span>
                    <span>{t.wizard.stepConfirmation.platformHints[selectedPlatform]}</span>
                  </div>
                </div>

                {/* Field Cards */}
                {(() => {
                  const mappingFields = [
                    {
                      id: "name",
                      line: t.wizard.stepConfirmation.line1Label,
                      meaning: t.wizard.stepConfirmation.line1Meaning,
                      value: sanitizedCompanyName || sanitizedUserName,
                    },
                    {
                      id: "country",
                      line: t.wizard.stepConfirmation.line2Label,
                      meaning: t.wizard.stepConfirmation.line2Meaning,
                      value: "Brazil",
                    },
                    {
                      id: "address",
                      line: t.wizard.stepConfirmation.line3Label,
                      meaning: t.wizard.stepConfirmation.line3Meaning,
                      value: `${sanitizedStreet}, ${sanitizedCity}, ${formData.addressState || ""} ${formData.addressZip || ""}, Brazil`,
                    },
                    {
                      id: "taxId",
                      line: isPJ
                        ? t.wizard.stepConfirmation.lineTaxIdLabelPJ
                        : t.wizard.stepConfirmation.lineTaxIdLabelPF,
                      meaning: isPJ
                        ? t.wizard.stepConfirmation.lineTaxIdMeaningPJ
                        : t.wizard.stepConfirmation.lineTaxIdMeaningPF,
                      value: formData.taxId || "",
                    },
                    ...(isPJ
                      ? [
                          {
                            id: "chapter3",
                            line: t.wizard.stepConfirmation.lineChapter3Label,
                            meaning: t.wizard.stepConfirmation.lineChapter3Meaning,
                            value: "Corporation",
                          },
                          {
                            id: "chapter4",
                            line: t.wizard.stepConfirmation.lineChapter4Label,
                            meaning: t.wizard.stepConfirmation.lineChapter4Meaning,
                            value: "Active NFFE",
                          },
                        ]
                      : []),
                    {
                      id: "treaty",
                      line: t.wizard.stepConfirmation.lineTreatyLabel,
                      meaning: t.wizard.stepConfirmation.lineTreatyMeaning,
                      value: "N/A (0% Withholding / Foreign Source)",
                    },
                    {
                      id: "signer",
                      line: t.wizard.stepConfirmation.lineSignLabel,
                      meaning: t.wizard.stepConfirmation.lineSignMeaning,
                      value: sanitizedUserName || sanitizedCompanyName,
                    },
                  ];

                  const displayedFields = showAllFields ? mappingFields : [mappingFields[0]];

                  return (
                    <div className="space-y-3 pt-1">
                      {displayedFields.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-xl bg-card-surface border border-theme space-y-1.5 text-xs shadow-xs"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
                            <HighlightedText
                              text={item.line}
                              className="text-[13px] sm:text-[14px] font-bold text-heading-theme shrink-0"
                            />
                            <span className="text-[11px] sm:text-xs text-muted-theme text-left sm:text-right font-normal leading-relaxed">
                              {item.meaning}
                            </span>
                          </div>
                          <div className="pt-1 flex items-center justify-between gap-2 bg-app-surface px-3 py-2 rounded-lg border border-theme/40">
                            <span className="font-mono font-bold text-heading-theme break-all">
                              {item.value}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(item.id, item.value)}
                              className="shrink-0 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-muted-theme hover:text-heading-theme hover:bg-card-surface active:scale-95 transition-all py-1.5 px-2.5 rounded-lg border border-theme/50 cursor-pointer min-h-[36px] sm:min-h-[auto]"
                              title={t.common.copyValue}
                              aria-label={`${t.common.copyValue}: ${item.line}`}
                            >
                              {copiedField === item.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                  <span className="text-emerald-500 font-semibold">{t.common.copied}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 shrink-0" />
                                  <span>{t.common.copyValue}</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}

                      {mappingFields.length > 1 && (
                        <div className="pt-1 flex justify-center">
                          <button
                            type="button"
                            onClick={() => setShowAllFields(!showAllFields)}
                            className="inline-flex items-center gap-2 text-xs font-bold text-heading-theme hover:text-emerald-600 dark:hover:text-emerald-400 bg-card-surface border border-theme px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                          >
                            <span>
                              {showAllFields
                                ? t.wizard.stepConfirmation.hideAllFields
                                : t.wizard.stepConfirmation.showAllFields.replace(
                                    "{count}",
                                    String(mappingFields.length)
                                  )}
                            </span>
                            {showAllFields ? (
                              <ChevronUp className="w-3.5 h-3.5 shrink-0" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Post-Completion Next Step: Where to Receive USD */}
                <div className="pt-6 space-y-3.5">
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-heading-theme">
                      {t.wizard.stepConfirmation.exchangeTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-theme leading-relaxed">
                      {t.wizard.stepConfirmation.exchangeSubtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Husky */}
                    <div className="p-4 rounded-xl bg-card-surface border border-theme flex flex-col justify-between space-y-3 shadow-xs hover:border-emerald-500/50 transition-colors">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-heading-theme">Husky</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            {t.wizard.stepConfirmation.exchangeHuskyTag}
                          </span>
                        </div>
                        <p className="text-xs text-muted-theme leading-relaxed">
                          {t.wizard.stepConfirmation.exchangeHuskyDesc}
                        </p>
                      </div>
                      <a
                        href={AFFILIATE_CONFIG.husky.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        onClick={() => trackAffiliateClick("husky")}
                        className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2 px-3 rounded-xl transition-all cursor-pointer active:scale-95 ${
                          AFFILIATE_CONFIG.husky.isAffiliate
                            ? "btn-brand-primary"
                            : "btn-brand-outline"
                        }`}
                      >
                        <span>{t.wizard.stepConfirmation.exchangeLearnMore}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Higlobe */}
                    <div className="p-4 rounded-xl bg-card-surface border border-theme flex flex-col justify-between space-y-3 shadow-xs hover:border-blue-500/50 transition-colors">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-heading-theme">Higlobe</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            {t.wizard.stepConfirmation.exchangeHiglobeTag}
                          </span>
                        </div>
                        <p className="text-xs text-muted-theme leading-relaxed">
                          {t.wizard.stepConfirmation.exchangeHiglobeDesc}
                        </p>
                      </div>
                      <a
                        href={AFFILIATE_CONFIG.higlobe.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        onClick={() => trackAffiliateClick("higlobe")}
                        className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2 px-3 rounded-xl transition-all cursor-pointer active:scale-95 ${
                          AFFILIATE_CONFIG.higlobe.isAffiliate
                            ? "btn-brand-primary"
                            : "btn-brand-outline"
                        }`}
                      >
                        <span>{t.wizard.stepConfirmation.exchangeLearnMore}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Wise */}
                    <div className="p-4 rounded-xl bg-card-surface border border-theme flex flex-col justify-between space-y-3 shadow-xs hover:border-amber-500/50 transition-colors">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-heading-theme">Wise</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            {t.wizard.stepConfirmation.exchangeWiseTag}
                          </span>
                        </div>
                        <p className="text-xs text-muted-theme leading-relaxed">
                          {t.wizard.stepConfirmation.exchangeWiseDesc}
                        </p>
                      </div>
                      <a
                        href={AFFILIATE_CONFIG.wise.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        onClick={() => trackAffiliateClick("wise")}
                        className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2 px-3 rounded-xl transition-all cursor-pointer active:scale-95 ${
                          AFFILIATE_CONFIG.wise.isAffiliate
                            ? "btn-brand-primary"
                            : "btn-brand-outline"
                        }`}
                      >
                        <span>{t.wizard.stepConfirmation.exchangeLearnMore}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Navigation Container */}
          <div className={`${step === 1 ? "pt-1 sm:pt-1.5" : "pt-4"} space-y-3 sm:space-y-0`}>
            {/* Mobile Only (< sm): Centered Step Counter / Support Button Row */}
            <div className="flex sm:hidden justify-center items-center w-full">
              {step < 4 ? (
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-[10px] font-medium tracking-wider text-muted-theme uppercase whitespace-nowrap">
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
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-900 shadow-xs active:scale-95 transition-transform cursor-pointer whitespace-nowrap"
                >
                  <Heart className="w-3.5 h-3.5 fill-slate-900 stroke-slate-900" />
                  <span>{t.footer.links.supportPix}</span>
                </button>
              )}
            </div>

            {/* Navigation Buttons Row (Voltar à esquerda, Avançar à direita) */}
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
                    <span className="font-handwritten text-[13px] sm:text-[14px] font-normal leading-tight tracking-tight whitespace-pre-line text-left">
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
                    <span className="text-[10px] font-medium tracking-wider text-muted-theme uppercase whitespace-nowrap">
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
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-900 shadow-xs active:scale-95 transition-transform cursor-pointer whitespace-nowrap"
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
