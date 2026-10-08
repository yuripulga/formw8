"use client";

import React from "react";
import { useI18n } from "@/i18n/context";

/**
 * KeywordSlider (SEO Keyword Infinite Marquee)
 * Slider sutil de palavras-chave estratégicas para indexação e relevância semântica de SEO,
 * posicionado acima do footer com animação lenta e contínua.
 */
export type KeywordSliderItem = string | { text: string; faqId?: string };

interface KeywordSliderProps {
  items?: KeywordSliderItem[];
  className?: string;
  ariaLabel?: string;
}

export function KeywordSlider({
  items,
  className = "",
  ariaLabel = "Termos de busca fiscais",
}: KeywordSliderProps) {
  const { t } = useI18n();
  const keywords = items || (t.footer.keywords as unknown as KeywordSliderItem[]) || [];

  if (keywords.length === 0) return null;

  // Duplicar a lista para permitir loop contínuo e infinito
  const displayKeywords = [...keywords, ...keywords, ...keywords];

  const handleClickItem = (faqId?: string) => {
    if (!faqId) return;
    window.dispatchEvent(new CustomEvent("open-faq-item", { detail: { id: faqId } }));
    const el = document.getElementById(`faq-heading`) || document.getElementById(`faq-answer-${faqId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className={`w-full py-2 sm:py-2.5 overflow-hidden relative select-none opacity-100 sm:opacity-30 sm:hover:opacity-85 transition-opacity duration-300 ${className}`}
      aria-label={ariaLabel}
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      {/* Faixa contínua com palavras soltas e sutis */}
      <div className="animate-marquee-slow flex items-center gap-8 sm:gap-12">
        {displayKeywords.map((item, idx) => {
          const text = typeof item === "string" ? item : item.text;
          const faqId = typeof item === "string" ? undefined : item.faqId;

          return (
            <button
              key={`${text}-${idx}`}
              type="button"
              onClick={() => handleClickItem(faqId)}
              className={`text-[11px] sm:text-xs whitespace-nowrap transition-colors select-none text-left ${
                faqId
                  ? "text-muted-theme hover:text-heading-theme hover:underline cursor-pointer font-medium"
                  : "text-muted-theme hover:text-heading-theme font-normal cursor-default"
              }`}
            >
              {text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
