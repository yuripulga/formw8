# Contributing to FormW8

Thank you for your interest in contributing to **FormW8**! This is an open-source, privacy-first utility built to help international contractors, software engineers, and creators generate compliant US tax forms (W-8BEN & W-8BEN-E) without confusion or unnecessary withholding.

---

## 🔒 Core Axiom: Zero-Data Architecture
All features and contributions must adhere strictly to our Zero-Data architecture:
* **No personal data** (Name, CPF, CNPJ, Address, Zip code) may ever be sent to or stored on backend servers or third-party databases.
* Sanitization, data validation, and PDF compilation must happen **100% inside the user's browser runtime (Client-Side)**.
* **Any PR introducing remote server data persistence for personal info will be rejected.**

---

## 🚀 Getting Started Locally

### 1. Prerequisites
* Node.js `20.x` or higher
* npm, pnpm, or yarn

### 2. Setup and Installation
```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/formw8.git

# Enter the project directory
cd formw8

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:48721](http://localhost:48721) in your browser.

---

## 📐 Code Standards & Design System

1. **Mandatory Internationalization (i18n):**
   * **Never hardcode user-facing strings or numbers.**
   * All UI text, questions, labels, error messages, and guide copy must be synchronized in dictionary files:
     - `src/i18n/dictionaries/pt-BR.json`
     - `src/i18n/dictionaries/en-US.json`
   * Both dictionaries must maintain 100% key parity.

2. **Design System & Styling:**
   * Strictly utilize theme semantic tokens and Tailwind utilities configured in `tailwind.config.ts` and `src/app/globals.css`.
   * Never introduce arbitrary horizontal dividers (`border-t`, `border-b`, `<hr>`) or unapproved ad-hoc styles.

3. **Static Analysis & Type Safety:**
   Before submitting your Pull Request, ensure that TypeScript and build checks pass cleanly:
   ```bash
   npm run typecheck
   npm run lint
   npm test
   npm run build
   ```

---

## 🔀 Pull Request Workflow

1. Create a dedicated feature branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name # or fix/your-bugfix
   ```
2. Commit using [Conventional Commits](https://www.conventionalcommits.org/) format (e.g. `feat: add guide for Upwork`, `fix: address field alignment on step 3`).
3. Push to your fork and submit a Pull Request referencing any relevant issues.

---

<details>
<summary><b>🇧🇷 Guia de Contribuição em Português</b></summary>

### 🔒 Princípio Fundamental: Zero-Data
Nenhum dado pessoal (Nome, CPF, CNPJ, Endereço) pode ser persistido ou enviado a servidores externos. Todo o processamento ocorre no navegador do usuário.

### 📐 Padrões de Código
* **i18n Obrigatório:** Nunca utilize textos fixos na interface; utilize sempre os dicionários `pt-BR.json` e `en-US.json`.
* **Design System:** Utilize as classes do Tailwind e variáveis de tema padronizadas.
* **Verificação:** Rode `npm run typecheck`, `npm run lint`, `npm test` e `npm run build` antes de abrir o PR.

</details>
