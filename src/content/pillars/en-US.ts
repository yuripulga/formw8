import type { PillarContent, PillarKind } from "./types";

export const PILLARS_EN_US: Record<PillarKind, PillarContent> = {
  individual: {
    kind: "individual",
    metaTitle: "W-8BEN Form for Individuals (CPF) | Brazil Guide",
    metaDescription:
      "Learn how to fill out the individual W-8BEN form with a CPF to receive payments from abroad without the 30% US tax withholding.",
    ogDescription:
      "Everything about the W-8BEN form for freelancers and individual contractors who are paid from abroad through a CPF.",
    schemaHeadline: "W-8BEN Form for Individuals in Brazil",
    schemaDescription:
      "Complete guide to filling out the W-8BEN form for freelancers and self-employed professionals who provide services to the US.",
    badge: "Individuals • Freelancers & Contractors",
    title: "W-8BEN Form Guide for Individuals in Brazil",
    intro:
      "The W-8BEN form proves that you live in Brazil and provide services abroad, securing 0% US tax withholding.",
    actionTitle: "Are you paid as an individual (CPF)?",
    actionSubtitle: "Generate your filled W-8BEN form in 1 minute.",
    actionButton: "Generate the W-8BEN Form in 1 Minute",
    fieldsTitle: "Main W-8BEN Fields (Individuals)",
    fields: [
      {
        title: "Line 1: Legal Name",
        desc: "Your full legal name exactly as it appears on your ID (passport or RG/CNH), without accents.",
      },
      { title: "Line 2: Country of Citizenship", desc: "Enter Brazil." },
      {
        title: "Line 3: Permanent Residence Address",
        desc: "Your home address in Brazil with street, number, neighborhood, city, state and postal code (CEP). P.O. Boxes are not allowed.",
      },
      {
        title: "Line 6a: Foreign Tax Identifying Number (FTIN)",
        desc: "Your Brazilian CPF. It is what certifies your tax residence outside the US.",
      },
      {
        title: "Part III: Certification & Signature",
        desc: "The holder's signature and the date in US format (MM-DD-YYYY).",
      },
    ],
    crossLinkTitle: "Do you own a company (CNPJ)?",
    crossLinkDesc: "See the complete W-8BEN-E guide for Brazilian companies.",
    crossLinkButton: "View the W-8BEN-E Guide",
    platformsLabel: "Platform Guides",
    platformSlugs: ["upwork", "deel", "rippling", "remote", "google-adsense", "github-sponsors"],
    backButton: "Back to the Main Generator",
  },
  entity: {
    kind: "entity",
    metaTitle: "W-8BEN-E Form for Companies (SLU / LTDA / CNPJ) | Brazil Guide",
    metaDescription:
      "Complete guide to the W-8BEN-E form for Brazilian companies (SLU, LTDA, EIRELI, ME) providing international services with 0% US withholding.",
    ogDescription:
      "Everything about the W-8BEN-E form for Brazilian companies that export services to the United States.",
    schemaHeadline: "W-8BEN-E Form for Companies and Legal Entities in Brazil",
    schemaDescription:
      "Technical guide to filling out the W-8BEN-E form for SLU and LTDA companies and software and services exporters.",
    badge: "Companies • (SLU / LTDA / ME)",
    title: "W-8BEN-E Form Guide for Companies in Brazil",
    intro:
      "The W-8BEN-E form proves that your company is based in Brazil and provides services abroad, securing 0% US tax withholding.",
    actionTitle: "Are you paid through a company (CNPJ)?",
    actionSubtitle: "Generate your filled W-8BEN-E form in 1 minute.",
    actionButton: "Generate the W-8BEN-E Form in 1 Minute",
    fieldsTitle: "Correct W-8BEN-E Classification for Brazilian Companies",
    fields: [
      {
        title: "Line 1: Organization Name",
        desc: "The company name registered in the CNPJ at the Brazilian Federal Revenue, without accents.",
      },
      { title: "Line 2: Country of Incorporation", desc: "Brazil." },
      {
        title: "Line 4: Chapter 3 Status (Entity Type)",
        desc: "Check 'Corporation' (the standard IRS entity classification for service LTDAs and SLUs).",
      },
      {
        title: "Line 5: Chapter 4 FATCA Status",
        desc: "Check 'Active NFFE' (Active Non-Financial Foreign Entity) for companies whose income comes from actively providing services and technology.",
      },
      { title: "Line 9b: Foreign TIN", desc: "The CNPJ of your Brazilian company." },
      {
        title: "Part XXV: Line 39 (Active NFFE Certification)",
        desc: "You must check the Line 39 box certifying that income does not come from passive financial investments.",
      },
      {
        title: "Part XXX: Certification & Signature",
        desc: "The managing partner's signature and the date in US format (MM-DD-YYYY).",
      },
    ],
    crossLinkTitle: "Are you paid as an individual (CPF)?",
    crossLinkDesc:
      "See the complete W-8BEN guide for individuals and freelancers.",
    crossLinkButton: "View the W-8BEN Guide",
    platformsLabel: "Platform Guides for Companies",
    platformSlugs: ["deel", "rippling", "remote", "apple-developer", "steam", "stripe"],
    backButton: "Back to the Main Generator",
  },
};
