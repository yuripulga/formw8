import { describe, it, expect } from "vitest";
import { pickLocale, isCrawler } from "./detect";

describe("pickLocale", () => {
  it("maps browser languages to supported locales", () => {
    expect(pickLocale(["en-GB"])).toBe("en-US");
    expect(pickLocale(["en"])).toBe("en-US");
    expect(pickLocale(["pt-PT"])).toBe("pt-BR");
    expect(pickLocale(["pt-BR", "en-US"])).toBe("pt-BR");
  });

  it("uses the first language that is supported", () => {
    expect(pickLocale(["fr-FR", "en-US"])).toBe("en-US");
  });

  it("returns null when nothing matches", () => {
    expect(pickLocale(["fr-FR", "de"])).toBeNull();
    expect(pickLocale([])).toBeNull();
  });
});

describe("isCrawler", () => {
  it("recognizes common crawlers", () => {
    expect(isCrawler("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)")).toBe(true);
    expect(isCrawler("Mozilla/5.0 (compatible; bingbot/2.0)")).toBe(true);
    expect(isCrawler("WhatsApp/2.23.20.0")).toBe(true);
    expect(isCrawler("facebookexternalhit/1.1")).toBe(true);
  });

  it("does not flag regular browsers", () => {
    expect(isCrawler("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36")).toBe(false);
  });
});
