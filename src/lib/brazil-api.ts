/**
 * Brazilian Public Data Integration (ViaCEP & BrasilAPI & Minha Receita & CNPJ.ws)
 * Provides 100% free, client-side, CORS-enabled auto-fill for CEP and CNPJ.
 * Zero-Data Architecture: Lookups execute directly in the user's browser.
 */

export interface CepAddressResult {
  street?: string;
  bairro?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface CnpjCompanyResult {
  companyName?: string;
  tradeName?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

/**
 * Formats/masks CPF progressively as the user types (000.000.000-00).
 */
export function maskCpf(raw: string | number): string {
  const digits = String(raw).replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

/**
 * Formats/masks CNPJ progressively as the user types (00.000.000/0000-00).
 */
export function maskCnpj(raw: string | number): string {
  const digits = String(raw).replace(/\D/g, "").slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

/**
 * Formats/masks 8-digit CEP progressively as the user types (00000-000).
 */
export function maskCep(raw: string | number): string {
  const digits = String(raw).replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

/**
 * Validates a Brazilian CPF using standard checksum calculation.
 */
export function isValidCpf(raw: string | number): boolean {
  const digits = String(raw).replace(/\D/g, "");
  if (digits.length !== 11) return false;
  // Reject repetitive sequences (e.g. 11111111111)
  if (/^(\d)\1{10}$/.test(digits)) return false;

  // Validate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits.charAt(i), 10) * (10 - i);
  }
  let rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(digits.charAt(9), 10)) return false;

  // Validate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits.charAt(i), 10) * (11 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  return rest === parseInt(digits.charAt(10), 10);
}

/**
 * Validates a Brazilian CNPJ using standard checksum calculation.
 */
export function isValidCnpj(raw: string | number): boolean {
  const digits = String(raw).replace(/\D/g, "");
  if (digits.length !== 14) return false;
  // Reject repetitive sequences (e.g. 00000000000000)
  if (/^(\d)\1{13}$/.test(digits)) return false;

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits.charAt(i), 10) * weights1[i];
  }
  let rest = sum % 11;
  const digit1 = rest < 2 ? 0 : 11 - rest;
  if (digit1 !== parseInt(digits.charAt(12), 10)) return false;

  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(digits.charAt(i), 10) * weights2[i];
  }
  rest = sum % 11;
  const digit2 = rest < 2 ? 0 : 11 - rest;
  return digit2 === parseInt(digits.charAt(13), 10);
}

/**
 * Formats 8-digit CEP to 00000-000 format, reliably preserving leading zeroes.
 */
export function formatCep(raw: string | number): string {
  return maskCep(raw);
}

/**
 * Formats 14-digit CNPJ to 00.000.000/0000-00 format.
 */
export function formatCnpj(raw: string | number): string {
  return maskCnpj(raw);
}

function safeString(val: unknown): string {
  if (val === null || val === undefined) return "";
  return String(val).trim();
}

/**
 * Robustly formats a full Brazilian street address line preserving logradouro, number, complemento, and bairro.
 */
export function formatFullStreetAddress(
  logradouro: string,
  numero?: string,
  complemento?: string,
  bairro?: string
): string {
  const cleanLogr = logradouro ? logradouro.trim().replace(/,\s*$/, "") : "";
  let cleanNum = numero ? String(numero).trim() : "";
  if (!cleanNum || cleanNum.toUpperCase() === "SN" || cleanNum.toUpperCase() === "SEM NUMERO" || cleanNum.toUpperCase() === "S/N") {
    cleanNum = "S/N";
  }
  const cleanComp = complemento ? String(complemento).trim() : "";
  const cleanBairro = bairro ? String(bairro).trim() : "";

  let result = cleanLogr;

  // Append number (defaults to S/N if empty and logradouro exists)
  if (cleanNum) {
    if (!result) {
      result = cleanNum;
    } else {
      // Check if result already ends with exact number or S/N
      const regexNum = new RegExp(`[,\\s]${cleanNum.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "i");
      if (!regexNum.test(result)) {
        result = `${result}, ${cleanNum}`;
      }
    }
  }

  // Append complemento if present and not already contained
  if (cleanComp && !result.toLowerCase().includes(cleanComp.toLowerCase())) {
    result = `${result} - ${cleanComp}`;
  }

  // Append bairro if present and not already contained
  if (cleanBairro && !result.toLowerCase().includes(cleanBairro.toLowerCase())) {
    result = `${result}, ${cleanBairro}`;
  }

  return result.trim();
}

/**
 * Helper to fetch with a timeout and optional external signal
 */
async function fetchWithSignalTimeout(url: string, ms = 4500, externalSignal?: AbortSignal) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);

  if (externalSignal) {
    externalSignal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return res;
  } catch (e) {
    clearTimeout(timeoutId);
    throw e;
  }
}

/**
 * Fetches Brazilian postal address by CEP.
 * Providers: ViaCEP -> BrasilAPI v1 -> BrasilAPI v2
 */
export async function fetchAddressByCep(
  cep: string,
  signal?: AbortSignal
): Promise<CepAddressResult | null> {
  const digits = cep.replace(/\D/g, "");
  const rawCep = digits.length === 7 ? `0${digits}` : digits;
  if (rawCep.length !== 8) return null;

  // 1. Try ViaCEP
  try {
    const res = await fetchWithSignalTimeout(`https://viacep.com.br/ws/${rawCep}/json/`, 4000, signal);
    if (res.ok) {
      const data = await res.json();
      if (!data.erro) {
        const logr = safeString(data.logradouro);
        const bairro = safeString(data.bairro);

        return {
          street: logr || undefined,
          bairro: bairro || undefined,
          city: safeString(data.localidade) || undefined,
          state: safeString(data.uf).toUpperCase() || undefined,
          zip: formatCep(rawCep),
        };
      }
    }
  } catch {
    // Failover
  }

  // 2. Fallback to BrasilAPI (v1 or v2)
  for (const version of ["v1", "v2"]) {
    try {
      const res = await fetchWithSignalTimeout(`https://brasilapi.com.br/api/cep/${version}/${rawCep}`, 4000, signal);
      if (res.ok) {
        const data = await res.json();
        const logr = safeString(data.street);
        const bairro = safeString(data.neighborhood);

        return {
          street: logr || undefined,
          bairro: bairro || undefined,
          city: safeString(data.city) || undefined,
          state: safeString(data.state).toUpperCase() || undefined,
          zip: formatCep(rawCep),
        };
      }
    } catch {
      // Continue to next provider
    }
  }

  return null;
}

interface RawCompanyPayload {
  razao_social?: string;
  nome_fantasia?: string;
  cep?: string | number;
  descricao_tipo_de_logradouro?: string;
  tipo_logradouro?: string;
  logradouro?: string;
  numero?: string | number;
  complemento?: string;
  bairro?: string;
  municipio?: string;
  uf?: string;
  estabelecimento?: {
    razao_social?: string;
    nome_fantasia?: string;
    cep?: string | number;
    tipo_logradouro?: string;
    logradouro?: string;
    numero?: string | number;
    complemento?: string;
    bairro?: string;
    cidade?: { nome?: string };
    estado?: { sigla?: string };
  };
}

function parseCompanyData(data: RawCompanyPayload): CnpjCompanyResult | null {
  const estab = data.estabelecimento;
  const companyName = safeString(data.razao_social) || safeString(data.nome_fantasia) || safeString(estab?.razao_social) || safeString(estab?.nome_fantasia);
  if (!companyName) return null;

  const tradeName = safeString(data.nome_fantasia) || safeString(estab?.nome_fantasia) || undefined;
  const rawCep = safeString(data.cep || estab?.cep).replace(/\D/g, "");

  const type = safeString(data.descricao_tipo_de_logradouro || data.tipo_logradouro || estab?.tipo_logradouro);
  const rawLogr = safeString(data.logradouro || estab?.logradouro);
  const num = safeString(data.numero || estab?.numero);
  const comp = safeString(data.complemento || estab?.complemento);
  const bairro = safeString(data.bairro || estab?.bairro);
  const city = safeString(data.municipio || estab?.cidade?.nome);
  const state = safeString(data.uf || estab?.estado?.sigla).toUpperCase();

  let baseStreet = "";
  if (type && rawLogr && !rawLogr.toLowerCase().startsWith(type.toLowerCase())) {
    baseStreet = `${type} ${rawLogr}`.trim();
  } else if (rawLogr) {
    baseStreet = rawLogr;
  }

  // Only assemble street if baseStreet exists
  const fullStreet = baseStreet
    ? formatFullStreetAddress(baseStreet, num, comp, bairro)
    : undefined;

  return {
    companyName,
    tradeName,
    street: fullStreet || undefined,
    city: city || undefined,
    state: state || undefined,
    zip: rawCep ? formatCep(rawCep) : undefined,
  };
}

/**
 * Fetches Brazilian company legal data by CNPJ with multi-provider failover.
 * Primary: BrasilAPI -> Fallback 1: Minha Receita -> Fallback 2: CNPJ.ws
 */
export async function fetchCompanyByCnpj(
  cnpj: string,
  signal?: AbortSignal
): Promise<CnpjCompanyResult | null> {
  const rawCnpj = cnpj.replace(/\D/g, "");
  if (rawCnpj.length !== 14) return null;

  const providers = [
    `https://brasilapi.com.br/api/cnpj/v1/${rawCnpj}`,
    `https://minhareceita.org/${rawCnpj}`,
    `https://publica.cnpj.ws/cnpj/${rawCnpj}`,
  ];

  for (const url of providers) {
    try {
      const res = await fetchWithSignalTimeout(url, 4500, signal);
      if (res.ok) {
        const data = await res.json();
        const parsed = parseCompanyData(data);
        if (parsed) {
          // If street is missing/empty but CEP is available, enrich with CEP lookup
          if (parsed.zip && !parsed.street) {
            try {
              const cepResult = await fetchAddressByCep(parsed.zip, signal);
              if (cepResult) {
                const num = safeString(data.numero || data.estabelecimento?.numero);
                const comp = safeString(data.complemento || data.estabelecimento?.complemento);
                const bairro = safeString(data.bairro || data.estabelecimento?.bairro);
                if (cepResult.street) {
                  parsed.street = formatFullStreetAddress(cepResult.street, num, comp, bairro);
                }
                if (cepResult.city && !parsed.city) parsed.city = cepResult.city;
                if (cepResult.state && !parsed.state) parsed.state = cepResult.state;
              }
            } catch {
              // Ignore inner CEP failure
            }
          }
          return parsed;
        }
      }
    } catch {
      // Failover to next provider
    }
  }

  return null;
}
