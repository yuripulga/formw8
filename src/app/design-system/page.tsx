"use client";

import React, { useState, useEffect } from "react";
import { useI18n } from "@/i18n/context";
import { sanitizeASCII, wasSanitized } from "@/lib/sanitizer";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ContextDrawer } from "@/components/ui/Drawer";
import { OptionCard } from "@/components/ui/OptionCard";
import { HighlightedText } from "@/components/ui/HighlightedText";
import { ArrowRight, Check, Copy, Sparkles, AlertCircle, User, Building2, Type, CheckCircle2 } from "lucide-react";
import Link from "next/link";

function TypographySection() {
  const weights = [
    { name: "Regular 400", weight: "font-normal", sample: "Formulários fiscais da IRS preenchidos de forma simples e rápida." },
    { name: "Medium 500", weight: "font-medium", sample: "Isenção de retenção de 30% na fonte para prestadores de serviços internacionais." },
    { name: "SemiBold 600", weight: "font-semibold", sample: "Linha 6a: Foreign Tax Identifying Number (FTIN / CPF ou CNPJ)." },
    { name: "Bold 700", weight: "font-bold", sample: "Gere seu formulário fiscal W-8BEN ou W-8BEN-E em menos de 1 minuto." },
    { name: "ExtraBold 800", weight: "font-extrabold", sample: "Olá, qual o seu nome completo?" },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-heading-theme flex items-center gap-2">
          <Type className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>Tipografia Oficial: Space Grotesk</span>
        </h2>
        <p className="text-xs text-muted-theme mt-1">
          Grotesca geométrica contemporânea com personalidade, alto contraste e proporções amplas.
        </p>
      </div>

      <div className="space-y-3">
        {weights.map((w) => (
          <div
            key={w.name}
            className="p-4 sm:p-5 rounded-2xl border border-theme bg-card-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1 flex-1">
              <span className="text-xs font-mono text-muted-theme uppercase tracking-wider block">
                {w.name}
              </span>
              <p className={`text-base sm:text-lg text-heading-theme ${w.weight}`}>
                {w.sample}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function DesignSystemPage() {
  const { t } = useI18n();
  const [testInput, setTestInput] = useState("São Paulo, Conceição do Araguaia");
  const [copied, setCopied] = useState(false);
  const [selectedDemoOption, setSelectedDemoOption] = useState<string>("option1");

  const sanitizedVal = sanitizeASCII(testInput);
  const inputWasSanitized = wasSanitized(testInput);

  const handleCopy = () => {
    if (!navigator?.clipboard) return;
    navigator.clipboard.writeText(sanitizedVal).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <AppShell showFaq={false}>
      <div className="space-y-12">
        {/* Page Title & Back Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-theme font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{t.designSystem.title}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-heading-theme tracking-tight">{t.designSystem.title}</h1>
            <p className="text-sm text-muted-theme mt-1">{t.designSystem.subtitle}</p>
          </div>

          <Link href="/">
            <Button variant="outline" size="sm">
              {t.common.backToHome}
            </Button>
          </Link>
        </div>

        {/* Section 0: Fixed Typography Hierarchy */}
        <TypographySection />

        {/* Section 1: Color Palette */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-heading-theme">
            {t.designSystem.colorsTitle}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-app-surface border border-theme">
              <div className="text-xs text-muted-theme">{t.designSystem.appBackgroundLabel}</div>
              <div className="text-sm font-semibold text-heading-theme mt-1">var(--bg-app)</div>
            </div>
            <div className="p-4 rounded-xl bg-card-surface border border-theme">
              <div className="text-xs text-muted-theme">{t.designSystem.cardSurfaceLabel}</div>
              <div className="text-sm font-semibold text-heading-theme mt-1">var(--bg-card)</div>
            </div>
            <div className="p-4 rounded-xl btn-brand-primary">
              <div className="text-xs opacity-80 font-semibold">{t.designSystem.primaryAccentLabel}</div>
              <div className="text-sm font-extrabold mt-1">var(--primary-bg)</div>
            </div>
            <div className="p-4 rounded-xl bg-drawer-surface border border-theme text-body-theme">
              <div className="text-xs opacity-80">{t.designSystem.alertTintLabel}</div>
              <div className="text-sm font-semibold mt-1">var(--bg-drawer)</div>
            </div>
          </div>
        </section>

        {/* Section 2: Buttons & Interactive Components */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-heading-theme">
            {t.designSystem.componentsTitle}
          </h2>
          <Card>
            <CardBody className="space-y-6">
              <div>
                <div className="text-xs text-muted-theme mb-3 font-semibold">{t.designSystem.buttonsTitle}</div>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" size="md">
                    <span>{t.common.next}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <Button variant="secondary" size="md">
                    <span>{t.common.back}</span>
                  </Button>

                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="md"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? t.common.copied : t.common.copyValue}</span>
                  </Button>
                </div>
              </div>

              {/* Badges Section */}
              <div className="space-y-3">
                <div className="text-xs text-muted-theme font-semibold">{t.designSystem.badgesTitle}</div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="alert">
                    <AlertCircle className="w-4 h-4" />
                    <span>{t.common.sanitizedNotice}</span>
                  </Badge>
                  <Badge variant="success">
                    <Check className="w-4 h-4" />
                    <span>{t.common.copied}</span>
                  </Badge>
                  <Badge variant="info">
                    <span>{t.common.title}</span>
                  </Badge>
                </div>
              </div>

              {/* OptionCards Section */}
              <div className="space-y-3">
                <div className="text-xs text-muted-theme font-semibold">{t.designSystem.optionCardsTitle}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <OptionCard
                    title={t.wizard.stepEntityType.optionPF}
                    icon={<User className="w-5 h-5 text-muted-theme" />}
                    selected={selectedDemoOption === "option1"}
                    onClick={() => setSelectedDemoOption("option1")}
                  />
                  <OptionCard
                    title={t.wizard.stepEntityType.optionPJ}
                    icon={<Building2 className="w-5 h-5 text-muted-theme" />}
                    selected={selectedDemoOption === "option2"}
                    onClick={() => setSelectedDemoOption("option2")}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </section>



        {/* Section 3: Real-Time ASCII Sanitizer Interactive Test */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-heading-theme flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>{t.designSystem.sanitizerTitle}</span>
          </h2>
          <Card>
            <CardBody className="space-y-4">
              <p className="text-xs text-muted-theme">
                {t.designSystem.sanitizerDescription}
              </p>

              <Input
                label={t.designSystem.sanitizerInputLabel}
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
              />

              <div className="p-4 rounded-xl bg-drawer-surface border border-theme flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs text-muted-theme uppercase tracking-wider font-semibold">{t.designSystem.sanitizerOutputLabel}</div>
                  <div className="text-lg font-mono font-bold text-emerald-700 dark:text-emerald-400 mt-1">{sanitizedVal || "—"}</div>
                </div>
                {inputWasSanitized && (
                  <Badge variant="alert">
                    <span>{t.common.sanitizedNotice}</span>
                  </Badge>
                )}
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Section 4: Context Drawer */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-heading-theme flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>{t.designSystem.drawersTitle}</span>
          </h2>
          <Card>
            <CardBody>
              <ContextDrawer title={t.wizard.stepEntityType.explanation}>
                <p>{t.wizard.stepEntityType.explanation}</p>
              </ContextDrawer>
            </CardBody>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
