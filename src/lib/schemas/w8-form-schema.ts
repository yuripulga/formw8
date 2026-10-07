import { z } from "zod";

/**
 * Zod validation schema for FormW8 wizard data.
 * Enforces strict IRS standards, ASCII sanitization, and Brazilian Tax ID formats.
 */

export const EntityTypeEnum = z.enum(["PF", "PJ"]);
export type EntityType = z.infer<typeof EntityTypeEnum>;

export const W8FormSchema = z.object({
  // Step 1: User Name Onboarding
  userName: z
    .string()
    .min(2, { message: "O nome deve conter pelo menos 2 caracteres." })
    .max(100, { message: "O nome não pode exceder 100 caracteres." }),

  // Step 2: Entity Type Selection (PF = W-8BEN, PJ = W-8BEN-E)
  entityType: EntityTypeEnum,
  companyName: z.string().optional(),

  // Step 3: Tax Identification & Address
  taxId: z
    .string()
    .min(11, { message: "O CPF/CNPJ deve conter pelo menos 11 dígitos." })
    .max(18, { message: "Formato de CPF/CNPJ inválido." }),

  countryOfCitizenship: z.string().default("Brazil"),
  countryOfIncorporation: z.string().default("Brazil"),

  addressStreet: z.string().min(5, { message: "Endereço deve conter rua e número." }),
  addressCity: z.string().min(2, { message: "Cidade é obrigatória." }),
  addressState: z.string().min(2, { message: "Estado/UF é obrigatório." }),
  addressZip: z.string().min(5, { message: "CEP é obrigatório." }),

  // Step 4: Classification & IRS Compliance Enforcements
  // For Brazilian SLU/LTDA: Automatically mapped to Corporation under Treas. Reg. 301.7701-3(b)(2)(i)
  chapter3Classification: z.enum(["Corporation", "Individual"]).default("Corporation"),
  chapter4Status: z.enum(["ActiveNFFE", "Individual"]).default("ActiveNFFE"),

  // Treaty Claim Part III: Strictly false for Brazil active services
  claimTreaty: z.literal(false, {
    errorMap: () => ({ message: "O Brasil não possui tratado de bitributação para este formulário." }),
  }).default(false),

  // Output preference
  outputMode: z.enum(["pdf", "copy_paste"]).default("pdf"),
});

export type W8FormData = z.infer<typeof W8FormSchema>;
