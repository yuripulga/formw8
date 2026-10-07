import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Building2, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Formulário W-8BEN-E para Pessoa Jurídica (SLU / LTDA / CNPJ) | Guia Brasil",
  description:
    "Guia completo do formulário W-8BEN-E para empresas brasileiras (SLU, LTDA, EIRELI, ME) prestadoras de serviços internacionais com 0% de retenção nos EUA.",
  alternates: {
    canonical: "https://formw8.com.br/w8bene-pessoa-juridica",
  },
  openGraph: {
    title: "Formulário W-8BEN-E para Pessoa Jurídica (SLU / LTDA / CNPJ) | Guia Brasil",
    description:
      "Tudo sobre o formulário W-8BEN-E para empresas brasileiras que exportam serviços para os Estados Unidos.",
    url: "https://formw8.com.br/w8bene-pessoa-juridica",
    type: "article",
  },
};

export default function W8BenEPessoaJuridicaPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Formulário W-8BEN-E para Empresas e Pessoas Jurídicas no Brasil",
    description: "Guia técnico de preenchimento do formulário W-8BEN-E para empresas SLU, LTDA e desenvolvedores exportadores de software e serviços.",
    author: {
      "@type": "Organization",
      name: "FormW8",
      url: "https://formw8.com.br",
    },
    publisher: {
      "@type": "Organization",
      name: "FormW8",
    },
  };

  return (
    <AppShell showFaq={false}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="space-y-10 py-4 max-w-2xl mx-auto w-full">
        <div className="space-y-3 text-center sm:text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-theme">
            Pessoa Jurídica • Empresas (SLU / LTDA / ME)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-heading-theme tracking-tight leading-tight">
            Guia do Formulário W-8BEN-E para Empresas no Brasil
          </h1>
          <p className="text-sm text-muted-theme leading-relaxed">
            O formulário W-8BEN-E comprova que a sua empresa é do Brasil e presta serviços para fora, garantindo 0% de desconto de imposto nos EUA.
          </p>
        </div>

        {/* Action Card */}
        <div className="p-6 rounded-2xl bg-card-surface border border-theme space-y-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-heading-theme">
                Você recebe por Empresa (CNPJ)?
              </h3>
              <p className="text-xs text-muted-theme">
                Gere seu formulário W-8BEN-E preenchido em 1 minuto.
              </p>
            </div>
          </div>
          <Link href="/" className="block">
            <Button variant="primary" size="lg" className="w-full justify-center text-sm">
              <span>Gerar Formulário W-8BEN-E em 1 Minuto</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Detailed Points */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-heading-theme tracking-tight">
            Classificação Correta do W-8BEN-E para Empresas Brasileiras
          </h2>
          <div className="space-y-3">
            {[
              {
                title: "Line 1: Organization Name",
                desc: "Razão Social registrada no CNPJ da Receita Federal sem acentos.",
              },
              {
                title: "Line 2: Country of Incorporation",
                desc: "Brazil.",
              },
              {
                title: "Line 4: Chapter 3 Status (Entity Type)",
                desc: "Marque 'Corporation' (classificação societária padrão do IRS para LTDAs e SLUs de serviços).",
              },
              {
                title: "Line 5: Chapter 4 FATCA Status",
                desc: "Marque 'Active NFFE' (Active Non-Financial Foreign Entity) para empresas cuja receita vem da prestação ativa de serviços e tecnologia.",
              },
              {
                title: "Line 9b: Foreign TIN",
                desc: "O CNPJ da sua empresa brasileira.",
              },
              {
                title: "Part XXV: Line 39 (Active NFFE Certification)",
                desc: "Obrigatório assinalar o checkbox da Linha 39 atestando que a receita não provém de investimentos financeiros passivos.",
              },
              {
                title: "Part XXX: Certification & Signature",
                desc: "Assinatura do sócio administrador e data no formato americano (MM-DD-YYYY).",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-app-surface border border-theme/60 space-y-1 text-xs"
              >
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
        <div className="pt-6 space-y-4 border-t border-theme/40">
          <div className="p-4 rounded-xl bg-card-surface border border-theme flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-heading-theme">Recebe como Pessoa Física (CPF)?</p>
              <p className="text-muted-theme">Veja o guia completo do formulário W-8BEN para pessoas físicas e freelancers.</p>
            </div>
            <Link href="/w8ben-pessoa-fisica">
              <Button variant="secondary" size="sm" className="whitespace-nowrap">
                <span>Ver Guia W-8BEN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-theme">
              Guias por Plataforma para PJ
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { name: "Deel", href: "/plataformas/deel" },
                { name: "Rippling", href: "/plataformas/rippling" },
                { name: "Remote.com", href: "/plataformas/remote" },
                { name: "Apple Developer", href: "/plataformas/apple-developer" },
                { name: "Steam Direct", href: "/plataformas/steam" },
                { name: "Stripe & Paddle", href: "/plataformas/stripe" },
              ].map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="px-3 py-1.5 rounded-xl bg-card-surface border border-theme text-xs font-semibold text-heading-theme hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2 text-center">
          <Link href="/">
            <Button variant="outline" size="md" className="text-xs">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Gerador Principal</span>
            </Button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
