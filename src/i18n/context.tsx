"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale, defaultLocale } from "./config";
import ptBR from "./dictionaries/pt-BR.json";
import enUS from "./dictionaries/en-US.json";

type Dictionary = typeof ptBR;
export type Theme = "dark" | "light";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: Dictionary;
}

const dictionaries: Record<Locale, Dictionary> = {
  "pt-BR": ptBR,
  "en-US": enUS,
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Auto-detect theme from system preferences in memory (Zero localStorage / Zero cookies)
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setThemeState("dark");
    } else {
      setThemeState("light");
    }

    // Auto-detect locale from browser navigator.language in memory
    const browserLang =
      (typeof navigator !== "undefined" &&
        (navigator.language || (navigator.languages && navigator.languages[0]))) ||
      "";
    if (browserLang.toLowerCase().startsWith("pt")) {
      setLocaleState("pt-BR");
    } else {
      setLocaleState("en-US");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme, mounted]);

  useEffect(() => {
    // Sync HTML lang attribute with active locale for WCAG AA Accessibility
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const setTheme = (newTheme: Theme) => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.add("theme-transitioning");
      setThemeState(newTheme);
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 350);
    } else {
      setThemeState(newTheme);
    }
  };

  const value = {
    locale,
    setLocale,
    theme,
    setTheme,
    t: dictionaries[locale],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
