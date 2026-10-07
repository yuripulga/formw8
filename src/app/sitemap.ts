import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://formw8.com.br";
  const currentDate = new Date();

  const routes = [
    "",
    "/design-system",
    "/plataformas/deel",
    "/plataformas/rippling",
    "/plataformas/upwork",
    "/plataformas/remote",
    "/plataformas/google-adsense",
    "/plataformas/apple-developer",
    "/plataformas/steam",
    "/plataformas/github-sponsors",
    "/plataformas/stripe",
    "/w8ben-pessoa-fisica",
    "/w8bene-pessoa-juridica",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/plataformas") ? 0.9 : 0.7,
  }));
}
