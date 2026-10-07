<div align="center">

```text
███████╗ ██████╗ ██████╗ ███╗   ███╗██╗    ██╗ █████╗ 
██╔════╝██╔═══██╗██╔══██╗████╗ ████║██║    ██║██╔══██╗
█████╗  ██║   ██║██████╔╝██╔████╔██║██║ █╗ ██║╚█████╔╝
██╔══╝  ██║   ██║██╔══██╗██║╚██╔╝██║██║███╗██║██╔══██╗
██║     ╚██████╔╝██║  ██║██║ ╚═╝ ██║╚███╔███╔╝╚█████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝ ╚══╝╚══╝  ╚════╝ 
```

### Zero-Friction US Tax Form Translator & Generator for W-8BEN & W-8BEN-E

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Zero Data Architecture](https://img.shields.io/badge/Zero--Data-100%25%20Client--Side-emerald.svg)](#-zero-data-architecture--absolute-privacy)

**Fill and download official IRS tax forms in seconds. No bureaucracy, no indecipherable legalese, and 100% privacy.**

[🌐 Live Production Site](https://formw8.com.br) • [📖 Technical Specification](docs/TECHNICAL_SPEC.md) • [🤝 Contributing Guide](CONTRIBUTING.md) • [🇧🇷 Versão em Português](#-versão-em-português)

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

## 🇧🇷 Versão em Português

<details>
<summary><b>Clique para expandir a documentação em Português</b></summary>

<br />

### Por que o FormW8 existe?
Profissionais brasileiros (desenvolvedores, designers, freelancers e criadores de conteúdo) que prestam serviços para o exterior precisam emitir o **W-8BEN** (Pessoa Física) ou **W-8BEN-E** (Pessoa Jurídica/SLU/LTDA) para evitar a retenção indevida de **30% de imposto americano** na fonte. O FormW8 traduz todo o processo para uma linguagem simples e gera o PDF oficial em menos de 1 minuto.

### Arquitetura Zero-Data & Privacidade
- **100% Client-Side:** Nenhum dado pessoal (Nome, CPF, CNPJ, Endereço) é transmitido ou salvo em servidores.
- **Sanitização ASCII em tempo real:** Remove acentos automaticamente para conformidade com o IRS.
- **Motor em PDF nativo:** Preenchimento local dos PDFs oficiais da IRS via `pdf-lib`.

### Licença
Distribuído sob a [Licença MIT](LICENSE).

</details>

---

## 🦄 About the Creator & Quimera.biz

**FormW8** was built with ❤️ by **[Yuri Pauluci](https://github.com/yuripulga)** as an initiative backed by **[Quimera.biz](https://quimera.biz)**.

### Why this was built:
As remote work and international contracts expanded across Latin America, thousands of talented professionals encountered the same friction: confusing tax forms, contradictory instructions, and unnecessary withholding fees. FormW8 was conceived to make international tax compliance accessible, private, and painless for everyone.

**[Quimera.biz](https://quimera.biz)** creates high-performance digital products, thoughtful software tools, and design-engineered experiences that empower people and independent builders worldwide.
