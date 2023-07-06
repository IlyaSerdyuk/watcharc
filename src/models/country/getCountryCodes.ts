import { db } from '@services/Db';

/**
 * Получить список кодов стран.
 */
export default async function getCountryCodes() {
  const rows = await db.countries.select('code');
  return rows;
}
