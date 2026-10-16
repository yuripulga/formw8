import type { PillarContent, PillarKind } from "./types";

export const PILLARS_PT_BR: Record<PillarKind, PillarContent> = {
  individual: {
    kind: "individual",
    metaTitle: "Formulário W-8BEN para Pessoa Física (CPF) | Guia Brasil",
    metaDescription:
      "Aprenda como preencher o formulário W-8BEN individual com CPF para receber pagamentos do exterior sem desconto de 30% de imposto americano.",
    ogDescription:
      "Tudo sobre o formulário W-8BEN para freelancers e contratados individuais que recebem do exterior via CPF.",
    schemaHeadline: "Formulário W-8BEN para Pessoa Física no Brasil",
    schemaDescription:
      "Guia completo de preenchimento do formulário W-8BEN para freelancers e profissionais autônomos que prestam serviços para os EUA.",
    badge: "Pessoa Física • Freelancers & Contratados",
    title: "Guia do Formulário W-8BEN para Pessoa Física no Brasil",
    intro:
      "O formulário W-8BEN comprova que você mora no Brasil e presta serviços para fora, liberando 0% de retenção de imposto nos EUA.",
    actionTitle: "Você recebe como Pessoa Física (CPF)?",
    actionSubtitle: "Gere seu formulário W-8BEN preenchido em 1 minuto.",
    actionButton: "Gerar Formulário W-8BEN em 1 Minuto",
    fieldsTitle: "Campos Principais do W-8BEN (Pessoa Física)",
    fields: [
      {
        title: "Line 1: Legal Name",
        desc: "Seu nome completo civil exatamente como consta no seu documento de identificação (passaporte ou RG/CNH), sem acentuação.",
      },
      { title: "Line 2: Country of Citizenship", desc: "Indique Brazil." },
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
    ],
    crossLinkTitle: "Possui empresa (CNPJ)?",
    crossLinkDesc: "Veja o guia completo do formulário W-8BEN-E para empresas brasileiras.",
    crossLinkButton: "Ver Guia W-8BEN-E",
    platformsLabel: "Guias por Plataforma",
    platformSlugs: ["upwork", "deel", "rippling", "remote", "google-adsense", "github-sponsors"],
    backButton: "Voltar ao Gerador Principal",
  },
  entity: {
    kind: "entity",
    metaTitle: "Formulário W-8BEN-E para Pessoa Jurídica (SLU / LTDA / CNPJ) | Guia Brasil",
    metaDescription:
      "Guia completo do formulário W-8BEN-E para empresas brasileiras (SLU, LTDA, EIRELI, ME) prestadoras de serviços internacionais com 0% de retenção nos EUA.",
    ogDescription:
      "Tudo sobre o formulário W-8BEN-E para empresas brasileiras que exportam serviços para os Estados Unidos.",
    schemaHeadline: "Formulário W-8BEN-E para Empresas e Pessoas Jurídicas no Brasil",
    schemaDescription:
      "Guia técnico de preenchimento do formulário W-8BEN-E para empresas SLU, LTDA e desenvolvedores exportadores de software e serviços.",
    badge: "Pessoa Jurídica • Empresas (SLU / LTDA / ME)",
    title: "Guia do Formulário W-8BEN-E para Empresas no Brasil",
    intro:
      "O formulário W-8BEN-E comprova que a sua empresa é do Brasil e presta serviços para fora, liberando 0% de retenção de imposto nos EUA.",
    actionTitle: "Você recebe por Empresa (CNPJ)?",
    actionSubtitle: "Gere seu formulário W-8BEN-E preenchido em 1 minuto.",
    actionButton: "Gerar Formulário W-8BEN-E em 1 Minuto",
    fieldsTitle: "Classificação Correta do W-8BEN-E para Empresas Brasileiras",
    fields: [
      {
        title: "Line 1: Organization Name",
        desc: "Razão Social registrada no CNPJ da Receita Federal sem acentos.",
      },
      { title: "Line 2: Country of Incorporation", desc: "Brazil." },
      {
        title: "Line 4: Chapter 3 Status (Entity Type)",
        desc: "Marque 'Corporation' (classificação societária padrão do IRS para LTDAs e SLUs de serviços).",
      },
      {
        title: "Line 5: Chapter 4 FATCA Status",
        desc: "Marque 'Active NFFE' (Active Non-Financial Foreign Entity) para empresas cuja receita vem da prestação ativa de serviços e tecnologia.",
      },
      { title: "Line 9b: Foreign TIN", desc: "O CNPJ da sua empresa brasileira." },
      {
        title: "Part XXV: Line 39 (Active NFFE Certification)",
        desc: "Obrigatório assinalar o checkbox da Linha 39 atestando que a receita não provém de investimentos financeiros passivos.",
      },
      {
        title: "Part XXX: Certification & Signature",
        desc: "Assinatura do sócio administrador e data no formato americano (MM-DD-YYYY).",
      },
    ],
    crossLinkTitle: "Recebe como Pessoa Física (CPF)?",
    crossLinkDesc:
      "Veja o guia completo do formulário W-8BEN para pessoas físicas e freelancers.",
    crossLinkButton: "Ver Guia W-8BEN",
    platformsLabel: "Guias por Plataforma para PJ",
    platformSlugs: ["deel", "rippling", "remote", "apple-developer", "steam", "stripe"],
    backButton: "Voltar ao Gerador Principal",
  },
};
