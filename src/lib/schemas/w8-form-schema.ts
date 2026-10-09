import { z } from "zod";
import { isValidCpf, isValidCnpj } from "../brazil-api";

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

export const Step3SchemaPF = z.object({
  taxId: z
    .string()
    .trim()
    .refine((val) => {
      const digits = val.replace(/\D/g, "");
      return digits.length === 11 && isValidCpf(digits);
    }, { message: "taxIdInvalidPF" }),
  addressZip: z
    .string()
    .trim()
    .refine((val) => val.replace(/\D/g, "").length === 8, { message: "zipInvalid" }),
  addressStreet: z.string().trim().min(3, { message: "addressRequired" }),
  addressCity: z.string().trim().min(2, { message: "cityRequired" }),
  addressState: z
    .string()
    .trim()
    .refine((val) => val.length === 2, { message: "stateInvalid" }),
});

export const Step3SchemaPJ = z.object({
  taxId: z
    .string()
    .trim()
    .refine((val) => {
      const digits = val.replace(/\D/g, "");
      return digits.length === 14 && isValidCnpj(digits);
    }, { message: "taxIdInvalidPJ" }),
  companyName: z.string().trim().min(2, { message: "companyNameRequired" }),
  addressZip: z
    .string()
    .trim()
    .refine((val) => val.replace(/\D/g, "").length === 8, { message: "zipInvalid" }),
  addressStreet: z.string().trim().min(3, { message: "addressRequired" }),
  addressCity: z.string().trim().min(2, { message: "cityRequired" }),
  addressState: z
    .string()
    .trim()
    .refine((val) => val.length === 2, { message: "stateInvalid" }),
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
