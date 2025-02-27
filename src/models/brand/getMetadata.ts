import { db } from '@services/Db';

import type { BrandType } from './types';

export type BrandMetadata = Pick<
  BrandType,
  'id' | 'title' | 'models_settings'
> & {
  alias: NonNullable<BrandType['alias']>;
};

export default async function getMetadata(
  alias: string,
): Promise<BrandMetadata | undefined> {
  const brand = await db.brands
    .select(['id', 'title', 'alias', 'models_settings'])
    .where('alias', '=', alias)
    .first();
  return brand as BrandMetadata | undefined;
}
