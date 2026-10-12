import { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { PLATFORM_SLUGS } from "@/content/platforms";
import { absoluteUrl } from "@/lib/seo";
import type { RouteName } from "@/lib/routes";

export const dynamic = "force-static";

interface PageEntry {
  name: RouteName;
  slug?: string;
  priority: number;
  changeFrequency: "daily" | "weekly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const pages: PageEntry[] = [
    { name: "home", priority: 1.0, changeFrequency: "daily" },
    ...PLATFORM_SLUGS.map((slug): PageEntry => ({
      name: "platform",
      slug,
      priority: 0.9,
      changeFrequency: "weekly",
    })),
    { name: "individual", priority: 0.7, changeFrequency: "weekly" },
    { name: "entity", priority: 0.7, changeFrequency: "weekly" },
  ];

  // One entry per page and locale, each listing every language version (hreflang).
  return pages.flatMap((page) => {
    const languages: Record<string, string> = {};
    for (const code of locales) {
      languages[code] = absoluteUrl(code, page.name, page.slug);
    }
    languages["x-default"] = absoluteUrl("pt-BR", page.name, page.slug);

    return locales.map((code) => ({
      url: absoluteUrl(code, page.name, page.slug),
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages },
    }));
  });
}
