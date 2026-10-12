import type { Locale } from "@/i18n/config";
import type { PlatformInfo } from "./types";
import { PLATFORMS_PT_BR } from "./pt-BR";
import { PLATFORMS_EN_US } from "./en-US";

export type { PlatformInfo } from "./types";

const PLATFORMS_BY_LOCALE: Partial<Record<Locale, Record<string, PlatformInfo>>> = {
  "pt-BR": PLATFORMS_PT_BR,
  "en-US": PLATFORMS_EN_US,
};

/** Platform guides for a locale; falls back to Portuguese when a locale has no translation yet. */
export function getPlatforms(locale: Locale): Record<string, PlatformInfo> {
  return PLATFORMS_BY_LOCALE[locale] ?? PLATFORMS_PT_BR;
}

/** Slugs are shared by every locale (pt-BR is the source of truth). */
export const PLATFORM_SLUGS = Object.keys(PLATFORMS_PT_BR);
