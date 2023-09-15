import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Breadcrumbs from '@components/Breadcrumbs';
import Title from '@components/Title';
import translate from '@i18n/server';
import getListByCountry from '@models/brand/getListByCountry';
import getByCode from '@models/country/getByCode';
import getCountryCodes from '@models/country/getCountryCodes';
import { metaLangs } from '@services/meta';

import BrandLink from '../../_components/BrandLink';

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
export const revalidate = 3600;

export async function generateMetadata({
  params: { lng, country: countryCode },
}: CountryPageProps): Promise<Metadata | null> {
  const { t } = await translate(lng);

  const country = await getByCode(countryCode, lng);
  if (!country) {
    return null;
  }

  return {
    title: `${country.title}. ${t('brands')}`,
    alternates: {
      languages: metaLangs(`/brands/${countryCode}`),
    },
  };
}

export default async function CountryPage({
  params: { lng, country: countryCode },
}: CountryPageProps) {
  const country = await getByCode(countryCode, lng);
  if (!country) {
    notFound();
  }

  const brandGroupedList = await getListByCountry(country);
  const { t } = await translate(lng);

  return (
    <>
      <Breadcrumbs
        lng={lng}
        pages={[{ title: t('nav-brands'), href: '/brands' }]}
      />
      <Title title={`${t('brands-by-country')}. ${country.title}`} />
      <div className="md:columns-2 lg:columns-3 xl:columns-4 space-y-4 mt-6">
        {Array.from(brandGroupedList).map(([firstSymbol, brands]) => (
          <div className="flex break-inside-avoid-column">
            <div className="font-bold w-6">{firstSymbol}</div>
            <ul className="space-y-2">
              {brands.map(brand => (
                <li key={brand.id}>
                  <BrandLink brand={brand} t={t} lng={lng} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
