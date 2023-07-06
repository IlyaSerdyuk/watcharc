import useTranslation from '@i18n/server';
import { db } from '@services/Db';

export default async function Home({ params: { lng } }: PageProps) {
  const { t } = await useTranslation(lng);
  const brands = await db.brands.limit(10);
  return (
    <main>
      <p>{t('brands')}</p>
      <ul>
        {brands.map(brand => (
          <li key={brand.id}>{brand.title}</li>
        ))}
      </ul>
    </main>
  );
}
