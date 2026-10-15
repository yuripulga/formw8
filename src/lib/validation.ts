import { z } from "zod";
import {
  Step1Schema,
  Step3SchemaPF,
  Step3SchemaPJ,
  W8FormData,
} from "@/lib/schemas/w8-form-schema";

/** Field name -> i18n key under `wizard.validation`. */
export type ValidationErrors = Record<string, string>;

function collectErrors(error: z.ZodError): ValidationErrors {
  const errors: ValidationErrors = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "form");
    if (!errors[field]) errors[field] = issue.message;
  }
  return errors;
}

/**
 * Validates the data collected by a wizard step using the Zod step schemas.
 * Returns an empty object when valid, otherwise one i18n key per invalid field.
 */
export function validateStep(step: number, data: Partial<W8FormData>): ValidationErrors {
  if (step === 1) {
    const result = Step1Schema.safeParse({ userName: data.userName ?? "" });
    return result.success ? {} : collectErrors(result.error);
  }

  if (step === 3) {
    const input = {
      taxId: data.taxId ?? "",
      companyName: data.companyName ?? "",
      addressZip: data.addressZip ?? "",
      addressStreet: data.addressStreet ?? "",
      addressCity: data.addressCity ?? "",
      addressState: data.addressState ?? "",
      isForeignNational: data.isForeignNational,
      citizenshipCountry: data.citizenshipCountry,
    };
    const schema = data.entityType === "PJ" ? Step3SchemaPJ : Step3SchemaPF;
    const result = schema.safeParse(input);
    return result.success ? {} : collectErrors(result.error);
  }

  return {};
}
