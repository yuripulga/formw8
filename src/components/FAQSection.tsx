"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/context";
import { ChevronDown, ExternalLink, Search, X } from "lucide-react";
import { HighlightedText } from "@/components/ui/HighlightedText";
import { translatePath } from "@/lib/routes";
import type { Locale } from "@/i18n/config";

/**
 * Parses markdown-style links [Text](url) safely into JSX elements.
 * Supports both internal app routes (/plataformas/deel) and external websites (https://...).
 */
function renderFaqAnswer(text: string, locale: Locale) {
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
          href={translatePath(url, locale)}
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
          className="inline-flex items-center gap-1 font-bold text-heading-theme underline underline-offset-2 decoration-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <span>{label}</span>
          <ExternalLink className="w-3 h-3 shrink-0 inline" />
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
  const { t, locale } = useI18n();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [faqSearchQuery, setFaqSearchQuery] = useState("");

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const handleOpenFaqItem = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      const id = customEvent.detail?.id;
      if (id) {
        setOpenItems((prev) => ({ ...prev, [id]: true }));
        setTimeout(() => {
          const el = document.getElementById(`faq-btn-${id}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      }
    };

    window.addEventListener("open-faq-item", handleOpenFaqItem);
    return () => {
      window.removeEventListener("open-faq-item", handleOpenFaqItem);
    };
  }, []);

  const filteredItems = useMemo(() => {
    const clean = faqSearchQuery.trim().toLowerCase();
    if (!clean) return t.faq.items;
    return t.faq.items.filter(
      (item) =>
        item.question.toLowerCase().includes(clean) ||
        item.answer.toLowerCase().includes(clean)
    );
  }, [t.faq.items, faqSearchQuery]);

  // Schema.org FAQPage structured data for rich snippet ranking
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-3">
        <h2
          id="faq-heading"
          className="text-2xl sm:text-3xl font-extrabold text-heading-theme tracking-tight"
        >
          <HighlightedText text={t.faq.title} />
        </h2>

        {/* Inline FAQ Search Bar */}
        <div className="pt-2 max-w-md mx-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-muted-theme absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={faqSearchQuery}
              onChange={(e) => setFaqSearchQuery(e.target.value)}
              placeholder={t.faq.searchPlaceholder}
              className="w-full pl-10 pr-9 py-2 text-xs rounded-xl bg-card-surface border border-theme text-heading-theme placeholder:text-muted-theme/60 focus:outline-none focus:border-emerald-500 font-medium"
            />
            {faqSearchQuery && (
              <button
                type="button"
                onClick={() => setFaqSearchQuery("")}
                className="absolute right-3 p-0.5 text-muted-theme hover:text-heading-theme transition-colors cursor-pointer"
                aria-label={t.common.clearSearch}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Accordion List with Scroll Peek & Mobile Page Scroll Area */}
      <div className="max-w-3xl mx-4 sm:mx-auto max-h-[350px] sm:max-h-[390px] overflow-y-auto pr-2 sm:pr-3 p-1 space-y-3 overscroll-contain">
        {filteredItems.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-theme">
            {t.faq.noFaqResults}
          </div>
        ) : (
          filteredItems.map((item) => {
            const isOpen = Boolean(openItems[item.id]) || Boolean(faqSearchQuery.trim());

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
                  className={`px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-muted-theme leading-relaxed ${
                    isOpen ? "block animate-fadeIn" : "hidden"
                  }`}
                >
                  <p className="pt-2">{renderFaqAnswer(item.answer, locale)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
