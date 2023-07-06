import { YearAccuracy, db } from '@services/Db';

/**
 * Получить карту по датам основания.
 *
 * @return Record<столетие, Record<десятилетие, количество>>
 */
export default async function getFoundedIndex() {
  const rows: Array<{
    decade: number;
    number: number;
    year_founded_accuracy: YearAccuracy;
  }> = await db.brands
    .select({
      decade: db.knex.raw('FLOOR(year_founded / 10) * 10'),
      number: db.knex.raw('COUNT(*)'),
    })
    .column('year_founded_accuracy')
    .whereNotNull('year_founded')
    .groupBy(['decade', 'year_founded_accuracy']);

  return rows.reduce<
    Record<string, Partial<Record<number | 'unknown', number>>>
  >((map, row) => {
    const century = Math.floor(row.decade / 100);
    if (!map[century]) {
      map[century] = {}; // eslint-disable-line no-param-reassign
    }
    const decade =
      row.decade === null || row.year_founded_accuracy === YearAccuracy.Century
        ? 'unknown'
        : row.decade;
    // eslint-disable-next-line no-param-reassign
    map[century][decade] = row.number + (map[century][decade] || 0);
    return map;
  }, {});
}
