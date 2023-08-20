import type { InitOptions, i18n } from 'i18next';

import initCenturyFormatter from './formatters/century';

export const fallbackLng = 'en';
export const languages: Languages[] = [fallbackLng, 'de', 'ru'];
export const defaultNS = 'translation';

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
