import { YearAccuracy, db } from '@services/Db';

import { BrandType } from './types';

/**
 * Получить бренды, основанные в конкретное десятилетие или в столетие с неизвестным десятилетием.
 */
export default async function getListByFounded(
  decade: string,
): Promise<BrandType[]> {
  const q = db.brands.orderBy('title');
  if (decade === 'unknown') {
    q.whereNull('year_founded');
  } else if (decade[2] === 'x') {
    q.where(
      db.knex.raw('FLOOR(year_founded / 100) * 100'),
      '=',
      decade.replaceAll('x', '0'),
    );
    q.andWhere('year_founded_accuracy', '=', YearAccuracy.Century);
  } else {
    q.where(
      db.knex.raw('FLOOR(year_founded / 10) * 10'),
      '=',
      decade.replace('x', '0'),
    );
    q.andWhere('year_founded_accuracy', '<>', YearAccuracy.Century);
  }
  const rows = await q;
  return rows as BrandType[];
}
