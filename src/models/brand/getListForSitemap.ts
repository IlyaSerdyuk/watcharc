import { db } from '@services/Db';

export default async function getListForSitemap() {
  const rows = await db.brands.column('alias').whereNotNull('alias');
  return rows;
}
