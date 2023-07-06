import { db } from '@services/Db';

import { BRAND_FIRST_NUMBER } from './types';

/**
 * Получить бренды, начинающиеся на конкретную букву или любое число.
 */
export default async function getListByFirstLetter(letter: string) {
  const q = db.brands.orderBy('title');
  const rows = await (letter === BRAND_FIRST_NUMBER
    ? q.where('title', 'regexp', '^[0-9]')
    : q.where('title', 'like', `${letter}%`));
  return rows;
}
