import { db } from '@services/Db';

import { CountryType } from '../country/types';

/**
 * Получить бренды, связанные с конкретной страной.
 */
export default async function getListByCountry(country: CountryType) {
  const rows = await db.brands
    .innerJoin('brands__countries AS bc', 'bc.brand_id', 'brands.id')
    .where('bc.country_id', '=', country.id)
    .orderBy('brands.title');
  return rows;
}
