import type { Locale } from "@/i18n/config";

/**
 * Locale-aware URLs. Portuguese (the original site) stays at the root so existing
 * links and rankings keep working; every other locale lives under its own prefix.
 */
export type RouteName = "home" | "individual" | "entity" | "platform" | "design";

interface LocaleRoutes {
  prefix: string;
  individual: string;
  entity: string;
  platforms: string;
  design: string;
}

const ROUTES: Record<Locale, LocaleRoutes> = {
  "pt-BR": {
    prefix: "",
    individual: "w8ben-pessoa-fisica",
    entity: "w8bene-pessoa-juridica",
    platforms: "plataformas",
    design: "design-system",
  },
  "en-US": {
    prefix: "/en",
    individual: "w8ben-individual",
    entity: "w8bene-company",
    platforms: "platforms",
    design: "design-system",
  },
};

export interface ParsedRoute {
  locale: Locale;
  name: RouteName;
  slug?: string;
}

/** Builds the path (starting with "/") of a page in a given locale. */
export function route(locale: Locale, name: RouteName, slug?: string): string {
  const r = ROUTES[locale];
  switch (name) {
    case "home":
      return r.prefix || "/";
    case "individual":
      return `${r.prefix}/${r.individual}`;
    case "entity":
      return `${r.prefix}/${r.entity}`;
    case "platform":
      return `${r.prefix}/${r.platforms}/${slug ?? ""}`;
    case "design":
      return `${r.prefix}/${r.design}`;
  }
}

/** Identifies which page and locale a pathname belongs to; unknown paths are treated as home. */
export function parseRoute(pathname: string): ParsedRoute {
  const clean = pathname.replace(/\/+$/, "") || "/";

  for (const locale of Object.keys(ROUTES) as Locale[]) {
    const r = ROUTES[locale];
    const rest = r.prefix ? (clean === r.prefix ? "/" : clean.startsWith(`${r.prefix}/`) ? clean.slice(r.prefix.length) : null) : clean;
    if (rest === null) continue;
    if (rest === "/") return { locale, name: "home" };
    if (rest === `/${r.individual}`) return { locale, name: "individual" };
    if (rest === `/${r.entity}`) return { locale, name: "entity" };
    if (rest === `/${r.design}`) return { locale, name: "design" };
    if (rest.startsWith(`/${r.platforms}/`)) {
      return { locale, name: "platform", slug: rest.slice(r.platforms.length + 2) };
    }
  }

  // Unknown pages (e.g. a 404 under /en/...) still belong to the locale of their prefix.
  for (const locale of Object.keys(ROUTES) as Locale[]) {
    const prefix = ROUTES[locale].prefix;
    if (prefix && (clean === prefix || clean.startsWith(`${prefix}/`))) {
      return { locale, name: "home" };
    }
  }

  return { locale: "pt-BR", name: "home" };
}

/** The same page in another locale (used by the language selector and hreflang). */
export function translatePath(pathname: string, target: Locale): string {
  const parsed = parseRoute(pathname);
  return route(target, parsed.name, parsed.slug);
}

export const SUPPORTED_ROUTE_LOCALES = Object.keys(ROUTES) as Locale[];

/**
 * Tiny inline script that sets <html lang> from the URL before hydration, so the document
 * language is right for screen readers and browser translation prompts on every locale.
 * Static script without string interpolation to guarantee zero code injection vulnerabilities.
 */
export function htmlLangScript(): string {
  return `(function(){var p=location.pathname;if(p==="/en"||p.indexOf("/en/")===0){document.documentElement.lang="en-US"}else{document.documentElement.lang="pt-BR"}})();`;
}


