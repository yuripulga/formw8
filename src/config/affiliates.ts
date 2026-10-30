/**
 * Centralized affiliate and referral configuration for international exchange,
 * banking, and accounting partners.
 *
 * Developers and creators can override these URLs and coupons using environment
 * variables (e.g. .env.local or .env.production) without modifying UI components.
 */

export interface AffiliatePartner {
  name: string;
  url: string;
  isAffiliate: boolean;
  couponCode?: string;
  taglineKey: string;
  spreadKey: string;
  badgeKey: string;
}

export const AFFILIATE_CONFIG = {
  husky: {
    name: "Husky (Nomad PJ)",
    url:
      process.env.NEXT_PUBLIC_HUSKY_AFFILIATE_URL ||
      "https://app.husky.io/onboarding?ref=42690538-e85c-4284-a299-ac794e61b020",
    isAffiliate: true,
    couponCode: process.env.NEXT_PUBLIC_HUSKY_COUPON || "",
    taglineKey: "platforms.exchangeComparison.huskyTagline",
    spreadKey: "platforms.exchangeComparison.huskySpread",
    badgeKey: "platforms.exchangeComparison.recommendedBadge",
  },
  higlobe: {
    name: "Higlobe",
    url: process.env.NEXT_PUBLIC_HIGLOBE_AFFILIATE_URL || "https://higlobe.com",
    isAffiliate: Boolean(
      process.env.NEXT_PUBLIC_HIGLOBE_AFFILIATE_URL &&
        process.env.NEXT_PUBLIC_HIGLOBE_AFFILIATE_URL !== "https://higlobe.com" &&
        process.env.NEXT_PUBLIC_HIGLOBE_AFFILIATE_URL !== "https://higlobe.com/"
    ),
    couponCode: process.env.NEXT_PUBLIC_HIGLOBE_COUPON || "",
    taglineKey: "platforms.exchangeComparison.higlobeTagline",
    spreadKey: "platforms.exchangeComparison.higlobeSpread",
    badgeKey: "",
  },
  wise: {
    name: "Wise",
    url:
      process.env.NEXT_PUBLIC_WISE_AFFILIATE_URL ||
      "https://wise.com/invite/dic/yurip752",
    isAffiliate: true,
    couponCode: process.env.NEXT_PUBLIC_WISE_COUPON || "",
    taglineKey: "platforms.exchangeComparison.wiseTagline",
    spreadKey: "platforms.exchangeComparison.wiseSpread",
    badgeKey: "",
  },
  nomad: {
    name: "Nomad Global",
    url: process.env.NEXT_PUBLIC_NOMAD_AFFILIATE_URL || "https://nomadglobal.com",
    isAffiliate: Boolean(
      process.env.NEXT_PUBLIC_NOMAD_AFFILIATE_URL &&
        process.env.NEXT_PUBLIC_NOMAD_AFFILIATE_URL !== "https://nomadglobal.com" &&
        process.env.NEXT_PUBLIC_NOMAD_AFFILIATE_URL !== "https://nomadglobal.com/"
    ),
    couponCode: process.env.NEXT_PUBLIC_NOMAD_COUPON || "",
    taglineKey: "platforms.exchangeComparison.nomadTagline",
    spreadKey: "platforms.exchangeComparison.nomadSpread",
    badgeKey: "",
  },
  micro1: {
    name: "Micro1",
    url:
      process.env.NEXT_PUBLIC_MICRO1_AFFILIATE_URL ||
      "https://refer.micro1.ai/referral/jobs?referralCode=1564c2c9-e004-4e3a-9627-1311f2f535b7&utm_source=referral&utm_medium=share&utm_campaign=job_referral",
    isAffiliate: true,
    taglineKey: "wizard.stepConfirmation.talentMicro1Desc",
    spreadKey: "",
    badgeKey: "wizard.stepConfirmation.talentMicro1Tag",
  },
  mercor: {
    name: "Mercor",
    url:
      process.env.NEXT_PUBLIC_MERCOR_AFFILIATE_URL ||
      "https://t.mercor.com/imrO9",
    isAffiliate: true,
    taglineKey: "wizard.stepConfirmation.talentMercorDesc",
    spreadKey: "",
    badgeKey: "wizard.stepConfirmation.talentMercorTag",
  },
  toptal: {
    name: "Toptal",
    url:
      process.env.NEXT_PUBLIC_TOPTAL_AFFILIATE_URL ||
      "https://topt.al/yycZaV",
    isAffiliate: true,
    taglineKey: "wizard.stepConfirmation.talentToptalDesc",
    spreadKey: "",
    badgeKey: "wizard.stepConfirmation.talentToptalTag",
  },
} as const;

export const EXCHANGE_PARTNERS = ["husky", "higlobe", "wise"] as const;
export type ExchangePartnerKey = (typeof EXCHANGE_PARTNERS)[number];

export const TALENT_PARTNERS = ["micro1", "mercor", "toptal"] as const;
export type TalentPartnerKey = (typeof TALENT_PARTNERS)[number];

export type AffiliateKey = keyof typeof AFFILIATE_CONFIG;
