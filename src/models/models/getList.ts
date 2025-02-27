import { db } from '@services/Db';

import type { ModelType } from './types';

export default async function getList(brandId: number): Promise<ModelType[]> {
  const models = await db.models
    .select('*')
    .where('brand_id', '=', brandId)
    .orderBy('reference', 'asc');
  return models || [];
}
