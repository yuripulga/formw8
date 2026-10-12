import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { locales } from "@/i18n/config";
import { PLATFORM_SLUGS } from "@/content/platforms";
import { route } from "@/lib/routes";

type Redirect = { source: string; destination: string; type: number };
const redirects: Redirect[] = JSON.parse(readFileSync(join(process.cwd(), "firebase.json"), "utf8")).hosting.redirects;

/** Short link prefix per locale ("" for pt-BR, "/en" for English...). */
const prefixOf = (locale: (typeof locales)[number]) => (route(locale, "home") === "/" ? "" : route(locale, "home"));

describe("firebase.json short links", () => {
  for (const locale of locales) {
    const prefix = prefixOf(locale);

    it(`${locale}: every platform has a 301 short link to its guide`, () => {
      for (const slug of PLATFORM_SLUGS) {
        const found = redirects.find((r) => r.source === `${prefix}/${slug}`);
        expect(found, `${prefix}/${slug}`).toBeDefined();
        expect(found?.destination).toBe(route(locale, "platform", slug));
        expect(found?.type).toBe(301);
      }
    });

    it(`${locale}: /w8ben and /w8bene redirect to the pillar pages`, () => {
      expect(redirects.find((r) => r.source === `${prefix}/w8ben`)?.destination).toBe(route(locale, "individual"));
      expect(redirects.find((r) => r.source === `${prefix}/w8bene`)?.destination).toBe(route(locale, "entity"));
    });
  }
});
