import type { InitOptions, i18n } from 'i18next';

import initCenturyFormatter from './formatters/century';

export const fallbackLng = 'en';
export const languages: Languages[] = [fallbackLng, 'de', 'fr', 'ru'];
export const defaultNS = 'translation';

export const languageLabels: Record<Languages, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  ru: 'Русский',
};

export function getOptions(
  lng = fallbackLng,
  ns: string | string[] = defaultNS,
): InitOptions {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}

export function expandI18n(i18nInstance: i18n) {
  initCenturyFormatter(i18nInstance);
}
