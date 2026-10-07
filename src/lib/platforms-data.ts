export interface PlatformInfo {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  category: string;
  defaultEntityType: "PF" | "PJ";
  summary: string;
  instructions: {
    title: string;
    description: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const PLATFORMS_DATA: Record<string, PlatformInfo> = {
  deel: {
    slug: "deel",
    name: "Deel",
    title: "Como Preencher o Formulário W-8 na Deel (Guia Fiscal para Brasileiros)",
    metaDescription: "Guia passo a passo para preencher e aprovar o formulário W-8BEN (CPF) ou W-8BEN-E (CNPJ) na Deel e evitar retenção de 30% nos seus pagamentos.",
    category: "Contratos Internacionais & Folha Global",
    defaultEntityType: "PJ",
    summary: "A Deel exige a certificação do formulário W-8 antes de liberar saques e transferências para contas bancárias no Brasil. Se você atua via CNPJ (SLU/LTDA), utilize o W-8BEN-E; se atua como autônomo individual, utilize o W-8BEN.",
    instructions: [
      {
        title: "1. Acesse o menu Tax Documents na Deel",
        description: "No seu painel de prestador na Deel, clique no seu perfil > 'Account Settings' > 'Tax Documents' ou siga o banner de aviso de pendência fiscal.",
      },
      {
        title: "2. Selecione o tipo de cadastro (Individual vs Entity)",
        description: "Se o seu contrato na Deel foi assinado com a sua empresa (CNPJ), selecione Entity (W-8BEN-E). Se foi assinado com seu CPF, selecione Individual (W-8BEN).",
      },
      {
        title: "3. Informe seu Foreign Tax ID (CPF ou CNPJ)",
        description: "No campo 'Foreign Tax ID / TIN', insira o seu CPF (Pessoa Física) ou CNPJ (Pessoa Jurídica). Não marque a opção de solicitar ITIN/EIN americano.",
      },
      {
        title: "4. Classificação FATCA para PJ (SLU / LTDA)",
        description: "Para empresas brasileiras de prestação de serviços (TI, design, consultoria), selecione 'Corporation' no Chapter 3 e 'Active NFFE' no Chapter 4.",
      },
      {
        title: "5. Baixe o PDF preenchido e faça upload se solicitado",
        description: "Use o gerador FormW8 para obter o PDF do formulário já sanitizado em padrão ASCII e envie ou confirme as respostas diretamente na interface da Deel.",
      },
    ],
    faq: [
      {
        question: "Por que a Deel pede o formulário W-8?",
        answer: "Como empresa sediada nos Estados Unidos, a Deel é obrigada pelo IRS a recolher a comprovação de que o prestador de serviços reside fora dos EUA para não aplicar a retenção compulsória de 30% na fonte.",
      },
      {
        question: "Quanto tempo demora para a Deel aprovar o W-8?",
        answer: "O processamento eletrônico costuma ser imediato. Em caso de envio manual de PDF, a equipe de compliance da Deel analisa o documento em até 24 a 48 horas úteis.",
      },
    ],
  },
  rippling: {
    slug: "rippling",
    name: "Rippling",
    title: "Como Preencher o Formulário W-8 na Rippling (Guia Fiscal Brasil)",
    metaDescription: "Aprenda a preencher o formulário fiscal W-8BEN / W-8BEN-E na Rippling para prestadores de serviços internacionais no Brasil com 0% de retenção.",
    category: "Contratos Internacionais & Folha Global",
    defaultEntityType: "PJ",
    summary: "A Rippling utiliza um fluxo guiado de compliance fiscal para contractors internacionais. Ao completar o formulário com dados válidos, você garante 0% de withholding tax na fonte.",
    instructions: [
      {
        title: "1. Acesse o onboarding fiscal na Rippling",
        description: "No menu lateral, vá em 'Settings' > 'Tax Details' ou clique no aviso de pendência 'Complete your tax form'.",
      },
      {
        title: "2. Confirme que não é cidadão nem residente americano",
        description: "Responda 'No' para cidadania ou residência fiscal nos EUA e indique o Brasil como país de domicílio fiscal.",
      },
      {
        title: "3. Preencha seu Foreign TIN",
        description: "Insira seu CPF (para Pessoa Física) ou CNPJ da sua empresa (para Pessoa Jurídica).",
      },
      {
        title: "4. Assine digitalmente com a data no formato americano",
        description: "Digite seu nome legal completo e confirme a assinatura digital com a data no formato MM-DD-YYYY.",
      },
    ],
    faq: [
      {
        question: "Posso usar endereço com acentos na Rippling?",
        answer: "Recomenda-se usar caracteres sem acento (padrão ASCII gerado pelo FormW8) para evitar que o validador automático da Rippling rejeite o endereço cadastral.",
      },
    ],
  },
  upwork: {
    slug: "upwork",
    name: "Upwork",
    title: "Como Preencher o W-8BEN no Upwork para Freelancers Brasileiros",
    metaDescription: "Evite a retenção automática de 30% no Upwork. Veja como preencher seu W-8BEN no Upwork com CPF ou CNPJ e desbloquear seus saques.",
    category: "Freelance & Redes de Talentos",
    defaultEntityType: "PF",
    summary: "O Upwork bloqueia saques de freelancers que não possuem um W-8BEN válido no sistema. O preenchimento leva menos de 1 minuto e libera pagamentos imediatos.",
    instructions: [
      {
        title: "1. Acesse Tax Information no Upwork",
        description: "Vá em Settings > Tax Information > W-8BEN.",
      },
      {
        title: "2. Indique seu Legal Name e Endereço Brasileiro",
        description: "O nome deve coincidir com o titular da conta bancária de saque.",
      },
      {
        title: "3. Preencha seu CPF no campo Foreign Tax ID",
        description: "O Upwork reconhece o CPF brasileiro como documento fiscal válido para afastar os 30% de retenção.",
      },
    ],
    faq: [
      {
        question: "O Upwork cobra taxa se eu não preencher o W-8BEN?",
        answer: "Sim. Se você não preencher o W-8BEN, o Upwork é obrigado a reter 30% de todos os seus ganhos brutos para repasse ao fisco dos EUA.",
      },
    ],
  },
  remote: {
    slug: "remote",
    name: "Remote.com",
    title: "Formulário W-8BEN e W-8BEN-E na Remote.com (Guia Completo)",
    metaDescription: "Passo a passo para emitir e enviar seu formulário W-8 na Remote.com com conformidade total e zero retenção de impostos nos EUA.",
    category: "Contratos Internacionais & Folha Global",
    defaultEntityType: "PJ",
    summary: "A Remote.com exige documentação fiscal W-8 atualizada a cada 3 anos para todos os prestadores de serviços internacionais fora dos Estados Unidos.",
    instructions: [
      {
        title: "1. Acesse o perfil de contratado na Remote",
        description: "Navegue até 'Account' > 'Tax Compliance' e clique em 'Submit W-8 Form'.",
      },
      {
        title: "2. Escolha o formulário adequado",
        description: "Selecione W-8BEN para Pessoa Física (CPF) ou W-8BEN-E para PJ brasileira (CNPJ).",
      },
      {
        title: "3. Submeta o PDF ou preencha os dados sanitizados",
        description: "Utilize os valores sanitizados em ASCII gerados pelo FormW8 para aprovação automática sem retrabalho.",
      },
    ],
    faq: [
      {
        question: "A Remote aceita assinatura digital no W-8?",
        answer: "Sim, a Remote.com aceita PDFs assinados digitalmente ou certificados pela interface da plataforma.",
      },
    ],
  },
  "google-adsense": {
    slug: "google-adsense",
    name: "Google AdSense & YouTube",
    title: "Como Preencher o Formulário Fiscal dos EUA no Google AdSense e YouTube",
    metaDescription: "Guia completo para preencher as informações fiscais dos EUA no Google AdSense e YouTube Studio (W-8BEN / W-8BEN-E) e evitar desconto de 30%.",
    category: "Criadores & Publicidade Digital",
    defaultEntityType: "PF",
    summary: "O Google exige que todos os criadores de conteúdo do YouTube e editores do AdSense enviem as informações fiscais dos EUA para evitar retenção de até 30% sobre os ganhos globais e de visualizações nos EUA.",
    instructions: [
      {
        title: "1. Acesse Informações Fiscais no Google AdSense",
        description: "No painel do AdSense, clique em Pagamentos > Informações sobre pagamentos > Gerenciar configurações > Informações fiscais dos Estados Unidos > Adicionar informações fiscais.",
      },
      {
        title: "2. Selecione o tipo de conta (Individual ou Não individual)",
        description: "Conta Individual = Formulário W-8BEN (com CPF). Conta Não individual / PJ = Formulário W-8BEN-E (com CNPJ).",
      },
      {
        title: "3. Indique que não reside nos EUA e informe o Foreign TIN",
        description: "Insira seu CPF ou CNPJ no campo 'NIF estrangeiro (Foreign TIN)'.",
      },
      {
        title: "4. Tratado Fiscal (Reivindicação de alíquota)",
        description: "Selecione 'Não' para tratado de bitributação padrão de serviços gerais ou siga as diretrizes para serviços de publicidade executados fora dos EUA.",
      },
    ],
    faq: [
      {
        question: "Por que o Google desconta impostos do meu YouTube?",
        answer: "Sem o formulário W-8 aprovado, o Google retém até 24% a 30% sobre seus rendimentos totais. Com o W-8 aprovado, você paga 0% sobre receitas geradas fora dos EUA.",
      },
    ],
  },
  "apple-developer": {
    slug: "apple-developer",
    name: "Apple Developer Program",
    title: "Formulário Fiscal W-8BEN / W-8BEN-E para Apple Developer Program",
    metaDescription: "Como preencher o formulário tributário dos EUA no App Store Connect para desenvolvedores e empresas do Brasil receberem vendas de aplicativos.",
    category: "Desenvolvedores de Apps & Games",
    defaultEntityType: "PJ",
    summary: "Antes de receber pagamentos de vendas ou compras in-app na App Store, a Apple exige o preenchimento do formulário W-8 no módulo 'Agreements, Tax, and Banking'.",
    instructions: [
      {
        title: "1. Acesse o App Store Connect",
        description: "Entre em 'Agreements, Tax, and Banking' (Acordos, Impostos e Bancos).",
      },
      {
        title: "2. Clique em 'Set Up Tax' para os Estados Unidos",
        description: "Selecione o formulário W-8BEN (Pessoa Física) ou W-8BEN-E (Organização / Empresa).",
      },
      {
        title: "3. Garanta que o nome coincida exatamente com o registro",
        description: "A Apple cruza o nome da entidade com a inscrição D-U-N-S e o CNPJ.",
      },
    ],
    faq: [
      {
        question: "Empresas brasileiras no Apple Developer precisam de W-8BEN-E?",
        answer: "Sim. Contas 'Organization' no Apple Developer Program devem obrigatoriamente preencher o W-8BEN-E com o CNPJ da empresa.",
      },
    ],
  },
  steam: {
    slug: "steam",
    name: "Steam Direct (Valve)",
    title: "Formulário Fiscal W-8 na Steam Direct para Desenvolvedores Brasileiros",
    metaDescription: "Guia para desenvolvedores de jogos no Brasil preencherem o W-8BEN / W-8BEN-E na Valve Steamworks e receberem royalties sem retenção indevida.",
    category: "Desenvolvedores de Apps & Games",
    defaultEntityType: "PJ",
    summary: "A Valve gerencia o questionário fiscal eletrônico do IRS para todos os estúdios e desenvolvedores independentes que publicam jogos na Steam Store.",
    instructions: [
      {
        title: "1. Acesse o Steamworks Onboarding",
        description: "No painel da Steamworks, navegue até a etapa de 'Tax Information' (Informações Fiscais).",
      },
      {
        title: "2. Responda o questionário fiscal online",
        description: "Indique que não reside nos EUA e selecione Individual (W-8BEN) ou Corporation (W-8BEN-E).",
      },
      {
        title: "3. Informe seu CPF ou CNPJ como Foreign Tax ID",
        description: "Isso qualifica sua conta para a taxa correta de royalties de jogos comercializados globalmente.",
      },
    ],
    faq: [
      {
        question: "Preciso de um EIN americano para publicar na Steam?",
        answer: "Não. Desenvolvedores brasileiros podem usar o próprio CPF ou CNPJ como Foreign Tax ID.",
      },
    ],
  },
  "github-sponsors": {
    slug: "github-sponsors",
    name: "GitHub Sponsors & Stripe",
    title: "Como Preencher o W-8BEN no GitHub Sponsors e Stripe Express",
    metaDescription: "Receba patrocínios no GitHub Sponsors sem retenção de 30% da IRS. Guia prático de preenchimento do formulário fiscal W-8BEN.",
    category: "Open Source & Desenvolvedores",
    defaultEntityType: "PF",
    summary: "O GitHub Sponsors utiliza o Stripe Express para coletar as declarações fiscais de mantenedores open-source fora dos EUA.",
    instructions: [
      {
        title: "1. Acesse o painel do GitHub Sponsors",
        description: "Clique em 'Sponsor tier settings' > 'Stripe Express Dashboard'.",
      },
      {
        title: "2. Complete o formulário W-8BEN",
        description: "Insira seu nome completo, endereço residencial brasileiro e CPF no campo Foreign Tax ID.",
      },
    ],
    faq: [
      {
        question: "Doações no GitHub Sponsors sofrem imposto americano?",
        answer: "Com o W-8BEN aprovado, o Stripe e o GitHub não aplicam a retenção compulsória de 30% na fonte.",
      },
    ],
  },
  stripe: {
    slug: "stripe",
    name: "Stripe & Paddle",
    title: "Formulário Fiscal W-8 para Stripe e Paddle no Brasil",
    metaDescription: "Como preencher o formulário W-8BEN e W-8BEN-E no Stripe Connect, Stripe Express e Paddle para produtos digitais e SaaS.",
    category: "Gateways de Câmbio & Pagamento",
    defaultEntityType: "PJ",
    summary: "Plataformas de pagamento internacionais como Stripe e Paddle solicitam certificação W-8 para habilitar repasses a negócios digitais e criadores de software no Brasil.",
    instructions: [
      {
        title: "1. Acesse o painel de verificação do Stripe/Paddle",
        description: "Vá na aba 'Compliance / Tax Forms' e inicie o processo de certificação W-8.",
      },
      {
        title: "2. Preencha os dados societários e Foreign TIN",
        description: "Insira a Razão Social, CNPJ (ou CPF para autônomos) e endereço sem acentuação.",
      },
    ],
    faq: [
      {
        question: "Empresas de SaaS no Brasil devem usar qual formulário?",
        answer: "Empresas brasileiras (SLU/LTDA) comercializando SaaS no exterior devem utilizar o formulário W-8BEN-E.",
      },
    ],
  },
};
