"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/context";

import { BrandLogo } from "@/components/ui/BrandLogo";
import { HighlightedText } from "@/components/ui/HighlightedText";

export function Header() {
  const { t } = useI18n();

  return (
    <header className="flex items-center justify-between pb-6 sm:pb-8">
      <Link
        href="/"
        className="flex items-center gap-3 group transition-opacity hover:opacity-90 cursor-pointer min-w-0"
        aria-label={t.common.title}
      >
        <BrandLogo size="md" className="shrink-0" />
        <div className="hidden lg:block min-w-0">
          <p className="text-xs text-muted-theme font-medium truncate whitespace-nowrap">
            <HighlightedText text={t.common.subtitle} />
          </p>
        </div>
      </Link>
    </header>
  );
}

