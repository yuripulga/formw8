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

const THEME_KEY = "formw8_theme";
const LOCALE_KEY = "formw8_locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Auto-detect theme from localStorage or browser preferences
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    if (savedTheme === "dark" || savedTheme === "light") {
      setThemeState(savedTheme);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setThemeState("dark");
    } else {
      setThemeState("light");
    }

    // Auto-detect locale from localStorage or browser navigator.language
    const savedLocale = localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (savedLocale && (savedLocale === "pt-BR" || savedLocale === "en-US")) {
      setLocaleState(savedLocale);
    } else {
      const browserLang = (typeof navigator !== "undefined" && (navigator.language || (navigator.languages && navigator.languages[0]))) || "";
      if (browserLang.toLowerCase().startsWith("pt")) {
        setLocaleState("pt-BR");
      } else {
        setLocaleState("en-US");
      }
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
    localStorage.setItem(THEME_KEY, theme);
  }, [theme, mounted]);

  useEffect(() => {
    // Sync HTML lang attribute with locale state for WCAG AA Accessibility
    document.documentElement.lang = locale;
    localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);


  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
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
