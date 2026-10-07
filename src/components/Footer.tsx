"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/context";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { HighlightedText } from "@/components/ui/HighlightedText";
import { SupportModal } from "@/components/SupportModal";
import { Heart } from "lucide-react";

export function Footer() {
  const { t } = useI18n();
  const [showSupportModal, setShowSupportModal] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="pt-6 pb-2 space-y-4">
        {/* Top Row: Logo & Post-it on Left, Support & Controls on Right */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
          {/* Left: Brand & Disclaimer Post-it */}
          <div className="flex flex-col items-center sm:items-start gap-2.5">
            <Link
              href="/"
              className="inline-flex items-center gap-3 cursor-pointer"
              aria-label={t.common.title}
            >
              <BrandLogo size="md" />
            </Link>

            {t.footer.disclaimer ? (
              <div
                style={{ backgroundColor: "var(--brand-highlight, #FFE600)" }}
                className="relative w-52 sm:w-60 p-3 sm:p-3.5 rounded-xs rounded-br-lg shadow-[2px_4px_12px_rgba(0,0,0,0.14)] -rotate-1 hover:rotate-0 transition-transform duration-200 select-none cursor-default mt-1"
              >
                {/* Subtle top sticky tape / glue strip hint */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-12 h-3 bg-white/30 backdrop-blur-[1px] rounded-xs shadow-2xs rotate-1" />
                <p className="font-handwritten text-[#0f172a] text-[15px] sm:text-[16px] font-bold leading-tight tracking-tight text-center">
                  {t.footer.disclaimer}
                </p>
              </div>
            ) : null}
          </div>

          {/* Right: Open-Source Appeal, Support Button & Theme/Language Controls */}
          <div className="flex flex-col items-center gap-2.5 self-center sm:self-start pt-1">
            {t.footer.openSourceAppeal ? (
              <p className="font-handwritten text-heading-theme text-[13px] sm:text-[14px] font-bold leading-snug -rotate-2 text-center max-w-[190px] select-none">
                {t.footer.openSourceAppeal}
              </p>
            ) : null}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowSupportModal(true)}
                style={{ backgroundColor: "var(--brand-highlight, #FFE600)" }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#1e293b] hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
              >
                <Heart className="w-3.5 h-3.5 fill-[#1e293b] stroke-[#1e293b]" />
                <span>{t.footer.links.supportPix}</span>
              </button>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Centered Copyright & Powered by Quimera.biz */}
        <div className="text-center text-[11px] text-muted-theme space-y-0.5 pt-1 pb-2">
          <p>
            © {currentYear} {t.common.title}. {t.footer.copyright}
          </p>
          <p className="flex items-center justify-center gap-1.5">
            <span>{t.footer.poweredBy}</span>
            <a
              href="https://quimera.biz"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block font-bold text-[#1e293b] isolate px-1 hover:opacity-90 transition-opacity"
            >
              <svg
                className="absolute -inset-x-[3px] inset-y-0 w-[calc(100%+6px)] h-full z-0 pointer-events-none select-none"
                viewBox="0 0 100 24"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M 1 4 C 22 2, 58 3, 99 1 C 100 9, 99 18, 98 23 C 72 22, 28 24, 1 21 C 0.5 15, 0.8 9, 1 4 Z"
                  fill="var(--brand-highlight, #FFE600)"
                />
              </svg>
              <span className="relative z-10">Quimera.biz</span>
            </a>
          </p>
        </div>
      </footer>

      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </>
  );
}


