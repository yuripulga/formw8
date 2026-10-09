import { PDFDocument } from "pdf-lib";
import { W8FormData } from "@/lib/schemas/w8-form-schema";
import { sanitizeASCII } from "@/lib/sanitizer";

/**
 * Client-Side Official IRS PDF Engine for FormW8
 * Fills authentic IRS Form W-8BEN and W-8BEN-E PDF documents 100% locally in the browser.
 */

export interface PDFGenerationResult {
  pdfBytes: Uint8Array;
  fileName: string;
  flattened: boolean;
  readOnly: boolean;
  warnings: string[];
}

/**
 * Universally loads the official PDF template bytes (supports both browser fetch and Node/Vitest tests).
 */
async function loadTemplateBytes(templatePath: string): Promise<ArrayBuffer> {
  if (typeof window === "undefined") {
    const fs = await import("fs/promises");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "public", templatePath);
    const buffer = await fs.readFile(filePath);
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  }

  const response = await fetch(templatePath);
  if (!response.ok) {
    throw new Error(`Failed to load IRS PDF template from ${templatePath}`);
  }
  return await response.arrayBuffer();
}

/**
 * Sets text into a PDF text field safely, respecting max length constraints and tracking truncation warnings.
 */
function safeSetTextField(
  form: ReturnType<PDFDocument["getForm"]>,
  fieldName: string,
  value: string,
  warnings: string[]
) {
  try {
    const field = form.getTextField(fieldName);
    if (field) {
      const max = field.getMaxLength();
      if (max && value.length > max) {
        warnings.push(`Campo ${fieldName} truncado de ${value.length} para ${max} caracteres.`);
        field.setText(value.substring(0, max));
      } else {
        field.setText(value);
      }
    }
  } catch (err) {
    warnings.push(`Campo ${fieldName} não encontrado no template: ${String(err)}`);
  }
}

/**
 * Checks a PDF checkbox safely.
 */
function safeCheckField(
  form: ReturnType<PDFDocument["getForm"]>,
  fieldName: string,
  warnings: string[]
) {
  try {
    const field = form.getCheckBox(fieldName);
    if (field) {
      field.check();
    }
  } catch (err) {
    warnings.push(`Checkbox ${fieldName} não encontrado no template: ${String(err)}`);
  }
}

/**
 * Formats date as IRS standard MM-DD-YYYY.
 */
function formatIRSDate(d = new Date()): string {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
}

/**
 * Generates an official, certified IRS PDF document pre-filled with user data.
 */
export async function generateW8PDF(data: Partial<W8FormData>): Promise<PDFGenerationResult> {
  const isPJ = data.entityType === "PJ";
  // Versioned IRS template filenames to prevent stale browser cache on IRS revisions
  const pdfTemplatePath = isPJ
    ? "/forms/fw8bene-rev10-2021.pdf"
    : "/forms/fw8ben-rev10-2021.pdf";

  const templateBytes = await loadTemplateBytes(pdfTemplatePath);
  const pdfDoc = await PDFDocument.load(templateBytes);
  const form = pdfDoc.getForm();
  const warnings: string[] = [];

  const legalName = sanitizeASCII(isPJ ? (data.companyName || data.userName || "") : (data.userName || ""));
  const signerName = sanitizeASCII(data.userName || legalName);
  const rawTaxId = (data.taxId || "").replace(/\D/g, "");
  const formattedTaxId = sanitizeASCII(data.taxId || rawTaxId);
  const street = sanitizeASCII(data.addressStreet || "");
  const city = sanitizeASCII(data.addressCity || "");
  const state = sanitizeASCII(data.addressState || "").toUpperCase().slice(0, 2);
  const zip = sanitizeASCII(data.addressZip || "");
  const cityStateZip = `${city}, ${state} ${zip}`.trim();
  const currentDate = formatIRSDate();

  if (isPJ) {
    // -------------------------------------------------------------
    // FORM W-8BEN-E (Entities / Brazilian PJ / LTDA / SLU)
    // -------------------------------------------------------------

    // Page 1: Line 1 - Organization Name
    safeSetTextField(form, "topmostSubform[0].Page1[0].f1_1[0]", legalName, warnings);

    // Page 1: Line 2 - Country of Incorporation
    safeSetTextField(form, "topmostSubform[0].Page1[0].f1_2[0]", "Brazil", warnings);

    // Page 1: Line 4 - Chapter 3 Status: Corporation (c1_1[0])
    safeCheckField(form, "topmostSubform[0].Page1[0].c1_1[0]", warnings);

    const isPassiveNFFE = data.chapter4Status === "PassiveNFFE";

    // Page 1: Line 5 - Chapter 4 Status
    if (isPassiveNFFE) {
      safeCheckField(form, "topmostSubform[0].Page1[0].Col2[0].c1_3[14]", warnings); // Passive NFFE
    } else {
      safeCheckField(form, "topmostSubform[0].Page1[0].Col2[0].c1_3[13]", warnings); // Active NFFE
    }

    // Page 1: Line 6 - Permanent Residence Address
    safeSetTextField(form, "topmostSubform[0].Page1[0].f1_4[0]", street, warnings);
    safeSetTextField(form, "topmostSubform[0].Page1[0].f1_5[0]", cityStateZip, warnings);
    safeSetTextField(form, "topmostSubform[0].Page1[0].f1_6[0]", "Brazil", warnings);

    // Page 2: Line 9b - Foreign TIN
    safeSetTextField(form, "topmostSubform[0].Page2[0].Line9b_ReadOrder[0].f2_3[0]", rawTaxId || formattedTaxId, warnings);

    // Page 7: Part XXV (Active NFFE) or Part XXVI (Passive NFFE)
    if (isPassiveNFFE) {
      safeCheckField(form, "topmostSubform[0].Page7[0].c7_7[0]", warnings); // Part XXVI Line 40a
    } else {
      safeCheckField(form, "topmostSubform[0].Page7[0].c7_6[0]", warnings); // Part XXV Line 39
    }

    // Page 8: Part XXX - Certification Checkbox & Signer
    safeCheckField(form, "topmostSubform[0].Page8[0].c8_3[0]", warnings);
    safeSetTextField(form, "topmostSubform[0].Page8[0].f8_31[0]", signerName, warnings);
    safeSetTextField(form, "topmostSubform[0].Page8[0].f8_32[0]", currentDate, warnings);
  } else {
    // -------------------------------------------------------------
    // FORM W-8BEN (Individuals / Brazilian PF)
    // -------------------------------------------------------------

    // Line 1: Name of individual
    safeSetTextField(form, "topmostSubform[0].Page1[0].f_1[0]", legalName, warnings);

    // Line 2: Country of citizenship
    safeSetTextField(form, "topmostSubform[0].Page1[0].f_2[0]", "Brazil", warnings);

    // Line 3: Permanent residence address
    safeSetTextField(form, "topmostSubform[0].Page1[0].f_3[0]", street, warnings);
    safeSetTextField(form, "topmostSubform[0].Page1[0].f_4[0]", cityStateZip, warnings);
    safeSetTextField(form, "topmostSubform[0].Page1[0].f_5[0]", "Brazil", warnings);

    // Line 6a: Foreign tax identifying number (FTIN / CPF)
    safeSetTextField(form, "topmostSubform[0].Page1[0].f_10[0]", rawTaxId || formattedTaxId, warnings);

    // Part III: Certification Checkbox, Signer & Date
    safeCheckField(form, "topmostSubform[0].Page1[0].c1_02[0]", warnings);
    safeSetTextField(form, "topmostSubform[0].Page1[0].f_21[0]", signerName, warnings);
    safeSetTextField(form, "topmostSubform[0].Page1[0].Date[0]", currentDate, warnings);
  }

  let flattened = false;
  try {
    form.flatten({ updateFieldAppearances: false });
    flattened = true;
  } catch {
    // IRS official forms containing dynamic XFA structures cannot be fully flattened by pdf-lib.
    // Fallback: lock all form fields to read-only so the generated document is tamper-resistant.
    for (const field of form.getFields()) {
      try {
        field.enableReadOnly();
      } catch {
        // ignore per-field lock errors
      }
    }
  }

  const pdfBytes = await pdfDoc.save();
  const safeName = legalName.replace(/[^a-zA-Z0-9]/g, "_") || "Beneficial_Owner";

  return {
    pdfBytes,
    fileName: `${isPJ ? "W-8BEN-E" : "W-8BEN"}_${safeName}.pdf`,
    flattened,
    readOnly: true,
    warnings,
  };
}
