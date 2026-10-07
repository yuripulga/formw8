import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sanitizeASCII, wasSanitized } from "./sanitizer";

describe("sanitizeASCII", () => {
  it("removes accents from Portuguese names", () => {
    assert.equal(sanitizeASCII("João da Silva Conceição"), "Joao da Silva Conceicao");
  });

  it("handles uppercase accents", () => {
    assert.equal(sanitizeASCII("SÃO PAULO"), "SAO PAULO");
  });

  it("preserves valid company names with ampersand", () => {
    assert.equal(sanitizeASCII("Silva & Souza LTDA"), "Silva & Souza LTDA");
  });

  it("detects when sanitization modified input", () => {
    assert.equal(wasSanitized("São Paulo"), true);
    assert.equal(wasSanitized("Sao Paulo"), false);
  });
});
