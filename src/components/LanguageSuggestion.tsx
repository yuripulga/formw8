"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { Locale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/server";
import { usePathname } from "next/navigation";
import { translatePath } from "@/lib/routes";

/** Language of the browser matched against the supported locales (e.g. "en-GB" -> "en-US"). */
function detectBrowserLocale(): Locale | null {
  const languages = typeof navigator !== "undefined" ? (navigator.languages?.length ? navigator.languages : [navigator.language]) : [];
  for (const language of languages) {
    const base = language?.toLowerCase().split("-")[0];
    const match = locales.find((code) => code.toLowerCase().split("-")[0] === base);
    if (match) return match;
  }
  return null;
}

/**
 * Non-intrusive notice for visitors whose browser language differs from the page language.
 * It only links to the equivalent page; nothing is stored (zero-data) and nobody is redirected.
 */
export function LanguageSuggestion() {
  const { locale } = useI18n();
  const pathname = usePathname() || "/";
  const [suggested, setSuggested] = useState<Locale | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const browserLocale = detectBrowserLocale();
    setSuggested(browserLocale && browserLocale !== locale ? browserLocale : null);
  }, [locale]);

  if (!suggested || dismissed) return null;

  // The notice is written in the suggested language so that the visitor can read it.
  const copy = getDictionary(suggested).common;

  return (
    <div
      role="region"
      aria-label={copy.languageSuggestion}
      className="relative z-20 flex items-center justify-center gap-3 px-4 py-2 text-xs font-medium bg-card-surface shadow-sm text-heading-theme"
    >
      <Link
        href={translatePath(pathname, suggested)}
        hrefLang={suggested}
        className="underline underline-offset-2 hover:text-emerald-600 dark:hover:text-emerald-400"
      >
        {copy.languageSuggestion}
      </Link>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label={copy.languageSuggestionDismiss}
        className="p-1 text-muted-theme hover:text-heading-theme cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
