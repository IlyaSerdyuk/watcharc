import { db } from '@services/Db';

import { BRAND_FIRST_NUMBER, BrandList } from './types';

/**
 * Получить бренды, начинающиеся на конкретную букву или любое число.
 */
export default async function getListByFirstLetter(letter: string) {
  const q = db.brandAliases
    .select('brand_aliases.id', 'brand_aliases.title', 'brands.alias')
    .innerJoin('brands', 'brands.id', 'brand_aliases.brand_id')
    .orderBy('brand_aliases.title');
  const rows = await (letter === BRAND_FIRST_NUMBER
    ? q.where('brand_aliases.title', 'regexp', '^[0-9]')
    : q.where('brand_aliases.title', 'like', `${letter}%`));
  return rows as BrandList;
}
