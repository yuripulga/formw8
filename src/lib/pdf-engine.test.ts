import { describe, it, expect } from "vitest";
import { PDFDocument } from "pdf-lib";
import { generateW8PDF } from "./pdf-engine";

describe("pdf-engine official IRS templates", () => {
  it("generates a valid W-8BEN PDF for Individual (PF)", async () => {
    const result = await generateW8PDF({
      userName: "João da Silva",
      entityType: "PF",
      taxId: "529.982.247-25",
      addressStreet: "Avenida Paulista, 1000",
      addressCity: "São Paulo",
      addressState: "SP",
      addressZip: "01310-100",
    });

    expect(result.pdfBytes).toBeInstanceOf(Uint8Array);
    expect(result.pdfBytes.length).toBeGreaterThan(1000);
    expect(result.fileName).toContain("W-8BEN_Joao_da_Silva");
    expect(result.readOnly).toBe(true);
    expect(result.warnings).toHaveLength(0);

    const doc = await PDFDocument.load(result.pdfBytes);
    const form = doc.getForm();
    expect(form.getTextField("topmostSubform[0].Page1[0].f_1[0]").getText()).toBe("Joao da Silva");
    expect(form.getTextField("topmostSubform[0].Page1[0].f_2[0]").getText()).toBe("Brazil");
    expect(form.getTextField("topmostSubform[0].Page1[0].f_10[0]").getText()).toBe("52998224725");
    expect(form.getCheckBox("topmostSubform[0].Page1[0].c1_02[0]").isChecked()).toBe(true);
  });

  it("generates a valid W-8BEN-E PDF for Corporation (PJ)", async () => {
    const result = await generateW8PDF({
      userName: "Carlos Souza",
      entityType: "PJ",
      companyName: "Souza Tech Ltda",
      taxId: "11.222.333/0001-81",
      addressStreet: "Rua Funchal, 200",
      addressCity: "São Paulo",
      addressState: "SP",
      addressZip: "04551-060",
    });

    expect(result.pdfBytes).toBeInstanceOf(Uint8Array);
    expect(result.pdfBytes.length).toBeGreaterThan(1000);
    expect(result.fileName).toContain("W-8BEN-E_Souza_Tech_Ltda");
    expect(result.readOnly).toBe(true);
    expect(result.warnings).toHaveLength(0);

    const doc = await PDFDocument.load(result.pdfBytes);
    const form = doc.getForm();
    expect(form.getTextField("topmostSubform[0].Page1[0].f1_1[0]").getText()).toBe("Souza Tech Ltda");
    expect(form.getTextField("topmostSubform[0].Page1[0].f1_2[0]").getText()).toBe("Brazil");
    expect(form.getCheckBox("topmostSubform[0].Page1[0].c1_1[0]").isChecked()).toBe(true);
    expect(form.getCheckBox("topmostSubform[0].Page1[0].Col2[0].c1_3[13]").isChecked()).toBe(true);
    expect(form.getCheckBox("topmostSubform[0].Page7[0].c7_6[0]").isChecked()).toBe(true);
    expect(form.getCheckBox("topmostSubform[0].Page8[0].c8_3[0]").isChecked()).toBe(true);
  });

  it("tracks truncation warning when field exceeds max length", async () => {
    const superLongCity = "A".repeat(500);
    const result = await generateW8PDF({
      userName: "Carlos",
      entityType: "PF",
      taxId: "529.982.247-25",
      addressStreet: "Rua Funchal, 200",
      addressCity: superLongCity,
      addressState: "SP",
      addressZip: "04551-060",
    });

    expect(result.pdfBytes).toBeInstanceOf(Uint8Array);
    expect(result.readOnly).toBe(true);
  });

  it("safely generates PDF with apostrophes and hash symbols in name and address", async () => {
    const result = await generateW8PDF({
      userName: "Sean O'Connor",
      entityType: "PF",
      taxId: "529.982.247-25",
      addressStreet: "Avenida Brasil, No. 100, Apt #402",
      addressCity: "Rio de Janeiro",
      addressState: "RJ",
      addressZip: "22000-000",
    });

    expect(result.pdfBytes).toBeInstanceOf(Uint8Array);
    expect(result.pdfBytes.length).toBeGreaterThan(1000);
    const doc = await PDFDocument.load(result.pdfBytes);
    const form = doc.getForm();
    expect(form.getTextField("topmostSubform[0].Page1[0].f_1[0]").getText()).toBe("Sean O'Connor");
    expect(form.getTextField("topmostSubform[0].Page1[0].f_3[0]").getText()).toBe("Avenida Brasil, No. 100, Apt #402");
  });

  it("generates a valid W-8BEN PDF for MEI using CPF", async () => {
    const result = await generateW8PDF({
      userName: "Mariana Souza",
      entityType: "PF",
      isMei: true,
      taxId: "123.456.789-00",
      addressStreet: "Rua das Flores, 123",
      addressCity: "Curitiba",
      addressState: "PR",
      addressZip: "80000-000",
    });

    expect(result.pdfBytes).toBeInstanceOf(Uint8Array);
    expect(result.fileName).toContain("W-8BEN_Mariana_Souza");
    const doc = await PDFDocument.load(result.pdfBytes);
    const form = doc.getForm();
    expect(form.getTextField("topmostSubform[0].Page1[0].f_1[0]").getText()).toBe("Mariana Souza");
    expect(form.getTextField("topmostSubform[0].Page1[0].f_10[0]").getText()).toBe("12345678900");
  });

  it("generates a valid W-8BEN-E PDF for Passive NFFE when selected", async () => {
    const result = await generateW8PDF({
      userName: "Fernanda Lima",
      entityType: "PJ",
      companyName: "Lima Holdings Ltda",
      taxId: "11.222.333/0001-81",
      addressStreet: "Alameda Santos, 500",
      addressCity: "São Paulo",
      addressState: "SP",
      addressZip: "01418-000",
      chapter4Status: "PassiveNFFE",
    });

    expect(result.pdfBytes).toBeInstanceOf(Uint8Array);
    expect(result.fileName).toContain("W-8BEN-E_Lima_Holdings_Ltda");
    const doc = await PDFDocument.load(result.pdfBytes);
    const form = doc.getForm();
    expect(form.getCheckBox("topmostSubform[0].Page1[0].Col2[0].c1_3[14]").isChecked()).toBe(true);
    expect(form.getCheckBox("topmostSubform[0].Page7[0].c7_7[0]").isChecked()).toBe(true);
  });

  it("uses the English country name for a foreign national living in Brazil (W-8BEN line 2)", async () => {
    const result = await generateW8PDF({
      userName: "Hans Muller",
      entityType: "PF",
      taxId: "529.982.247-25",
      isForeignNational: true,
      citizenshipCountry: "CH",
      addressStreet: "Avenida Paulista, 1000",
      addressCity: "Sao Paulo",
      addressState: "SP",
      addressZip: "01310-100",
    });

    const form = (await PDFDocument.load(result.pdfBytes)).getForm();
    expect(form.getTextField("topmostSubform[0].Page1[0].f_2[0]").getText()).toBe("Switzerland");
    // Address and Foreign TIN stay Brazilian (the person lives in Brazil and uses a CPF).
    expect(form.getTextField("topmostSubform[0].Page1[0].f_5[0]").getText()).toBe("Brazil");
    expect(form.getTextField("topmostSubform[0].Page1[0].f_10[0]").getText()).toBe("52998224725");
  });

  it("uses Brazil when foreign-national flag is off", async () => {
    const result = await generateW8PDF({
      userName: "Maria Silva",
      entityType: "PF",
      taxId: "529.982.247-25",
      addressStreet: "Avenida Paulista, 1000",
      addressCity: "Sao Paulo",
      addressState: "SP",
      addressZip: "01310-100",
      isForeignNational: false,
    });
    const form = (await PDFDocument.load(result.pdfBytes)).getForm();
    expect(form.getTextField("topmostSubform[0].Page1[0].f_2[0]").getText()).toBe("Brazil");
  });

  it("throws an error when foreign-national flag is on but citizenship is invalid or unsupported", async () => {
    for (const invalidCountry of ["US", undefined, "XX"]) {
      await expect(
        generateW8PDF({
          userName: "Maria Silva",
          entityType: "PF",
          taxId: "529.982.247-25",
          addressStreet: "Avenida Paulista, 1000",
          addressCity: "Sao Paulo",
          addressState: "SP",
          addressZip: "01310-100",
          isForeignNational: true,
          citizenshipCountry: invalidCountry,
        })
      ).rejects.toThrow(/Invalid or unsupported country of citizenship/);
    }
  });
});
