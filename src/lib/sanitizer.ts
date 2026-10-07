/**
 * Sanitizes input strings to pure ASCII by stripping accents and special characters.
 * Essential for US tax forms (IRS W-8) and international payment platform compliance.
 */
export function sanitizeASCII(input: string): string {
  if (!input) return "";

  return input
    // Handle specific character replacements before decomposition
    .replace(/[º°]/g, "o")
    .replace(/[ª]/g, "a")
    .replace(/№|Nº|nº|N°|n°/g, "No. ")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C")
    .replace(/ñ/g, "n")
    .replace(/Ñ/g, "N")
    // Normalize unicode to decompose accents from characters
    .normalize("NFD")
    // Remove diacritical marks (accents)
    .replace(/[\u0300-\u036f]/g, "")
    // Replace non-ASCII printable characters (preserving space, hyphen, period, comma, slash, and ampersand)
    .replace(/[^a-zA-Z0-9\s\-\.\,\/\&]/g, "")
    // Collapse multiple consecutive spaces into a single space
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Returns true if the string contained accents or special characters that were modified.
 */
export function wasSanitized(original: string): boolean {
  if (!original) return false;
  return original.trim() !== sanitizeASCII(original);
}
