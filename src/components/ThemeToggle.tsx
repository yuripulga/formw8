"use client";

import React from "react";
import { useI18n } from "@/i18n/context";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, t } = useI18n();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 border border-slate-300 dark:border-zinc-700 shadow-sm active:scale-95 transition-transform cursor-pointer"
      title={theme === "dark" ? t.common.themeLight : t.common.themeDark}
      aria-label={theme === "dark" ? t.common.themeLight : t.common.themeDark}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-500 fill-amber-500" />
      ) : (
        <Moon className="w-4 h-4 text-slate-800 fill-slate-800" />
      )}
    </button>
  );
}
