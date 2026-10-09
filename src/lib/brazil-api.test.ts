import { describe, it, expect } from "vitest";
import {
  maskCpf,
  maskCnpj,
  maskCep,
  isValidCpf,
  isValidCnpj,
  formatCep,
  formatCnpj,
  formatFullStreetAddress,
} from "./brazil-api";

describe("brazil-api utility tests", () => {
  describe("maskCpf and isValidCpf", () => {
    it("should mask partial and full CPF strings correctly", () => {
      expect(maskCpf("123")).toBe("123");
      expect(maskCpf("123456")).toBe("123.456");
      expect(maskCpf("12345678901")).toBe("123.456.789-01");
    });

    it("should validate CPF correctly with checksum algorithm", () => {
      // Known invalid CPFs (all identical digits)
      expect(isValidCpf("11111111111")).toBe(false);
      expect(isValidCpf("00000000000")).toBe(false);
      expect(isValidCpf("12345678900")).toBe(false);

      // Known valid CPFs (calculated valid check digits)
      // CPF 52998224725
      expect(isValidCpf("52998224725")).toBe(true);
      expect(isValidCpf("529.982.247-25")).toBe(true);
    });
  });

  describe("maskCnpj and isValidCnpj", () => {
    it("should mask partial and full CNPJ strings correctly", () => {
      expect(maskCnpj("12")).toBe("12");
      expect(maskCnpj("12345")).toBe("12.345");
      expect(maskCnpj("12345678000195")).toBe("12.345.678/0001-95");
      expect(formatCnpj("12345678000195")).toBe("12.345.678/0001-95");
    });

    it("should validate CNPJ correctly with checksum algorithm", () => {
      expect(isValidCnpj("00000000000000")).toBe(false);
      expect(isValidCnpj("11111111111111")).toBe(false);
      expect(isValidCnpj("12345678000100")).toBe(false);

      // Known valid CNPJ: 11.222.333/0001-81 -> 11222333000181
      expect(isValidCnpj("11222333000181")).toBe(true);
      expect(isValidCnpj("11.222.333/0001-81")).toBe(true);
    });
  });

  describe("maskCep and formatCep", () => {
    it("should format and mask 8-digit CEPs preserving leading zeroes", () => {
      expect(maskCep("01310100")).toBe("01310-100");
      expect(formatCep("01310100")).toBe("01310-100");
      expect(maskCep("12345")).toBe("12345");
    });
  });

  describe("formatFullStreetAddress", () => {
    it("should assemble logradouro, number, complemento and bairro properly", () => {
      const formatted = formatFullStreetAddress(
        "Av. Paulista",
        "1000",
        "Conj 501",
        "Bela Vista"
      );
      expect(formatted).toBe("Av. Paulista, 1000 - Conj 501, Bela Vista");
    });

    it("should handle S/N correctly with bairro", () => {
      const formatted = formatFullStreetAddress("Rua das Flores", "SN", "", "Centro");
      expect(formatted).toBe("Rua das Flores, S/N, Centro");
    });

    it("should default empty number to S/N and append bairro", () => {
      const formatted = formatFullStreetAddress("Servidão João Batista Pires", "", "", "Campeche");
      expect(formatted).toBe("Servidão João Batista Pires, S/N, Campeche");
    });
  });
});
