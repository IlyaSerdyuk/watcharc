import { db } from '@services/Db';

import type { CountryType } from '../country/types';
import type { BrandLinkType, BrandType } from './types';

type Type = BrandType & {
  countries: Pick<CountryType, 'title' | 'code'>[];
  countriesOfOrigin: Pick<CountryType, 'title' | 'code'>[];
  links: BrandLinkType[];
};

export default async function getByCode(
  alias: string,
  lng: Languages,
): Promise<Type | undefined> {
  const brand = await db.brands.select('*').where('alias', '=', alias).first();
  if (!brand) {
    return undefined;
  }

  const countries = await db.countries
    .select({
      title: `countries.title_${lng}`,
      code: 'countries.code',
      type: 'brands__countries.type',
    })
    .innerJoin(
      'brands__countries',
      'brands__countries.country_id',
      'countries.id',
    )
    .where('brands__countries.brand_id', '=', brand.id);
  const links = await db.brandLinks
    .where('brand_id', '=', brand.id)
    .orderBy('type');

  return {
    ...(brand as BrandType),
    countries: countries.filter(({ type }) => type === 'current'),
    countriesOfOrigin: countries.filter(({ type }) => type === 'founded'),
    links,
  };
}
