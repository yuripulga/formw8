import { describe, it, expect } from "vitest";
import { locales } from "@/i18n/config";
import { getPlatforms, PLATFORM_SLUGS } from "@/content/platforms";
import { getPillar } from "@/content/pillars";
import { getSiteContent } from "@/content/site";
import { getDictionary } from "@/i18n/server";

const flatten = (obj: unknown, prefix = "", out: Record<string, unknown> = {}): Record<string, unknown> => {
  if (obj && typeof obj === "object") {
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      flatten(value, `${prefix}${key}.`, out);
    }
  } else {
    out[prefix.slice(0, -1)] = obj;
  }
  return out;
};

describe("localized content stays in sync across locales", () => {
  it("every locale has the same dictionary keys as pt-BR", () => {
    const reference = Object.keys(flatten(getDictionary("pt-BR"))).sort();
    for (const locale of locales) {
      expect(Object.keys(flatten(getDictionary(locale))).sort(), locale).toEqual(reference);
    }
  });

  it("every locale has all platform guides with the same structure", () => {
    const reference = getPlatforms("pt-BR");
    for (const locale of locales) {
      const platforms = getPlatforms(locale);
      expect(Object.keys(platforms).sort(), locale).toEqual([...PLATFORM_SLUGS].sort());
      for (const slug of PLATFORM_SLUGS) {
        const platform = platforms[slug];
        expect(platform.slug).toBe(slug);
        expect(platform.instructions).toHaveLength(reference[slug].instructions.length);
        expect(platform.faq).toHaveLength(reference[slug].faq.length);
        expect(platform.defaultEntityType).toBe(reference[slug].defaultEntityType);
        // The text in parentheses becomes the page badge.
        expect(platform.title, `${locale}/${slug}`).toMatch(/\(.+\)$/);
      }
    }
  });

  it("every locale has both pillar pages with the same number of fields", () => {
    for (const locale of locales) {
      for (const kind of ["individual", "entity"] as const) {
        expect(getPillar(locale, kind).fields).toHaveLength(getPillar("pt-BR", kind).fields.length);
        expect(getPillar(locale, kind).platformSlugs).toEqual(getPillar("pt-BR", kind).platformSlugs);
      }
    }
  });

  it("every locale has site metadata with four how-to steps", () => {
    for (const locale of locales) {
      const site = getSiteContent(locale);
      expect(site.howTo.steps).toHaveLength(4);
      expect(site.keywords.length).toBeGreaterThan(5);
    }
  });
});
