import { describe, it, expect } from "vitest";
import { validateStep } from "./validation";

const address = {
  addressZip: "01310-100",
  addressStreet: "Av Paulista, 1000",
  addressCity: "Sao Paulo",
  addressState: "SP",
};

describe("validateStep", () => {
  it("step 1 requires a name with at least 2 characters", () => {
    expect(validateStep(1, { userName: "" })).toEqual({ userName: "nameRequired" });
    expect(validateStep(1, { userName: "  " })).toEqual({ userName: "nameRequired" });
    expect(validateStep(1, { userName: "Maria Silva" })).toEqual({});
  });

  it("step 3 PF accepts a valid CPF and address", () => {
    expect(
      validateStep(3, { entityType: "PF", taxId: "529.982.247-25", ...address })
    ).toEqual({});
  });

  it("step 3 PF reports specific CPF errors", () => {
    expect(validateStep(3, { entityType: "PF", taxId: "", ...address }).taxId).toBe("taxIdRequired");
    expect(validateStep(3, { entityType: "PF", taxId: "111.111.111-11", ...address }).taxId).toBe(
      "taxIdInvalidPF"
    );
    expect(
      validateStep(3, { entityType: "PF", taxId: "40.676.067/0001-65", ...address }).taxId
    ).toBe("taxIdCnpjInPfError");
  });

  it("step 3 PJ requires company name and a valid CNPJ", () => {
    const ok = validateStep(3, {
      entityType: "PJ",
      taxId: "11.222.333/0001-81",
      companyName: "Acme Tech Ltda",
      ...address,
    });
    expect(ok).toEqual({});

    const bad = validateStep(3, { entityType: "PJ", taxId: "529.982.247-25", companyName: "", ...address });
    expect(bad.taxId).toBe("taxIdCpfInPjError");
    expect(bad.companyName).toBe("companyNameRequired");
  });

  it("step 3 reports address errors per field", () => {
    const errors = validateStep(3, {
      entityType: "PF",
      taxId: "529.982.247-25",
      addressZip: "123",
      addressStreet: "",
      addressCity: "",
      addressState: "S",
    });
    expect(errors).toEqual({
      addressZip: "zipInvalid",
      addressStreet: "addressRequired",
      addressCity: "cityRequired",
      addressState: "stateInvalid",
    });
  });

  it("steps 2 and 4 have nothing to validate", () => {
    expect(validateStep(2, {})).toEqual({});
    expect(validateStep(4, {})).toEqual({});
  });
});
