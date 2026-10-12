import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, UserCheck, Building2, CheckCircle2 } from "lucide-react";
import { getPillar, type PillarKind } from "@/content/pillars";
import { getPlatforms } from "@/content/platforms";
import type { Locale } from "@/i18n/config";
import { route } from "@/lib/routes";
import { SITE_URL } from "@/config/site";

interface PillarPageProps {
  locale: Locale;
  kind: PillarKind;
}

export function PillarPage({ locale, kind }: PillarPageProps) {
  const content = getPillar(locale, kind);
  const platforms = getPlatforms(locale);
  const otherKind: PillarKind = kind === "individual" ? "entity" : "individual";
  const ActionIcon = kind === "individual" ? UserCheck : Building2;
  const homeHref = route(locale, "home");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.schemaHeadline,
    description: content.schemaDescription,
    inLanguage: locale,
    author: { "@type": "Organization", name: "FormW8", url: SITE_URL },
    publisher: { "@type": "Organization", name: "FormW8" },
  };

  return (
    <AppShell showFaq={false}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />

      <div className="space-y-10 py-4 max-w-2xl mx-auto w-full">
        <div className="space-y-3 text-center sm:text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-theme">{content.badge}</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-heading-theme tracking-tight leading-tight">
            {content.title}
          </h1>
          <p className="text-sm text-muted-theme leading-relaxed">{content.intro}</p>
        </div>

        {/* Action Card */}
        <div className="p-6 rounded-2xl bg-card-surface border border-theme space-y-4">
          <div className="flex items-center gap-3">
            <ActionIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-heading-theme">{content.actionTitle}</h3>
              <p className="text-xs text-muted-theme">{content.actionSubtitle}</p>
            </div>
          </div>
          <Link href={homeHref} className="block">
            <Button variant="primary" size="lg" className="w-full justify-center text-sm">
              <span>{content.actionButton}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Detailed Points */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-heading-theme tracking-tight">{content.fieldsTitle}</h2>
          <div className="space-y-3">
            {content.fields.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-app-surface border border-theme space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="font-bold text-heading-theme">{item.title}</span>
                </div>
                <p className="text-muted-theme leading-relaxed pl-5.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-Link Pillar & Platforms */}
        <div className="pt-6 space-y-4">
          <div className="p-4 rounded-xl bg-card-surface border border-theme flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-heading-theme">{content.crossLinkTitle}</p>
              <p className="text-muted-theme">{content.crossLinkDesc}</p>
            </div>
            <Link href={route(locale, otherKind)}>
              <Button variant="secondary" size="sm" className="whitespace-nowrap">
                <span>{content.crossLinkButton}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-theme">
              {content.platformsLabel}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {content.platformSlugs
                .filter((slug) => platforms[slug])
                .map((slug) => (
                  <Link
                    key={slug}
                    href={route(locale, "platform", slug)}
                    className="px-3 py-1.5 rounded-xl bg-card-surface border border-theme text-xs font-semibold text-heading-theme hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {platforms[slug].name}
                  </Link>
                ))}
            </div>
          </div>
        </div>

        <div className="pt-2 text-center">
          <Link href={homeHref}>
            <Button variant="outline" size="md" className="text-xs">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{content.backButton}</span>
            </Button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
