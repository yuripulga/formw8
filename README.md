<div align="center">

```text
███████╗ ██████╗ ██████╗ ███╗   ███╗██╗    ██╗ █████╗ 
██╔════╝██╔═══██╗██╔══██╗████╗ ████║██║    ██║██╔══██╗
█████╗  ██║   ██║██████╔╝██╔████╔██║██║ █╗ ██║╚█████╔╝
██╔══╝  ██║   ██║██╔══██╗██║╚██╔╝██║██║███╗██║██╔══██╗
██║     ╚██████╔╝██║  ██║██║ ╚═╝ ██║╚███╔███╔╝╚█████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝ ╚══╝╚══╝  ╚════╝  by quimera.biz
```

### Zero-Friction US Tax Form Translator & Generator for W-8BEN & W-8BEN-E

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Zero Data Architecture](https://img.shields.io/badge/Zero--Data-100%25%20Client--Side-emerald.svg)](#-zero-data-architecture--absolute-privacy)

**Fill and download official IRS tax forms in seconds. No bureaucracy, no indecipherable legalese, and 100% privacy.**

[🌐 Live Production Site](https://formw8-4796e.web.app) • [📖 Technical Specification](docs/TECHNICAL_SPEC.md) • [🤝 Contributing Guide](CONTRIBUTING.md) • [🇧🇷 Documentação em Português](#-documentação-completa-em-português)

</div>

---

## 🎯 Why FormW8?

Contractors, software developers, designers, freelancers, and content creators working remotely for US companies (via platforms like Deel, Rippling, Upwork, Remote, Google AdSense, Apple Developer, Steam, GitHub Sponsors, Stripe, etc.) are required to provide official IRS tax forms: **W-8BEN** (Individual) or **W-8BEN-E** (Entity / LLC / SLU / LTDA).

The traditional IRS documentation is notoriously intimidating:
- Risk of **30% foreign withholding tax** on international service income if filled incorrectly.
- Confusion about Foreign Tax Identifying Numbers (FTIN/CPF/CNPJ) and Chapter 3/4 classifications.
- Lack of transparent, privacy-first tools that don't collect or store confidential tax identification.

**FormW8** streamlines this into an intuitive 4-step wizard written in plain language. It produces an official, authentic IRS PDF pre-filled and sanitized, alongside an interactive "Copy & Paste" guide for platforms requiring manual field entry.

---

## 🔒 Zero-Data Architecture & Absolute Privacy

- **100% Client-Side:** No personal information (Name, CPF, CNPJ, Address, Zip code) is ever sent to or stored on backend servers or databases.
- **Real-Time ASCII Sanitization:** Automatically removes accents and non-ASCII characters (`á, ç, õ` → `a, c, o`) in real-time to comply with strict IRS and international payout systems.
- **Native PDF Engine:** Pre-fills official, authentic IRS PDF templates (`fw8ben.pdf` and `fw8bene.pdf`) in browser memory using `pdf-lib`.

---

## 🚀 Key Features

- [x] **4-Step Wizard:** Human-friendly, frictionless onboarding.
- [x] **Dual Support (Individuals & Entities):**
  - **W-8BEN:** For independent contractors and sole proprietors.
  - **W-8BEN-E:** For corporations, LLCs, SLUs, and LTDAs with correct Chapter 3 (Corporation) and Chapter 4 FATCA (Active NFFE) settings.
- [x] **Automatic Zip Code & Entity Lookup:** Public API integration for Brazilian CEP & CNPJ with progressive disclosure.
- [x] **Dual Output Mode:**
  1. Download authentic, pre-filled IRS PDF ready for digital or wet signature.
  2. Interactive step-by-step Copy & Paste field guide with highlighted official line numbers.
- [x] **Full i18n & Accessibility:** Native Portuguese (`pt-BR`) and English (`en-US`), zero-flicker light/dark mode.
- [x] **Comprehensive SEO Hub:** Platform-specific onboarding guides and compliance answers.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React 19, Server Components & Static Site Generation)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with a tokenized Design System
- **PDF Engine:** [`pdf-lib`](https://pdf-lib.js.org/)
- **Icons:** [`lucide-react`](https://lucide.dev/)
- **Validation:** [`Zod`](https://zod.dev/)

---

## 💻 Local Development

### 1. Clone the repository
```bash
git clone https://github.com/yuripulga/formw8.git
cd formw8
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:48721](http://localhost:48721) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 📁 Repository Structure

```
formw8/
├── docs/                      # Technical specifications and execution roadmap
│   ├── TECHNICAL_SPEC.md      # IRC 1441/1442 tax treaty rules and architecture
│   ├── EXECUTION_PLAN.md      # Milestone tracking and release governance
│   └── TONE_OF_VOICE.md       # Copywriting guidelines and terminology
├── public/                    # Static assets and official IRS PDF templates
│   ├── fw8ben.pdf             # Official IRS W-8BEN form
│   └── fw8bene.pdf            # Official IRS W-8BEN-E form
├── src/
│   ├── app/                   # Next.js App Router (Pages, SEO, Layouts)
│   ├── components/            # UI Primitives & Interactive Components
│   ├── context/               # Wizard State Machine & React Contexts
│   ├── i18n/                  # Translation dictionaries (pt-BR and en-US)
│   └── lib/                   # ASCII sanitizer, PDF Engine, BrasilAPI
├── CONTRIBUTING.md            # Guidelines for open-source contributors
├── SECURITY.md                # Responsible security disclosure policy
└── LICENSE                    # MIT Open-Source License
```

---

## 🤝 Contributing

Contributions are welcome! Please check our [Contributing Guidelines (CONTRIBUTING.md)](CONTRIBUTING.md) to get started with bug fixes, language translations, or platform guides.

---

## ⚖️ Legal Disclaimer

**FormW8** is an independent, open-source educational utility. It has no affiliation with the *Internal Revenue Service (IRS)*, the *Receita Federal do Brasil*, or any third-party payout platforms mentioned. Using this tool does not constitute formal legal, accounting, or tax advice.

---

## 🦉 About the Creator & Quimera.biz

**FormW8** was built with ❤️ by **[Yuri Pauluci](https://github.com/yuripulga)** as an initiative backed by **[Quimera.biz](https://quimera.biz)**.

### Why this was built:
As remote work and international contracts expanded across Latin America, thousands of talented professionals encountered the same friction: confusing tax forms, contradictory instructions, and unnecessary withholding fees. FormW8 was conceived to make international tax compliance accessible, private, and painless for everyone.

**[Quimera.biz](https://quimera.biz)** creates high-performance digital products, thoughtful software tools, and design-engineered experiences that empower people and independent builders worldwide.

---

## 🇧🇷 Documentação Completa em Português

<details>
<summary><b>Clique aqui para expandir toda a documentação traduzida em Português</b></summary>

<br />

### 🎯 Por que o FormW8 existe?

Profissionais brasileiros (desenvolvedores, designers, freelancers e criadores de conteúdo) que prestam serviços para empresas dos EUA (via Deel, Rippling, Upwork, Remote, Google AdSense, Apple Developer, Steam, GitHub Sponsors, Stripe, etc.) precisam preencher os formulários fiscais **W-8BEN** (Pessoa Física) ou **W-8BEN-E** (Pessoa Jurídica/SLU/LTDA).

O processo tradicional do IRS é confuso, intimidador e repleto de jargões técnicos:
- **30% de retenção indevida na fonte** quando preenchido incorretamente.
- Dúvidas sobre onde colocar CPF/CNPJ (FTIN) e como acionar a isenção de tratado (*Tax Treaty Exemption*).
- Falta de ferramentas transparentes que não exijam cadastro ou coletem dados fiscais confidenciais.

O **FormW8** resolve isso com uma experiência em 4 passos rápidos em linguagem simples, entregando o PDF oficial preenchido e um guia "Copiar & Colar" para plataformas que exigem digitação manual.

---

### 🔒 Arquitetura Zero-Data & Privacidade Absoluta

- **100% Client-Side:** Nenhum dado pessoal (Nome, CPF, CNPJ, Endereço, CEP) é enviado para servidores ou bancos de dados externos.
- **Sanitização ASCII em Tempo Real:** Remoção automática de caracteres acentuados (`á, ç, õ` → `a, c, o`) para conformidade estrita com o padrão ASCII exigido pelo IRS e pelas plataformas internacionais.
- **Motor de PDF Nativo:** Preenchimento dos arquivos PDF oficiais e autênticos do IRS (`fw8ben.pdf` e `fw8bene.pdf`) diretamente na memória do navegador usando `pdf-lib`.

---

### 🚀 Funcionalidades Principais

- [x] **Assistente Guiado (Wizard):** Fluxo acolhedor em 4 etapas diretas.
- [x] **Suporte Dual (Pessoa Física e Pessoa Jurídica):**
  - **W-8BEN:** Para profissionais autônomos e freelancers (Pessoa Física).
  - **W-8BEN-E:** Para empresas SLU/LTDA com classificação correta de Corporation e Chapter 4 FATCA Status (Active NFFE).
- [x] **Autopreenchimento de Endereço & CNPJ:** Consulta pública direta via BrasilAPI (CEP e CNPJ) com revelação progressiva dos campos.
- [x] **Saída Dupla:**
  1. Download do PDF oficial autenticado pronto para assinatura digital ou manuscrita.
  2. Guia interativo de Copiar & Colar campo a campo com destaques das linhas do formulário oficial.
- [x] **Acessibilidade e i18n Completo:** Suporte nativo a Português (`pt-BR`) e Inglês (`en-US`), tema claro/escuro nativo sem flicker.
- [x] **Hub SEO Completo:** Guias específicos e respostas para plataformas como Deel, Rippling, Upwork, Remote, Apple Developer, Steam, Google AdSense, GitHub Sponsors e Stripe.

---

### 🛠️ Stack Tecnológica

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React 19, Server Components & Static Site Generation)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Modo Estrito)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) com Design System customizado e tokens semânticos
- **Manipulação de PDF:** [`pdf-lib`](https://pdf-lib.js.org/)
- **Ícones:** [`lucide-react`](https://lucide.dev/)
- **Validação:** [`Zod`](https://zod.dev/)

---

### 💻 Como Rodar Localmente

#### 1. Clonar o repositório
```bash
git clone https://github.com/yuripulga/formw8.git
cd formw8
```

#### 2. Instalar dependências
```bash
npm install
```

#### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
Acesse a aplicação em [http://localhost:48721](http://localhost:48721).

#### 4. Gerar build de produção
```bash
npm run build
```

---

### 📁 Estrutura de Pastas

```
formw8/
├── docs/                      # Especificações técnicas e plano de execução
│   ├── TECHNICAL_SPEC.md      # Regras fiscais, IRC 1441/1442 e tratados
│   ├── EXECUTION_PLAN.md      # Acompanhamento de entregas e roadmap
│   └── TONE_OF_VOICE.md       # Diretrizes de redação e copywriting
├── public/                    # Assets estáticos e modelos de PDF oficiais da IRS
│   ├── fw8ben.pdf             # Template oficial W-8BEN
│   └── fw8bene.pdf            # Template oficial W-8BEN-E
├── src/
│   ├── app/                   # Next.js App Router (Páginas, SEO e Layouts)
│   ├── components/            # Componentes reutilizáveis e Primitivos de UI
│   ├── context/               # State Machine do Wizard e Contextos React
│   ├── i18n/                  # Dicionários de tradução (pt-BR e en-US)
│   └── lib/                   # Utilitários, sanitizador ASCII, PDF Engine e APIs
├── CONTRIBUTING.md            # Guia de contribuição para a comunidade
├── SECURITY.md                # Política de segurança e reporte de vulnerabilidades
└── LICENSE                    # Licença de código aberto MIT
```

---

### 🤝 Como Contribuir

Contribuições da comunidade são muito bem-vindas! Se você deseja sugerir novos recursos, corrigir bugs ou adicionar novos idiomas, consulte nosso [Guia de Contribuição (CONTRIBUTING.md)](CONTRIBUTING.md).

---

### ⚖️ Aviso Legal (Disclaimer)

O **FormW8** é uma ferramenta de código aberto independente, educacional e auxiliar. Não possui qualquer vínculo com o *Internal Revenue Service (IRS)* dos Estados Unidos, com a *Secretaria da Receita Federal do Brasil* ou com as plataformas de pagamento mencionadas. O uso desta ferramenta não substitui a consulta a contadores ou advogados tributaristas qualificados.

---

### 🦉 Sobre o Criador & Quimera.biz

O **FormW8** foi construído com ❤️ por **[Yuri Pauluci](https://github.com/yuripulga)** como uma iniciativa apoiada pela **[Quimera.biz](https://quimera.biz)**.

#### Por que este projeto foi criado:
Com a expansão do trabalho remoto e de contratos internacionais em toda a América Latina, milhares de profissionais talentosos enfrentam a mesma fricção: formulários fiscais confusos, instruções contraditórias e retenções indevidas de impostos. O FormW8 foi concebido para tornar a conformidade fiscal internacional acessível, privada e indolor para todos.

A **[Quimera.biz](https://quimera.biz)** cria produtos digitais de alta performance, ferramentas de software conscientes e experiências pensadas para empoderar pessoas e criadores independentes em todo o mundo.

</details>
