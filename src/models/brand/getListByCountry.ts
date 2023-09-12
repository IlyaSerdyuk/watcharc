import { db } from '@services/Db';

import type { CountryType } from '../country/types';
import type { BrandList } from './types';

/**
 * Получить бренды, связанные с конкретной страной.
 */
export default async function getListByCountry(country: CountryType) {
  const rows = await db.brands
    .distinct()
    .select(['brands.id', 'brands.title', 'brands.alias'])
    .innerJoin('brands__countries AS bc', 'bc.brand_id', 'brands.id')
    .where('bc.country_id', '=', country.id)
    .orderBy('brands.title');
  return rows as BrandList;
}
