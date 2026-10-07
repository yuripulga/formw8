import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, UserCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Formulário W-8BEN para Pessoa Física (CPF) | Guia Brasil",
  description:
    "Aprenda como preencher o formulário W-8BEN individual com CPF para receber pagamentos do exterior sem desconto de 30% de imposto americano.",
  alternates: {
    canonical: "https://formw8.com.br/w8ben-pessoa-fisica",
  },
  openGraph: {
    title: "Formulário W-8BEN para Pessoa Física (CPF) | Guia Brasil",
    description:
      "Tudo sobre o formulário W-8BEN para freelancers e contratados individuais que recebem do exterior via CPF.",
    url: "https://formw8.com.br/w8ben-pessoa-fisica",
    type: "article",
  },
};

export default function W8BenPessoaFisicaPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Formulário W-8BEN para Pessoa Física no Brasil",
    description: "Guia completo de preenchimento do formulário W-8BEN para freelancers e profissionais autônomos que prestam serviços para os EUA.",
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
            Pessoa Física • Freelancers & Contratados
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-heading-theme tracking-tight leading-tight">
            Guia do Formulário W-8BEN para Pessoa Física no Brasil
          </h1>
          <p className="text-sm text-muted-theme leading-relaxed">
            O formulário W-8BEN comprova que você mora no Brasil e presta serviços para fora, garantindo 0% de desconto de imposto nos EUA.
          </p>
        </div>

        {/* Action Card */}
        <div className="p-6 rounded-2xl bg-card-surface border border-theme space-y-4">
          <div className="flex items-center gap-3">
            <UserCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-heading-theme">
                Você recebe como Pessoa Física (CPF)?
              </h3>
              <p className="text-xs text-muted-theme">
                Gere seu formulário W-8BEN preenchido em 1 minuto.
              </p>
            </div>
          </div>
          <Link href="/" className="block">
            <Button variant="primary" size="lg" className="w-full justify-center text-sm">
              <span>Gerar Formulário W-8BEN em 1 Minuto</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Detailed Points */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-heading-theme tracking-tight">
            Campos Principais do W-8BEN (Pessoa Física)
          </h2>
          <div className="space-y-3">
            {[
              {
                title: "Line 1: Legal Name",
                desc: "Seu nome completo civil exatamente como consta no seu documento de identificação (passaporte ou RG/CNH), sem acentuação.",
              },
              {
                title: "Line 2: Country of Citizenship",
                desc: "Indique Brazil.",
              },
              {
                title: "Line 3: Permanent Residence Address",
                desc: "Seu endereço residencial no Brasil com rua, número, bairro, cidade, UF e CEP. Caixas postais (P.O. Box) não são permitidas.",
              },
              {
                title: "Line 6a: Foreign Tax Identifying Number (FTIN)",
                desc: "O seu CPF brasileiro. É ele que atesta seu domicílio fiscal fora dos EUA.",
              },
              {
                title: "Part III: Certification & Signature",
                desc: "Assinatura do titular e data no formato americano (MM-DD-YYYY).",
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
              <p className="font-bold text-heading-theme">Possui empresa (CNPJ)?</p>
              <p className="text-muted-theme">Veja o guia completo do formulário W-8BEN-E para empresas brasileiras.</p>
            </div>
            <Link href="/w8bene-pessoa-juridica">
              <Button variant="secondary" size="sm" className="whitespace-nowrap">
                <span>Ver Guia W-8BEN-E</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-theme">
              Guias por Plataforma
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { name: "Upwork", href: "/plataformas/upwork" },
                { name: "Deel", href: "/plataformas/deel" },
                { name: "Rippling", href: "/plataformas/rippling" },
                { name: "Remote.com", href: "/plataformas/remote" },
                { name: "Google AdSense", href: "/plataformas/google-adsense" },
                { name: "GitHub Sponsors", href: "/plataformas/github-sponsors" },
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
