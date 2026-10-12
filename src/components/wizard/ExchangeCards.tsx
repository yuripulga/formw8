"use client";

import React from "react";
import { useI18n } from "@/i18n/context";
import { ExternalLink } from "lucide-react";
import { AFFILIATE_CONFIG } from "@/config/affiliates";

const partners: Array<"husky" | "higlobe" | "wise"> = ["husky", "higlobe", "wise"];

export function ExchangeCards() {
  const { t } = useI18n();

  const getPartnerCopy = (key: "husky" | "higlobe" | "wise") => {
    switch (key) {
      case "husky":
        return {
          tag: t.wizard.stepConfirmation.exchangeHuskyTag,
          desc: t.wizard.stepConfirmation.exchangeHuskyDesc,
        };
      case "higlobe":
        return {
          tag: t.wizard.stepConfirmation.exchangeHiglobeTag,
          desc: t.wizard.stepConfirmation.exchangeHiglobeDesc,
        };
      case "wise":
        return {
          tag: t.wizard.stepConfirmation.exchangeWiseTag,
          desc: t.wizard.stepConfirmation.exchangeWiseDesc,
        };
    }
  };

  return (
    <div className="pt-6 space-y-3.5">
      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-heading-theme">
          {t.wizard.stepConfirmation.exchangeTitle}
        </h3>
        <p className="text-xs sm:text-sm text-muted-theme leading-relaxed">
          {t.wizard.stepConfirmation.exchangeSubtitle}
        </p>
        <p className="text-xs text-muted-theme leading-relaxed italic">
          {t.wizard.stepConfirmation.exchangeDisclosure}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {partners.map((partnerKey) => {
          const config = AFFILIATE_CONFIG[partnerKey];
          const copy = getPartnerCopy(partnerKey);
          const badgeClass = config.isAffiliate
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "bg-slate-500/10 text-slate-600 dark:text-slate-400";

          return (
            <div
              key={partnerKey}
              className="p-4 rounded-xl bg-card-surface border border-theme flex flex-col justify-between space-y-3 shadow-sm hover:border-emerald-500/50 transition-colors"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-heading-theme">
                    {partnerKey === "husky" ? "Husky" : config.name}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeClass}`}>
                    {copy.tag}
                  </span>
                </div>
                <p className="text-xs text-muted-theme leading-relaxed">
                  {copy.desc}
                </p>
              </div>
              <a
                href={config.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2 px-3 rounded-xl transition-all cursor-pointer active:scale-95 ${
                  config.isAffiliate ? "btn-brand-primary" : "btn-brand-outline"
                }`}
              >
                <span>{t.wizard.stepConfirmation.exchangeLearnMore}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
