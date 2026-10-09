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


