import type { Locale } from "@/i18n/config";
import type { PillarContent, PillarKind } from "./types";
import { PILLARS_PT_BR } from "./pt-BR";
import { PILLARS_EN_US } from "./en-US";

export type { PillarContent, PillarKind } from "./types";

const PILLARS_BY_LOCALE: Partial<Record<Locale, Record<PillarKind, PillarContent>>> = {
  "pt-BR": PILLARS_PT_BR,
  "en-US": PILLARS_EN_US,
};

/** Pillar page copy for a locale; falls back to Portuguese when a locale is not translated yet. */
export function getPillar(locale: Locale, kind: PillarKind): PillarContent {
  return (PILLARS_BY_LOCALE[locale] ?? PILLARS_PT_BR)[kind];
}
