# Guia de Contribuição — FormW8

Obrigado pelo seu interesse em contribuir com o **FormW8**! Este é um projeto open-source independente criado para simplificar formulários fiscais internacionais e proteger a privacidade dos prestadores de serviço brasileiros que trabalham para o exterior.

---

## 🔒 Princípio Fundamental: Zero-Data Architecture
Todas as funcionalidades no FormW8 operam sob uma regra estrita de privacidade:
* **Nenhum dado pessoal** (Nome, CPF, CNPJ, Endereço, CEP) é salvo ou transmitido para servidores ou bancos de dados externos.
* Toda sanitização, autopreenchimento e renderização de PDF ocorre **100% no navegador do usuário (Client-Side)**.
* **Qualquer PR que adicione persistência de dados sensíveis em servidor será rejeitado.**

---

## 🚀 Como Começar Localmente

### 1. Pré-requisitos
* Node.js `20.x` ou superior
* npm, pnpm ou yarn

### 2. Instalação e Execução
```bash
# Clone o repositório
git clone https://github.com/SEU-USUARIO/formw8.git

# Acesse o diretório
cd formw8

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:48721](http://localhost:48721) no seu navegador.

---

## 📐 Padrões de Código & Design System

1. **Internacionalização (i18n):**
   * **Nunca hardcode strings ou números de interface.**
   * Todas as mensagens, perguntas, rótulos e cópias devem ser adicionadas em `src/i18n/dictionaries/pt-BR.json` e `src/i18n/dictionaries/en-US.json`.

2. **Design System & Estilização:**
   * Utilize as classes e tokens do Tailwind configurados em `tailwind.config.ts` e `src/app/globals.css`.
   * Evite estilos CSS arbitrários ou soltos.

3. **Verificação Estática:**
   Antes de abrir seu Pull Request, execute a checagem de tipos e lint:
   ```bash
   npx tsc --noEmit
   npm run lint
   ```

---

## 🔀 Fluxo de Pull Request

1. Crie uma branch para a sua alteração:
   ```bash
   git checkout -b feature/sua-melhoria # ou fix/seu-bugfix
   ```
2. Faça commits claros e objetivos no padrão [Conventional Commits](https://www.conventionalcommits.org/) (ex: `feat: adicionar suporte a X`, `fix: corrigir alinhamento no passo 3`).
3. Envie para o seu fork e abra o Pull Request detalhando o que foi feito e como testar.

---

## 💡 Ideias de Contribuição
- Novos idiomas e refinamento de dicionários i18n.
- Melhorias nos guias passo a passo de plataformas (Deel, Rippling, Upwork, etc.).
- Aprimoramento de acessibilidade (WCAG AA).
- Otimizações no motor de PDF (`pdf-lib`).

Obrigado por ajudar a comunidade dev e remota brasileira! ❤️
