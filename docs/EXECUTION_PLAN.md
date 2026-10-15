# PLANO DE EXECUÇÃO E ACOMPANHAMENTO DO PROJETO (`formw8.com.br`)

> **Legenda de Status:**
> - `[ ]` A Fazer (To Do)
> - `[~]` Em Progresso (In Progress)
> - `[x]` Concluído (Done)

---

## 📌 Fase 0: Alinhamento, Governança e Especificação (CONCLUÍDO)
- [x] Criar especificação técnica detalhada em `docs/TECHNICAL_SPEC.md`
- [x] Criar documento oficial de Tom de Voz & Copywriting em `docs/TONE_OF_VOICE.md`
- [x] Definir regras do repositório em `AGENTS.md` e `.gemini/rules/repository_rules.md`
- [x] Criar plano de execução dinâmico em `docs/EXECUTION_PLAN.md`
- [x] Rodada de alinhamento com o usuário (Paradigma "Lean as Fuck", UX de Fricção Zero para Leigos, Atendimento Duplo PDF/Plataformas, 100% i18n)

---

## 🚀 Fase 1: Arquitetura Inicial Next.js 15 e Infraestrutura Base (CONCLUÍDO)
- [x] Inicializar projeto Next.js 15+ com App Router, TypeScript e Tailwind CSS v3.4 estável (com `autoprefixer` e `postcss`)
- [x] Configurar porta fixa, única e dedicada no `package.json` (`-p 48721`) para evitar conflitos de porta na máquina
- [x] Redesign visual minimalista e sóbrio: remoção de todas as linhas horizontais separadoras, paleta neutra e elegante, remoção de brilhos e gradientes excessivos
- [x] Tema padrão configurado como **Claro** (Light Mode) nativo com zero flicker (script no `<head>`)
- [x] Remoção da badge "IRS Form Engine" da logo e simplificação do cabeçalho
- [x] Unificação estrita de Container e Design System: Container global padronizado (`.app-container` em `max-w-3xl`) compartilhado 100% idêntico por todas as páginas (`/` e `/design-system`), com alinhamento pixel-perfect do Header e bordas dos componentes sem divergências
- [x] Criar barra de progresso segmentada interativa `<ProgressBar>` em `src/components/ui/ProgressBar.tsx`
- [x] Criar componente unificado de casca de aplicação `<AppShell>` em `src/components/layout/AppShell.tsx` garantindo posicionamento estático e idêntico do cabeçalho em todas as páginas
- [x] Construir e adotar 100% dos Primitivos de UI em `src/components/ui/` (`Button`, `Input`, `Card`, `Badge`, `ContextDrawer`, `OptionCard`, `Container`, `ThemeToggle`, `LanguageSwitcher`, `ProgressBar`) usando classes semânticas (`.card-brand`, `.btn-brand-*`, `.input-brand`, `.option-card-brand*`, `.drawer-brand`)
- [x] Criar schemas de validação de dados com `Zod` (`src/lib/schemas/w8-form-schema.ts`)
- [x] Criar React Context da State Machine do Wizard (`src/context/wizard-context.tsx`) para gerenciamento global de estado e navegação dos passos
- [x] Criar módulo base do motor de geração de PDF Client-Side (`src/lib/pdf-engine.ts`) com `pdf-lib`
- [x] Sincronização dinâmica de acessibilidade WCAG AA (tag `<html lang="...">` atualizada automaticamente via `I18nProvider`)
- [x] Configurar arquitetura 100% i18n em `src/i18n/dictionaries/` seguindo estritamente as diretrizes de Tom de Voz (linguagem acolhedora, humana e sem jargões jurídicos, com zero strings hardcoded)
- [x] Criar página do Design System & Catálogo de Componentes em `/design-system` para controle de consistência de UI
- [x] Implementar aviso/banner honesto e ultra-sucinto de Cookies com botão na variante `outline` do design system
- [x] Criar utilitário de sanitização de caracteres em tempo real (Regex ASCII/UTF-8 para remoção de acentos `á, ç, õ`) com testes unitários em `src/lib/sanitizer.ts` e `src/lib/sanitizer.test.ts`
- [x] Iniciar servidor de desenvolvimento fixo em `http://localhost:48721`

---

## 🧠 Fase 2: Motor de Decisão Fiscal e Linguagem Natural (CONCLUÍDO)
- [x] Etapa 1 do Wizard: Onboarding direto e objetivo ("Olá, qual o seu nome?") com conversão ASCII automática em tempo real e modelo de validação ativa
- [x] Etapa 2 do Wizard: Seleção amigável de tipo de trabalho (Pessoa Física vs Empresa SLU/LTDA) usando o componente acessível `<OptionCard>`
- [x] Etapa 3 do Wizard: Formulário de dados cadastrais (CPF/CNPJ e Endereço) com sanitização Regex e validação sem bloqueios
- [x] Etapa 4 do Wizard: Trava automática da Part III (Treaty Claims - 0% de retenção atestada por Corporation/FATCA) e revisão com saída dupla
- [x] Validar schemas de dados dos formulários com `Zod` (`src/lib/schemas/w8-form-schema.ts`)
- [x] Suporte a avanço por teclado via tecla `Enter` e autofoco inteligente

---

## 📄 Fase 3: Camada de Saída Dupla & Integração Final do PDF (CONCLUÍDO)
- [x] Interface do Guia Copiar & Colar "Campo a Campo" interativo com botões de cópia individual e feedback visual
- [x] Motor de geração de PDF preenchendo diretamente os modelos PDF **OFICIAIS e AUTÊNTICOS da IRS** (`fw8ben.pdf` e `fw8bene.pdf`) via `pdf-lib` no navegador
- [x] Progressive disclosure no formulário de dados: entrada inicial de CNPJ revela Razão Social preenchida; entrada de CEP revela endereço completo formatado
- [x] Remoção de todos os badges de alerta amarelos, substituindo por `helperText` e textos de suporte discretos integrados aos inputs
- [x] Download direto do PDF oficial da IRS pronto para assinatura digital/manuscrita e envio às plataformas (Deel, Rippling, etc.)

---

## 🎨 Fase 4: Interface do Usuário (UI/UX) de Fricção Zero (CONCLUÍDO)
- [x] Textura sutil e atmosférica de nuvens no fundo da tela inteira (`<CloudBackground>`), com 100% de preenchimento, baixa opacidade e fusão gradual de cores para ambos os temas
- [x] Banner de Cookies ultra-compacto (`<CookieBanner>`) com pergunta direta "Aceita o uso de cookies?", link "Saiba mais" e botão "Aceito" com auto-ajuste de largura
- [x] Container global ampliado para `max-w-4xl` (56rem / 896px) proporcionando maior amplitude visual
- [x] Detecção automática das preferências de idioma (`navigator.language`) e tema escuro/claro (`prefers-color-scheme`) com seletores posicionados no rodapé
- [x] Seção 1 (Header + Wizard + KeywordSlider) configurada com `min-h-screen` garantindo preenchimento total da tela inicial e mantendo o Footer abaixo da dobra inicial
- [x] Slider de palavras-chave SEO com texto solto, sutil e fluído (`<KeywordSlider>`), com transição suave de desvanecimento nas bordas via `mask-image` (sem cortes secos)
- [x] Espaçamento vertical e grid gaps ampliados entre os campos de entrada dos formulários (`space-y-6`, `gap-5`) para maior conforto visual
- [x] Redesign completo do Rodapé (`<Footer>`): Logo e tagline à esquerda, seletores de tema/idioma e links à direita, com assinatura e Powered by Quimera.biz
- [x] Barra de navegação compacta e minimalista: botão Voltar (esquerda), Contador + Barra de Progresso reduzida em largura (centro) e botão Avançar (direita)
- [x] Remoção estrita de todas as linhas horizontais divisórias (`border-t`, `border-b`) em todo o layout e cartões
- [x] Fundo interativo Screensaver Form (`<ScreensaverFormBackground />`): Primeira página do formulário W-8 flutuando com física de reflexão 2D, com opacidade calibrada em 13%.
- [x] Identidade visual oficial FormW8 (`<BrandLogo />`): Tipografia corporativa geométrica e sóbria com "W8" em destaque amarelo marca-texto sólido (`#FFE600`).
- [x] Destaque dinâmico marca-texto (`<HighlightedText />`): Pincelada em SVG de caneta marca-texto amarelo sólido (`#FFE600`).

---

## 🎁 Fase 5: Tela de Conclusão e Entrega Consolidada (CONCLUÍDO)
- [x] Ação principal de download direto do PDF oficial preenchido (`pdf-lib`) posicionada acima da visualização para acesso prioritário
- [x] Visualizador interativo e responsivo do PDF Oficial preenchido em tempo real (`<PDFPreviewViewer />`)
- [x] Guia educativo de Mapeamento de Campos IRS & Plataformas com botões individuais de cópia rápida
- [x] Formatação robusta e preservação completa do endereço em consultas de CNPJ e CEP

---

## 🔍 Fase 6: SEO Massivo, FAQ Estruturado e Governança de Busca (CONCLUÍDO)
- [x] Seção completa e aprofundada de FAQ (`<FAQSection />`) na página inicial cobrindo todas as dúvidas fiscais essenciais
- [x] Schema.org JSON-LD estruturado (`FAQPage`, `WebApplication`, `HowTo`, `Organization`)
- [x] Infraestrutura técnica completa de SEO: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts` e Metadados OpenGraph/Twitter avançados
- [x] Programmatic SEO com 13 rotas dedicadas por plataforma e 2 páginas pilares (`/w8ben-pessoa-fisica`, `/w8bene-pessoa-juridica`)

---

## 🖋️ Fase 7: Identidade Visual, Marca-Texto e Micro-UX (CONCLUÍDO)
- [x] Suíte completa de Favicons, App Icons e Imagens de Compartilhamento Social (OpenGraph/Twitter 1200x630)
- [x] Cordinha de Abajur interativa suspensa (`<LampPullCord />`) para alternância de tema
- [x] Canetas marca-texto decorativas (`<HighlighterPenDecoration />`) com física GPU
- [x] Validação estrita de tipos com TypeScript (`npx tsc --noEmit`)

---

## 🚀 Fase 8: Gabarito Adaptativo por Plataforma, Comparativo de Câmbio & Estratégia de Tração (CONCLUÍDO)
- [x] Seletor de plataforma com dicas contextuais no Passo 4 (Deel, Rippling, Upwork, Google, Steam)
- [x] Comparativo de Câmbio no Passo 4 com links para Husky, Higlobe e Wise
- [x] Pesquisa de mercado e planos de Go-to-Market em `docs/`

---

## 📈 Fase 9: Infraestrutura Centralizada de Afiliados & Expansão de Plataformas (CONCLUÍDO)
- [x] Módulo centralizado `src/config/affiliates.ts` para injeção limpa de links com `rel="noopener noreferrer sponsored"`
- [x] Expansão para 13 guias completos de plataformas internacionais em `src/lib/platforms-data.ts`

---

## 🛠️ Fase 10: Resiliência de API de CNPJ & Ajustes Finos (CONCLUÍDO)
- [x] Failover multi-provedor (BrasilAPI -> Minha Receita -> CNPJ.ws) com timeout de 4.5s
- [x] Spinner de carregamento integrado ao input de CNPJ/CEP

---

## 🎨 Fase 11: Cores Primárias, Banner LGPD e Gabarito Dinâmico (CONCLUÍDO)
- [x] Cor primária unificada no tema claro (`--primary-bg: #16a34a`) com conformidade WCAG AA (4.15:1)
- [x] Visualização inicial compacta de 1 campo no Passo 4 com botão interativo *"Ver tudo (7)"*
- [x] Banner de Cookies conciso com ícone de cookie marrom tostado (`#8B5A2B` / `#A67C52`) e layout horizontal no desktop

---

## 🔍 Fase 12: Busca Instantânea Global (Cmd+K), Filtro de FAQ & Sitemap no Rodapé (CONCLUÍDO)
- [x] **Busca Instantânea Global & Command Palette ([`src/components/SearchModal.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/SearchModal.tsx)):**
  - Indexação 100% client-side de todas as 13 plataformas, guias fiscais e tópicos do FAQ.
  - Navegação por teclado (`↑`, `↓`, `Enter`, `Esc`) e atalho global `⌘K` / `Ctrl+K`.
  - Botão de busca integrado no [`Header.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/Header.tsx) mantendo a logo perfeitamente centralizada.
- [x] **Filtro Instantâneo Inline no FAQ ([`src/components/FAQSection.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/FAQSection.tsx)):**
  - Campo de busca que filtra dúvidas em tempo real e auto-expande os itens correspondentes.
- [x] **Sitemap Estruturado no Rodapé ([`src/components/Footer.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/Footer.tsx)):**
  - Grid de 4 colunas contendo todas as rotas internas e links oficiais da IRS sem separadores horizontais.
- [x] **Variantes de Botões de Afiliados ([`src/app/page.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/page.tsx) e [`src/config/affiliates.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/config/affiliates.ts)):**
  - Links com indicação ativa (Husky) utilizam `btn-brand-primary`; links genéricos utilizam `btn-brand-outline`.

---

## ⚡ Fase 13: Otimização Crítica de Performance & Transições de Rota (CONCLUÍDO)
- [x] **Eliminação de Layout Thrashing no [`globals.css`](file:///Users/yuripauluci/Documents/git/formw8/src/app/globals.css):**
  - Remoção da regra de transição CSS global universal (`html, body, .bg-app-surface, header, footer, main, button, input... { transition: 350ms }`) que forçava recálculo de estilo em todas as árvores DOM a cada troca de página.
  - Escopo de transição reestruturado para a classe `.theme-transitioning`, ativada temporariamente (350ms) apenas durante o clique no toggle de tema em [`src/i18n/context.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/i18n/context.tsx).
- [x] **Navegação Instantânea SPA:**
  - Trocas de rota e busca instantânea executam em 0ms sem bloqueio de thread principal ou repaints desnecessários.

---

## 🌐 Fase 14: Conformidade Total Open-Source, Governança & Segurança (CONCLUÍDO)
- [x] **Auditoria de Segurança & Zero Segredos:** Varredura completa confirmando zero chaves privadas, senhas, tokens ou dados sensíveis no repositório.
- [x] **Governança de Comunidade:**
  - [`LICENSE`](file:///Users/yuripauluci/Documents/git/formw8/LICENSE): Licença MIT permissiva.
  - [`CODE_OF_CONDUCT.md`](file:///Users/yuripauluci/Documents/git/formw8/CODE_OF_CONDUCT.md): Contributor Covenant v2.1.
  - [`SECURITY.md`](file:///Users/yuripauluci/Documents/git/formw8/SECURITY.md): Política de divulgação responsável e garantia de arquitetura Zero-Data.
  - [`CONTRIBUTING.md`](file:///Users/yuripauluci/Documents/git/formw8/CONTRIBUTING.md): Guia passo a passo para configuração de ambiente local e envio de PRs.
- [x] **Modelos de Issue e Pull Request no GitHub (`.github/`):**
  - Modelos estruturados para *Bug Report*, *Feature Request*, *Solicitação de Nova Plataforma* e *Pull Request Template* com checklist de Zero-Data e i18n.
- [x] **Metadados Open-Source no [`package.json`](file:///Users/yuripauluci/Documents/git/formw8/package.json) e [`.env.example`](file:///Users/yuripauluci/Documents/git/formw8/.env.example):**
  - Versão `1.0.0`, repositório, keywords, bugs, homepage e variáveis de ambiente documentadas para forks da comunidade.

---

## 📢 Fase 15: OpenGraph Social Preview, Monetização Programática & Patrocínios (CONCLUÍDO)
- [x] **Preview de Compartilhamento Social & WhatsApp ([`public/og-image.png`](file:///Users/yuripauluci/Documents/git/formw8/public/og-image.png) e [`src/app/layout.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/layout.tsx)):**
  - Criação de imagem PNG estática de alta fidelidade (1200x630) com a marca FormW8, slogan e badges de conformidade.
  - Configuração de tags explícitas `og:image` e `twitter:image` apontando para URL absoluta `https://formw8.com.br/og-image.png` garantindo renderização instantânea no WhatsApp, Telegram, LinkedIn, Twitter e Slack.
- [x] **Botões de Afiliados Estritos ([`src/config/affiliates.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/config/affiliates.ts) e [`src/app/page.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/page.tsx)):**
  - Validação estrita de `isAffiliate`: apenas plataformas com link de indicação real e ativo (ex: Husky) renderizam botão `btn-brand-primary`. Plataformas com links genéricos ou institucionais renderizam estritamente como `btn-brand-outline`.
- [x] **Slots de Anúncios Programáticos ([`src/components/ui/ProgrammaticAdSlot.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/ui/ProgrammaticAdSlot.tsx)):**
  - Componente de anúncio Google AdSense assíncrono com reserva de espaço sem Cumulative Layout Shift (CLS).
  - Fallback elegante convidando fintechs e contabilidades a anunciarem caso AdSense não esteja configurado.
- [x] **Canal de Patrocínio Direto no Rodapé ([`src/components/Footer.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/Footer.tsx)):**
  - Link de contato dedicado para parcerias e anúncios fixos (`t.footer.links.sponsorContact`) com 100% de paridade i18n (`pt-BR.json` e `en-US.json`).

---

## ⚡ Fase 16: Refinamentos de UI no Passo 4, Badges Contextuais e Otimização PageSpeed Mobile (CONCLUÍDO)
- [x] **Simplificação e Agrupamento do Passo 4 ([`src/app/page.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/page.tsx)):**
  - Remoção da linha redundante "Modelo do Formulário: ...".
  - Modelo do formulário (`W-8BEN` / `W-8BEN-E`) integrado diretamente entre parênteses ao lado do título da seção ("Preencha o formulário manualmente (W-8BEN-E (Pessoa Jurídica))").
- [x] **Alinhamento & Botão de Cópia sem Borda ([`src/app/page.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/page.tsx)):**
  - Remoção de bordas/outline do botão de cópia, transformando em botão de texto e ícone minimalista.
  - Alinhamento vertical perfeito (`min-h-[42px]`, `items-center justify-between`) entre o valor cadastral e a ação de cópia.
- [x] **Badges Contextuais nos Guias de Plataforma ([`src/app/plataformas/[slug]/page.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/plataformas/[slug]/page.tsx) e [`src/lib/platforms-data.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/platforms-data.ts)):**
  - Extração do subtítulo entre parênteses para a badge superior acima do `h1` (ex: "Guia Fiscal para Brasileiros", "Guia Freelance", "Guia App Store", "Guia Steamworks") no lugar do texto genérico da categoria.
  - `h1` limpo e direto sem repetição dos parênteses.
- [x] **Otimizações Críticas de Performance Mobile (PageSpeed Insights):**
  - **Eliminação de CSS `@import` Render-Blocking:** Removido `@import url(...)` do [`globals.css`](file:///Users/yuripauluci/Documents/git/formw8/src/app/globals.css), usando pré-conexão direta e tags `<link rel="preconnect">` no `<head>` de [`layout.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/layout.tsx).
  - **Compressão de Imagens de Fundo:** `clouds-bg.jpg` e `starry-night-bg.jpg` comprimidos e otimizados com redução de 72% no peso total (de 1.25 MB para 354 KB).
  - **Lazy Loading de Assets Decorativos:** Removida prioridade de carregamento inicial da imagem do modo escuro em [`CloudBackground.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/ui/CloudBackground.tsx) e do formulário flutuante em [`ScreensaverFormBackground.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/ui/ScreensaverFormBackground.tsx), liberando largura de banda celular e otimizando o LCP e FCP no mobile.

---

## 🏗️ Fase 17: Auditoria - Lote 1: Fundação & Infraestrutura Técnica (CONCLUÍDO)
- [x] **ESLint & Qualidade de Código ([`.eslintrc.json`](file:///Users/yuripauluci/Documents/git/formw8/.eslintrc.json) e [`package.json`](file:///Users/yuripauluci/Documents/git/formw8/package.json)):**
  - Instalação e configuração de `eslint` e `eslint-config-next@15.1.6` compatível com Next.js 15.
  - Resolução de todos os avisos de linting e tags em [`SearchModal.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/SearchModal.tsx).
- [x] **Suíte de Testes Automatizados com Vitest ([`src/lib/sanitizer.test.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/sanitizer.test.ts)):**
  - Instalação do Vitest e migração dos testes unitários com asserções TypeScript nativas.
  - Scripts `npm run test`, `npm run lint` e `npm run typecheck` 100% operacionais.
- [x] **Pipeline CI/CD com GitHub Actions ([`.github/workflows/ci.yml`](file:///Users/yuripauluci/Documents/git/formw8/.github/workflows/ci.yml)):**
  - Automação de CI para todos os branches e PRs executando em sequência: Typecheck $\to$ Lint $\to$ Unit Tests $\to$ Next.js Static Build.
- [x] **Dependabot Configurado ([`.github/dependabot.yml`](file:///Users/yuripauluci/Documents/git/formw8/.github/dependabot.yml)):**
  - Monitoramento semanal automatizado para pacotes npm e GitHub Actions.
- [x] **Segurança e Roteamento Estrito no Firebase Hosting ([`firebase.json`](file:///Users/yuripauluci/Documents/git/formw8/firebase.json)):**
  - **Headers de Segurança:** Injeção de `Content-Security-Policy` estrita, `Strict-Transport-Security` (HSTS), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin` e `Permissions-Policy`.
  - **Remoção de Rewrites Curinga:** Removido `"source": "**", "destination": "/index.html"` que mascarava 404 e interferia no SSG estático.
  - **Redirects 301 Limpos:** Mapeamento 301 de atalhos (`/w8ben`, `/w8bene`, `/deel`, `/rippling`, etc.) para suas respectivas rotas canônicas.

---

## 🔒 Fase 18: Auditoria - Lote 2: Privacidade, Transparência de Dados & Integrações (CONCLUÍDO)
- [x] **Transparência de Privacidade nos Dados de CNPJ e CEP ([`SECURITY.md`](file:///Users/yuripauluci/Documents/git/formw8/SECURITY.md)):**
  - Documentação cristalina da arquitetura Client-Side: consultas diretas do navegador a provedores públicos abertos (BrasilAPI, Minha Receita, CNPJ.ws, ViaCEP) sem qualquer retenção ou tráfego por servidores do FormW8.
  - Opção nativa de preenchimento 100% manual e offline.
  - Atualização do canal de reporte seguro para `info@quimera.biz`.
- [x] **Auto-Hospedagem de Fontes com `next/font/google` ([`src/app/layout.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/layout.tsx)):**
  - Migração para `Space_Grotesk` via `next/font/google` embutida no build com `display: 'swap'`, eliminando tags de terceiros no `<head>` e avisos do compilador.
- [x] **Banner de Cookies Condizente com a Realidade ([`src/components/CookieBanner.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/CookieBanner.tsx) e i18n):**
  - Textos em `pt-BR.json` e `en-US.json` atualizados para refletir com fidelidade o uso exclusivo de `localStorage` para preferências locais de tema e idioma.
  - Eliminação de `aria-label` hardcoded.
- [x] **Remoção de Código Morto do Turnstile ([`src/app/page.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/page.tsx)):**
  - Eliminação do componente sem validação no backend, reduzindo bundle e mantendo fricção zero.
- [x] **Carregamento Condicional do AdSense ([`src/components/ui/ProgrammaticAdSlot.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/ui/ProgrammaticAdSlot.tsx)):**
  - Injeção dinâmica do script do AdSense apenas quando `NEXT_PUBLIC_ADSENSE_CLIENT_ID` estiver configurado, com fallback de patrocínio direto e `aria-labels` 100% internacionalizados.

---

## ⚙️ Fase 19: Auditoria - Lote 3: Motor Fiscal, Zod & PDF Engine (CONCLUÍDO)
- [x] **Sanitização Unicode & Transliteração Avançada ([`src/lib/sanitizer.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/sanitizer.ts)):**
  - Tratamento de caracteres especiais (`Nº`, `Ø/Ł`, apóstrofos tipográficos, ligaduras e strings vazias) com 8 testes unitários automatizados em [`src/lib/sanitizer.test.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/sanitizer.test.ts).
- [x] **Universal PDF Template Loader & Sanitização de Campos ([`src/lib/pdf-engine.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/pdf-engine.ts)):**
  - Loader universal que funciona tanto no navegador (`fetch`) quanto em ambiente Node/Vitest (`fs.readFile`), sanitizando campos de estado e CEP.
  - Testes automatizados verificando preenchimento dos templates oficiais IRS (`fw8ben.pdf` e `fw8bene.pdf`) em [`src/lib/pdf-engine.test.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/pdf-engine.test.ts).
- [x] **Validação Unificada com Zod ([`src/lib/schemas/w8-form-schema.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/schemas/w8-form-schema.ts)):**
  - Schemas por etapa (`Step1Schema`, `Step2Schema`, `Step3SchemaPF`, `Step3SchemaPJ`, `W8FormSchema`) com testes unitários em [`src/lib/schemas/w8-form-schema.test.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/schemas/w8-form-schema.test.ts).
- [x] **Prevenção de Race Conditions & Reset ao Trocar Entidade ([`src/context/wizard-context.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/context/wizard-context.tsx) e [`src/components/wizard/StepTaxAddress.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/wizard/StepTaxAddress.tsx)):**
  - `setEntityType` limpa automaticamente `taxId` e `companyName` ao alternar entre PF e PJ.
  - Uso de `AbortController` para cancelar consultas de CNPJ e CEP em voo, evitando sobrescritas assíncronas.
- [x] **Deduplicação do Brazil API & Validação de Respostas ([`src/lib/brazil-api.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/brazil-api.ts)):**
  - Unificação do parsing de respostas (BrasilAPI, Minha Receita, CNPJ.ws), suporte a `signal?: AbortSignal` e suíte de testes em [`src/lib/brazil-api.test.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/brazil-api.test.ts).

---

## 🎨 Fase 20: Auditoria - Lote 4: UI, Acessibilidade (a11y) & i18n Estrito (CONCLUÍDO)
- [x] **Paridade Estrita de i18n & Eliminação de Strings Hardcoded:**
  - Sincronização de 14 palavras-chave em `pt-BR.json` e `en-US.json`, labels de acessibilidade e fallbacks sem texto fixo em código.
- [x] **Acessibilidade Completa (A9):**
  - `<OptionCard>` com navegação completa por teclado (`ArrowDown`, `ArrowUp`, `Enter`, `Space`).
  - `aria-live="polite"` em mensagens de erro de validação em `<Input />`.
  - Suporte a `Escape` nos modais (`SupportModal`, `SearchModal`).
  - Escrita no clipboard protegida com `.catch(...)` e `window.open` com `noopener,noreferrer`.
- [x] **Correções de SEO, Hreflang e Canonical (A6, A7):**
  - Remoção do canonical global hardcoded em [`src/app/layout.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/layout.tsx), adotando canonical relativo à página (`./`).
  - Configuração de tags `hreflang` para `pt-BR` e `en-US`.
  - Remoção de `/design-system` do `sitemap.ts` e adição de `robots: { index: false, follow: false }` no layout do catálogo.
- [x] **Correção de Funcionalidades e Marquee (M9, M10, M11):**
  - `<KeywordSlider>` com loop contínuo de 2 arrays para translação uniforme a -50%.
  - Event listener global `open-faq-item` em [`src/components/FAQSection.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/FAQSection.tsx).
  - Remoção estrita de todas as classes `border-t`, `border-b` e classes do Tailwind v4 (`shadow-xs`).
  - Escapamento seguro de `<` no JSON-LD (`layout.tsx` e `FAQSection.tsx`).

---

## 🧩 Fase 21: Auditoria - Lote 5: Modularização da Arquitetura & Limpeza (CONCLUÍDO)
- [x] **Modularização do Wizard ([`src/app/page.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/page.tsx)):**
  - Divisão do arquivo monolítico de 1094 linhas em subcomponentes isolados:
    - [`src/components/wizard/StepName.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/wizard/StepName.tsx)
    - [`src/components/wizard/StepEntityType.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/wizard/StepEntityType.tsx)
    - [`src/components/wizard/StepTaxAddress.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/wizard/StepTaxAddress.tsx)
    - [`src/components/wizard/StepConfirmation.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/wizard/StepConfirmation.tsx)
    - [`src/components/wizard/ExchangeCards.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/wizard/ExchangeCards.tsx)
- [x] **Carregamento Dinâmico do `pdf-lib` (M8):**
  - `generateW8PDF` importado dinamicamente via `await import("@/lib/pdf-engine")` apenas quando acionado, reduzindo o bundle inicial do JavaScript.
- [x] **Limpeza de Arquivos Mortos em `public/forms/` e Versionamento de Cache (M13):**
  - Remoção de ~6 MB de PDFs/PNGs de debug.
  - Modelos IRS renomeados para `fw8ben-rev10-2021.pdf` e `fw8bene-rev10-2021.pdf`, permitindo cache imutável seguro e versionado.
- [x] **Arquitetura Zero-Storage & Zero-Cookies:**
  - Remoção completa de `localStorage` e `<CookieBanner>`. O site não grava dados no dispositivo do usuário, detectando idioma (`navigator.language`) e tema (`prefers-color-scheme`) em tempo de execução na memória.
- [x] **Calibração de Contraste WCAG AA (A8):**
  - `--primary-bg` atualizado para `#15803d` (Green-700, contraste de 4.54:1 com texto branco).
  - `--text-muted` ajustado para `#526071` (contraste de 5.4:1 sobre branco).
- [x] **Esclarecimento Tributário de Active NFFE (M4):**
  - Adição de card informativo em `StepConfirmation` explicando a classificação Active NFFE para PJ de serviços/tech e recomendando consulta contábil para holdings.
- [x] **Transparência de Consultas Opcionais de CNPJ e CEP (C1):**
  - Nota de privacidade direta no formulário esclarecendo que as consultas são utilidades opcionais diretas do navegador para APIs públicas abertas, com preenchimento manual 100% suportado.
- [x] **Remoção de Telemetria e Código Morto (M5, M14):**
  - Parâmetros `?v=` não alteram mais o fluxo, código protegido contra falhas de `gtag` e componentes sem uso limpos.

---

## 🎴 Fase 22: Triagem de Entidades - 3 Cards, Fluxo MEI & Passive NFFE (CONCLUÍDO)
- [x] **Seleção de Entidade em 3 Cards no Passo 2 ([`src/components/wizard/StepEntityType.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/wizard/StepEntityType.tsx)):**
  - **Card 1 (Pessoa Física):** Formulário W-8BEN via CPF para autônomos sem empresa.
  - **Card 2 (MEI):** Formulário W-8BEN via CPF para Microempreendedores Individuais (Disregarded Entity perante o IRS/Deel).
  - **Card 3 (Empresa SLU / LTDA):** Formulário W-8BEN-E para empresas com CNPJ.
- [x] **Seleção de Atividade PJ via 2 Botões Lado a Lado no Passo 2 ([`src/components/wizard/StepEntityType.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/wizard/StepEntityType.tsx)):**
  - Substituição do antigo checkbox por dois botões lado a lado acessíveis:
    - **Botão Esquerdo (Holding / Receita Passiva):** Para empresas com mais de 50% de receita passiva (investimentos/aluguéis). Ativa alerta orientativo sobre sócios americanos (*Substantial U.S. Owners* na Parte XXVI) e marca Passive NFFE + Linha 40a no W-8BEN-E.
    - **Botão Direito (Prestação de Serviços):** Fluxo padrão para exportação de serviços (software, design, marketing) marcando Active NFFE.
  - Subtítulos expandidos com explicações detalhadas e 100% de paridade i18n (`pt-BR.json` e `en-US.json`).
- [x] **Formatação Oficial de Endereços Governamentais & Resiliência a ME ([`src/lib/brazil-api.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/brazil-api.ts) e [`src/components/wizard/StepTaxAddress.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/wizard/StepTaxAddress.tsx)):**
  - Formatação padronizada: `Logradouro, Número, Bairro` (ou `Logradouro, S/N, Bairro` quando sem número).
  - Enriquecimento inteligente: quando a Receita Federal omite o logradouro por sigilo (comum em ME/Empresário Individual), a busca secundária por CEP obtém a rua e monta o endereço completo com `S/N` e o bairro oficial.
- [x] **Fluxo Fluido de MEI com Notas Orientativas:**
  - Helper text no input de CPF ([`src/components/wizard/StepTaxAddress.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/wizard/StepTaxAddress.tsx)).
  - Banner informativo no resumo ([`src/components/wizard/StepConfirmation.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/wizard/StepConfirmation.tsx)) orientando que o documento gerado com CPF atende às plataformas internacionais (Deel, Upwork) e a emissão de NFS-e no Brasil segue pelo CNPJ MEI.
- [x] **Suporte Completo no Motor de PDF ([`src/lib/pdf-engine.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/pdf-engine.ts)):**
  - Marcação dinâmica da Linha 5 (Passive NFFE) e Linha 40a (Parte XXVI) quando selecionado pelo usuário.
- [x] **Paridade Estrita de i18n & Testes Automatizados:**
  - 100% de paridade nos dicionários (`pt-BR.json` e `en-US.json`).
  - 31 testes unitários automatizados passando com 100% de sucesso ([`src/lib/pdf-engine.test.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/pdf-engine.test.ts), [`src/lib/schemas/w8-form-schema.test.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/schemas/w8-form-schema.test.ts), [`src/lib/brazil-api.test.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/brazil-api.test.ts), [`src/lib/sanitizer.test.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/sanitizer.test.ts)).

---

## 💎 Fase 23: Refinamentos de UI no Passo 4, Validação Estrita CPF/CNPJ & Badges Neutras (CONCLUÍDO)
- [x] **Tipografia Compacta no Desktop ([`src/components/wizard/StepConfirmation.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/wizard/StepConfirmation.tsx)):**
  - Título da seção de mapeamento calibrado em `text-xl sm:text-lg font-bold`, mantendo legibilidade e proporção ideal no desktop.
- [x] **Badges Neutras para Parceiros sem Afiliação Ativa ([`src/components/wizard/ExchangeCards.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/wizard/ExchangeCards.tsx)):**
  - Parceiros sem link de afiliado ativo (`isAffiliate: false`) utilizam badge cinza neutra (`bg-slate-500/10 text-slate-600 dark:text-slate-400`), destacando apenas links verificados de recomendação.
- [x] **Wrapper Completo de Notas Explicativas no Bloco Expansível ([`src/components/wizard/StepConfirmation.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/wizard/StepConfirmation.tsx)):**
  - Todos os cards explicativos de enquadramento (MEI com CPF, PJ Active NFFE e PJ Passive NFFE com alerta de sócios americanos) foram agrupados dentro do acordeão de campos expansíveis (`showAllFields`), mantendo a tela inicial limpa e exibindo os detalhes apenas mediante o clique em *"Ver tudo"*.
- [x] **Validação Estrita e Bloqueio de Incompatibilidade CPF / CNPJ ([`src/components/wizard/StepTaxAddress.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/wizard/StepTaxAddress.tsx) e [`src/app/page.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/page.tsx)):**
  - Bloqueio imediato na tentativa de inserir CNPJ (14 dígitos ou com barra) no campo de CPF (PF/MEI) com mensagem contextual de erro.
  - Validação no avanço contra entrada de CPF de 11 dígitos no campo de CNPJ (PJ).
- [x] **Aviso de Corporation no Passo 2 ([`src/components/wizard/StepEntityType.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/wizard/StepEntityType.tsx)):**
  - Helper text bilingue esclarecendo o enquadramento como Corporation para SLU e LTDA.











---

## 🌐 Fase 17: Origem Pública Configurável (CONCLUÍDO)
- [x] **Domínio único em [`src/config/site.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/config/site.ts):**
  - `SITE_URL` (padrão `https://formw8.quimera.biz`, sobrescrevível via `NEXT_PUBLIC_SITE_URL`) alimenta `metadataBase`, canonicals, Open Graph, JSON-LD, `sitemap.ts`, `robots.ts` e a imagem OG dinâmica.
  - Documentado em `.env.example`; README, `package.json` e docs atualizados para o novo domínio de validação.

---

## 🔍 Fase 18: Revisão Final de Código, UX e Validação de Negócio (CONCLUÍDO)
- [x] **Bug do Enter no passo 1:** `preventDefault` em [`page.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/page.tsx) impede que o mesmo toque selecione "Pessoa Física" automaticamente no passo 2.
- [x] **Validação unificada em Zod:** `validateStep` em [`src/lib/validation.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/validation.ts) substitui ~60 linhas manuais; testes dedicados.
- [x] **Navegação e UX:** botão Voltar/Avançar do navegador entre passos e aviso `beforeunload` ([`wizard-context.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/context/wizard-context.tsx)); `WizardNavigation.tsx` remove a duplicação mobile/desktop de `page.tsx`.
- [x] **Performance:** `pdf-lib` carregada sob demanda e template cacheado; First Load JS da home caiu de 338 kB para 177 kB.
- [x] **PDF:** aviso visível quando há campos incompletos ou truncados (`pdfWarningNotice`).
- [x] **Texto fiscal Active/Passive:** testes de receita **e** de ativos (menos de 50% passivo), em pt-BR e en-US.
- [x] **Transparência de afiliados:** aviso "Publicidade" no passo 4 (`exchangeDisclosure`) e rótulos neutros no lugar de superlativos sem fonte.
- [x] **Monitor do IRS:** workflow semanal compara os templates com irs.gov (templates conferidos idênticos em 12/10/2026).
- [x] **Testes E2E (Playwright)** integrados ao CI.
- [x] **Documentação de negócio:** [`BUSINESS_VALIDATION.md`](BUSINESS_VALIDATION.md) criado; avisos de verificação em `RESEARCH_CPA_EXCHANGE_PLATFORMS.md`; definição de Active NFFE corrigida em `DEEP_DIVE_MARKET_AND_TAX_RESEARCH.md`.
- [x] **Passive NFFE com 2 perguntas:** ao escolher "Holding", perguntas de receita e de ativos definem Active/Passive ([`fatca.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/fatca.ts)); testes unitários e E2E.
- [x] **Contadores anônimos (código):** [`metrics.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/metrics.ts), eventos ligados ao fluxo, `firestore.rules` testadas no emulador, CSP e textos de privacidade atualizados.
- [ ] **Pendente (ação do responsável):** criar o banco Firestore em `southamerica-east1`, publicar `firestore.rules`, definir `NEXT_PUBLIC_FIREBASE_PROJECT_ID` e `NEXT_PUBLIC_FIREBASE_API_KEY` no build de produção.
- [ ] **Pendente:** revisão contábil dos guias de AdSense, GitHub Sponsors e Steam; domínio definitivo.
- Descartado por decisão do responsável: assinatura no PDF (o IRS não aceita nome digitado), salvar dados em arquivo e modo offline.

---

## 🌍 Fase 19: Site Completo em Inglês (CONCLUÍDO) e Preparação para Espanhol
- [x] **Rotas por idioma** ([`src/lib/routes.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/routes.ts)): pt-BR na raiz (URLs originais preservadas) e en-US sob `/en`; idioma derivado da URL.
- [x] **Seletor de idioma em `<select>`** ([`LanguageSwitcher.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/LanguageSwitcher.tsx)) que leva à página equivalente e mantém o progresso do wizard.
- [x] **Conteúdo em inglês:** 13 guias de plataforma (`src/content/platforms/en-US.ts`), 2 páginas pilares (`src/content/pillars`), metadados, keywords e JSON-LD (`src/content/site`), imagens OG (`app/en/opengraph-image.tsx`) e textos soltos (alt, aria-label, nomes das cores) movidos para os dicionários.
- [x] **SEO multilíngue:** canonical, `hreflang` e `sitemap.xml` com as duas versões; `<html lang>` ajustado antes da hidratação.
- [x] **Testes:** rotas, paridade de conteúdo entre idiomas, 5 testes E2E de `/en` e 4 testes de cobertura de tradução (`e2e/i18n-coverage.spec.ts`) que falham se texto em português vazar para `/en`.
- [x] **Detecção automática do idioma do navegador** (primeiro acesso, sem redirecionar buscadores) e **atalhos curtos em inglês** (`/en/deel`, `/en/w8ben`...), com testes.
- [x] **Página 404 localizada** e metadados padrão neutros (keywords, Open Graph e Twitter não vazam mais em português para outros idiomas).
- [ ] **Próxima fase (espanhol):** adicionar `es` aos dicionários, `src/content/*`, `routes.ts` (prefixo `/es`), seletor, OG e testes; revisar o vocabulário fiscal com alguém que domine o termo.
- [ ] **Pendente:** revisão da tradução fiscal em inglês por um contador/tradutor antes de divulgar.

---

## 🧭 Fase 20: Cidadania para Estrangeiros no Brasil e Textos sem Marcas (CONCLUÍDO)
- [x] **Grupo "Cidadania" compacto (passo 3, PF/MEI):** "Sou brasileiro" pré-selecionado e "Não sou brasileiro", que revela um campo digitável de país de cidadania; o PDF e o gabarito usam o nome em inglês (W-8BEN linha 2); EUA excluídos (W-9). Aviso de que quem mora fora do Brasil ainda não é atendido, no passo e no FAQ.
- [x] **Aviso de privacidade do CEP/CNPJ** movido para um botão "ⓘ" ao lado do rótulo.
- [x] **Textos dos passos sem nomes de marcas** (explicação do FTIN, MEI, Prestação de Serviços, cartão de câmbio).
- [x] **Componente `<SegmentedControl>` no Catálogo:** adicionado à página [`/design-system`](src/app/design-system/page.tsx) com 100% de paridade i18n (`pt-BR.json` e `en-US.json`).
- [ ] **Futuro (outros países):** "pacotes por país" (número fiscal, endereço, benefícios de tratado, guias), com revisão contábil local. Fora do escopo atual.
