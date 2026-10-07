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
      className="p-2.5 rounded-xl bg-card-surface text-body-theme hover:text-heading-theme border border-theme transition-all cursor-pointer"
      title={theme === "dark" ? t.common.themeLight : t.common.themeDark}
      aria-label={theme === "dark" ? t.common.themeLight : t.common.themeDark}
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
