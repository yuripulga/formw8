"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n/context";
import { PLATFORMS_DATA } from "@/lib/platforms-data";
import {
  Search,
  X,
  Building2,
  FileText,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResultItem {
  id: string;
  category: "platforms" | "guides" | "faq";
  title: string;
  description: string;
  url: string;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { t } = useI18n();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Build searchable database from static platforms, pillar pages, and FAQ items
  const allItems: SearchResultItem[] = [
    // Form Models & Core Guides
    {
      id: "guide-home",
      category: "guides",
      title: t.footer.documents.generatorHome,
      description: t.search.guideHomeDesc,
      url: "/",
    },
    {
      id: "guide-pf",
      category: "guides",
      title: t.footer.documents.pfGuide,
      description: t.search.guidePfDesc,
      url: "/w8ben-pessoa-fisica",
    },
    {
      id: "guide-pj",
      category: "guides",
      title: t.footer.documents.pjGuide,
      description: t.search.guidePjDesc,
      url: "/w8bene-pessoa-juridica",
    },
    // Platform Guides
    ...Object.values(PLATFORMS_DATA).map((p) => ({
      id: `platform-${p.slug}`,
      category: "platforms" as const,
      title: p.name,
      description: p.summary || p.category,
      url: `/plataformas/${p.slug}`,
    })),
    // FAQ Items
    ...t.faq.items.map((item) => ({
      id: `faq-${item.id}`,
      category: "faq" as const,
      title: item.question,
      description: item.answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").slice(0, 120) + "...",
      url: `/#faq-btn-${item.id}`,
    })),
  ];

  // Filter based on search query
  const cleanQuery = query.trim().toLowerCase();
  const filteredItems = cleanQuery
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(cleanQuery) ||
          item.description.toLowerCase().includes(cleanQuery)
      )
    : allItems.slice(0, 8); // Default suggestions when query is empty

  const handleSelect = React.useCallback(
    (url: string) => {
      onClose();
      if (url.startsWith("/#")) {
        const targetId = url.replace("/#", "");
        if (targetId.startsWith("faq-")) {
          const faqId = targetId.replace("faq-", "");
          window.dispatchEvent(new CustomEvent("open-faq-item", { detail: { id: faqId } }));
        }
        const elem =
          document.getElementById(targetId) ||
          document.getElementById(`faq-btn-${targetId.replace("faq-", "")}`);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
          elem.click();
        } else {
          router.push(url);
        }
      } else {
        router.push(url);
      }
    },
    [onClose, router]
  );

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = filteredItems[selectedIndex];
        if (selected) {
          handleSelect(selected.url);
        }
      } else if (e.key === "Tab" && modalRef.current) {
        const focusables = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, filteredItems, selectedIndex, onClose, handleSelect]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.search.placeholder}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-xl rounded-2xl bg-card-surface border border-theme shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-fadeIn focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 bg-app-surface">
          <Search className="w-4 h-4 text-muted-theme shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={t.search.placeholder}
            className="flex-1 bg-transparent text-sm text-heading-theme placeholder:text-muted-theme/60 focus:outline-none font-medium"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-muted-theme hover:text-heading-theme p-1 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="text-xs font-mono font-semibold bg-card-surface px-1.5 py-0.5 rounded border border-theme text-muted-theme">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 overscroll-contain">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-theme space-y-1">
              <p>
                {t.search.noResults} <span className="font-bold text-heading-theme">&ldquo;{query}&rdquo;</span>
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              const Icon =
                item.category === "platforms"
                  ? Building2
                  : item.category === "guides"
                  ? FileText
                  : HelpCircle;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.url)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-drawer-surface text-heading-theme border border-theme"
                      : "text-body-theme hover:bg-app-surface border border-transparent"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-app-surface text-muted-theme"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-heading-theme truncate">
                        {item.title}
                      </span>
                      <span className="text-xs font-semibold text-muted-theme uppercase tracking-wider px-1.5 py-0.5 rounded bg-app-surface border border-theme shrink-0">
                        {t.search.categories[item.category]}
                      </span>
                    </div>
                    <p className="text-xs text-muted-theme truncate font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  {isSelected && (
                    <ArrowRight className="w-3.5 h-3.5 text-muted-theme shrink-0 self-center" />
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Search Footer Shortcuts */}
        <div className="px-4 py-2.5 bg-app-surface flex items-center justify-between text-xs text-muted-theme">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-card-surface rounded border border-theme text-xs font-mono font-semibold text-heading-theme">
                ↑
              </kbd>
              <kbd className="px-1 py-0.5 bg-card-surface rounded border border-theme text-xs font-mono font-semibold text-heading-theme">
                ↓
              </kbd>
              <span>{t.search.shortcutHint}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-card-surface rounded border border-theme text-xs font-mono font-semibold text-heading-theme">
                ↵
              </kbd>
              <span>{t.search.selectHint}</span>
            </span>
          </div>
          <span className="inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-500" />
            <span className="font-semibold text-heading-theme">FormW8</span>
          </span>
        </div>
      </div>
    </div>
  );
}
