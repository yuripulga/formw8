"use client";

import React, { useState, useEffect } from "react";
import { useI18n } from "@/i18n/context";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "formw8_cookie_consent_v1";

export function CookieBanner() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      // Fallback if localStorage is disabled/restricted
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // Ignore write errors
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Consentimento de Cookies e Privacidade"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-lg z-50 p-3 sm:p-3.5 rounded-2xl bg-card-surface/95 backdrop-blur-md border border-theme shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
    >
      <div className="flex items-start gap-2.5 flex-1 min-w-0">
        <Cookie className="w-4 h-4 text-[#8B5A2B] dark:text-[#A67C52] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-heading-theme">
            {t.cookies.title}
          </h4>
          <p className="text-[11px] text-muted-theme leading-relaxed font-normal">
            {t.cookies.description}
          </p>
        </div>
      </div>
      <Button
        onClick={handleAccept}
        variant="primary"
        size="sm"
        className="w-full sm:w-auto shrink-0 text-xs py-1.5 px-3.5 font-bold"
      >
        {t.cookies.accept}
      </Button>
    </aside>
  );
}
