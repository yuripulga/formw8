import { describe, it, expect } from "vitest";
import {
  Step1Schema,
  Step2Schema,
  Step3SchemaPF,
  Step3SchemaPJ,
  W8FormSchema,
} from "./w8-form-schema";

describe("w8-form-schema Zod validation tests", () => {
  describe("Step 1 Schema (userName)", () => {
    it("should accept valid names", () => {
      expect(Step1Schema.safeParse({ userName: "João Silva" }).success).toBe(true);
    });

    it("should reject empty or 1-character names", () => {
      expect(Step1Schema.safeParse({ userName: "" }).success).toBe(false);
      expect(Step1Schema.safeParse({ userName: "J" }).success).toBe(false);
    });
  });

  describe("Step 2 Schema (entityType)", () => {
    it("should accept PF and PJ", () => {
      expect(Step2Schema.safeParse({ entityType: "PF" }).success).toBe(true);
      expect(Step2Schema.safeParse({ entityType: "PJ" }).success).toBe(true);
      expect(Step2Schema.safeParse({ entityType: "OTHER" }).success).toBe(false);
    });
  });

  describe("Step 3 Schema PF (CPF + Address)", () => {
    it("should accept valid CPF and address", () => {
      const res = Step3SchemaPF.safeParse({
        taxId: "529.982.247-25",
        addressZip: "01310-100",
        addressStreet: "Av Paulista, 1000",
        addressCity: "São Paulo",
        addressState: "SP",
      });
      expect(res.success).toBe(true);
    });

    it("should reject invalid CPF or a CNPJ entered in PF mode", () => {
      const resInvalid = Step3SchemaPF.safeParse({
        taxId: "111.111.111-11",
        addressZip: "01310-100",
        addressStreet: "Av Paulista, 1000",
        addressCity: "São Paulo",
        addressState: "SP",
      });
      expect(resInvalid.success).toBe(false);

      const resCnpjInPf = Step3SchemaPF.safeParse({
        taxId: "40.676.067/0001-65",
        addressZip: "01310-100",
        addressStreet: "Av Paulista, 1000",
        addressCity: "São Paulo",
        addressState: "SP",
      });
      expect(resCnpjInPf.success).toBe(false);
    });
  });

  describe("Step 3 Schema PJ (CNPJ + Company Name + Address)", () => {
    it("should accept valid CNPJ, company name and address", () => {
      const res = Step3SchemaPJ.safeParse({
        taxId: "11.222.333/0001-81",
        companyName: "Acme Tech Ltda",
        addressZip: "01310-100",
        addressStreet: "Av Paulista, 1000",
        addressCity: "São Paulo",
        addressState: "SP",
      });
      expect(res.success).toBe(true);
    });

    it("should reject invalid CNPJ or a CPF entered in PJ mode", () => {
      const resInvalid = Step3SchemaPJ.safeParse({
        taxId: "00.000.000/0000-00",
        companyName: "Acme Tech Ltda",
        addressZip: "01310-100",
        addressStreet: "Av Paulista, 1000",
        addressCity: "São Paulo",
        addressState: "SP",
      });
      expect(resInvalid.success).toBe(false);

      const resCpfInPj = Step3SchemaPJ.safeParse({
        taxId: "529.982.247-25",
        companyName: "Acme Tech Ltda",
        addressZip: "01310-100",
        addressStreet: "Av Paulista, 1000",
        addressCity: "São Paulo",
        addressState: "SP",
      });
      expect(resCpfInPj.success).toBe(false);
    });
  });

  describe("Full W8FormSchema", () => {
    it("should validate full form model", () => {
      const res = W8FormSchema.safeParse({
        userName: "João Silva",
        entityType: "PJ",
        companyName: "Acme Tech Ltda",
        taxId: "11.222.333/0001-81",
        addressStreet: "Av Paulista, 1000",
        addressCity: "São Paulo",
        addressState: "SP",
        addressZip: "01310-100",
      });
      expect(res.success).toBe(true);
    });

    it("should validate full form model with MEI flag", () => {
      const res = W8FormSchema.safeParse({
        userName: "Maria Souza",
        entityType: "PF",
        isMei: true,
        taxId: "529.982.247-25",
        addressStreet: "Rua das Flores, 100",
        addressCity: "Curitiba",
        addressState: "PR",
        addressZip: "80000-000",
      });
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.isMei).toBe(true);
      }
    });
  });
});
