import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";
import { Locale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/server";
import { getPillar, type PillarKind } from "@/content/pillars";
import { getPlatforms } from "@/content/platforms";
import { getSiteContent } from "@/content/site";
import { route, type RouteName } from "@/lib/routes";

const OG_LOCALES: Record<Locale, string> = {
  "pt-BR": "pt_BR",
  "en-US": "en_US",
};

/** Social preview image: the static PNG for Portuguese, the generated image for other locales. */
export function ogImageUrl(locale: Locale): string {
  return locale === "pt-BR" ? `${SITE_URL}/og-image.png` : `${SITE_URL}${route(locale, "home") === "/" ? "" : route(locale, "home")}/opengraph-image`;
}

/** Absolute URL of a page. */
export function absoluteUrl(locale: Locale, name: RouteName, slug?: string): string {
  const path = route(locale, name, slug);
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** Canonical URL plus hreflang alternates for every locale (pt-BR is also x-default). */
export function alternatesFor(locale: Locale, name: RouteName, slug?: string): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const code of locales) {
    languages[code] = absoluteUrl(code, name, slug);
  }
  languages["x-default"] = absoluteUrl("pt-BR", name, slug);
  return { canonical: absoluteUrl(locale, name, slug), languages };
}

export function pillarMetadata(locale: Locale, kind: PillarKind): Metadata {
  const content = getPillar(locale, kind);
  const name: RouteName = kind;
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: alternatesFor(locale, name),
    openGraph: {
      title: content.metaTitle,
      description: content.ogDescription,
      url: absoluteUrl(locale, name),
      type: "article",
      locale: OG_LOCALES[locale],
      images: [{ url: ogImageUrl(locale), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.ogDescription,
      images: [ogImageUrl(locale)],
    },
  };
}

export function platformMetadata(locale: Locale, slug: string): Metadata {
  const platform = getPlatforms(locale)[slug];
  if (!platform) {
    return { title: `${getDictionary(locale).platformPage.notFoundTitle} | FormW8` };
  }

  // The root layout title template already appends "| FormW8".
  const title = `${platform.title} | FormW8`;
  const url = absoluteUrl(locale, "platform", slug);
  return {
    title: platform.title,
    description: platform.metaDescription,
    alternates: alternatesFor(locale, "platform", slug),
    openGraph: {
      title,
      description: platform.metaDescription,
      url,
      type: "article",
      locale: OG_LOCALES[locale],
      images: [{ url: ogImageUrl(locale), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: platform.title,
      description: platform.metaDescription,
      images: [ogImageUrl(locale)],
    },
  };
}

/** Page-level metadata of the home page (the wizard) for a locale. */
export function homeMetadata(locale: Locale): Metadata {
  const site = getSiteContent(locale);
  return {
    title: { absolute: site.title },
    description: site.description,
    keywords: site.keywords,
    alternates: alternatesFor(locale, "home"),
    openGraph: {
      type: "website",
      locale: OG_LOCALES[locale],
      alternateLocale: locales.filter((code) => code !== locale).map((code) => OG_LOCALES[code]),
      url: absoluteUrl(locale, "home"),
      siteName: "FormW8",
      title: site.ogTitle,
      description: site.ogDescription,
      // English falls back to the generated app/en/opengraph-image.
      ...(locale === "pt-BR" && {
        images: [
          {
            url: `${SITE_URL}/og-image.png`,
            width: 1200,
            height: 630,
            alt: site.ogTitle,
            type: "image/png",
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: site.ogTitle,
      description: site.twitterDescription,
      ...(locale === "pt-BR" && { images: [`${SITE_URL}/og-image.png`] }),
    },
  };
}

/** Site-wide structured data (WebApplication + Organization + HowTo) for a locale. */
export function siteJsonLd(locale: Locale) {
  const site = getSiteContent(locale);
  const home = absoluteUrl(locale, "home");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${home}#app`,
        name: "FormW8",
        url: home,
        inLanguage: locale,
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        description: site.appDescription,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "FormW8",
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
      },
      {
        "@type": "HowTo",
        "@id": `${home}#howto`,
        name: site.howTo.name,
        description: site.howTo.description,
        inLanguage: locale,
        totalTime: "PT1M",
        step: site.howTo.steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
      },
    ],
  };
}
