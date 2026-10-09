/**
 * Sanitizes input strings to pure ASCII by stripping accents and special characters.
 * Essential for US tax forms (IRS W-8) and international payment platform compliance.
 */
export function sanitizeASCII(input: string | null | undefined): string {
  if (typeof input !== "string" || !input) return "";

  return input
    // Handle typography quotes, dashes, and currency symbols
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[—–]/g, "-")
    // Specific ligatures and non-combining diacritics
    .replace(/№|Nº|nº|N°|n°/g, "No. ")
    .replace(/[º°]/g, "o")
    .replace(/[ª]/g, "a")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C")
    .replace(/ñ/g, "n")
    .replace(/Ñ/g, "N")
    .replace(/ß/g, "ss")
    .replace(/æ/g, "ae")
    .replace(/Æ/g, "AE")
    .replace(/œ/g, "oe")
    .replace(/Œ/g, "OE")
    .replace(/ø/g, "o")
    .replace(/Ø/g, "O")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    // Normalize unicode to decompose accents from characters
    .normalize("NFD")
    // Remove diacritical marks (accents)
    .replace(/[\u0300-\u036f]/g, "")
    // Replace non-ASCII printable characters (preserving space, hyphen, period, comma, slash, ampersand, apostrophe, and quote)
    .replace(/[^a-zA-Z0-9\s\-\.\,\/\&\'\"\#]/g, "")
    // Collapse multiple consecutive spaces into a single space
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Returns true if the string contained accents or special characters that were modified.
 */
export function wasSanitized(original: string | null | undefined): boolean {
  if (typeof original !== "string" || !original) return false;
  return original.trim() !== sanitizeASCII(original);
}
