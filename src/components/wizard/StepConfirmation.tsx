"use client";

import React, { useState } from "react";
import { useI18n } from "@/i18n/context";
import { useWizard } from "@/context/wizard-context";
import { PDFPreviewViewer } from "@/components/PDFPreviewViewer";
import { ExchangeCards } from "./ExchangeCards";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/metrics";
import { HighlightedText } from "@/components/ui/HighlightedText";
import {
  Download,
  Loader2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
} from "lucide-react";

interface StepConfirmationProps {
  onOpenSupportModal: () => void;
}

export function StepConfirmation({ onOpenSupportModal }: StepConfirmationProps) {
  const { t } = useI18n();
  const { formData, updateFormData } = useWizard();

  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<
    "irs" | "deel" | "rippling" | "upwork" | "google" | "steam"
  >("irs");
  const [showAllFields, setShowAllFields] = useState<boolean>(false);

  const isPJ = formData.entityType === "PJ";

  const handleCopy = (key: string, val: string) => {
    if (!val || !navigator.clipboard) return;
    navigator.clipboard.writeText(val).then(() => {
      trackEvent("field_copy");
      setCopiedField(key);
      setTimeout(() => {
        setCopiedField((current) => (current === key ? null : current));
      }, 2000);
    }).catch(() => {
      // Non-blocking fallback
    });
  };

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      const { generateW8PDF } = await import("@/lib/pdf-engine");
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
      trackEvent("pdf_download");
      onOpenSupportModal();
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const formModelName = isPJ
    ? t.wizard.stepConfirmation.formTypePJ
    : t.wizard.stepConfirmation.formTypePF;

  return (
    <div className="space-y-4">
      {/* Top Section: Title & Subtitle */}
      <div className="space-y-1.5 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-heading-theme tracking-tight leading-tight">
          {t.wizard.stepConfirmation.question}
        </h1>
        <p className="text-xs sm:text-sm text-muted-theme leading-relaxed">
          {t.wizard.stepConfirmation.subtitle}
        </p>
      </div>

      {/* PDF Engine Card Viewer */}
      <div className="space-y-3">
        <div className="rounded-2xl border border-theme bg-card-surface overflow-hidden shadow-sm">
          <PDFPreviewViewer formData={formData} />

          <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 bg-card-surface">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="text-xs sm:text-sm font-bold text-heading-theme">
                {formModelName}
              </span>
              <p className="text-xs text-muted-theme">
                {t.wizard.stepConfirmation.previewSubtitle}
              </p>
            </div>

            <Button
              onClick={handleDownloadPdf}
              variant="primary"
              size="md"
              disabled={isGeneratingPdf}
              className="w-full sm:w-auto px-5 gap-2 shadow-sm font-bold"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t.wizard.stepConfirmation.pdfAction}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{t.wizard.stepConfirmation.pdfAction}</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Copyable Fields & Platform Mapping Accordion */}
        <div className="pt-6 sm:pt-8 space-y-3">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-lg font-bold text-heading-theme tracking-tight leading-snug">
              {t.wizard.stepConfirmation.mappingTitle.replace(
                "{formType}",
                formModelName
              )}
            </h2>
            {t.wizard.stepConfirmation.mappingSubtitle ? (
              <p className="text-xs sm:text-sm text-muted-theme leading-relaxed">
                {t.wizard.stepConfirmation.mappingSubtitle}
              </p>
            ) : null}
          </div>

          {/* Platform Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: "irs", label: t.wizard.stepConfirmation.platforms.irs },
              { id: "deel", label: t.wizard.stepConfirmation.platforms.deel },
              { id: "rippling", label: t.wizard.stepConfirmation.platforms.rippling },
              { id: "upwork", label: t.wizard.stepConfirmation.platforms.upwork },
              { id: "google", label: t.wizard.stepConfirmation.platforms.google },
              { id: "steam", label: t.wizard.stepConfirmation.platforms.steam },
            ].map((p) => {
              const isActive = selectedPlatform === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() =>
                    setSelectedPlatform(
                      p.id as
                        | "irs"
                        | "deel"
                        | "rippling"
                        | "upwork"
                        | "google"
                        | "steam"
                    )
                  }
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                      : "bg-card-surface border border-theme text-muted-theme hover:text-heading-theme"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Platform Mapping Fields List */}
          {(() => {
            const rawFields = [
              {
                id: "name",
                line: t.wizard.stepConfirmation.line1Label,
                meaning: t.wizard.stepConfirmation.line1Meaning,
                value: isPJ
                  ? formData.companyName || formData.userName || ""
                  : formData.userName || "",
              },
              {
                id: "country",
                line: t.wizard.stepConfirmation.line2Label,
                meaning: t.wizard.stepConfirmation.line2Meaning,
                value: t.wizard.stepConfirmation.countryValue || "Brazil",
              },
              ...(isPJ
                ? [
                    {
                      id: "chapter3",
                      line: t.wizard.stepConfirmation.lineChapter3Label,
                      meaning: t.wizard.stepConfirmation.lineChapter3Meaning,
                      value: t.wizard.stepConfirmation.chapter3Value || "Corporation",
                    },
                    {
                      id: "chapter4",
                      line: t.wizard.stepConfirmation.lineChapter4Label,
                      meaning: t.wizard.stepConfirmation.lineChapter4Meaning,
                      value:
                        formData.chapter4Status === "PassiveNFFE"
                          ? "Passive NFFE"
                          : t.wizard.stepConfirmation.chapter4Value || "Active NFFE",
                    },
                  ]
                : []),
              {
                id: "street",
                line: t.wizard.stepConfirmation.line3Label,
                meaning: t.wizard.stepConfirmation.line3Meaning,
                value: formData.addressStreet || "",
              },
              {
                id: "cityStateZip",
                line: `${t.wizard.stepConfirmation.line3Label} (City, State, ZIP)`,
                meaning: t.wizard.stepConfirmation.line3Meaning,
                value: `${formData.addressCity || ""}, ${formData.addressState || ""} ${formData.addressZip || ""}, ${t.wizard.stepConfirmation.countryValue || "Brazil"}`.trim(),
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
            ];

            const mappingFields = showAllFields ? rawFields : rawFields.slice(0, 3);

            return (
              <div className="space-y-2.5">
                {mappingFields.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 sm:p-4 rounded-xl bg-card-surface border border-theme space-y-2 text-xs shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                      <HighlightedText
                        text={item.line}
                        className="text-xs sm:text-sm font-bold text-heading-theme shrink-0"
                      />
                      <span className="text-xs text-muted-theme text-left sm:text-right font-normal leading-relaxed">
                        {item.meaning}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 bg-app-surface px-3 py-2 rounded-lg border border-theme min-h-[42px]">
                      <span className="font-mono font-bold text-heading-theme break-all text-xs sm:text-sm">
                        {item.value}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.id, item.value)}
                        className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-muted-theme hover:text-heading-theme active:scale-95 transition-colors cursor-pointer select-none py-1 px-1.5 rounded"
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

                {showAllFields && (
                  <>
                    {/* MEI Explanatory Banner */}
                    {formData.isMei && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-card-surface border border-theme space-y-2 text-left animate-fadeIn">
                        <div className="flex items-center gap-2 font-bold text-sm text-heading-theme">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{t.wizard.stepConfirmation.meiInfoTitle}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-theme leading-relaxed">
                          {t.wizard.stepConfirmation.meiInfoDesc}
                        </p>
                      </div>
                    )}

                    {/* PJ FATCA Classification Information Note */}
                    {isPJ && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-card-surface border border-theme space-y-2 text-left animate-fadeIn">
                        <div className="flex items-center gap-2 font-bold text-sm text-heading-theme">
                          <ShieldCheck
                            className={`w-4 h-4 shrink-0 ${
                              formData.chapter4Status === "PassiveNFFE"
                                ? "text-amber-500"
                                : "text-emerald-600 dark:text-emerald-400"
                            }`}
                          />
                          <span>
                            {formData.chapter4Status === "PassiveNFFE"
                              ? t.wizard.stepConfirmation.passiveNffeInfoTitle
                              : t.wizard.stepConfirmation.fatcaNoticeTitle}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-theme leading-relaxed">
                          {formData.chapter4Status === "PassiveNFFE"
                            ? t.wizard.stepConfirmation.passiveNffeInfoDesc
                            : t.wizard.stepConfirmation.fatcaNoticeText}
                        </p>
                      </div>
                    )}
                  </>
                )}

                {rawFields.length > 3 && (
                  <div className="pt-1 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setShowAllFields(!showAllFields)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-heading-theme hover:text-emerald-600 dark:hover:text-emerald-400 bg-card-surface border border-theme px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer"
                    >
                      <span>
                        {showAllFields
                          ? t.wizard.stepConfirmation.hideAllFields
                          : t.wizard.stepConfirmation.showAllFields.replace(
                              "{count}",
                              String(rawFields.length)
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

          {/* Post-Completion Exchange Comparison */}
          <ExchangeCards />
        </div>
      </div>
    </div>
  );
}
