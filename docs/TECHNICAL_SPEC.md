# ESTUDO DE VIABILIDADE TÉCNICO-ECONÔMICA E DESIGN DE PRODUTO FISCAL
**Domínio:** `formw8.quimera.biz`  
**Fase:** Especificação de Arquitetura, UX e Engenharia de Software  
**Source of Truth:** Especificação técnica e conceitual atualizada com a arquitetura completa de produção.

---

## 1. Princípios Norteadores de Produto ("Lean as Fuck" & Frictionless UX)

1. **Fricção Cognitiva Zero para Leigos Totais:**
   * O usuário alvo não conhece o jargão fiscal americano (IRS).
   * NENHUMA pergunta técnica é feita sem contexto imediato e tradução para linguagem simples e cotidiana.
   * Toda etapa possui explicações didáticas opcionais ("Por que pedimos esta informação?"), alinhadas ao guia oficial [docs/TONE_OF_VOICE.md](file:///Users/yuripauluci/Documents/git/formw8/docs/TONE_OF_VOICE.md).
2. **Arquitetura 100% Zero-Data & Zero-Storage:**
   * Nenhum dado pessoal é salvo em banco de dados, cookies, `localStorage` ou servidores.
   * Sem cookies de rastreamento ou banners intrusivos. Preferências de idioma e tema são detectadas dinamicamente em memória a partir do navegador/sistema operacional.
   * Processamento 100% local no navegador do cliente (Client-Side).
3. **Atendimento Duplo no Mesmo Fluxo Fluidizado:**
   * **Caso A (Download de Documento):** Entrega do PDF oficial (W-8BEN ou W-8BEN-E) totalmente preenchido e sanitizado para o usuário baixar e enviar à contratante.
   * **Caso B (Resumo para Copiar & Colar):** Exibição de um guia visual "Campo por Campo" para o usuário que está preenchendo um formulário digital em plataformas de terceiros (Deel, Rippling, Remote, etc.) e só precisa das respostas corretas para colar no formulário da plataforma.
4. **Internacionalização Obrigatória (100% i18n):**
   * Zero strings ou números hardcoded na UI. Todos os textos, rotulagens, explicações e mensagens de erro derivam de dicionários de i18n (`pt-BR`, `en-US`).
   * Sincronização dinâmica do atributo `<html lang="...">` para conformidade com acessibilidade WCAG 2.1 AA.

---

## 2. Fundamentação Científica de UX (Baymard Institute, NN/g e CXL)

1. **Modelo de Interação com Botões Ativos (*Active Validation*):**
   * Botões de ação nunca ficam desabilitados estaticamente. O clique em estado incompleto orienta o foco imediatamente para o campo faltante com feedback construtivo (+14% de conversão).
2. **Sanitização Positiva de Caracteres (Positive Affirmation):**
   * Acentos e caracteres especiais (`á, ç, õ`, `Nº`, `Ø`, apóstrofos) são sanitizados e transliterados em tempo real sem emitir erros punitivos, exibindo confirmação visual sutil de conformidade americana.
3. **Divisão em 4 Etapas Lógicas (*Chunking*):**
   * **Etapa 1:** Identificação e Boas-Vindas (`StepName.tsx`)
   * **Etapa 2:** Tipo de Entidade (`StepEntityType.tsx` — 3 Cards: Pessoa Física, MEI via CPF e Empresa SLU/LTDA com opção de Passive NFFE)
   * **Etapa 3:** Dados Cadastrais & Fiscais (`StepTaxAddress.tsx` — CPF/CNPJ + Endereço com auto-fill e AbortController)
   * **Etapa 4:** Confirmação e Entrega Dupla (`StepConfirmation.tsx` — PDF Preview, Download, Mapeamento de Plataformas e notas fiscais para MEI / FATCA)
4. **Avanço Inteligente por Teclado:** Suporte à tecla `Enter` para progressão fluida e navegação por setas (`↑`, `↓`, `←`, `→`) em opções de rádio.

---

## 3. Estrutura de Arquitetura e Engenharia de Software

* **Framework:** Next.js 15.5.x (App Router, React 19, TypeScript estrito)
* **Estilização & Design System:** Tailwind CSS v3.4 com biblioteca de primitivos de UI em `src/components/ui/` (`Button`, `Input`, `Card`, `Badge`, `Container`, `ProgressBar`, `OptionCard`). Sem classes divisórias arbitrárias (`border-t`, `border-b`).
* **Validação de Schemas:** Zod (`src/lib/schemas/w8-form-schema.ts`) com schemas por etapa (`Step1Schema`, `Step2Schema`, `Step3SchemaPF`, `Step3SchemaPJ`, `W8FormSchema`).
* **State Machine do Wizard:** React Context (`src/context/wizard-context.tsx`) gerenciando navegação, dados acumulados, sanitização em tempo real e limpeza de memória.
* **Processamento e Preview de PDF:** Client-side filling via `pdf-lib` carregado dinamicamente (`src/lib/pdf-engine.ts` e `src/components/PDFPreviewViewer.tsx`) usando templates oficiais versionados da IRS (`/forms/fw8ben-rev10-2021.pdf` e `/forms/fw8bene-rev10-2021.pdf`).
* **Sanitizador Regex & Transliteração:** Módulo `src/lib/sanitizer.ts` com suíte de testes unitários automatizados (`src/lib/sanitizer.test.ts`).
* **Integração com Dados Públicos Brasileiros:** `src/lib/brazil-api.ts` com failover multi-provedor (ViaCEP, BrasilAPI, Minha Receita, CNPJ.ws), cancelamento de requisições concorrentes com `AbortSignal` e validação por checksum de CPF/CNPJ.
* **Programmatic SEO & Schema.org JSON-LD:**
  * 13 rotas estáticas dedicadas por plataforma (`/plataformas/deel`, `/plataformas/rippling`, `/plataformas/upwork`, etc.).
  * Páginas pilares (`/w8ben-pessoa-fisica`, `/w8bene-pessoa-juridica`).
  * Geração estática de `sitemap.xml`, `robots.txt` e `manifest.webmanifest`.
  * Metadados e Schemas estruturados completos com tags `<` escapadas em JSON-LD (`FAQPage`, `WebApplication`, `HowTo`, `BreadcrumbList` e `Organization`).
* **Configuração Centralizada de Afiliados & Câmbio:**
  * Módulo `src/config/affiliates.ts` para injeção limpa de links com `rel="noopener noreferrer sponsored"`.
* **Segurança e Qualidade:**
  * PostCSS com `overrides` em `package.json` para eliminar vulnerabilidades.
  * Suíte automatizada com Vitest (`npm run test`), Typecheck (`npm run typecheck`), Lint (`npm run lint`) e GitHub Actions CI (`.github/workflows/ci.yml`).

---

## 4. Estratégia de Idioma, SEO e Conformidade Legal

1. **HTML Estático Primário em pt-BR & Programmatic SEO (A5 & A6):**
   * O produto e o domínio `formw8.quimera.biz` destinam-se primariamente a profissionais brasileiros (PF e PJ) que exportam serviços para o exterior.
   * **Decisão de Produto:** A geração estática SSG inicial dos templates HTML, os 13 guias de plataformas (`platforms-data.ts`) e as páginas pilares (`/w8ben-pessoa-fisica`, `/w8bene-pessoa-juridica`) são estruturados em Português (`pt-BR`) por decisão estratégica de SEO focado no Google Brasil (termos de busca: *"como preencher w8ben na deel"*, *"w8bene slu"*).
   * O suporte internacional a `en-US` opera na aplicação principal e no Wizard via detecção de `navigator.language` ou alternância no rodapé, atualizando dinamicamente a árvore de UI e a tag `<html lang="...">`.
2. **Classificação Fiscal (PF, MEI e PJ) & Chapter 3 Corporation:**
   * **Pessoa Física:** Formulário W-8BEN com CPF para autônomos e freelancers.
   * **MEI (Microempreendedor Individual):** Formulário W-8BEN com CPF, alinhado com o tratamento de *Disregarded Entity* das plataformas internacionais (Deel, Upwork), com notas explicativas para emissão da NFS-e no Brasil.
   * **Empresa SLU / LTDA (Chapter 3 Corporation):** Toda Pessoa Jurídica é classificada como *Corporation* no Chapter 3 (padrão adotado por contabilidades e plataformas internacionais para LTDA/SLU brasileiras). Outras formas societárias complexas (ex: S.A. aberta, associações, fundos) são orientadas a consultar assessoria contábil especializada.
   * **Atividade PJ (Chapter 4):** Dois botões lado a lado no Passo 2 permitindo selecionar entre *Prestação de Serviços* (Active NFFE - padrão para exportação de serviços/tech) e *Holding / Receita Passiva* (Passive NFFE - Linha 5 e Linha 40a da Parte XXVI com alerta sobre declaração de sócios americanos).
   * **Formatação de Endereço Governamental:** Padrão oficial `Logradouro, Número, Bairro` (ou `S/N`), com fallback automático via CEP quando a Receita Federal omite o logradouro por sigilo (ME).
3. **Acessibilidade WCAG 2.1 AA:**
   * Contraste calibrado em `--primary-bg` (`#15803d` com 4.54:1 sobre branco) e `--text-muted` (`#526071` com 5.4:1).
   * Modais com focus trap completo e fechamento por `Escape`.
   * Radio groups com navegação por teclado (`↑`, `↓`, `←`, `→`, `Enter`, `Space`).



## 5. Qualidade, Validação e Testes
1. **Validação única (Zod):** os schemas por etapa em `src/lib/schemas/w8-form-schema.ts` (`Step1Schema`, `Step3SchemaPF`, `Step3SchemaPJ`) são a única fonte de regras de validação; `src/lib/validation.ts` (`validateStep`) devolve uma chave de i18n por campo inválido, traduzida em `page.tsx`.
2. **Navegação do wizard:** cada passo é uma entrada do histórico do navegador (`wizard-context.tsx`), então Voltar/Avançar do navegador percorrem os passos; os dados continuam apenas em memória. Um aviso `beforeunload` protege contra perda acidental ao recarregar com dados digitados. O Enter nos campos usa `preventDefault` para não acionar o controle que recebe foco no passo seguinte.
3. **Motor de PDF:** `pdf-lib` é carregada sob demanda (`import()` dinâmico) apenas no passo 4; os bytes do template do IRS são cacheados em memória. O motor devolve `warnings` (campo ausente ou truncado) e o preview mostra um aviso quando existem.
4. **Testes:**
   * Unitários (Vitest, `npm test`): sanitizador, schemas, validação por etapa, APIs brasileiras e geração dos PDFs (PF, MEI, PJ Active e PJ Passive).
   * Ponta a ponta (Playwright, `npm run test:e2e`): fluxos PF e PJ até o download do PDF, regressão do Enter no nome, Voltar/Avançar do navegador e validação do passo 1. As consultas públicas de CEP/CNPJ são bloqueadas para manter os testes herméticos. O servidor de teste usa a porta 48730 e a pasta `.next-e2e` (`NEXT_DIST_DIR`), sem colidir com `npm run dev`.
5. **Monitor de revisão do IRS:** `.github/workflows/irs-form-monitor.yml` compara semanalmente os PDFs oficiais com os de `public/forms` e abre uma issue se divergirem.
6. **CI:** typecheck, lint, testes unitários, build e testes E2E em cada push/PR.
7. **Transparência comercial:** a seção de câmbio do passo 4 exibe aviso de publicidade e usa rótulos neutros; detalhes em [`BUSINESS_VALIDATION.md`](BUSINESS_VALIDATION.md).
8. **Classificação Chapter 4 de holdings:** ao escolher "Holding" no passo 2, duas perguntas (receita passiva ≥ 50%; ativos passivos ≥ 50%) definem o enquadramento via `deriveChapter4Status` (`src/lib/fatca.ts`): qualquer "sim" gera Passive NFFE; nenhum "sim" gera Active NFFE. Empresas operacionais (cartão "Prestação de Serviços") são sempre Active.
9. **Contadores anônimos (`src/lib/metrics.ts`):** cada evento (visita, passos 2 a 4, tipo de entidade, PDF baixado, campo copiado, clique em link de indicação) soma +1 em `daily/AAAA-MM-DD` no Firestore via REST, sem cookies, sem armazenamento no navegador e sem dados do formulário. Só funciona em produção com `NEXT_PUBLIC_FIREBASE_PROJECT_ID` e `NEXT_PUBLIC_FIREBASE_API_KEY` definidos (forks e desenvolvimento não escrevem). `firestore.rules` bloqueia leitura e aceita apenas +1 em um evento permitido por requisição; verificado com o emulador (`scripts/test-firestore-rules.mjs`). Banco na região `southamerica-east1`.
