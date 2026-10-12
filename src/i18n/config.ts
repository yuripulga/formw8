export type Locale = 'pt-BR' | 'en-US';

export const defaultLocale: Locale = 'pt-BR';
export const locales: Locale[] = ['pt-BR', 'en-US'];

/** Native language names shown in the language selector. */
export const localeLabels: Record<Locale, string> = {
  'pt-BR': 'Português',
  'en-US': 'English',
};
