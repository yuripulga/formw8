"use client";

import React, { ReactNode } from "react";
import { useI18n } from "@/i18n/context";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Container } from "@/components/ui/Container";
import { KeywordSlider } from "@/components/ui/KeywordSlider";
import { CloudBackground } from "@/components/ui/CloudBackground";
import { ScreensaverFormBackground } from "@/components/ui/ScreensaverFormBackground";
import { HighlighterPenDecoration } from "@/components/ui/HighlighterPenDecoration";
import { LampPullCord } from "@/components/ui/LampPullCord";
import { FAQSection } from "@/components/FAQSection";

interface AppShellProps {
  children: ReactNode;
  className?: string;
  showFaq?: boolean;
}

/**
 * Unified Layout Shell for FormW8
 * Enforces identical wrapper styling, header, footer, keyword sliders, cloud background, cookie banner, FAQ, and responsiveness across all pages.
 */
export function AppShell({ children, className = "", showFaq = true }: AppShellProps) {
  const { t } = useI18n();

  return (
    <div className="bg-app-surface text-body-theme flex flex-col relative overflow-x-hidden selection:bg-slate-900/10 selection:text-slate-900 dark:selection:bg-white/10 dark:selection:text-white">
      {/* Subtle Ambient Cloud Background (100% full screen) */}
      <CloudBackground />

      {/* Subtle Screensaver Floating Form Background (Zero Libs) */}
      <ScreensaverFormBackground />

      {/* Section 1: Header + Main Wizard + Related Searches Slider (Fills full initial viewport height) */}
      <div className="min-h-screen flex flex-col justify-between pt-6 sm:pt-8 pb-2 sm:pb-3 relative z-10">
        <Container className={`flex-1 flex flex-col justify-between relative z-10 ${className}`}>
          <Header />
          <main className="flex-1 flex flex-col justify-center my-auto py-2 sm:py-4 w-full">
            {children}
          </main>
          <div className="w-full pt-4 sm:pt-8 pb-0 mt-auto">
            <KeywordSlider
              items={t.footer.relatedSearches}
              ariaLabel="Buscas relacionadas fiscais"
            />
          </div>
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
            ariaLabel="Palavras-chave de plataformas e conformidade"
          />
        </Container>
      </div>

      {/* Section 4: Footer (Positioned below FAQ with design system padding) */}
      <div>
        <Container className="pt-4 pb-2 sm:pb-3">
          <Footer />
        </Container>
      </div>

      <CookieBanner />
      <HighlighterPenDecoration />
      <LampPullCord />
    </div>
  );
}



