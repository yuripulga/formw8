<div align="center">

# FormW8 📄✨
### Gerador Descomplicado de Formulários Fiscais W-8BEN e W-8BEN-E

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Zero Data Architecture](https://img.shields.io/badge/Zero--Data-100%25%20Client--Side-emerald.svg)](#-zero-data-architecture--privacidade-absoluta)

**Preencha e baixe seus formulários fiscais oficiais do IRS americano em segundos. Sem burocracia, sem termos jurídicos indecifráveis e com 100% de privacidade.**

[🌐 Acessar o FormW8 em Produção](https://formw8.com.br) • [📖 Documentação Técnica](docs/TECHNICAL_SPEC.md) • [🤝 Como Contribuir](CONTRIBUTING.md)

</div>

---

## 🎯 Por que o FormW8 existe?

Profissionais brasileiros (desenvolvedores, designers, freelancers e criadores de conteúdo) que prestam serviços para empresas dos EUA (via Deel, Rippling, Upwork, Remote, Google AdSense, Apple Developer, Steam, etc.) precisam preencher os formulários fiscais **W-8BEN** (Pessoa Física) ou **W-8BEN-E** (Pessoa Jurídica/SLU/LTDA).

O processo tradicional do IRS é confuso, intimidador e repleto de jargões técnicos:
- **30% de retenção indevida na fonte** quando preenchido incorretamente.
- Dúvidas sobre onde colocar CPF/CNPJ (FTIN) e como acionar a isenção de tratado (*Tax Treaty Exemption*).
- Falta de ferramentas transparentes que não exijam cadastro ou coletem dados fiscais confidenciais.

O **FormW8** resolve isso com uma experiência em 4 passos rápidos em linguagem simples, entregando o PDF oficial preenchido e um guia "Copiar & Colar" para plataformas que exigem digitação manual.

---

## 🔒 Zero-Data Architecture & Privacidade Absoluta

* ⚡ **100% Client-Side:** Nenhum dado pessoal (Nome, CPF, CNPJ, Endereço, CEP) é enviado para servidores ou bancos de dados.
* 🛡️ **Sanitização Automática:** Remoção em tempo real de caracteres acentuados (`á, ç, õ`) para conformidade estrita com o padrão ASCII exigido pelo IRS e pelas plataformas internacionais.
* 📄 **Motor Oficial em PDF:** Preenchimento dos arquivos PDF oficiais e autênticos do IRS (`fw8ben.pdf` e `fw8bene.pdf`) diretamente na memória do navegador usando `pdf-lib`.

---

## 🚀 Funcionalidades Principais

- [x] **Assistente Guiado (Wizard):** Fluxo acolhedor em 4 etapas diretas.
- [x] **Suporte Dual (PF e PJ):**
  - **W-8BEN:** Para desenvolvedores e autônomos como Pessoa Física.
  - **W-8BEN-E:** Para empresas SLU/LTDA com classificação correta de Corporation e Chapter 4 FATCA Status (Active NFFE).
- [x] **Autopreenchimento de Endereço & CNPJ:** Consulta pública direta via BrasilAPI (CEP e CNPJ) com disclosure progressivo.
- [x] **Saída Dupla:**
  1. Download do PDF oficial autenticado pronto para assinatura.
  2. Guia interativo de Copiar & Colar campo a campo com destaques das linhas do formulário.
- [x] **Acessibilidade e i18n Completo:** Suporte nativo a Português (`pt-BR`) e Inglês (`en-US`), tema claro/escuro sem flicker.
- [x] **Hub SEO Completo:** Guias específicos e respostas para plataformas como Deel, Rippling, Upwork, Remote, Apple Developer, Steam, Google AdSense, GitHub Sponsors e Stripe.

---

## 🛠️ Stack Tecnológica

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React 19, Server Components & Static Site Generation)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) com Design System customizado e tokens semânticos
- **Manipulação de PDF:** [`pdf-lib`](https://pdf-lib.js.org/)
- **Ícones:** [`lucide-react`](https://lucide.dev/)
- **Validação:** [`Zod`](https://zod.dev/)

---

## 💻 Como Rodar Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/SEU-USUARIO/formw8.git
cd formw8
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Rodar em ambiente de desenvolvimento
```bash
npm run dev
```

Acesse a aplicação em `http://localhost:48721`.

### 4. Build de produção
```bash
npm run build
```

---

## 📚 Estrutura de Pastas

```
formw8/
├── docs/                      # Especificações técnicas e plano de execução
│   ├── TECHNICAL_SPEC.md      # Regras fiscais, IRC 1441/1442 e arquitetura
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

## 🤝 Contribuição

Contribuições da comunidade são muito bem-vindas! Se você deseja sugerir novos recursos, corrigir bugs ou adicionar novos idiomas, consulte nosso [Guia de Contribuição (CONTRIBUTING.md)](CONTRIBUTING.md).

---

## ⚖️ Aviso Legal (Disclaimer)

O **FormW8** é uma ferramenta de código aberto independente, educacional e auxiliar. Não possui qualquer vínculo com o *Internal Revenue Service (IRS)* dos Estados Unidos, com a *Secretaria da Receita Federal do Brasil* ou com as plataformas de pagamento mencionadas. O uso desta ferramenta não substitui a consulta a contadores ou advogados tributaristas qualificados.

---

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
