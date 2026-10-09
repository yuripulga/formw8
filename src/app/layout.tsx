import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "@/i18n/context";
import { WizardProvider } from "@/context/wizard-context";
import { SITE_URL } from "@/config/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FormW8 - Gerador de Formulários W-8BEN e W-8BEN-E",
    template: "%s | FormW8",
  },
  description:
    "Gere seu formulário fiscal da IRS (W-8BEN ou W-8BEN-E) preenchido em menos de 1 minuto. Isenção de 30% de retenção na fonte para Deel, Rippling, Upwork, Remote e AdSense com rapidez e segurança.",
  keywords: [
    "Trabalhe na gringa",
    "Trabalhar para o exterior",
    "Trabalhe para os EUA",
    "Trabalhe para os Estados Unidos",
    "Salário da gringa",
    "Receber em dólar no Brasil",
    "Dev na gringa impostos",
    "Contrato PJ exterior exportação de serviços",
    "Formulário W-8BEN",
    "Formulário W-8BEN-E",
    "Como preencher W-8BEN Brasil",
    "Como preencher W-8BEN-E PJ",
    "Deel W-8 compliance",
    "Rippling W-8 formulário fiscal",
    "Upwork withholding tax 30%",
    "Remote.com W8",
    "Google AdSense formulário fiscal EUA",
    "Apple Developer W-8BEN",
    "Foreign Tax Identifying Number Brasil CPF CNPJ",
    "Chapter 3 Status Corporation LTDA",
    "Chapter 4 FATCA Active NFFE",
    "Retenção 30% IRS Estados Unidos",
    "Prestador de serviços exterior imposto EUA",
    "Bitributação Brasil Estados Unidos",
    "Sanitizador ASCII W-8",
  ],
  authors: [{ name: "FormW8", url: SITE_URL }],
  creator: "FormW8 / Quimera.biz",
  publisher: "FormW8",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icon.svg",
  },
  alternates: {
    canonical: "./",
    languages: {
      "pt-BR": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "FormW8",
    title: "FormW8 - Gerador de Formulários W-8BEN e W-8BEN-E",
    description:
      "Gere seu formulário fiscal da IRS preenchido e certificado em menos de 1 minuto. 100% gratuito, sem cadastro e com processamento local no navegador.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "FormW8 - Gerador de Formulários W-8BEN e W-8BEN-E",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FormW8 - Gerador de Formulários W-8BEN e W-8BEN-E",
    description:
      "Gere seu formulário fiscal da IRS preenchido e certificado em menos de 1 minuto. 100% client-side e seguro.",
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global Structured Data (SoftwareApplication + HowTo + Organization)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#app`,
        name: "FormW8",
        url: SITE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        description:
          "Gerador e tradutor fiscal simplificado para formulários W-8BEN e W-8BEN-E da IRS.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "FormW8",
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
      },
      {
        "@type": "HowTo",
        "@id": `${SITE_URL}/#howto`,
        name: "Como Gerar seu Formulário W-8BEN ou W-8BEN-E Preenchido",
        description:
          "Passo a passo rápido para emitir seu formulário fiscal da IRS pronto para assinar e enviar a clientes ou plataformas internacionais.",
        totalTime: "PT1M",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Identificação",
            text: "Insira seu nome completo civil como consta nos seus documentos de identificação.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Tipo de Enquadramento",
            text: "Selecione se recebe pagamentos como Pessoa Física (W-8BEN) ou Empresa CNPJ/SLU/LTDA (W-8BEN-E).",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Dados Fiscais e Endereço",
            text: "Informe seu CPF ou CNPJ (Foreign TIN) e CEP para auto-preenchimento e higienização ASCII do endereço.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Visualização e Download do PDF",
            text: "Visualize o PDF da IRS preenchido e faça o download direto para assinar e enviar.",
          },
        ],
      },
    ],
  };

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </head>

      <body className="antialiased min-h-screen flex flex-col bg-app-surface text-body-theme">
        <I18nProvider>
          <WizardProvider>{children}</WizardProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

