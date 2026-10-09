"use client";

import React, { useState, useEffect, useRef } from "react";
import { useI18n } from "@/i18n/context";
import { Heart, Copy, Check, X, QrCode } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  pixKey?: string;
}

export function SupportModal({
  isOpen,
  onClose,
  pixKey = process.env.NEXT_PUBLIC_PIX_KEY || "e6c546eb-edc3-4c2b-a391-3c9c70018bdf",
}: SupportModalProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement | null;

    // Focus the first focusable element or modal container
    const timer = setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0]?.focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusables = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyPix = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(pixKey).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    }).catch(() => {
      // Non-blocking fallback
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-3xl bg-card-surface border border-theme shadow-2xl p-6 sm:p-8 space-y-6 animate-fadeIn focus:outline-none"
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
        <div className="p-4 rounded-2xl bg-drawer-surface border border-theme text-xs sm:text-sm text-muted-theme leading-relaxed">
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
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 dark:bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-800 dark:hover:bg-emerald-700 transition-colors cursor-pointer shadow-sm active:scale-95"
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
