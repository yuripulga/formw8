import type { Locale } from "@/i18n/config";
import type { SiteContent } from "./types";
import { SITE_PT_BR } from "./pt-BR";
import { SITE_EN_US } from "./en-US";

export type { SiteContent } from "./types";

const SITE_BY_LOCALE: Partial<Record<Locale, SiteContent>> = {
  "pt-BR": SITE_PT_BR,
  "en-US": SITE_EN_US,
};

export function getSiteContent(locale: Locale): SiteContent {
  return SITE_BY_LOCALE[locale] ?? SITE_PT_BR;
}
