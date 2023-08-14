/* eslint-disable import/prefer-default-export */
import { languages } from '@i18n/settings';

export function metaLangs(path: string) {
  return languages.reduce(
    (meta, lng) => ({ ...meta, [lng]: `/${lng}${path}` }),
    {} as Record<Languages, string>,
  );
}
