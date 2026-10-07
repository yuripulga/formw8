/**
 * Brazilian Public Data Integration (ViaCEP & BrasilAPI & Minha Receita)
 * Provides 100% free, client-side, CORS-enabled auto-fill for CEP and CNPJ.
 */

export interface CepAddressResult {
  street?: string;
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
  if (cleanNum.toUpperCase() === "SN" || cleanNum.toUpperCase() === "SEM NUMERO" || cleanNum.toUpperCase() === "S/N") {
    cleanNum = "S/N";
  }
  const cleanComp = complemento ? String(complemento).trim() : "";
  const cleanBairro = bairro ? String(bairro).trim() : "";

  let result = cleanLogr;

  // Append number if present
  if (cleanNum) {
    if (!result) {
      result = cleanNum;
    } else {
      // Check if result already ends with exact number
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
 * Fetches Brazilian postal address by CEP.
 * Primary provider: ViaCEP
 * Secondary provider: BrasilAPI (v1 & v2)
 */
export async function fetchAddressByCep(cep: string): Promise<CepAddressResult | null> {
  const digits = cep.replace(/\D/g, "");
  const rawCep = digits.length === 7 ? `0${digits}` : digits;
  if (rawCep.length !== 8) return null;

  // 1. Try ViaCEP
  try {
    const res = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`);
    if (res.ok) {
      const data = await res.json();
      if (!data.erro) {
        const logr = safeString(data.logradouro);
        const bairro = safeString(data.bairro);
        const street = formatFullStreetAddress(logr || bairro, undefined, undefined, logr ? bairro : undefined);

        return {
          street: street || undefined,
          city: safeString(data.localidade) || undefined,
          state: safeString(data.uf).toUpperCase() || undefined,
          zip: formatCep(rawCep),
        };
      }
    }
  } catch {
    // Failover to secondary provider
  }

  // 2. Fallback to BrasilAPI v1
  try {
    const res = await fetch(`https://brasilapi.com.br/api/cep/v1/${rawCep}`);
    if (res.ok) {
      const data = await res.json();
      const logr = safeString(data.street);
      const bairro = safeString(data.neighborhood);
      const street = formatFullStreetAddress(logr || bairro, undefined, undefined, logr ? bairro : undefined);

      return {
        street: street || undefined,
        city: safeString(data.city) || undefined,
        state: safeString(data.state).toUpperCase() || undefined,
        zip: formatCep(rawCep),
      };
    }
  } catch {
    // Both failed
  }

  // 3. Fallback to BrasilAPI v2
  try {
    const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${rawCep}`);
    if (res.ok) {
      const data = await res.json();
      const logr = safeString(data.street);
      const bairro = safeString(data.neighborhood);
      const street = formatFullStreetAddress(logr || bairro, undefined, undefined, logr ? bairro : undefined);

      return {
        street: street || undefined,
        city: safeString(data.city) || undefined,
        state: safeString(data.state).toUpperCase() || undefined,
        zip: formatCep(rawCep),
      };
    }
  } catch {
    // All failed
  }

  return null;
}

/**
 * Fetches Brazilian company legal data by CNPJ.
 * Primary provider: BrasilAPI
 * Secondary provider: Minha Receita
 */
export async function fetchCompanyByCnpj(cnpj: string): Promise<CnpjCompanyResult | null> {
  const rawCnpj = cnpj.replace(/\D/g, "");
  if (rawCnpj.length !== 14) return null;

  // 1. Try BrasilAPI
  try {
    const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${rawCnpj}`);
    if (res.ok) {
      const data = await res.json();
      
      const rawCepFromCnpj = data.cep ? String(data.cep).replace(/\D/g, "") : "";
      const type = safeString(data.descricao_tipo_de_logradouro);
      const rawLogr = safeString(data.logradouro);
      const num = safeString(data.numero);
      const comp = safeString(data.complemento);
      const bairro = safeString(data.bairro);
      
      let baseStreet = "";
      if (type && rawLogr && !rawLogr.toLowerCase().startsWith(type.toLowerCase())) {
        baseStreet = `${type} ${rawLogr}`.trim();
      } else if (rawLogr) {
        baseStreet = rawLogr;
      }

      let city = safeString(data.municipio);
      let state = safeString(data.uf).toUpperCase();

      if (rawCepFromCnpj) {
        const cepResult = await fetchAddressByCep(rawCepFromCnpj);
        if (cepResult) {
          if (cepResult.street) baseStreet = cepResult.street;
          if (cepResult.city) city = cepResult.city;
          if (cepResult.state) state = cepResult.state;
        }
      }

      const fullStreet = formatFullStreetAddress(baseStreet || bairro, num, comp, baseStreet ? bairro : undefined);

      return {
        companyName: safeString(data.razao_social) || safeString(data.nome_fantasia) || undefined,
        tradeName: safeString(data.nome_fantasia) || undefined,
        street: fullStreet || undefined,
        city: city || undefined,
        state: state || undefined,
        zip: rawCepFromCnpj ? formatCep(rawCepFromCnpj) : undefined,
      };
    }
  } catch {
    // Failover to secondary provider
  }

  // 2. Fallback to Minha Receita
  try {
    const res = await fetch(`https://minhareceita.org/${rawCnpj}`);
    if (res.ok) {
      const data = await res.json();
      
      const rawCepFromCnpj = data.cep ? String(data.cep).replace(/\D/g, "") : "";
      const type = safeString(data.descricao_tipo_de_logradouro);
      const rawLogr = safeString(data.logradouro);
      const num = safeString(data.numero);
      const comp = safeString(data.complemento);
      const bairro = safeString(data.bairro);

      let baseStreet = "";
      if (type && rawLogr && !rawLogr.toLowerCase().startsWith(type.toLowerCase())) {
        baseStreet = `${type} ${rawLogr}`.trim();
      } else if (rawLogr) {
        baseStreet = rawLogr;
      }

      let city = safeString(data.municipio);
      let state = safeString(data.uf).toUpperCase();

      if (rawCepFromCnpj) {
        const cepResult = await fetchAddressByCep(rawCepFromCnpj);
        if (cepResult) {
          if (cepResult.street) baseStreet = cepResult.street;
          if (cepResult.city) city = cepResult.city;
          if (cepResult.state) state = cepResult.state;
        }
      }

      const fullStreet = formatFullStreetAddress(baseStreet || bairro, num, comp, baseStreet ? bairro : undefined);

      return {
        companyName: safeString(data.razao_social) || safeString(data.nome_fantasia) || undefined,
        tradeName: safeString(data.nome_fantasia) || undefined,
        street: fullStreet || undefined,
        city: city || undefined,
        state: state || undefined,
        zip: rawCepFromCnpj ? formatCep(rawCepFromCnpj) : undefined,
      };
    }
  } catch {
    // Both failed
  }

  return null;
}
