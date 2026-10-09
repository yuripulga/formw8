/**
 * Public contact channel for partnerships and sponsorships.
 * Forks can override it via NEXT_PUBLIC_CONTACT_EMAIL.
 */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@quimera.biz";

export const SPONSOR_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Parceria%20e%20Patrocinio%20FormW8`;
