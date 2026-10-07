"use client";

import React, { useState } from "react";
import { useI18n } from "@/i18n/context";
import { Heart, Copy, Check, X, Building2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  pixKey?: string;
}

export function SupportModal({
  isOpen,
  onClose,
  pixKey = "e6c546eb-edc3-4c2b-a391-3c9c70018bdf",
}: SupportModalProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-card-surface border border-theme shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full text-muted-theme hover:text-heading-theme hover:bg-drawer-surface transition-colors cursor-pointer"
          aria-label={t.common.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Badge */}
        <div className="space-y-2 text-center sm:text-left pr-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>{t.supportModal.badge}</span>
          </div>
          <h3
            id="support-modal-title"
            className="text-xl sm:text-2xl font-extrabold text-heading-theme tracking-tight"
          >
            {t.supportModal.title}
          </h3>
          <p className="text-xs sm:text-sm text-body-theme leading-relaxed">
            {t.supportModal.description}
          </p>
        </div>

        {/* Impact / Retribution Appeal */}
        <div className="p-4 rounded-2xl bg-drawer-surface border border-theme/60 text-xs sm:text-sm text-muted-theme leading-relaxed">
          <p>{t.supportModal.appeal}</p>
        </div>

        {/* Pix Box */}
        <div className="p-4 sm:p-5 rounded-2xl border border-emerald-600/20 dark:border-emerald-500/20 bg-emerald-500/[0.03] dark:bg-emerald-500/[0.06] space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-theme font-medium">
            <span className="flex items-center gap-1.5 text-heading-theme font-semibold">
              <QrCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.supportModal.pixKeyLabel}</span>
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-app-surface border border-theme">
            <span className="font-mono font-bold text-xs sm:text-sm text-heading-theme break-all select-all">
              {pixKey}
            </span>
            <button
              type="button"
              onClick={handleCopyPix}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 dark:bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-800 dark:hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>{t.supportModal.pixCopied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.supportModal.copyPixKey}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-2 flex justify-end">
          <Button onClick={onClose} variant="secondary" size="md" className="w-full sm:w-auto">
            <span>{t.supportModal.closeButton}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
