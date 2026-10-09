"use client";

import React, { useEffect } from "react";
import { useI18n } from "@/i18n/context";
import { SPONSOR_MAILTO } from "@/config/contact";

interface ProgrammaticAdSlotProps {
  slotId?: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
}

/**
 * Non-intrusive Programmatic Ad Slot
 * Renders an asynchronous Google AdSense / programmatic unit with zero layout shift.
 * Shows a subtle sponsor invitation in development or when ads are not configured.
 */
export function ProgrammaticAdSlot({
  slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID,
  format = "auto",
  className = "",
}: ProgrammaticAdSlotProps) {
  const { t } = useI18n();
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (client && slotId && typeof window !== "undefined") {
      try {
        const existingScript = document.querySelector(
          `script[src*="pagead2.googlesyndication.com"]`
        );
        if (!existingScript) {
          const script = document.createElement("script");
          script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
          script.async = true;
          script.crossOrigin = "anonymous";
          document.head.appendChild(script);
        }

        // @ts-expect-error Google adsbygoogle global array push
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // Suppress adblocker or initialization errors
      }
    }
  }, [client, slotId]);

  if (!client || !slotId) {
    return (
      <aside
        aria-label={t.ads.sponsorBadge}
        className={`w-full max-w-2xl mx-auto my-6 p-4 rounded-2xl bg-card-surface border border-dashed border-theme text-center space-y-1.5 ${className}`}
      >
        <span className="text-xs font-bold tracking-wider uppercase text-muted-theme px-2 py-0.5 rounded bg-app-surface border border-theme">
          {t.ads.sponsorBadge}
        </span>
        <p className="text-xs text-muted-theme">
          {t.ads.sponsorPrompt}{" "}
          <a
            href={SPONSOR_MAILTO}
            className="font-bold text-heading-theme underline underline-offset-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            {t.ads.contactUs}
          </a>
        </p>
      </aside>
    );
  }

  return (
    <aside
      aria-label={t.ads.adLabel}
      className={`w-full max-w-2xl mx-auto my-6 overflow-hidden rounded-2xl bg-card-surface border border-theme text-center ${className}`}
    >
      <div className="py-1 px-3 bg-app-surface text-xs text-muted-theme uppercase tracking-wider text-right">
        {t.ads.adLabel}
      </div>
      <div className="min-h-[90px] flex items-center justify-center p-2">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
