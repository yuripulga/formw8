import { describe, it, expect } from "vitest";
import { sanitizeASCII, wasSanitized } from "./sanitizer";

describe("sanitizeASCII", () => {
  it("removes accents from Portuguese names", () => {
    expect(sanitizeASCII("João da Silva Conceição")).toBe("Joao da Silva Conceicao");
  });

  it("handles uppercase accents", () => {
    expect(sanitizeASCII("SÃO PAULO")).toBe("SAO PAULO");
  });

  it("preserves valid company names with ampersand and apostrophe", () => {
    expect(sanitizeASCII("Silva & Souza LTDA")).toBe("Silva & Souza LTDA");
    expect(sanitizeASCII("O'Connor Tech Solutions")).toBe("O'Connor Tech Solutions");
    expect(sanitizeASCII("D’Angelo & Co.")).toBe("D'Angelo & Co.");
  });

  it("handles address abbreviation symbols (Nº, No., 100º)", () => {
    expect(sanitizeASCII("Rua das Flores, Nº 120, Apto 4º")).toBe("Rua das Flores, No. 120, Apto 4o");
    expect(sanitizeASCII("Av. Paulista, nº 1000")).toBe("Av. Paulista, No. 1000");
  });

  it("handles international ligatures and Scandinavian / Slavic letters", () => {
    expect(sanitizeASCII("Müller Straße")).toBe("Muller Strasse");
    expect(sanitizeASCII("København Øst")).toBe("Kobenhavn Ost");
    expect(sanitizeASCII("Michał Łukasz")).toBe("Michal Lukasz");
    expect(sanitizeASCII("Ægir & Œuvre")).toBe("AEgir & OEuvre");
  });

  it("handles typography quotes, dashes and collapse spaces", () => {
    expect(sanitizeASCII("“Tech—Consulting”")).toBe('"Tech-Consulting"');
    expect(sanitizeASCII("   Empresa   com    espaços   ")).toBe("Empresa com espacos");
  });

  it("safely handles null, undefined, empty string and non-string inputs", () => {
    expect(sanitizeASCII("")).toBe("");
    expect(sanitizeASCII(null)).toBe("");
    expect(sanitizeASCII(undefined)).toBe("");
    // @ts-expect-error test runtime robustness
    expect(sanitizeASCII(123)).toBe("");
  });

  it("detects when sanitization modified input", () => {
    expect(wasSanitized("São Paulo")).toBe(true);
    expect(wasSanitized("Sao Paulo")).toBe(false);
    expect(wasSanitized("")).toBe(false);
    expect(wasSanitized(null)).toBe(false);
    expect(wasSanitized(undefined)).toBe(false);
  });
});
