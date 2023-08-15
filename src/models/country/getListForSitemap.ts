import { db } from '@services/Db';

/**
 * Получить список кодов стран, для которых есть связанные бренды.
 */
export default async function getListForSitemap() {
  const rows = await db.countries
    .column('countries.code')
    .innerJoin('brands__countries AS bc', 'bc.country_id', 'countries.id')
    .groupBy('countries.code');
  return rows;
}
