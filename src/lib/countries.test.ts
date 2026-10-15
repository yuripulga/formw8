import { describe, it, expect } from "vitest";
import {
  BRAZIL,
  countryName,
  countryOptions,
  englishCountryName,
  findCountryCode,
  isSelectableCountry,
} from "./countries";

describe("countries", () => {
  it("names countries in the requested language and always in English for the PDF", () => {
    expect(countryName("CH", "pt-BR")).toBe("Suíça");
    expect(countryName("CH", "en-US")).toBe("Switzerland");
    expect(englishCountryName("CH")).toBe("Switzerland");
    expect(englishCountryName("BR")).toBe("Brazil");
  });

  it("does not offer the United States (US citizens use Form W-9)", () => {
    expect(isSelectableCountry("US")).toBe(false);
    expect(countryOptions("en-US").some((c) => c.code === "US")).toBe(false);
    expect(findCountryCode("United States", "en-US")).toBeNull();
    expect(findCountryCode("United States", "en-US", { includeUnsupported: true })).toBe("US");
    expect(findCountryCode("Estados Unidos", "pt-BR", { includeUnsupported: true })).toBe("US");
  });

  it("offers a full, sorted list that includes Brazil", () => {
    const options = countryOptions("en-US");
    expect(options.length).toBeGreaterThan(200);
    expect(options.some((c) => c.code === BRAZIL)).toBe(true);
    const names = options.map((c) => c.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "en-US")));
  });

  it("finds typed countries ignoring case and accents, in the interface language or English", () => {
    expect(findCountryCode("suíça", "pt-BR")).toBe("CH");
    expect(findCountryCode("SUICA", "pt-BR")).toBe("CH");
    expect(findCountryCode("Switzerland", "pt-BR")).toBe("CH");
    expect(findCountryCode("  switzerland ", "en-US")).toBe("CH");
  });

  it("returns null for partial or unknown text", () => {
    expect(findCountryCode("Switz", "en-US")).toBeNull();
    expect(findCountryCode("Narnia", "en-US")).toBeNull();
    expect(findCountryCode("", "en-US")).toBeNull();
  });
});
