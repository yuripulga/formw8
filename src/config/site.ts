/**
 * Canonical public origin of the site (no trailing slash).
 * Forks and alternate deployments can override it via NEXT_PUBLIC_SITE_URL.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://formw8.quimera.biz"
).replace(/\/+$/, "");

export const SITE_HOST = new URL(SITE_URL).host;
