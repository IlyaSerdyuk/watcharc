import { db } from '@services/Db';

import type { BrandType } from './types';

export type BrandMetadata = Pick<BrandType, 'id' | 'title'> & {
  alias: Exclude<BrandType['alias'], null>;
};

export default async function getMetadata(
  alias: string,
): Promise<BrandMetadata | undefined> {
  const brand = await db.brands
    .select(['id', 'title', 'alias'])
    .where('alias', '=', alias)
    .first();
  return brand as BrandMetadata | undefined;
}
