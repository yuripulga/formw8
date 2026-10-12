import type { W8FormData } from "@/lib/schemas/w8-form-schema";

type Chapter4Inputs = Pick<
  Partial<W8FormData>,
  "isHolding" | "passiveIncomeAtLeast50" | "passiveAssetsAtLeast50"
>;

/**
 * Chapter 4 (FATCA) status of a Brazilian company on Form W-8BEN-E.
 *
 * Active NFFE requires BOTH less than 50% passive gross income AND less than 50% of
 * assets producing passive income. If either test reaches 50%, the entity is a Passive NFFE.
 * Operating companies (services/software) are treated as Active without asking.
 */
export function deriveChapter4Status(input: Chapter4Inputs): "ActiveNFFE" | "PassiveNFFE" {
  if (!input.isHolding) return "ActiveNFFE";
  return input.passiveIncomeAtLeast50 || input.passiveAssetsAtLeast50
    ? "PassiveNFFE"
    : "ActiveNFFE";
}
