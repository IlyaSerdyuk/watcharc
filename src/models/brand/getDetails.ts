import type { ModelType } from '@models/models/types';
import { db } from '@services/Db';

import type { CountryType } from '../country/types';
import type { BrandLinkType, BrandType } from './types';

export type BrandCartType = BrandType & {
  alias: Exclude<BrandType['alias'], null>;
  countries: Pick<CountryType, 'title' | 'code'>[];
  countriesOfOrigin: Pick<CountryType, 'title' | 'code'>[];
  links: BrandLinkType[];
  models: ModelType[];
};

export default async function getByCode(
  alias: string,
  lng: Languages,
): Promise<BrandCartType | undefined> {
  const brand = await db.brands.select('*').where('alias', '=', alias).first();
  if (!brand) {
    return undefined;
  }

  const [countries, links, models] = await Promise.all([
    db.countries
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
      .where('brands__countries.brand_id', '=', brand.id),
    db.brandLinks.where('brand_id', '=', brand.id).orderBy('type'),
    db.models.where('brand_id', '=', brand.id).limit(8),
  ]);

  return {
    ...(brand as BrandType),
    countries: countries.filter(({ type }) => type === 'current'),
    countriesOfOrigin: countries.filter(({ type }) => type === 'founded'),
    links,
    models,
  } as BrandCartType;
}
