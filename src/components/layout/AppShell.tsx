"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { useI18n } from "@/i18n/context";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { KeywordSlider } from "@/components/ui/KeywordSlider";
import { CloudBackground } from "@/components/ui/CloudBackground";
import { ScreensaverFormBackground } from "@/components/ui/ScreensaverFormBackground";
import { HighlighterPenDecoration } from "@/components/ui/HighlighterPenDecoration";
import { LampPullCord } from "@/components/ui/LampPullCord";
import { FAQSection } from "@/components/FAQSection";
import { SearchModal } from "@/components/SearchModal";
import { LanguageSuggestion } from "@/components/LanguageSuggestion";

interface AppShellProps {
  children: ReactNode;
  className?: string;
  showFaq?: boolean;
}

/**
 * Unified Layout Shell for FormW8
 * Enforces identical wrapper styling, header, footer, keyword sliders, cloud background, cookie banner, search modal, FAQ, and responsiveness across all pages.
 */
export function AppShell({ children, className = "", showFaq = true }: AppShellProps) {
  const { t } = useI18n();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="bg-app-surface text-body-theme flex flex-col relative overflow-x-hidden selection:bg-slate-900/10 selection:text-slate-900 dark:selection:bg-white/10 dark:selection:text-white">
      <LanguageSuggestion />

      {/* Subtle Ambient Cloud Background (100% full screen) */}
      <CloudBackground />

      {/* Subtle Screensaver Floating Form Background (Zero Libs) */}
      <ScreensaverFormBackground />

      {/* Section 1: Header + Main Wizard (Fills full viewport on desktop; clean focused view on mobile) */}
      <div className="min-h-screen flex flex-col justify-between pt-6 sm:pt-8 pb-2 sm:pb-3 relative z-10">
        <Container className={`flex-1 flex flex-col justify-between relative z-10 ${className}`}>
          <Header onOpenSearch={() => setIsSearchOpen(true)} />
          <main className="flex-1 flex flex-col justify-center my-auto py-2 sm:py-4 w-full">
            {children}
          </main>
          {/* Desktop Only: Slider at the bottom of the initial fold */}
          <div className="w-full pt-4 sm:pt-8 pb-0 mt-auto hidden sm:block">
            <KeywordSlider
              items={t.footer.relatedSearches}
              ariaLabel={t.common.relatedSearchesLabel}
            />
          </div>
        </Container>
      </div>

      {/* Mobile Only: First Slider positioned below the initial viewport fold */}
      <div className="sm:hidden relative z-10 w-full pt-4 pb-2">
        <Container>
          <KeywordSlider
            items={t.footer.relatedSearches}
            ariaLabel={t.common.relatedSearchesLabel}
          />
        </Container>
      </div>

      {/* Section 2: Comprehensive SEO FAQ Section (Positioned below the first screen fold) */}
      {showFaq && (
        <div className="relative z-10">
          <Container>
            <FAQSection />
          </Container>
        </div>
      )}

      {/* Section 3: Bottom Platform Keywords Slider (Positioned between FAQ and Footer) */}
      <div className="relative z-10 w-full pt-2 pb-2">
        <Container>
          <KeywordSlider
            items={t.footer.keywords}
            ariaLabel={t.common.keywordsLabel}
          />
        </Container>
      </div>

      {/* Section 4: Footer (Positioned below FAQ with design system padding) */}
      <div className="relative z-10">
        <Container className="pt-4 pb-2 sm:pb-3">
          <Footer />
        </Container>
      </div>

      <HighlighterPenDecoration />
      <LampPullCord />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
