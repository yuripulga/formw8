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
- [x] Lente focal ilustrativa (`<FormSpotlight>`) com zoom ampliado em 400 DPI focado estritamente no texto das seções do PDF oficial (Linha 1 Nome, Cabeçalho, Linhas 3 e 6a) para máxima legibilidade
- [x] Espaçamento vertical e grid gaps ampliados entre os campos de entrada dos formulários (`space-y-6`, `gap-5`) para maior conforto visual
- [x] Ocultação inteligente do FormSpotlight na etapa 4 para maximizar foco na entrega dos dados
- [x] Redesign completo do Rodapé (`<Footer>`): Logo e tagline à esquerda, seletores de tema/idioma e links à direita, com assinatura e Powered by Quimera.biz
- [x] Remoção definitiva de qualquer menção a "Privacidade total..." e remoção do subtítulo redundante da Etapa 3
- [x] Centralização vertical automática do conteúdo do wizard no viewport entre Header e Slider
- [x] Remoção de containers do tipo Card/CardBody no Desktop e Mobile, permitindo layout limpo e integrado diretamente no AppShell
- [x] Barra de navegação compacta e minimalista: botão Voltar (esquerda), Contador + Barra de Progresso reduzida em largura (centro) e botão Avançar (direita)
- [x] Remoção estrita de todas as linhas horizontais divisórias (`border-t`, `border-b`) em todo o layout e cartões
- [x] Textos e subtítulos puramente factuais e objetivos em todas as etapas, sem afirmações indevidas ou redundâncias
- [x] Textos de suporte e explicações integrados diretamente como `helperText` dos inputs (sem gavetas/collapsibles após o form)
- [x] Modelo de Validação Ativa (sem botões desativados) prevenindo frustração e abandono
- [x] Subtítulo principal atualizado para "Gere seu formulário fiscal W-8BEN ou W-8BEN-E preenchido em menos de 1 minuto"
- [x] Remoção da imagem preview do cabeçalho da IRS no Passo 1, mantendo o formulário ultra limpo e com layout unificado
- [x] Callout inclinado no Passo 1: Inserção do texto estilizado em 2 linhas (*"não salvamos seus dados"*) com tipografia *handwritten* do sistema (`font-handwritten`), rotação sutil e seta direcional curva perfeitamente calibrada apontando para a barra/formulário
- [x] Fundo interativo Screensaver Form (`<ScreensaverFormBackground />`): Primeira página do formulário W-8 flutuando com física autêntica de reflexão 2D (algoritmo clássico do DVD/Windows screensaver com velocidades lineares coprimas nos eixos X e Y rebatendo exatamente nos 4 limites da tela: `calc(100vw - 100%)` e `calc(100vh - 100%)`), ativo exclusivamente no Passo 1 e transicionando suavemente para opacidade 0 nos passos seguintes (`transition-opacity duration-700`).
- [x] Identidade visual oficial FormW8 (`<BrandLogo />`): Tipografia corporativa geométrica e sóbria com "W8" em destaque amarelo marca-texto sólido (`#FFE600`), integrada no Header e Footer.
- [x] Destaque dinâmico marca-texto (`<HighlightedText />`): Pincelada em SVG de caneta marca-texto amarelo sólido (`#FFE600` com 100% de opacidade e altura estendida que envolve confortavelmente o texto com contraste preto puro `text-slate-950`), aplicada via tags i18n (`{highlight}...{/highlight}`).
- [x] Otimização de espaçamento no Passo 1: Redução do gap vertical entre o campo de entrada e a barra de navegação para 1/4 do tamanho anterior (`space-y-2 sm:space-y-3` e `pt-1`).
- [x] Refinamento visual no FAQ: Bordas dos cartões de pergunta e linha separadora de resposta no modo escuro configuradas com transparência ultra-sutil (`dark:border-white/[0.06]` e `dark:border-white/[0.04]`).

---

## 🎁 Fase 5: Tela de Conclusão e Entrega Consolidada (CONCLUÍDO)
- [x] Ação principal de download direto do PDF oficial preenchido (`pdf-lib`) posicionada **acima da visualização** para acesso prioritário e imediato
- [x] Visualizador interativo e responsivo do PDF Oficial preenchido em tempo real (`<PDFPreviewViewer />`) renderizado no navegador com suporte a tela cheia
- [x] Guia educativo de Mapeamento de Campos IRS & Plataformas com botões individuais de cópia rápida (`Copy` / `Check` com feedback instantâneo de "Copiado!") em cada campo da lista
- [x] Remoção estrita de qualquer linha separadora horizontal no rodapé (`border-t`), mantendo o design 100% limpo e sem bordas
- [x] Formatação robusta e preservação completa do endereço em consultas de CNPJ e CEP (normalização de S/N, inclusão automática de número predial, complemento e bairro)
- [x] Botões de privacidade e recomeço voluntário dos dados locais

---

## 🔍 Fase 6: SEO Massivo, FAQ Estruturado e Governança de Busca (CONCLUÍDO)
- [x] Seção completa e aprofundada de FAQ (`<FAQSection />`) na página inicial cobrindo todas as dúvidas fiscais essenciais (W-8BEN vs W-8BEN-E, Foreign TIN, Deel/Rippling, 0% Withholding, Chapter 3/4, Validade, Assinatura, Sanitização ASCII, AdSense, Steam, Apple Developer, MEI/SLU)
- [x] Respostas do FAQ renderizadas 100% de forma estática no DOM HTML para indexação imediata por web crawlers do Google e Bing
- [x] Schema.org JSON-LD estruturado (`FAQPage`, `WebApplication`, `HowTo`, `Organization`) injetado para indexação imediata e qualificação para Rich Snippets nos resultados de busca do Google
- [x] Infraestrutura técnica completa de SEO: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts` e Metadados OpenGraph/Twitter avançados
- [x] Programmatic SEO com 9 rotas dedicadas por plataforma (`/plataformas/deel`, `/plataformas/rippling`, `/plataformas/upwork`, `/plataformas/remote`, `/plataformas/google-adsense`, `/plataformas/apple-developer`, `/plataformas/steam`, `/plataformas/github-sponsors`, `/plataformas/stripe`) e 2 páginas pilares (`/w8ben-pessoa-fisica`, `/w8bene-pessoa-juridica`)
- [x] Inserção da comparação tributária real no Passo 2 ("Não sei essa resposta"): PF paga Carnê-Leão até 27,5% vs PJ que tributa pelo Simples ou Lucro Presumido entre 6% e 15%
- [x] Centralização horizontal de todos os links de suporte e toggles secundários ("Não sei essa resposta", "Preencher endereço manualmente")
- [x] Slider de palavras-chave SEO refinado: texto em cor secundária com opacidade suave (`text-muted-theme/20`) e rolagem contínua ultra-lenta (`110s`)
- [x] Redução na altura do visualizador de PDF no Passo 4 (`h-64 sm:h-72`) permitindo visualização imediata da lista de campos sem rolagem excessiva
- [x] Remoção do card externo e linhas separadoras na seção "Onde inserir cada informação" com cartões individuais em layout limpo
- [x] Ajuste preciso de 3px para a esquerda na cabeça da seta curva do callout do Passo 1
- [x] Curadoria semântica da lista de palavras-chave do slider em `footer.keywords` (`pt-BR.json` e `en-US.json`)
- [x] Ajuste no texto do Passo 2 para "• Empresa (CNPJ): Paga imposto no Brasil pelo Simples Nacional ou Lucro Presumido (geralmente 6% a 15%)." e remoção da badge de comparação
- [x] Servidor de desenvolvimento Next.js reiniciado e rodando em `http://localhost:48721`
- [x] 100% dos textos do FAQ, Mapeamento e Guias integrados nos dicionários i18n (`pt-BR.json` e `en-US.json`) sem strings hardcoded
- [x] Compilação Next.js estável com 19 páginas estáticas pré-renderizadas sem erros em `http://localhost:48721`

---

## 🖋️ Fase 7: Identidade Visual, Marca-Texto e Laboratório de Tipografia (CONCLUÍDO)
- [x] Ajuste dimensional do highlight marca-texto (`<HighlightedText />`): expansão vertical zerada (`inset-y-0 h-full`) e expansão horizontal reduzida pela metade (`-inset-x-[3px] w-[calc(100%+6px)]`), com 100% de opacidade sólida `#FFE600` e texto em contraste máximo `text-slate-950 font-black`.
- [x] Aplicação do mesmo destaque orgânico em SVG na marca oficial (`<BrandLogo />`) atrás do "W8", eliminando caixas quadradas genéricas.
- [x] Criação do Laboratório de Tipografia interativo em `/design-system` (`<TypographySelectorSection />`) com 6 opções de fontes modernas (Inter, Plus Jakarta Sans, DM Sans, Outfit, Space Grotesk, System UI).
- [x] Aplicação de `form.flatten()` no motor `pdf-lib` (`src/lib/pdf-engine.ts`) garantindo que os dados preenchidos no PDF sejam convertidos em vetores pretos sólidos (#000000) sem o overlay roxo/azul dos visualizadores de PDF.
- [x] Suavização dos tons escuros da aplicação: adoção de carvão suave com leve saturação azulada (`#1E293B` Slate-800 em títulos e destaques, `#475569` no corpo e `#64748B` em legendas).
- [x] Unificação pixel-perfect da identidade visual (`<BrandLogo />`) com padrão único e consistente.
- [x] Fixação permanente da tipografia **Space Grotesk** em toda a aplicação e remoção de scripts de persistência dinâmica.
- [x] Atualização da barra de progresso (`<ProgressBar />`) para utilizar o verde primário nos segmentos ativos e suavização da cor do texto "Passo 1 de 4".
- [x] Conexão interativa do slider superior de buscas com o FAQ: o clique em qualquer pergunta do slider rola a página suavemente e expande a resposta correspondente.
- [x] Redução de escala do formulário de fundo no Screensaver (`<ScreensaverFormBackground />`) e calibração de +5% na opacidade.
- [x] Atualização dos textos do Passo 1: subtítulo com *"..., de graça"* e placeholder com *"Nome, como consta no seu documento de identificação"*.
- [x] Integração da proteção invisível contra bots e scraping via Cloudflare Turnstile (`<TurnstileProtection />`) no Passo 1 com modo bypass transparente em desenvolvimento.
- [x] Correção de overflow horizontal no cabeçalho e casca (`AppShell` / `Header`): garantido `overflow-x-hidden` e ajuste responsivo da frase de identificação em telas menores (`hidden lg:block truncate whitespace-nowrap`), prevenindo quebra de layout em viewports intermediárias.
- [x] Otimização do container do FAQ (`<FAQSection />`): definido `max-h-[350px] sm:max-h-[390px]` com rolagem interna suave e efeito "peek" (exibindo ~4,5 perguntas colapsadas para sinalizar visualmente a existência de mais conteúdo), e margem horizontal estendida no mobile (`mx-4 sm:mx-auto`) permitindo que o usuário role a página inteira pelas laterais sem prender o toque no acordeão.
- [x] Atualização da imagem de fundo no Screensaver (`<ScreensaverFormBackground />`): incorporada a nova imagem recortada enviada pelo usuário (`screensaver-form-sample.png` com aspect ratio `229/257`) com dimensões responsivas (`w-[150px] sm:w-[180px] md:w-[200px]`).
- [x] Redução do espaçamento vertical (gap) entre inputs em todos os formulários e etapas:
  - Componente [`<Input />`](file:///Users/yuripauluci/Documents/git/formw8/src/components/ui/Input.tsx) otimizado com padding vertical refinado (`py-3`), espaço interno reduzido (`space-y-1`) e desativação de reserva de altura vazia desnecessária quando não há mensagens de erro/helper (`reserveHelperSpace = false`).
  - Gaps entre blocos de inputs no Passo 3 e Passo 2 compactados para `space-y-3` / `space-y-2.5` e `gap-2.5 sm:gap-3`, proporcionando visual mais coeso e elegante.
- [x] Correção de stacking context da logo (`<BrandLogo />`) e grifos (`<HighlightedText />`): adicionado `isolate` e `z-0` no SVG, eliminando a falha que ocultava o fundo marca-texto atrás do layer do rodapé/body.
- [x] Vinculação da cor dinâmica de destaque (`var(--brand-highlight, #FFE600)`):
  - Botão ativo do Seletor de Idioma ([`<LanguageSwitcher />`](file:///Users/yuripauluci/Documents/git/formw8/src/components/LanguageSwitcher.tsx)).
  - Botão "Apoiar com PIX" no rodapé ([`<Footer />`](file:///Users/yuripauluci/Documents/git/formw8/src/components/Footer.tsx)).
- [x] Aplicação da cor dinâmica de destaque (`var(--brand-highlight, #FFE600)`) nos segmentos da barra de progresso ([`<ProgressBar />`](file:///Users/yuripauluci/Documents/git/formw8/src/components/ui/ProgressBar.tsx)).
- [x] Grifo marca-texto orgânico com alto contraste aplicado no link `Quimera.biz` no rodapé ([`<Footer />`](file:///Users/yuripauluci/Documents/git/formw8/src/components/Footer.tsx)).
- [x] Calibração de opacidade no slider contínuo de tags ([`<KeywordSlider />`](file:///Users/yuripauluci/Documents/git/formw8/src/components/ui/KeywordSlider.tsx)): `opacity-75` contínuo em dispositivos móveis e `opacity-50` com transição para `opacity-100` no hover em desktop.
- [x] Expansão do espaçamento (gap) no Passo 1 ([`src/app/page.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/page.tsx)): dobrado o espaço entre o subtítulo e o campo de nome (`space-y-4 sm:space-y-6` com `pt-1.5 sm:pt-2`), proporcionando respiro visual e hierarquia equilibrada.
- [x] Destaque em negrito para os nomes dos formulários (`W-8BEN` e `W-8BEN-E`):
  - Suporte a tags `{bold}...{/bold}` implementado em [`<HighlightedText />`](file:///Users/yuripauluci/Documents/git/formw8/src/components/ui/HighlightedText.tsx).
  - Aplicado no texto de apoio do cabeçalho ([`<Header />`](file:///Users/yuripauluci/Documents/git/formw8/src/components/Header.tsx)), no subtítulo do Passo 1 ([`src/app/page.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/page.tsx)) e na tagline do rodapé ([`<Footer />`](file:///Users/yuripauluci/Documents/git/formw8/src/components/Footer.tsx)) em `pt-BR.json` e `en-US.json`.
- [x] Detecção de máscaras em tempo real e validação rigorosa com exibição clara de erros no Passo 3 ([`src/app/page.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/page.tsx) e [`src/lib/brazil-api.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/brazil-api.ts)):
  - Máscaras progressivas durante a digitação: CPF (`000.000.000-00`), CNPJ (`00.000.000/0000-00`), CEP (`00000-000`) e UF (2 letras maiúsculas).
  - Algoritmos de validação de dígitos verificadores para CPF (`isValidCpf`) e CNPJ (`isValidCnpj`).
  - Exibição de erros ativada: quando houver pendências nos campos de endereço, a visualização manual é revelada automaticamente e os campos exibem borda vermelha e mensagens de erro descritivas via i18n (`taxIdInvalidPF`, `taxIdInvalidPJ`, `zipInvalid`, `stateInvalid`).
- [x] Reset instantâneo de erros no preenchimento automático ([`src/app/page.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/page.tsx)):
  - Ao digitar o CNPJ ou CEP e carregar os dados cadastrais (Razão Social, Endereço, Cidade, Estado e CEP), o estado de erros de todos os campos preenchidos é resetado imediatamente (`delete updated[field]`), removendo bordas vermelhas e textos de alerta para os campos preenchidos e válidos.
- [x] Criação da suíte completa de Favicons, App Icons e Imagens de SEO / OpenGraph:
  - [`src/app/icon.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/icon.tsx): Favicon dinâmico 32x32 com o logo oficial `W8` e fundo amarelo neon marca-texto.
  - [`src/app/apple-icon.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/apple-icon.tsx): Apple Touch Icon 180x180 em alta resolução para dispositivos iOS e bookmarks Safari.
  - [`src/app/opengraph-image.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/opengraph-image.tsx) e [`src/app/twitter-image.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/twitter-image.tsx): Card dinâmico de compartilhamento social (1200x630) para WhatsApp, Twitter/X, LinkedIn, Slack e Facebook com a identidade visual FormW8, destaques de 0% Withholding e compatibilidade com plataformas (Deel, Rippling, Upwork).
  - Ícones estáticos de fallback em `public/` ([`public/icon.svg`](file:///Users/yuripauluci/Documents/git/formw8/public/icon.svg), [`public/icon-192.png`](file:///Users/yuripauluci/Documents/git/formw8/public/icon-192.png), [`public/icon-512.png`](file:///Users/yuripauluci/Documents/git/formw8/public/icon-512.png), [`public/favicon.ico`](file:///Users/yuripauluci/Documents/git/formw8/public/favicon.ico)).
  - Atualização de metadados em [`src/app/layout.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/layout.tsx) e PWA Manifest em [`src/app/manifest.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/app/manifest.ts).
- [x] Otimização do Disclaimer e refinamento autêntico do "Post-it":
  - Mensagem do disclaimer encurtada de forma ultra-sucinta e direta: *"Ferramenta independente sem vínculo com o IRS ou Receita Federal."* / *"Independent tool with no IRS or tax authority affiliation."*
  - Estilização autêntica de post-it com tipografia manuscrita (`font-handwritten`), rotação sutil (`-rotate-2`), sombra de elevação realista, detalhe superior de fita adesiva e transição no hover (`hover:rotate-0`) em [`src/components/Footer.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/Footer.tsx).
  - Remoção total de afirmações de "zero armazenamento de dados", "zero retenção" e "não salvamos seus dados" de todos os dicionários, callouts e metadados.
- [x] Refatoração do Favicon para área amarela 100% preenchida:
  - [`src/app/icon.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/icon.tsx) e [`public/icon.svg`](file:///Users/yuripauluci/Documents/git/formw8/public/icon.svg) atualizados com fundo amarelo `#FFE600` ocupando 100% da área do favicon sem margens e tipografia `W8` maximizada em contraste escuro.
- [x] Implementação do Módulo Nativo de Teste A/B ([`src/lib/ab-testing.ts`](file:///Users/yuripauluci/Documents/git/formw8/src/lib/ab-testing.ts)):
  - Sistema client-side determinístico, leve e resiliente a SSR/hidratação, com persistência em `localStorage` e disparo de eventos para Google Analytics (`gtag('event', 'experience_impression', ...)`).
  - Suporte a multi-variantes configurado para o subtítulo do Passo 1:
    - **Variante A (Anti-Retenção):** *"Evite a retenção de 30% nos seus pagamentos internacionais em menos de 1 minuto"*
    - **Variante B (Prático & Prestadores):** *"Preencha e baixe seu formulário oficial pronto para prestadores internacionais"* (sem menção a marcas de terceiros)
    - **Variante C (Amigável & Gratuito):** *"Preencha em minutos e baixe seu formulário oficial pronto, de graça"*
  - 100% integrado nos dicionários i18n (`pt-BR.json` e `en-US.json`).
- [x] Calibração do Slider de Palavras-chave Inicial ([`<KeywordSlider />`](file:///Users/yuripauluci/Documents/git/formw8/src/components/ui/KeywordSlider.tsx)):
  - Aumento da transparência no ambiente desktop (`sm:opacity-20` com `sm:hover:opacity-85`).
  - Posicionamento rebaixado na dobra inicial através de `mt-auto pt-4 sm:pt-8 pb-0` no container de [`AppShell.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/layout/AppShell.tsx).
- [x] Code Review Severo & Limpeza de Código Morto:
  - Remoção de componentes não utilizados (`DynamicFormBackground.tsx`, `HighlighterLoader.tsx`, `FormSpotlight.tsx`).
  - Atualização do teste de sanitização (`src/lib/sanitizer.test.ts`) para usar `node:test` e `node:assert` nativos, eliminando erros de tipagem.
  - Validação estrita de TypeScript (`npx tsc --noEmit`) com 0 erros em todo o projeto.
  - Atualização das regras de governança e release em [`AGENTS.md`](file:///Users/yuripauluci/Documents/git/formw8/AGENTS.md) (Regra 6: Branch -> Commit -> Push -> Validação Manual -> Aprovação explícita de Deploy).
- [x] Criação e Refinamento da Cordinha de Abajur ([`<LampPullCord />`](file:///Users/yuripauluci/Documents/git/formw8/src/components/ui/LampPullCord.tsx)):
  - Cordinha suspensa no topo direito com simulação de mola elástica e pêndulo amortecido em TypeScript nativo (zero dependências).
  - Suporte de base visível rente ao teto do navegador (`preserveAspectRatio="xMidYMin meet"`, placa de teto `14x3px` e anel conector `5x2.5px`).
  - Balanço do hover reajustado para suavidade máxima (micro-oscilação ultra-sutil ao passar o mouse).
  - Dinâmica de balanço horizontal orgânico ao clicar e ao soltar (`vel.x` e deslocamento angular com amortecimento realista).
  - Gatilho com recuo snappier que alterna o tema (Claro ↔ Escuro) com feedback luminoso no puxador.
  - Transição suave global de tema (350ms com easing cúbico) em [`src/app/globals.css`](file:///Users/yuripauluci/Documents/git/formw8/src/app/globals.css) para um efeito acolhedor e gradual de iluminação.
- [x] Refinamento do Foco dos Inputs com Cor de Highlight ([`src/app/globals.css`](file:///Users/yuripauluci/Documents/git/formw8/src/app/globals.css) e [`src/components/ui/Input.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/ui/Input.tsx)):
  - Borda de foco sem validação definida diretamente na cor de destaque (`var(--brand-highlight, #FFE600)`), acompanhada de halo sutil de 1px e glow suave.
  - Alinhamento idêntico aplicado aos estados de erro e sucesso (`!ring-1`).
- [x] Redesign do Topo do Rodapé ([`src/components/Footer.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/Footer.tsx)):
  - Remoção do subtítulo redundante da logo no footer (que não agregava valor para SEO).
  - Posicionamento do **Post-it amarelo** diretamente abaixo da logo à esquerda, com mensagem atualizada: *"Ferramenta gratuita e independente sem vínculo com o IRS ou Receita Federal."*
  - Botão "Apoiar com Pix", alternador de tema e seletor de idioma alinhados de forma equilibrada à direita.
- [x] Expansão Estratégica de SEO & Pesquisa de Termos "Trabalhe na Gringa" ([`pt-BR.json`](file:///Users/yuripauluci/Documents/git/formw8/src/i18n/dictionaries/pt-BR.json), [`en-US.json`](file:///Users/yuripauluci/Documents/git/formw8/src/i18n/dictionaries/en-US.json), [`layout.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/layout.tsx)):
  - Incorporação dos termos de maior volume de busca no Brasil para trabalho remoto internacional: *"Trabalhe na Gringa"*, *"Salário da Gringa"*, *"Trabalhar para o Exterior"*, *"Trabalhe para os EUA"*, *"Receber em Dólar no Brasil"*, *"Contrato PJ Exterior"*, *"Dev na Gringa Impostos"*, *"Bitributação Brasil Estados Unidos"*.
  - Sincronização dos termos com os sliders de busca (`footer.keywords` e `footer.relatedSearches`), conectando termos comuns do público com as respostas explicativas do FAQ.
  - Otimização das meta tags e metadados estruturados JSON-LD (`WebApplication` e `HowTo`) para acelerar a indexação orgânica no Google e Bing.
- [x] Refinamento do Visualizador de PDF e Ações do Passo 4 ([`src/components/PDFPreviewViewer.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/PDFPreviewViewer.tsx), [`src/app/page.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/page.tsx)):
  - Remoção de todos os `border-radius` do container do visualizador de PDF e da tag `<object>`, eliminando recortes visuais estranhos.
  - Remoção da barra de cabeçalho do PDF com o nome do arquivo.
  - Inserção de botão flutuante circular com ícone (`ExternalLink`) no canto superior direito do visualizador de PDF para abrir em nova aba de forma rápida e elegante.
  - Remoção dos botões de "Limpar dados locais" e "Começar novamente" do interior do Passo 4.
  - Posicionamento do botão "Começar novamente" na barra inferior de navegação à direita quando `step === 4` (no mesmo lugar do botão "Próximo passo" dos passos anteriores).
- [x] Bloco Caligráfico Open-Source e Post-it no Rodapé ([`src/components/Footer.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/Footer.tsx), [`pt-BR.json`](file:///Users/yuripauluci/Documents/git/formw8/src/i18n/dictionaries/pt-BR.json), [`en-US.json`](file:///Users/yuripauluci/Documents/git/formw8/src/i18n/dictionaries/en-US.json)):
  - Alinhamento centralizado (`text-center`) aplicado tanto ao texto interno do Post-it quanto ao bloco caligráfico de apoio.
  - Largura reduzida para formato de nota compacta/quadrada (`max-w-[190px]`, `leading-snug`).
  - Leve rotação caligráfica (`-rotate-2`) perfeitamente alinhada acima dos botões de controle.
  - Textos atualizados conforme diretrizes:
    - **Post-it (Disclaimer):**
      - `pt-BR`: *"Ferramenta gratuita sem vínculo com nenhuma instituição ou governo."*
      - `en-US`: *"Free tool with no affiliation to any institution or government."*
    - **Texto Caligráfico (Apoio Pix):**
      - `pt-BR`: *"Projeto open-source feito para ajudar a todos. Se te ajudou, apoie com um Pix"*
      - `en-US`: *"Open-source project built to help everyone. If this helped you, support with Pix"*
- [x] Arquitetura de Interlinking Inteligente no FAQ & Hub de Conteúdo SEO ([`src/components/FAQSection.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/components/FAQSection.tsx), [`src/i18n/dictionaries/`](file:///Users/yuripauluci/Documents/git/formw8/src/i18n/dictionaries/), [`src/app/plataformas/`](file:///Users/yuripauluci/Documents/git/formw8/src/app/plataformas/)):
  - Atualização do parser de markdown do FAQ (`renderFaqAnswer`) para suportar links internos do Next.js (`Link`) com destaque sutil em verde esmeralda (`decoration-emerald-500`) e links externos em novas abas.
  - Inclusão de links contextuais inteligentes diretamente nas respostas do FAQ para todas as páginas de destino:
    - `/w8ben-pessoa-fisica` (Guia PF e autônomos)
    - `/w8bene-pessoa-juridica` (Guia PJ, SLU e LTDA)
    - `/plataformas/deel` (Guia de compliance Deel)
    - `/plataformas/rippling` (Guia de onboarding fiscal Rippling)
    - `/plataformas/upwork` (Guia anti-retenção Upwork)
    - `/plataformas/remote` (Guia de certificação Remote.com)
    - `/plataformas/google-adsense` (Guia AdSense e YouTube)
    - `/plataformas/apple-developer` (Guia App Store Connect)
    - `/plataformas/steam` (Guia Valve Steamworks)
    - `/plataformas/github-sponsors` (Guia GitHub Sponsors)
    - `/plataformas/stripe` (Guia Stripe e Paddle)
  - Inserção de blocos recíprocos de "Guias Relacionados" em todas as páginas de plataformas e páginas pilares, gerando malha completa de rastreabilidade para os indexadores do Google e Bing.
- [x] Refinamento dos Cartões de Mapeamento no Passo 4 ([`src/app/page.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/page.tsx), [`pt-BR.json`](file:///Users/yuripauluci/Documents/git/formw8/src/i18n/dictionaries/pt-BR.json), [`en-US.json`](file:///Users/yuripauluci/Documents/git/formw8/src/i18n/dictionaries/en-US.json)):
  - Aplicação do destaque marca-texto amarelo orgânico (`{highlight}`) nas numerações dos campos: `{highlight}1.{/highlight}`, `{highlight}2.{/highlight}`, `{highlight}3.{/highlight}`, `{highlight}6a.{/highlight}`, `{highlight}9b.{/highlight}`, `{highlight}4.{/highlight}`, `{highlight}5.{/highlight}`, `{highlight}Part III.{/highlight}`, `{highlight}Part III / XXX.{/highlight}`.
  - Renderização via `<HighlightedText />` preservando a escala tipográfica e contraste máximo com o restante do título.
  - Encurtamento da explicação do tratado fiscal para formato conciso:
    - `pt-BR`: *"Isenção fiscal (0% Withholding)"*
    - `en-US`: *"Tax treaty exemption (0% Withholding)"*
  - Redução do ícone de copiar (`w-3 h-3`) e botão de cópia com layout refinado.
- [x] Badge de Like com Pincelada Highlight no Passo 4 ([`src/app/page.tsx`](file:///Users/yuripauluci/Documents/git/formw8/src/app/page.tsx)):
  - Inserção de ícone sólido de Like (`ThumbsUp` com traço e preenchimento vetoriais precisos) sobre a pincelada orgânica marca-texto amarelo (`#FFE600`) em coluna dedicada à esquerda do título e subtítulo da tela de conclusão do formulário gerado.
  - Passo 3 mantido com layout limpo e padronizado.
- [x] Governança Open-Source & Documentação de Lançamento:
  - Adicionado arquivo oficial [`LICENSE`](file:///Users/yuripauluci/Documents/git/formw8/LICENSE) sob licença **MIT** permissiva.
  - Criado [`README.md`](file:///Users/yuripauluci/Documents/git/formw8/README.md) completo com badges, visão do projeto, arquitetura Zero-Data, stack técnica, guia passo a passo local e disclaimer legal.
  - Criado [`CONTRIBUTING.md`](file:///Users/yuripauluci/Documents/git/formw8/CONTRIBUTING.md) com diretrizes de contribuição, i18n e fluxo de PRs.
  - Criado [`SECURITY.md`](file:///Users/yuripauluci/Documents/git/formw8/SECURITY.md) para política de divulgação responsável e privacidade.
- [x] Repositório preparado e pronto para o commit inicial.








