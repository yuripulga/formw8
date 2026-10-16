import { describe, it, expect } from "vitest";
import { route, parseRoute, translatePath } from "./routes";

describe("routes", () => {
  it("keeps Portuguese at the root and English under /en", () => {
    expect(route("pt-BR", "home")).toBe("/");
    expect(route("en-US", "home")).toBe("/en");
    expect(route("pt-BR", "individual")).toBe("/w8ben-pessoa-fisica");
    expect(route("en-US", "individual")).toBe("/en/w8ben-individual");
    expect(route("pt-BR", "entity")).toBe("/w8bene-pessoa-juridica");
    expect(route("en-US", "entity")).toBe("/en/w8bene-company");
    expect(route("pt-BR", "platform", "deel")).toBe("/plataformas/deel");
    expect(route("en-US", "platform", "deel")).toBe("/en/platforms/deel");
  });

  it("parses every route back to its locale, page and slug", () => {
    expect(parseRoute("/")).toEqual({ locale: "pt-BR", name: "home" });
    expect(parseRoute("/en")).toEqual({ locale: "en-US", name: "home" });
    expect(parseRoute("/en/")).toEqual({ locale: "en-US", name: "home" });
    expect(parseRoute("/w8bene-pessoa-juridica")).toEqual({ locale: "pt-BR", name: "entity" });
    expect(parseRoute("/en/w8ben-individual")).toEqual({ locale: "en-US", name: "individual" });
    expect(parseRoute("/plataformas/steam")).toEqual({ locale: "pt-BR", name: "platform", slug: "steam" });
    expect(parseRoute("/en/platforms/steam")).toEqual({ locale: "en-US", name: "platform", slug: "steam" });
  });

  it("treats unknown paths as the home of their locale prefix", () => {
    expect(parseRoute("/nada-aqui")).toEqual({ locale: "pt-BR", name: "home" });
    expect(parseRoute("/en/nothing-here")).toEqual({ locale: "en-US", name: "home" });
  });

  it("translates a path between locales", () => {
    expect(translatePath("/plataformas/deel", "en-US")).toBe("/en/platforms/deel");
    expect(translatePath("/en/platforms/deel", "pt-BR")).toBe("/plataformas/deel");
    expect(translatePath("/w8ben-pessoa-fisica", "en-US")).toBe("/en/w8ben-individual");
    expect(translatePath("/en", "pt-BR")).toBe("/");
    expect(translatePath("/", "en-US")).toBe("/en");
    expect(translatePath("/design-system", "en-US")).toBe("/en/design-system");
    expect(translatePath("/en/design-system", "pt-BR")).toBe("/design-system");
  });
});

import { escapeUnsafeChars, htmlLangScript } from "./routes";

describe("htmlLangScript", () => {
  it("sets the document language from the locale prefixes", () => {
    const script = htmlLangScript();
    expect(script).toContain('"/en"');
    expect(script).toContain('"en-US"');
    expect(script).toContain("document.documentElement.lang");
  });

  it("escapes dangerous HTML characters to prevent script breakout", () => {
    const malicious = '<script>alert(1)</script>';
    const escaped = escapeUnsafeChars(JSON.stringify(malicious));
    expect(escaped).not.toContain("<script>");
    expect(escaped).not.toContain("</script>");
    expect(escaped).toContain("\\u003C");
    expect(escaped).toContain("\\u003E");
  });
});
