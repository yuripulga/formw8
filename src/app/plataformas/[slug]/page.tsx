import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { PLATFORMS_DATA, PlatformInfo } from "@/lib/platforms-data";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { ProgrammaticAdSlot } from "@/components/ui/ProgrammaticAdSlot";
import { ArrowLeft, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

interface PlatformPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(PLATFORMS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PlatformPageProps): Promise<Metadata> {
  const { slug } = await params;
  const platform = PLATFORMS_DATA[slug];

  if (!platform) {
    return {
      title: "Plataforma Não Encontrada | FormW8",
    };
  }

  const url = `${SITE_URL}/plataformas/${platform.slug}`;

  return {
    title: `${platform.title} | FormW8`,
    description: platform.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${platform.title} | FormW8`,
      description: platform.metaDescription,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: platform.title,
      description: platform.metaDescription,
    },
  };
}

import ptBR from "@/i18n/dictionaries/pt-BR.json";
import { SITE_URL } from "@/config/site";

export default async function PlatformPage({ params }: PlatformPageProps) {
  const { slug } = await params;
  const platform: PlatformInfo | undefined = PLATFORMS_DATA[slug];

  if (!platform) {
    notFound();
  }

  const t = ptBR.platformPage;

  // Structured Data (HowTo Schema + FAQPage Schema for this specific platform)
  const platformSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guias de Plataformas",
            item: `${SITE_URL}/#platforms`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: platform.name,
            item: `${SITE_URL}/plataformas/${platform.slug}`,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: platform.title,
        description: platform.metaDescription,
        step: platform.instructions.map((inst, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: inst.title,
          text: inst.description,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: platform.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  // Extract parenthesized text into top badge if present, and clean the h1 title
  const titleMatch = platform.title.match(/^(.*?)\s*\((.*?)\)$/);
  const mainTitle = titleMatch ? titleMatch[1].trim() : platform.title;
  const guideBadge = titleMatch ? titleMatch[2].trim() : `Guia Fiscal ${platform.name}`;

  return (
    <AppShell showFaq={false}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchema).replace(/</g, "\\u003c") }}
      />

      <div className="space-y-10 py-4 max-w-2xl mx-auto w-full">
        {/* Page Hero */}
        <div className="space-y-3 text-center sm:text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-theme">
            {guideBadge}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-heading-theme tracking-tight leading-tight">
            {mainTitle}
          </h1>
          <p className="text-sm text-muted-theme leading-relaxed">
            {platform.summary}
          </p>
        </div>

        {/* Primary CTA Box */}
        <div className="p-6 rounded-2xl bg-card-surface border border-theme space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-heading-theme">
                {t.needFormReady.replace("{name}", platform.name)}
              </h3>
              <p className="text-xs text-muted-theme">
                {t.generateFast}
              </p>
            </div>
          </div>
          <Link href="/" className="block">
            <Button variant="primary" size="lg" className="w-full justify-center text-sm">
              <span>{t.generateCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-heading-theme tracking-tight">
            {t.stepByStepTitle.replace("{name}", platform.name)}
          </h2>
          <div className="space-y-3">
            {platform.instructions.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-app-surface border border-theme space-y-1.5 text-xs"
              >
                <h3 className="font-bold text-heading-theme text-sm">
                  {step.title}
                </h3>
                <p className="text-muted-theme leading-relaxed">
                  {step.description}
                </p>
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
                <div
                  key={i}
                  className="p-4 rounded-xl bg-card-surface border border-theme space-y-1 text-xs"
                >
                  <h3 className="font-semibold text-heading-theme">
                    {f.question}
                  </h3>
                  <p className="text-muted-theme leading-relaxed">
                    {f.answer}
                  </p>
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
            {Object.values(PLATFORMS_DATA)
              .filter((p) => p.slug !== platform.slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/plataformas/${p.slug}`}
                  className="px-3 py-1.5 rounded-xl bg-card-surface border border-theme text-xs font-semibold text-heading-theme hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {p.name}
                </Link>
              ))}
          </div>
        </div>

        {/* Bottom Generator Button */}
        <div className="pt-2 text-center">
          <Link href="/">
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
