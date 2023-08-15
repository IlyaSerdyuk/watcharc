import { db } from '@services/Db';

import type { CountryType } from './types';

/**
 * Получить страну по коду.
 */
export default async function getByCode(
  code: string,
  lng: Languages,
): Promise<CountryType | undefined> {
  const row = await db.countries
    .select({ title: `title_${lng}` })
    .columns('id', 'code')
    .where({ code })
    .first();
  return row;
}
