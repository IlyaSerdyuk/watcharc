import { db } from '@services/Db';

/**
 * Получить статистику по базе для главной страницы.
 */
export default async function forHome() {
  const [brands, countries] = await Promise.all([
    db.brands.count('* AS count').first<{ count: string }>(),
    db.brandsCountries
      .countDistinct('country_id AS count')
      .first<{ count: string }>(),
  ]);
  return [
    { label: 'brands', value: +brands.count },
    { label: 'countries', value: +countries.count },
  ];
}
