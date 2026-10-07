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
}

/**
 * Sets text into a PDF text field safely, respecting max length constraints.
 */
function safeSetTextField(form: ReturnType<PDFDocument["getForm"]>, fieldName: string, value: string) {
  try {
    const field = form.getTextField(fieldName);
    if (field) {
      const max = field.getMaxLength();
      const textToSet = max && value.length > max ? value.substring(0, max) : value;
      field.setText(textToSet);
    }
  } catch (err) {
    console.warn(`[FormW8 PDF] Field ${fieldName} not found or failed:`, err);
  }
}

/**
 * Checks a PDF checkbox safely.
 */
function safeCheckField(form: ReturnType<PDFDocument["getForm"]>, fieldName: string) {
  try {
    const field = form.getCheckBox(fieldName);
    if (field) {
      field.check();
    }
  } catch (err) {
    console.warn(`[FormW8 PDF] Checkbox ${fieldName} not found or failed:`, err);
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
  const pdfTemplatePath = isPJ ? "/forms/fw8bene.pdf" : "/forms/fw8ben.pdf";

  // Fetch official template from static assets
  const response = await fetch(pdfTemplatePath);
  if (!response.ok) {
    throw new Error(`Failed to load IRS PDF template from ${pdfTemplatePath}`);
  }
  const templateBytes = await response.arrayBuffer();

  const pdfDoc = await PDFDocument.load(templateBytes);
  const form = pdfDoc.getForm();

  const legalName = sanitizeASCII(isPJ ? (data.companyName || data.userName || "") : (data.userName || ""));
  const signerName = sanitizeASCII(data.userName || legalName);
  const rawTaxId = (data.taxId || "").replace(/\D/g, "");
  const formattedTaxId = data.taxId || rawTaxId;
  const street = sanitizeASCII(data.addressStreet || "");
  const city = sanitizeASCII(data.addressCity || "");
  const state = (data.addressState || "").toUpperCase();
  const zip = data.addressZip || "";
  const cityStateZip = `${city}, ${state} ${zip}`.trim();
  const currentDate = formatIRSDate();

  if (isPJ) {
    // -------------------------------------------------------------
    // FORM W-8BEN-E (Entities / Brazilian PJ / LTDA / SLU)
    // -------------------------------------------------------------

    // Page 1: Line 1 - Organization Name
    safeSetTextField(form, "topmostSubform[0].Page1[0].f1_1[0]", legalName);

    // Page 1: Line 2 - Country of Incorporation
    safeSetTextField(form, "topmostSubform[0].Page1[0].f1_2[0]", "Brazil");

    // Page 1: Line 4 - Chapter 3 Status: Corporation (c1_1[0])
    safeCheckField(form, "topmostSubform[0].Page1[0].c1_1[0]");

    // Page 1: Line 5 - Chapter 4 Status: Active NFFE (Col2[0].c1_3[13])
    safeCheckField(form, "topmostSubform[0].Page1[0].Col2[0].c1_3[13]");

    // Page 1: Line 6 - Permanent Residence Address
    safeSetTextField(form, "topmostSubform[0].Page1[0].f1_4[0]", street);
    safeSetTextField(form, "topmostSubform[0].Page1[0].f1_5[0]", cityStateZip);
    safeSetTextField(form, "topmostSubform[0].Page1[0].f1_6[0]", "Brazil");

    // Page 2: Line 9b - Foreign TIN
    safeSetTextField(form, "topmostSubform[0].Page2[0].Line9b_ReadOrder[0].f2_3[0]", rawTaxId || formattedTaxId);

    // Page 7: Part XXV - Active NFFE Certification (Line 39: c7_6[0])
    safeCheckField(form, "topmostSubform[0].Page7[0].c7_6[0]");

    // Page 8: Part XXX - Certification Checkbox & Signer
    safeCheckField(form, "topmostSubform[0].Page8[0].c8_3[0]");
    safeSetTextField(form, "topmostSubform[0].Page8[0].f8_31[0]", signerName);
    safeSetTextField(form, "topmostSubform[0].Page8[0].f8_32[0]", currentDate);
  } else {
    // -------------------------------------------------------------
    // FORM W-8BEN (Individuals / Brazilian PF)
    // -------------------------------------------------------------

    // Line 1: Name of individual
    safeSetTextField(form, "topmostSubform[0].Page1[0].f_1[0]", legalName);

    // Line 2: Country of citizenship
    safeSetTextField(form, "topmostSubform[0].Page1[0].f_2[0]", "Brazil");

    // Line 3: Permanent residence address
    safeSetTextField(form, "topmostSubform[0].Page1[0].f_3[0]", street);
    safeSetTextField(form, "topmostSubform[0].Page1[0].f_4[0]", cityStateZip);
    safeSetTextField(form, "topmostSubform[0].Page1[0].f_5[0]", "Brazil");

    // Line 6a: Foreign tax identifying number (FTIN / CPF)
    safeSetTextField(form, "topmostSubform[0].Page1[0].f_10[0]", rawTaxId || formattedTaxId);

    // Part III: Certification Checkbox, Signer & Date
    safeCheckField(form, "topmostSubform[0].Page1[0].c1_02[0]");
    safeSetTextField(form, "topmostSubform[0].Page1[0].f_21[0]", signerName);
    safeSetTextField(form, "topmostSubform[0].Page1[0].Date[0]", currentDate);
  }

  // Achata os campos do formulário (flatten) para que o texto seja incorporado como vetor preto sólido definitivo
  // eliminando qualquer overlay roxo/azul que visualizadores de PDF (Chrome, Acrobat) aplicam em campos interativos
  try {
    form.flatten();
  } catch (flattenErr) {
    console.warn("[FormW8 PDF] Flatten fallback:", flattenErr);
  }

  const pdfBytes = await pdfDoc.save();
  const safeName = legalName.replace(/[^a-zA-Z0-9]/g, "_") || "Beneficial_Owner";

  return {
    pdfBytes,
    fileName: `${isPJ ? "W-8BEN-E" : "W-8BEN"}_${safeName}.pdf`,
  };
}
