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
    url:
      process.env.NEXT_PUBLIC_HIGLOBE_AFFILIATE_URL ||
      "https://higlobe.com",
    isAffiliate: Boolean(process.env.NEXT_PUBLIC_HIGLOBE_AFFILIATE_URL),
    couponCode: process.env.NEXT_PUBLIC_HIGLOBE_COUPON || "",
    taglineKey: "platforms.exchangeComparison.higlobeTagline",
    spreadKey: "platforms.exchangeComparison.higlobeSpread",
    badgeKey: "",
  },
  wise: {
    name: "Wise",
    url:
      process.env.NEXT_PUBLIC_WISE_AFFILIATE_URL ||
      "https://wise.com",
    isAffiliate: Boolean(process.env.NEXT_PUBLIC_WISE_AFFILIATE_URL),
    couponCode: process.env.NEXT_PUBLIC_WISE_COUPON || "",
    taglineKey: "platforms.exchangeComparison.wiseTagline",
    spreadKey: "platforms.exchangeComparison.wiseSpread",
    badgeKey: "",
  },
  nomad: {
    name: "Nomad Global",
    url:
      process.env.NEXT_PUBLIC_NOMAD_AFFILIATE_URL ||
      "https://nomadglobal.com",
    isAffiliate: Boolean(process.env.NEXT_PUBLIC_NOMAD_AFFILIATE_URL),
    couponCode: process.env.NEXT_PUBLIC_NOMAD_COUPON || "",
    taglineKey: "platforms.exchangeComparison.nomadTagline",
    spreadKey: "platforms.exchangeComparison.nomadSpread",
    badgeKey: "",
  },
} as const;

export type AffiliateKey = keyof typeof AFFILIATE_CONFIG;
