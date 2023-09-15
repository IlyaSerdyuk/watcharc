import { db } from '@services/Db';
import { YearAccuracy } from '@services/year';

import mapBrandListToGroups from './mapBrandListToGroups';

/**
 * Получить бренды, основанные в конкретное десятилетие или в столетие с неизвестным десятилетием.
 */
export default async function getListByFounded(decade: string) {
  const q = db.brands
    .select(['id', 'title', 'alias', 'year_founded', 'year_founded_accuracy'])
    .orderBy('title');
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
  return mapBrandListToGroups(rows);
}
