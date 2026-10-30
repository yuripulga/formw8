"use client";

import React from "react";
import { useI18n } from "@/i18n/context";
import { ExternalLink, Briefcase } from "lucide-react";
import { AFFILIATE_CONFIG, TALENT_PARTNERS, type TalentPartnerKey } from "@/config/affiliates";

export function TalentCards() {
  const { t } = useI18n();

  const getPartnerCopy = (key: TalentPartnerKey) => {
    switch (key) {
      case "micro1":
        return {
          tag: t.wizard.stepConfirmation.talentMicro1Tag,
          desc: t.wizard.stepConfirmation.talentMicro1Desc,
        };
      case "mercor":
        return {
          tag: t.wizard.stepConfirmation.talentMercorTag,
          desc: t.wizard.stepConfirmation.talentMercorDesc,
        };
      case "toptal":
        return {
          tag: t.wizard.stepConfirmation.talentToptalTag,
          desc: t.wizard.stepConfirmation.talentToptalDesc,
        };
    }
  };

  return (
    <div className="pt-6 space-y-3.5 border-t border-theme/60 mt-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <h3 className="text-base sm:text-lg font-bold text-heading-theme">
            {t.wizard.stepConfirmation.talentTitle}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-muted-theme leading-relaxed">
          {t.wizard.stepConfirmation.talentSubtitle}
        </p>
        <p className="text-xs text-muted-theme leading-relaxed italic">
          {t.wizard.stepConfirmation.talentDisclosure}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TALENT_PARTNERS.map((partnerKey) => {
          const config = AFFILIATE_CONFIG[partnerKey];
          const copy = getPartnerCopy(partnerKey);

          return (
            <div
              key={partnerKey}
              className="p-4 rounded-xl bg-card-surface border border-theme flex flex-col justify-between space-y-3 shadow-sm hover:border-emerald-500/50 transition-colors"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-heading-theme">
                    {config.name}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
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
                <span>{t.wizard.stepConfirmation.talentLearnMore}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
