import { Locale, locales } from "./config";

/** First browser language that matches a supported locale (e.g. "en-GB" -> "en-US"), or null. */
export function pickLocale(languages: readonly string[]): Locale | null {
  for (const language of languages) {
    const base = language?.toLowerCase().split("-")[0];
    const match = locales.find((code) => code.toLowerCase().split("-")[0] === base);
    if (match) return match;
  }
  return null;
}

/** Search engine and social crawlers always get the default page, never an automatic redirect. */
export function isCrawler(userAgent: string): boolean {
  return /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegram|preview|lighthouse|pagespeed/i.test(userAgent);
}
