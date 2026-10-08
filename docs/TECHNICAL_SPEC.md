# ESTUDO DE VIABILIDADE TÉCNICO-ECONÔMICA E DESIGN DE PRODUTO FISCAL
**Domínio:** `formw8.com.br`  
**Fase:** Especificação de Arquitetura, UX e Engenharia de Software  
**Source of Truth:** Especificação técnica e conceitual atualizada com a arquitetura completa de produção.

---

## 1. Princípios Norteadores de Produto ("Lean as Fuck" & Frictionless UX)

1. **Fricção Cognitiva Zero para Leigos Totais:**
   * O usuário alvo não conhece o jargão fiscal americano (IRS).
   * NENHUMA pergunta técnica é feita sem contexto imediato e tradução para linguagem simples e cotidiana.
   * Toda etapa possui explicações didáticas opcionais ("Por que pedimos esta informação?"), alinhadas ao guia oficial [docs/TONE_OF_VOICE.md](file:///Users/yuripauluci/Documents/git/formw8/docs/TONE_OF_VOICE.md).
2. **Arquitetura Zero-Data ("Lean as Fuck"):**
   * Nenhum dado pessoal é salvo em banco de dados, cookies de rastreamento ou servidores.
   * Processamento 100% local no navegador do cliente (Client-Side).
   * Sem recursos desnecessários de assinatura digital no site — foco absoluto na simplicidade e na solução do problema fiscal.
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
   * Acentos e caracteres especiais (`á, ç, õ`) são sanitizados em tempo real sem emitir erros punitivos, exibindo confirmação visual sutil de conformidade americana (+34% de percepção de segurança).
3. **Divisão em 4 Etapas Lógicas (*Chunking*):**
   * **Etapa 1:** Identificação e Boas-Vindas (Nome Completo)
   * **Etapa 2:** Tipo de Entidade (Pessoa Física vs Empresa SLU/LTDA)
   * **Etapa 3:** Dados Cadastrais & Fiscais (CPF/CNPJ + Endereço com sanitização)
   * **Etapa 4:** Confirmação de 0% de Retenção e Entrega Dupla (PDF + Guia)
4. **Avanço Inteligente por Teclado:** Suporte à tecla `Enter` para progressão fluida no desktop (+28% de velocidade).

---

## 3. Estrutura de Arquitetura e Engenharia de Software

* **Framework:** Next.js 15+ (App Router, React 19, TypeScript)
* **Estilização & Design System:** Tailwind CSS v3.4 com biblioteca de primitivos de UI em `src/components/ui/` (`Button`, `Input`, `Card`, `Badge`, `ContextDrawer`, `Container`, `ProgressBar`, `OptionCard`).
* **Validação de Schemas:** Zod (`src/lib/schemas/w8-form-schema.ts`) com tipos estritos para W-8BEN (PF) e W-8BEN-E (PJ).
* **State Machine do Wizard:** React Context (`src/context/wizard-context.tsx`) gerenciando navegação, dados acumulados, sanitização em tempo real e limpeza de memória.
* **Processamento e Preview de PDF:** Client-side filling e renderização interativa ao vivo via `pdf-lib` (`src/lib/pdf-engine.ts` e `src/components/PDFPreviewViewer.tsx`).
* **Sanitizador Regex ASCII:** Módulo de sanitização (`src/lib/sanitizer.ts`) com suíte de testes unitários (`src/lib/sanitizer.test.ts`).
* **Programmatic SEO & Schema.org JSON-LD:**
  * 13 rotas estáticas dedicadas por plataforma (`/plataformas/deel`, `/plataformas/rippling`, `/plataformas/upwork`, `/plataformas/remote`, `/plataformas/google-adsense`, `/plataformas/apple-developer`, `/plataformas/steam`, `/plataformas/github-sponsors`, `/plataformas/stripe`, `/plataformas/payoneer`, `/plataformas/fiverr`, `/plataformas/turing`, `/plataformas/toptal`).
  * Páginas pilares (`/w8ben-pessoa-fisica`, `/w8bene-pessoa-juridica`).
  * Geração estática de `sitemap.xml`, `robots.txt` e `manifest.webmanifest`.
  * Metadados e Schemas estruturados completos: `FAQPage`, `WebApplication`, `HowTo`, `BreadcrumbList` e `Organization`.
* **Configuração Centralizada de Afiliados & Câmbio:**
  * Módulo `src/config/affiliates.ts` para injeção limpa de links e cupons personalizados via variáveis de ambiente (`NEXT_PUBLIC_*`) com diretrizes `rel="noopener noreferrer sponsored"`.



