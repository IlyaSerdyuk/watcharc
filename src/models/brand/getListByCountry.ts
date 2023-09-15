import { db } from '@services/Db';

import type { CountryType } from '../country/types';
import mapBrandListToGroups from './mapBrandListToGroups';
import type { BrandList } from './types';

/**
 * Получить бренды, связанные с конкретной страной.
 */
export default async function getListByCountry(country: CountryType) {
  const q = db.brands
    .distinct()
    .select(['brands.id', 'brands.title', 'brands.alias'])
    .innerJoin('brands__countries AS bc', 'bc.brand_id', 'brands.id')
    .where('bc.country_id', '=', country.id)
    .orderBy('brands.title');
  const rows = (await q) as BrandList;
  return mapBrandListToGroups(rows);
}
