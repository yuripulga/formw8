"use client";

import React from "react";
import { useI18n } from "@/i18n/context";
import { ArrowUpRight, BrainCircuit, Sparkles, Trophy } from "lucide-react";
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

  const getPartnerIcon = (key: TalentPartnerKey) => {
    switch (key) {
      case "micro1":
        return BrainCircuit;
      case "mercor":
        return Sparkles;
      case "toptal":
        return Trophy;
    }
  };

  return (
    <div className="pt-6 space-y-3.5">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10">
            {t.wizard.stepConfirmation.talentEyebrow}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-heading-theme">
            {t.wizard.stepConfirmation.talentTitle}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-muted-theme leading-relaxed">
          {t.wizard.stepConfirmation.talentSubtitle}
        </p>
      </div>

      <div className="space-y-2.5">
        {TALENT_PARTNERS.map((partnerKey) => {
          const config = AFFILIATE_CONFIG[partnerKey];
          const copy = getPartnerCopy(partnerKey);
          const Icon = getPartnerIcon(partnerKey);

          return (
            <a
              key={partnerKey}
              href={config.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="p-3.5 sm:p-4 rounded-xl bg-card-surface border border-theme flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-emerald-500/60 transition-all cursor-pointer active:scale-[0.99] shadow-sm"
            >
              <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-app-surface border border-theme flex items-center justify-center shrink-0 text-muted-theme group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/40 transition-colors shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-heading-theme group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {config.name}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {copy.tag}
                    </span>
                  </div>
                  <p className="text-xs text-muted-theme leading-relaxed">
                    {copy.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center self-end sm:self-center shrink-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold py-2 px-3.5 rounded-xl btn-brand-primary group-hover:shadow-sm transition-all">
                  <span>{t.wizard.stepConfirmation.talentLearnMore}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
