import { db } from '@services/Db';

import type { BrandList } from './types';
import { BRAND_FIRST_NUMBER } from './types';

/**
 * Получить бренды, начинающиеся на конкретную букву или любое число.
 */
export default async function getListByFirstLetter(letter: string) {
  const q = db.brandAliases
    .select(
      'brand_aliases.id',
      'brand_aliases.title',
      'brand_aliases.qualification',
      'brands.alias',
    )
    .innerJoin('brands', 'brands.id', 'brand_aliases.brand_id')
    .orderBy('brand_aliases.title');
  if (letter === BRAND_FIRST_NUMBER) {
    q.where('brand_aliases.title', 'like', '0%');
    for (let number = 1; number < 10; number++) {
      q.orWhere('brand_aliases.title', 'like', `${number}%`);
    }
  } else {
    q.where('brand_aliases.title', 'like', `${letter}%`);
  }
  const rows = await q; 
  return rows as BrandList;
}
