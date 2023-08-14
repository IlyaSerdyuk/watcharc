import type { TFunction } from 'i18next';
import type { Metadata } from 'next';

import Breadcrumbs from '@components/Breadcrumbs';
import Title from '@components/Title';
import centuryHelper from '@i18n/centuryHelper';
import useTranslation from '@i18n/server';
import getListByFounded from '@models/brand/getListByFounded';
import { YearAccuracy } from '@services/Db';
import { metaLangs } from '@services/meta';

type DecadePageProps = PageProps<{
  decade: string;
}>;

function title(t: TFunction, lng: Languages, decade: string) {
  return decade.charAt(2) === 'x'
    ? t('brands-by-founded.century', {
        century: centuryHelper(lng, Number(decade.substring(0, 2)) + 1),
      })
    : t('brands-by-founded.decade', { decade: decade.replaceAll('x', '0') });
}

export async function generateMetadata({
  params: { lng, decade },
}: DecadePageProps): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);
  return {
    title: title(t, lng, decade),
    alternates: {
      languages: metaLangs(`/brands/founded/${decade}`),
    },
  };
}

export default async function DecadePage({
  params: { lng, decade },
}: DecadePageProps) {
  const { t } = await useTranslation(lng);
  const brands = await getListByFounded(decade);
  return (
    <>
      <Breadcrumbs
        lng={lng}
        pages={[
          { title: t('nav-brands'), href: '/brands' },
          { title: t('by-founded'), href: '/brands/founded' },
        ]}
      />
      <Title title={title(t, lng, decade)} />
      <ul className="md:columns-2 lg:columns-3 xl:columns-4 space-y-2 mt-6">
        {brands.map(brand => (
          <li key={brand.id} className="flex gap-2">
            <div className="leading-6">{brand.title}</div>
            {brand.year_founded_accuracy !== YearAccuracy.Century ? (
              <div className="text-sm leading-6 font-medium text-gray-500">
                {brand.year_founded_accuracy === YearAccuracy.Year
                  ? brand.year_founded
                  : `${String(brand.year_founded).substring(0, 3)}x`}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
}
