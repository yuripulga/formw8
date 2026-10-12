"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Locale } from "./config";
import { parseRoute, translatePath } from "@/lib/routes";
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
  // The locale comes from the URL (pt-BR at the root, /en for English), so the
  // server-rendered HTML already has the right language for every page.
  const pathname = usePathname() || "/";
  const router = useRouter();
  const locale: Locale = parseRoute(pathname).locale;
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
    if (newLocale !== locale) {
      router.push(translatePath(pathname, newLocale));
    }
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
