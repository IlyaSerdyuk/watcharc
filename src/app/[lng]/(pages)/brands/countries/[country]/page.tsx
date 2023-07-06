import { notFound } from 'next/navigation';

import Breadcrumbs from '@components/Breadcrumbs';
import Title from '@components/Title';
import useTranslation from '@i18n/server';
import getListByCountry from '@models/brand/getListByCountry';
import getByCode from '@models/country/getByCode';
import getCountryCodes from '@models/country/getCountryCodes';

type CountryPageProps = PageProps<{
  country: string;
}>;

export async function generateStaticParams() {
  const countryCodes = await getCountryCodes();
  return countryCodes.map(({ code }) => ({ country: code }));
}

// Для упрощения генерируем пути для всех стран в базе без учета наличия связанных стран
// Частота появления новых кодов стран несоизмеримо ниже частоты релизов сайта
export const dynamicParams = false;

export async function generateMetadata({
  params: { lng, country: countryCode },
}: CountryPageProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);

  const country = await getByCode(countryCode, lng);
  if (!country) {
    return null;
  }

  return {
    title: `${country.title}. ${t('brands')}`,
  };
}

export default async function CountryPage({
  params: { lng, country: countryCode },
}: CountryPageProps) {
  const country = await getByCode(countryCode, lng);
  if (!country) {
    notFound();
  }

  const brands = await getListByCountry(country);
  const { t } = await useTranslation(lng);

  return (
    <>
      <Breadcrumbs
        lng={lng}
        pages={[{ title: t('nav-brands'), href: '/brands' }]}
      />
      <Title title={`${t('brands-by-country')}. ${country.title}`} />
      <ul className="md:columns-2 lg:columns-3 xl:columns-4 space-y-2 mt-6">
        {brands.map(brand => (
          <li key={brand.id}>{brand.title}</li>
        ))}
      </ul>
    </>
  );
}
