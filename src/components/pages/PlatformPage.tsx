import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { ProgrammaticAdSlot } from "@/components/ui/ProgrammaticAdSlot";
import { ArrowLeft, ArrowRight, ShieldCheck, HelpCircle, ExternalLink } from "lucide-react";
import { getPlatforms } from "@/content/platforms";
import { AFFILIATE_CONFIG, type AffiliateKey } from "@/config/affiliates";
import { getDictionary } from "@/i18n/server";
import type { Locale } from "@/i18n/config";
import { route } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

interface PlatformPageProps {
  locale: Locale;
  slug: string;
}

export function PlatformPage({ locale, slug }: PlatformPageProps) {
  const platforms = getPlatforms(locale);
  const platform = platforms[slug];

  if (!platform) {
    notFound();
  }

  const t = getDictionary(locale).platformPage;
  const affiliate = slug in AFFILIATE_CONFIG ? AFFILIATE_CONFIG[slug as AffiliateKey] : undefined;

  // Structured Data (BreadcrumbList + HowTo + FAQPage for this specific platform)
  const platformSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: absoluteUrl(locale, "home") },
          { "@type": "ListItem", position: 2, name: t.breadcrumbGuides, item: `${absoluteUrl(locale, "home")}#platforms` },
          { "@type": "ListItem", position: 3, name: platform.name, item: absoluteUrl(locale, "platform", platform.slug) },
        ],
      },
      {
        "@type": "HowTo",
        name: platform.title,
        description: platform.metaDescription,
        inLanguage: locale,
        step: platform.instructions.map((inst, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: inst.title,
          text: inst.description,
        })),
      },
      {
        "@type": "FAQPage",
        inLanguage: locale,
        mainEntity: platform.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  // Extract parenthesized text into the top badge and clean the h1 title
  const titleMatch = platform.title.match(/^(.*?)\s*\((.*?)\)$/);
  const mainTitle = titleMatch ? titleMatch[1].trim() : platform.title;
  const guideBadge = titleMatch
    ? titleMatch[2].trim()
    : t.fallbackBadge.replace("{name}", platform.name);

  const homeHref = route(locale, "home");

  return (
    <AppShell showFaq={false}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchema).replace(/</g, "\\u003c") }}
      />

      <div className="space-y-10 py-4 max-w-2xl mx-auto w-full">
        {/* Page Hero */}
        <div className="space-y-3 text-center sm:text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-theme">{guideBadge}</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-heading-theme tracking-tight leading-tight">
            {mainTitle}
          </h1>
          <p className="text-sm text-muted-theme leading-relaxed">{platform.summary}</p>
        </div>

        {/* Primary CTA Box */}
        <div className="p-6 rounded-2xl bg-card-surface border border-theme space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-heading-theme">
                {t.needFormReady.replace("{name}", platform.name)}
              </h3>
              <p className="text-xs text-muted-theme">{t.generateFast}</p>
            </div>
          </div>
          <Link href={homeHref} className="block">
            <Button variant="primary" size="lg" className="w-full justify-center text-sm">
              <span>{t.generateCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Partner Box for Affiliate Platforms (Husky, Wise) */}
        {affiliate && affiliate.isAffiliate && (
          <div className="p-5 rounded-2xl bg-card-surface border border-theme flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:border-emerald-500/50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-heading-theme">{affiliate.name}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {t.partnerBadge}
                </span>
              </div>
              <p className="text-xs text-muted-theme leading-relaxed">
                {t.partnerDesc.replace("{name}", affiliate.name)}
              </p>
            </div>
            <a
              href={affiliate.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-xl btn-brand-primary transition-all whitespace-nowrap cursor-pointer active:scale-95 shrink-0"
            >
              <span>{t.partnerCta.replace("{name}", affiliate.name)}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Step-by-Step Instructions */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-heading-theme tracking-tight">
            {t.stepByStepTitle.replace("{name}", platform.name)}
          </h2>
          <div className="space-y-3">
            {platform.instructions.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-app-surface border border-theme space-y-1.5 text-xs">
                <h3 className="font-bold text-heading-theme text-sm">{step.title}</h3>
                <p className="text-muted-theme leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Non-intrusive Sponsor / Ad Slot */}
        <ProgrammaticAdSlot />

        {/* Platform Specific FAQ */}
        {platform.faq.length > 0 && (
          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-bold text-heading-theme tracking-tight flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-muted-theme" />
              <span>{t.faqTitle.replace("{name}", platform.name)}</span>
            </h2>
            <div className="space-y-3">
              {platform.faq.map((f, i) => (
                <div key={i} className="p-4 rounded-xl bg-card-surface border border-theme space-y-1 text-xs">
                  <h3 className="font-semibold text-heading-theme">{f.question}</h3>
                  <p className="text-muted-theme leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Platform Guides Links */}
        <div className="pt-6 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-theme text-center">
            {t.otherGuides}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {Object.values(platforms)
              .filter((p) => p.slug !== platform.slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={route(locale, "platform", p.slug)}
                  className="px-3 py-1.5 rounded-xl bg-card-surface border border-theme text-xs font-semibold text-heading-theme hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {p.name}
                </Link>
              ))}
          </div>
        </div>

        {/* Bottom Generator Button */}
        <div className="pt-2 text-center">
          <Link href={homeHref}>
            <Button variant="outline" size="md" className="text-xs">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.backToGenerator}</span>
            </Button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

