"use client";

import React from "react";
import { useI18n } from "@/i18n/context";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.common.switchLanguage}
      className="flex items-center bg-card-surface border border-theme rounded-xl p-1"
    >
      <button
        type="button"
        onClick={() => setLocale("pt-BR")}
        aria-pressed={locale === "pt-BR"}
        style={{
          backgroundColor: locale === "pt-BR" ? "var(--brand-highlight, #FFE600)" : undefined,
        }}
        className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all cursor-pointer ${
          locale === "pt-BR"
            ? "text-[#1e293b] shadow-xs"
            : "text-muted-theme hover:text-heading-theme"
        }`}
      >
        PT
      </button>
      <button
        type="button"
        onClick={() => setLocale("en-US")}
        aria-pressed={locale === "en-US"}
        style={{
          backgroundColor: locale === "en-US" ? "var(--brand-highlight, #FFE600)" : undefined,
        }}
        className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all cursor-pointer ${
          locale === "en-US"
            ? "text-[#1e293b] shadow-xs"
            : "text-muted-theme hover:text-heading-theme"
        }`}
      >
        EN
      </button>

    </div>
  );
}
