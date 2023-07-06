import { db } from '@services/Db';

/**
 * Получить список стран с числом связанных брендов.
 */
export default async function getIndex(lng: Languages) {
  const rows = await db.countries
    .select({
      code: 'countries.code',
      title: `countries.title_${lng}`,
      number: db.knex.raw('COUNT(*)'),
    })
    .innerJoin('brands__countries AS bc', 'bc.country_id', 'countries.id')
    .groupBy('countries.id')
    .orderBy(`countries.title_${lng}`);
  return rows;
}
