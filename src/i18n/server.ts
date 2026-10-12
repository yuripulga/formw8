import ptBR from "./dictionaries/pt-BR.json";
import enUS from "./dictionaries/en-US.json";
import type { Locale } from "./config";

export type Dictionary = typeof ptBR;

const dictionaries: Record<Locale, Dictionary> = {
  "pt-BR": ptBR,
  "en-US": enUS,
};

/** Dictionary for server components (metadata, static pages). */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
