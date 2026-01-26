import { db } from '@services/Db';

import type { ModelType } from './types';

export default async function getList(
  brandId: number,
  collectionId: number = 0,
): Promise<ModelType[]> {
  const query = db.models
    .select('*')
    .where('brand_id', '=', brandId)
    .orderBy('order_in_brand', 'desc');
  if (collectionId) {
    query.andWhere('collection_id', '=', collectionId);
  }
  const models = await query;
  return models || [];
}
