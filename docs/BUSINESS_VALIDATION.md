# Validação de Negócio, Mercado e Riscos (outubro/2026)

Documento vivo que complementa [`DEEP_DIVE_MARKET_AND_TAX_RESEARCH.md`](DEEP_DIVE_MARKET_AND_TAX_RESEARCH.md) e [`RESEARCH_CPA_EXCHANGE_PLATFORMS.md`](RESEARCH_CPA_EXCHANGE_PLATFORMS.md). Separa o que foi **confirmado em fonte**, o que é **estimativa** e o que ainda **precisa ser medido**.

## 1. Objetivo definido
Ferramenta gratuita de comunidade que **se paga** (custos de hospedagem/domínio cobertos por indicações e, se fizer sentido, anúncios), sem paywall e sem coleta de dados pessoais. Fase atual: testar e validar no domínio `formw8.quimera.biz` e migrar para o domínio oficial se a tração justificar.

## 2. O que os dados confirmam (mercado)
| Dado | Fonte | Observação |
|---|---|---|
| Brasileiros que trabalham para o exterior cresceram 491% entre 2020 e 2022 | Husky (via imprensa) | Mede a base de usuários **da própria Husky** (1.251 → 11.284), não o total do país |
| Pesquisa Global Worker 2024: 1.600 respondentes, 1.154 global workers, renda média R$ 15–25 mil/mês | Husky | Amostra de quem usa a plataforma, não representa o universo |
| Demanda por talentos brasileiros +53% em 2025; empresas brasileiras contratando fora +28% | [Deel International Hiring Report 2025](https://amdjus.com.br/pesquisa-revela-aumento-de-53-na-procura-por-talentos-brasileiros-no-mercado-internacional/) | Reportado por veículo secundário |
| Exportação de serviços de computação e informação: R$ 33,3 bi (2024) → R$ 38,6 bi (2025), +25,1% | [Brasscom](https://brasscom.org.br/wp-content/uploads/2026/05/BRI2-2026-001-Relatorio-Setorial-2024-Restatement-versao-resumida-v1-SITE1.pdf) (base Bacen) | Mercado em expansão; **não** mede demanda por W-8 |

**Limite honesto:** não há dado público do volume de buscas por "W-8BEN" nem de quantos brasileiros precisam do formulário por ano. Esse número só será conhecido medindo (seção 6).

## 3. Concorrência
- **Geradores gratuitos em inglês:** [Otto](https://joinotto.com/tax/forms/w-8ben), [Jotform](https://www.jotform.com/tax-form-generator/w-8ben), [SimplePDF](https://simplepdf.com/forms/w-8ben) (também afirma processar no navegador), Sprintax, Instafill.ai.
- **Conteúdo em português (explicam, não geram):** Nomad, ContabilidadeZen, Tactus, Facilite e o glossário da Deel.
- **Diferencial do FormW8:** pt-BR, CPF/CNPJ validados por dígito verificador, endereço por CEP, sanitização ASCII, fluxos de MEI, SLU/LTDA e Active/Passive NFFE, gabarito por plataforma.
- **Risco estrutural:** Deel, Rippling e Upwork têm formulário próprio dentro do cadastro, então parte dos usuários nunca precisa do PDF. O valor mais defensável é o **gabarito de campos** e os **guias por plataforma**.

## 4. Fatos fiscais verificados
- **Revisão do formulário:** os PDFs publicados em `irs.gov/pub/irs-pdf/fw8ben.pdf` e `fw8bene.pdf` eram, em 12/10/2026, **byte a byte idênticos** aos templates em `public/forms` (Rev. outubro/2021). Um workflow semanal (`.github/workflows/irs-form-monitor.yml`) abre uma issue se isso mudar.
- **Active vs Passive NFFE:** Active exige menos de 50% da receita bruta passiva **e** menos de 50% dos ativos gerando renda passiva. Passive NFFE exige ainda a declaração de sócios americanos (Parte XXVI / controlling persons) ([Ecovis](https://global.ecovis.com/?p=7842)).
- **Tratado Brasil–EUA:** fontes consultadas indicam que não há tratado abrangente de bitributação sobre renda; portanto a Parte III (benefícios de tratado) não se aplica. Confirmar na IRS Publication 901.
- **Fonte da renda:** serviços prestados fora dos EUA tendem a ser de fonte estrangeira (sem retenção de 30%), mas isso depende de onde o serviço é prestado. Rendimentos como royalties (ex.: AdSense, segundo parte das fontes) têm tratamento diferente. **Revisar os guias de AdSense, GitHub Sponsors e Steam com um contador** antes de divulgação ampla.
- **Validade do W-8BEN:** em geral até o fim do terceiro ano civil após a assinatura, ou antes se os dados mudarem (fontes secundárias; confirmar nas instruções do IRS).
- **O formulário não dispensa** nota fiscal nem declaração da renda no Brasil (Carnê-Leão/IRPF).

## 5. Riscos e mitigação
| Risco | Estado / mitigação |
|---|---|
| Conteúdo fiscal incorreto gera responsabilidade ao usuário (formulário assinado sob pena de perjúrio) | Disclaimer no README e na interface; avisos de Active/Passive e Corporation; **revisão por contador recomendada para os guias de plataforma** |
| Transparência dos links de indicação | Aviso visível "Publicidade" no passo 4 (`exchangeDisclosure`) e `rel="sponsored"`; rótulos neutros em vez de superlativos sem fonte |
| AdSense × privacidade (cookies de terceiros) | **Desativado por ora.** Se ligado: apenas nas páginas de guia, nunca nos passos com CPF/CNPJ, com mecanismo de consentimento |
| Domínio provisório | Validar em `formw8.quimera.biz`; ao migrar, definir `NEXT_PUBLIC_SITE_URL` e usar redirects 301 |
| Mudança de revisão do formulário do IRS | Monitor semanal + testes que validam os nomes dos campos do template |
| Termos de afiliados não confirmados | Ver aviso em `RESEARCH_CPA_EXCHANGE_PLATFORMS.md`; confirmar nos portais de parceiros |

## 6. Plano de validação com dados (sem violar o zero-data)
Decisão: **sem ferramentas pagas nem novos pacotes**. Contadores anônimos próprios no Firestore (plano gratuito, região São Paulo), mais Google Search Console e os painéis dos parceiros. Medir **somente eventos agregados e anônimos, sem cookies e sem dados do formulário** (ver `src/lib/metrics.ts`). Limite conhecido: quem tiver a chave pública pode inflar os contadores; as regras só aceitam +1 por requisição e o Search Console/painéis dos parceiros servem de checagem cruzada.

1. visitas por página (home, guias de plataforma);
2. conclusão: passo 1 → passo 4 e PDF baixado;
3. uso do gabarito (campo copiado) por plataforma;
4. cliques em links de indicação;
5. Google Search Console para as consultas que trazem tráfego.

Sugestão de leitura após 4 semanas: taxa de conclusão do passo 1 ao 4, proporção PDF × gabarito e CTR dos links de indicação. Sem número de referência público, usar a própria base como linha de partida e comparar semana a semana.

## 7. Receita: expectativas realistas
A simulação de ~R$ 4.625 por 100 conclusões (documento de CPA) assume 8% de conversão na Husky e **não foi validada**; trate como teto. O objetivo "ferramenta que se paga" exige apenas cobrir hospedagem e domínio, o que é compatível com tração modesta.
