import { z } from "zod";
import { isValidCpf, isValidCnpj } from "../brazil-api";
import { isSelectableCountry } from "../countries";

/**
 * Zod validation schemas for FormW8 wizard data.
 * Enforces strict IRS standards, ASCII sanitization, and Brazilian Tax ID formats.
 */

export const EntityTypeEnum = z.enum(["PF", "PJ"]);
export type EntityType = z.infer<typeof EntityTypeEnum>;

export const Step1Schema = z.object({
  userName: z
    .string()
    .trim()
    .min(2, { message: "nameRequired" })
    .max(100, { message: "nameTooLong" }),
});

export const Step2Schema = z.object({
  entityType: EntityTypeEnum,
});

const digitsOnly = (val: string) => val.replace(/\D/g, "");

/** Foreign TIN for individuals (CPF). Messages are i18n keys under wizard.validation. */
const cpfField = z.string().superRefine((val, ctx) => {
  const digits = digitsOnly(val);
  if (!digits) {
    ctx.addIssue({ code: "custom", message: "taxIdRequired" });
  } else if (digits.length > 11 || val.includes("/")) {
    ctx.addIssue({ code: "custom", message: "taxIdCnpjInPfError" });
  } else if (digits.length !== 11 || !isValidCpf(digits)) {
    ctx.addIssue({ code: "custom", message: "taxIdInvalidPF" });
  }
});

/** Foreign TIN for entities (CNPJ). */
const cnpjField = z.string().superRefine((val, ctx) => {
  const digits = digitsOnly(val);
  if (!digits) {
    ctx.addIssue({ code: "custom", message: "taxIdRequired" });
  } else if (digits.length === 11) {
    ctx.addIssue({ code: "custom", message: "taxIdCpfInPjError" });
  } else if (digits.length !== 14 || !isValidCnpj(digits)) {
    ctx.addIssue({ code: "custom", message: "taxIdInvalidPJ" });
  }
});

const addressFields = {
  addressZip: z.string().superRefine((val, ctx) => {
    const digits = digitsOnly(val);
    if (!digits) ctx.addIssue({ code: "custom", message: "zipRequired" });
    else if (digits.length !== 8) ctx.addIssue({ code: "custom", message: "zipInvalid" });
  }),
  addressStreet: z.string().trim().min(1, { message: "addressRequired" }),
  addressCity: z.string().trim().min(1, { message: "cityRequired" }),
  addressState: z.string().trim().superRefine((val, ctx) => {
    if (!val) ctx.addIssue({ code: "custom", message: "stateRequired" });
    else if (val.length !== 2) ctx.addIssue({ code: "custom", message: "stateInvalid" });
  }),
};

/** Citizenship is Brazilian unless the person says otherwise; US citizens use Form W-9. */
const citizenshipFields = {
  isForeignNational: z.boolean().optional(),
  citizenshipCountry: z.string().optional(),
};

export const Step3SchemaPF = z
  .object({
    taxId: cpfField,
    ...citizenshipFields,
    ...addressFields,
  })
  .superRefine((data, ctx) => {
    if (!data.isForeignNational) return;
    if (!data.citizenshipCountry) {
      ctx.addIssue({ code: "custom", path: ["citizenshipCountry"], message: "citizenshipRequired" });
    } else if (!isSelectableCountry(data.citizenshipCountry)) {
      ctx.addIssue({ code: "custom", path: ["citizenshipCountry"], message: "citizenshipInvalid" });
    }
  });

export const Step3SchemaPJ = z.object({
  taxId: cnpjField,
  companyName: z.string().trim().min(1, { message: "companyNameRequired" }),
  ...addressFields,
});

export const W8FormSchema = z.object({
  // Step 1: User Name Onboarding
  userName: z
    .string()
    .trim()
    .min(2, { message: "nameRequired" })
    .max(100, { message: "nameTooLong" }),

  // Step 2: Entity Type Selection (PF = W-8BEN, PJ = W-8BEN-E)
  entityType: EntityTypeEnum,
  isMei: z.boolean().optional(),
  // PF/MEI who are not Brazilian citizens (W-8BEN line 2); ISO 3166-1 alpha-2 code
  isForeignNational: z.boolean().optional(),
  citizenshipCountry: z.string().length(2).optional(),
  // PJ holding questionnaire (Chapter 4: Active vs Passive NFFE)
  isHolding: z.boolean().optional(),
  passiveIncomeAtLeast50: z.boolean().optional(),
  passiveAssetsAtLeast50: z.boolean().optional(),
  companyName: z.string().optional(),

  // Step 3: Tax Identification & Address
  taxId: z
    .string()
    .trim()
    .min(11, { message: "taxIdRequired" })
    .max(18, { message: "taxIdInvalid" }),

  countryOfCitizenship: z.string().default("Brazil"),
  countryOfIncorporation: z.string().default("Brazil"),

  addressStreet: z.string().trim().min(3, { message: "addressRequired" }),
  addressCity: z.string().trim().min(2, { message: "cityRequired" }),
  addressState: z.string().trim().min(2, { message: "stateRequired" }),
  addressZip: z.string().trim().min(5, { message: "zipRequired" }),

  // Step 4: Classification & IRS Compliance Enforcements
  chapter3Classification: z.enum(["Corporation", "Individual"]).default("Corporation"),
  chapter4Status: z.enum(["ActiveNFFE", "PassiveNFFE", "Individual"]).default("ActiveNFFE"),

  // Treaty Claim Part III: Strictly false for Brazil active services
  claimTreaty: z.literal(false, {
    errorMap: () => ({ message: "treatyNotAvailable" }),
  }).default(false),

  // Output preference
  outputMode: z.enum(["pdf", "copy_paste"]).default("pdf"),
});

export type W8FormData = z.infer<typeof W8FormSchema>;
