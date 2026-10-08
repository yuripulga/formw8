"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/context";
import { ChevronDown, ExternalLink } from "lucide-react";
import { HighlightedText } from "@/components/ui/HighlightedText";

/**
 * Parses markdown-style links [Text](url) safely into JSX elements.
 * Supports both internal app routes (/plataformas/deel) and external websites (https://...).
 */
function renderFaqAnswer(text: string) {
  const parts: React.ReactNode[] = [];
  const regex = /\[(.*?)\]\(((\/|https?:\/\/)[^\s]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const label = match[1];
    const url = match[2];

    if (url.startsWith("/")) {
      parts.push(
        <Link
          key={match.index}
          href={url}
          className="inline font-bold text-heading-theme underline underline-offset-2 decoration-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          {label}
        </Link>
      );
    } else {
      parts.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 font-bold text-heading-theme underline underline-offset-2 decoration-muted-theme/60 opacity-100 sm:hover:opacity-80 transition-opacity"
        >
          <span>{label}</span>
          <ExternalLink className="w-3 h-3 opacity-100 sm:opacity-70 inline" />
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function FAQSection() {
  const { t } = useI18n();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "what-is-w8": true, // First item open by default for immediate engagement
  });

  React.useEffect(() => {
    const handleOpenFaq = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail?.id) {
        setOpenItems((prev) => ({
          ...prev,
          [customEvent.detail.id]: true,
        }));
      }
    };

    window.addEventListener("open-faq-item", handleOpenFaq);
    return () => window.removeEventListener("open-faq-item", handleOpenFaq);
  }, []);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Structured Data (Schema.org JSON-LD for Google Rich Snippets)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/\[(.*?)\]\((https?:\/\/[^\s]+)\)/g, "$1 ($2)"),
      },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="w-full py-12 sm:py-16">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <h2
          id="faq-heading"
          className="text-2xl sm:text-3xl font-extrabold text-heading-theme tracking-tight"
        >
          <HighlightedText text={t.faq.title} />
        </h2>
      </div>

      {/* FAQ Accordion List with Scroll Peek & Mobile Page Scroll Area */}
      <div className="max-w-3xl mx-4 sm:mx-auto max-h-[350px] sm:max-h-[390px] overflow-y-auto pr-2 sm:pr-3 p-1 space-y-3 overscroll-contain">
        {t.faq.items.map((item) => {
          const isOpen = Boolean(openItems[item.id]);

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-theme dark:border-white/[0.06] bg-card-surface transition-all duration-200 overflow-hidden"
            >
              <button
                id={`faq-btn-${item.id}`}
                type="button"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-slate-900/[0.02] dark:hover:bg-white/[0.02] cursor-pointer"
              >
                <span className="font-semibold text-sm sm:text-base text-heading-theme">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 text-muted-theme transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-heading-theme" : ""
                  }`}
                />
              </button>

              <div
                id={`faq-answer-${item.id}`}
                role="region"
                aria-labelledby={`faq-btn-${item.id}`}
                className={`px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-muted-theme leading-relaxed border-t border-theme/40 dark:border-white/[0.04] ${
                  isOpen ? "block animate-fade-in" : "hidden"
                }`}
              >
                <p className="pt-3">{renderFaqAnswer(item.answer)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
