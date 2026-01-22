import { db } from '@services/Db';

export interface ISearchBrand {
  key: number;
  url: string;
  title: string;
  qualification: string | null;
}

export interface ISearchResult {
  items: ISearchBrand[];
  total: number;
}

/**
 * Найти бренд по подстроке названия
 *
 * @todo Доработать для поддержки нечеткого поиска (включая расширенную латиницу)
 */
export default async function searchBrands(
  term: string,
): Promise<ISearchResult> {
  const baseQuery = db.brandAliases
    .select({
      label: db.knex.raw(
        'CONCAT_WS(" ", brand_aliases.title_prefix, brand_aliases.title, brand_aliases.title_postfix)',
      ),
    })
    .innerJoin('brands', 'brands.id', 'brand_aliases.brand_id')
    .groupBy('brands.id', 'label')
    .having('label', 'like', `%${term}%`)
    .whereNotNull('brands.alias');

  const totalQuery = db.knex.from(baseQuery.as('sub')).count('label as total');
  const [{ total }] = await totalQuery;

  const listQuery = baseQuery
    .select({
      key: db.knex.raw('MIN(brand_aliases.id)'),
      alias: 'brands.alias',
      qualification: db.knex.raw(
        'GROUP_CONCAT(DISTINCT brand_aliases.qualification)',
      ),
    })
    .orderByRaw(`CASE WHEN label LIKE "${term}%" THEN 0 ELSE 1 END`)
    .orderBy('label')
    .limit(10);

  const rows = (await listQuery) as Array<{
    key: number;
    alias: string;
    label: string;
    qualification: string | null;
  }>;
  return {
    items: rows.map(row => ({
      key: row.key,
      url: `/brand/${row.alias}`,
      title: row.label,
      qualification: row.qualification,
    })),
    total,
  };
}
