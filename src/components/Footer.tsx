"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/context";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SupportModal } from "@/components/SupportModal";
import { Heart, ExternalLink } from "lucide-react";

function renderOpenSourceText(text: string) {
  const parts = text.split(/(\{openSource\}[\s\S]*?\{\/openSource\})/g);
  return parts.map((part, i) => {
    if (part.startsWith("{openSource}") && part.endsWith("{/openSource}")) {
      const content = part.replace("{openSource}", "").replace("{/openSource}", "");
      return (
        <a
          key={i}
          href="https://github.com/yuripulga/formw8"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 decoration-current hover:text-heading-theme transition-colors font-bold"
        >
          {content}
        </a>
      );
    }
    return part;
  });
}

export function Footer() {
  const { t } = useI18n();
  const [showSupportModal, setShowSupportModal] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="pt-6 pb-2 space-y-5">
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
                className="relative w-52 sm:w-60 p-3 sm:p-3.5 rounded-sm rounded-br-lg shadow-[2px_4px_12px_rgba(0,0,0,0.14)] -rotate-1 hover:rotate-0 transition-transform duration-200 select-none cursor-default mt-1 opacity-100"
              >
                {/* Solid top sticky tape / glue strip hint */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-12 h-3 bg-white dark:bg-zinc-200 rounded-sm shadow-sm rotate-1" />
                <p className="font-handwritten text-slate-900 text-sm sm:text-base font-bold leading-tight tracking-tight text-center">
                  {t.footer.disclaimer}
                </p>
              </div>
            ) : null}
          </div>

          {/* Right: Open-Source Appeal, Support Button & Theme/Language Controls */}
          <div className="flex flex-col items-center gap-2.5 self-center sm:self-start pt-1">
            {t.footer.openSourceAppeal ? (
              <p className="font-handwritten text-heading-theme text-xs sm:text-sm font-bold leading-snug -rotate-2 text-center max-w-[190px] select-none opacity-100">
                {renderOpenSourceText(t.footer.openSourceAppeal)}
              </p>
            ) : null}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowSupportModal(true)}
                style={{ backgroundColor: "var(--brand-highlight, #FFE600)" }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-900 shadow-sm active:scale-95 transition-transform cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-slate-900 stroke-slate-900" />
                <span>{t.footer.links.supportPix}</span>
              </button>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

        {/* Form Models & Direct Documentation Links (Our Own Created Pages + Official IRS) */}
        <nav aria-label={t.footer.navLabel} className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-muted-theme">
          <Link href="/" className="hover:text-heading-theme hover:underline underline-offset-2 transition-colors">
            {t.footer.documents.generatorHome}
          </Link>
          <Link href="/w8ben-pessoa-fisica" className="hover:text-heading-theme hover:underline underline-offset-2 transition-colors">
            {t.footer.documents.pfGuide}
          </Link>
          <Link href="/w8bene-pessoa-juridica" className="hover:text-heading-theme hover:underline underline-offset-2 transition-colors">
            {t.footer.documents.pjGuide}
          </Link>
          <a
            href="mailto:info@quimera.biz?subject=Parceria%20e%20Patrocinio%20FormW8"
            className="hover:text-heading-theme hover:underline underline-offset-2 transition-colors font-semibold"
          >
            {t.footer.links.sponsorContact}
          </a>
          <a
            href="https://www.irs.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-heading-theme hover:underline underline-offset-2 transition-colors inline-flex items-center gap-1"
          >
            <span>{t.footer.documents.irsHome}</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        </nav>

        {/* Bottom Row: Centered Copyright & Powered by Quimera.biz */}
        <div className="text-center text-xs text-body-theme dark:text-zinc-300 font-medium opacity-100 space-y-1 pt-1 pb-2">
          <p>
            © {currentYear} {t.common.title}. {t.footer.copyright}
          </p>
          <p className="flex items-center justify-center gap-1.5">
            <span>{t.footer.poweredBy}</span>
            <a
              href="https://quimera.biz"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block font-bold text-slate-900 isolate px-1 opacity-100 sm:hover:opacity-90 transition-opacity"
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
