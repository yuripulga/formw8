"use client";

import React, { useEffect, useState } from "react";
import { W8FormData } from "@/lib/schemas/w8-form-schema";
import { generateW8PDF } from "@/lib/pdf-engine";
import { useI18n } from "@/i18n/context";
import { Loader2, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PDFPreviewViewerProps {
  formData: Partial<W8FormData>;
}

export function PDFPreviewViewer({ formData }: PDFPreviewViewerProps) {
  const { t } = useI18n();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let createdUrl: string | null = null;

    async function loadPdf() {
      try {
        setIsLoading(true);
        const result = await generateW8PDF(formData);
        if (!active) return;
        
        const blob = new Blob([result.pdfBytes as unknown as BlobPart], { type: "application/pdf" });
        createdUrl = URL.createObjectURL(blob);
        setPdfUrl(createdUrl);
      } catch (err) {
        console.error("Failed to render PDF preview:", err);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadPdf();

    return () => {
      active = false;
      if (createdUrl) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [formData]);

  const handleOpenInNewTab = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="relative w-full h-64 sm:h-72 rounded-none border border-theme bg-card-surface overflow-hidden shadow-sm flex flex-col items-center justify-center">
      {/* Floating Open In New Tab Button */}
      {pdfUrl && (
        <button
          type="button"
          onClick={handleOpenInNewTab}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white dark:bg-zinc-800/90 dark:hover:bg-zinc-700 shadow-md backdrop-blur-sm transition-transform active:scale-95 cursor-pointer flex items-center justify-center"
          title={t.wizard.stepConfirmation.openInNewTab}
          aria-label={t.wizard.stepConfirmation.openInNewTab}
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-slate-700 dark:text-slate-300" />
          <p className="text-xs text-muted-theme font-medium">
            {t.common.generatingPdf}
          </p>
        </div>
      ) : pdfUrl ? (
        <object
          data={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
          type="application/pdf"
          className="w-full h-full"
          aria-label={t.wizard.stepConfirmation.previewTitle}
        >
          {/* Fallback for browsers / devices that don't support embedded PDF preview */}
          <div className="p-8 text-center space-y-4 flex flex-col items-center justify-center h-full">
            <FileText className="w-12 h-12 text-muted-theme mx-auto opacity-70" />
            <div className="space-y-1">
              <h4 className="text-base font-bold text-heading-theme">
                {t.wizard.stepConfirmation.previewTitle}
              </h4>
              <p className="text-xs text-muted-theme max-w-sm">
                {t.wizard.stepConfirmation.previewSubtitle}
              </p>
            </div>
            <Button onClick={handleOpenInNewTab} variant="secondary" size="md">
              <ExternalLink className="w-4 h-4" />
              <span>{t.wizard.stepConfirmation.openInNewTab}</span>
            </Button>
          </div>
        </object>
      ) : null}
    </div>
  );
}
