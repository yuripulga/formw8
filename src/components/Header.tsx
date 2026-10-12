"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/context";
import { route } from "@/lib/routes";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { HighlightedText } from "@/components/ui/HighlightedText";
import { Search } from "lucide-react";

interface HeaderProps {
  onOpenSearch?: () => void;
}

export function Header({ onOpenSearch }: HeaderProps) {
  const { t, locale } = useI18n();

  return (
    <header className="flex items-center justify-center pb-6 sm:pb-8 w-full">
      <div className="inline-flex items-center gap-2 max-w-full">
        <Link
          href={route(locale, "home")}
          className="inline-flex items-center gap-3 group transition-opacity opacity-100 sm:hover:opacity-90 cursor-pointer min-w-0"
          aria-label={t.common.title}
        >
          <BrandLogo size="md" className="shrink-0" />
          <div className="hidden lg:block min-w-0">
            <p className="text-xs text-muted-theme font-medium truncate whitespace-nowrap">
              <HighlightedText text={t.common.subtitle} />
            </p>
          </div>
        </Link>

        {onOpenSearch && (
          <button
            type="button"
            onClick={onOpenSearch}
            className="text-muted-theme hover:text-heading-theme transition-colors p-1 cursor-pointer shrink-0"
            title={t.common.searchTooltip}
            aria-label={t.search.placeholder}
          >
            <Search className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
}
