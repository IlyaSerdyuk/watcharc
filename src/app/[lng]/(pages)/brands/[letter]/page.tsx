import type { Metadata } from 'next';

import Breadcrumbs from '@components/Breadcrumbs';
import Title from '@components/Title';
import translate from '@i18n/server';
import getListByFirstLetter from '@models/brand/getListByFirstLetter';
import { BRAND_FIRST_NUMBER } from '@models/brand/types';
import { metaLangs } from '@services/meta';

import BrandLink from '../_components/BrandLink';

type LetterPageProps = PageProps<{
  letter: string;
}>;

export function generateStaticParams() {
  return 'abcdefghijklmnopqrstuvwxyz8'.split('').map(letter => ({ letter }));
}

export const dynamicParams = false;
export const revalidate = 3600;

export async function generateMetadata({
  params: { lng, letter },
}: LetterPageProps): Promise<Metadata> {
  const { t } = await translate(lng);
  return {
    title:
      letter === BRAND_FIRST_NUMBER
        ? t('brands-by-first-number')
        : t('brands-by-first-letter', { letter: letter.toUpperCase() }),
    alternates: {
      languages: metaLangs(`/brands/${letter}`),
    },
  };
}

export default async function LetterPage({
  params: { lng, letter },
}: LetterPageProps) {
  const { t } = await translate(lng);
  const brandGroupedList = await getListByFirstLetter(letter);
  return (
    <>
      <Breadcrumbs
        lng={lng}
        pages={[{ title: t('nav-brands'), href: '/brands' }]}
      />
      <Title
        title={
          letter === BRAND_FIRST_NUMBER
            ? t('brands-by-first-number')
            : t('brands-by-first-letter', { letter: letter.toUpperCase() })
        }
      />
      <div className="md:columns-2 lg:columns-3 xl:columns-4 space-y-4 mt-6">
        {Array.from(brandGroupedList).map(([secondLetter, brands]) => (
          <div className="flex break-inside-avoid-column" key={secondLetter}>
            <div className="font-bold w-8">
              {letter === BRAND_FIRST_NUMBER
                ? brands[0].title[0]
                : secondLetter && `${letter.toUpperCase()}${secondLetter}`}
            </div>
            <ul className="space-y-2">
              {brands.map(brand => (
                <li key={brand.id}>
                  <BrandLink brand={brand} t={t} lng={lng}>
                    {brand.title_prefix && (
                      <span className="text-gray-500">
                        {`${brand.title_prefix} `}
                      </span>
                    )}
                    <span>{brand.title}</span>
                    {brand.title_postfix && (
                      <span className="text-gray-500">
                        {` ${brand.title_postfix}`}
                      </span>
                    )}
                    {brand.qualification && (
                      <span className="text-sm text-gray-500">
                        {` (${brand.qualification})`}
                      </span>
                    )}
                  </BrandLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
