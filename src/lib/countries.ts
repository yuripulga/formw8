/**
 * Countries for the "country of citizenship" field (Form W-8BEN, line 2).
 * Names come from the browser (Intl.DisplayNames), so there is no translation file to maintain and
 * every supported language gets its own country names for free.
 */

// ISO 3166-1 alpha-2 codes, without Antarctica and uninhabited territories. The United States is
// kept out of the selectable list on purpose: US citizens use Form W-9, not the W-8BEN.
const ISO_CODES =
  "AD AE AF AG AI AL AM AO AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GT GU GW GY HK HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW".split(
    " "
  );

export const BRAZIL = "BR";

/** US citizens do not use Form W-8BEN. */
export const UNSUPPORTED_CITIZENSHIPS = new Set(["US"]);

export const COUNTRY_CODES: readonly string[] = ISO_CODES;

export function isSelectableCountry(code: string | undefined | null): code is string {
  return Boolean(code) && ISO_CODES.includes(code as string) && !UNSUPPORTED_CITIZENSHIPS.has(code as string);
}

function displayName(code: string, language: string): string {
  try {
    return new Intl.DisplayNames([language], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

/** Country name in the language of the interface (for the field and its suggestions). */
export function countryName(code: string, language: string): string {
  return displayName(code, language);
}

/** Country name in English: the form is an English document, so the PDF always uses this one. */
export function englishCountryName(code: string): string {
  return displayName(code, "en");
}

/** Selectable countries sorted alphabetically for the given language. */
export function countryOptions(language: string): { code: string; name: string }[] {
  const collator = new Intl.Collator(language);
  return ISO_CODES.filter(isSelectableCountry)
    .map((code) => ({ code, name: displayName(code, language) }))
    .sort((a, b) => collator.compare(a.name, b.name));
}

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toLowerCase();

/**
 * Finds the country a visitor typed (in the interface language or in English, ignoring case and
 * accents). Returns null when the text does not match exactly one selectable country. With
 * `includeUnsupported` it also recognizes the United States, so the form can explain why it is not accepted.
 */
export function findCountryCode(
  input: string,
  language: string,
  options: { includeUnsupported?: boolean } = {}
): string | null {
  const wanted = normalize(input);
  if (!wanted) return null;
  for (const code of options.includeUnsupported ? ["US", ...ISO_CODES] : ISO_CODES) {
    if (!options.includeUnsupported && !isSelectableCountry(code)) continue;
    if (normalize(displayName(code, language)) === wanted || normalize(displayName(code, "en")) === wanted) {
      return code;
    }
  }
  return null;
}
