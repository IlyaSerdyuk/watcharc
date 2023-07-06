import { db } from '@services/Db';

import { CountryType } from './types';

/**
 * Получить страну по коду.
 */
export default async function getByCode(
  code: string,
  lng: string,
): Promise<CountryType | undefined> {
  const row = await db.countries
    .select({ title: `title_${lng}` })
    .columns('id', 'code')
    .where({ code })
    .first();
  return row;
}
