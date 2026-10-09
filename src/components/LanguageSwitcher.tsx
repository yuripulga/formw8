"use client";

import React from "react";
import { useI18n } from "@/i18n/context";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.common.switchLanguage}
      className="flex items-center bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-xl p-1 shadow-sm"
    >
      <button
        type="button"
        onClick={() => setLocale("pt-BR")}
        aria-pressed={locale === "pt-BR"}
        style={{
          backgroundColor: locale === "pt-BR" ? "var(--brand-highlight, #FFE600)" : "transparent",
        }}
        className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-transform active:scale-95 cursor-pointer ${
          locale === "pt-BR"
            ? "text-slate-900 shadow-sm"
            : "text-slate-700 dark:text-zinc-200 hover:text-slate-950 dark:hover:text-white"
        }`}
      >
        PT
      </button>
      <button
        type="button"
        onClick={() => setLocale("en-US")}
        aria-pressed={locale === "en-US"}
        style={{
          backgroundColor: locale === "en-US" ? "var(--brand-highlight, #FFE600)" : "transparent",
        }}
        className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-transform active:scale-95 cursor-pointer ${
          locale === "en-US"
            ? "text-slate-900 shadow-sm"
            : "text-slate-700 dark:text-zinc-200 hover:text-slate-950 dark:hover:text-white"
        }`}
      >
        EN
      </button>

    </div>
  );
}
