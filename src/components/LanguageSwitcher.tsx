"use client";

import React from "react";
import { ChevronDown, Languages } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { Locale, locales, localeLabels } from "@/i18n/config";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="relative inline-flex items-center">
      <Languages
        aria-hidden="true"
        className="pointer-events-none absolute left-2.5 w-3.5 h-3.5 text-slate-700 dark:text-zinc-200"
      />
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        aria-label={t.common.switchLanguage}
        className="appearance-none cursor-pointer rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-1.5 pl-8 pr-7 text-xs font-bold text-slate-900 dark:text-zinc-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {localeLabels[code]}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-2 w-3.5 h-3.5 text-slate-700 dark:text-zinc-200"
      />
    </div>
  );
}
