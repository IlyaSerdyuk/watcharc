import type { Metadata } from 'next';

import Title from '@components/Title';
import translate from '@i18n/server';
import getAlphabetIndex from '@models/brand/getAlphabetIndex';
import getIndex from '@models/country/getIndex';
import { metaLangs } from '@services/meta';

import SectionByCountry from './_components/SectionByCountry';
import SectionByFirstLetter from './_components/SectionByFirstLetter';
import SectionByOther from './_components/SectionByOther';

export async function generateMetadata({
  params: { lng },
}: PageProps): Promise<Metadata> {
  const { t } = await translate(lng);
  return {
    title: t('brands'),
    alternates: {
      languages: metaLangs('/brand'),
    },
  };
}

export default async function BrandPage({ params: { lng } }: PageProps) {
  const { t } = await translate(lng);
  const [alphabetIndex, countriesIndex] = await Promise.all([
    getAlphabetIndex(),
    getIndex(lng),
  ]);
  return (
    <>
      <Title title={t('brands')} />
      <SectionByFirstLetter lng={lng} alphabet={alphabetIndex} />
      <SectionByCountry lng={lng} countries={countriesIndex} />
      <SectionByOther lng={lng} />
    </>
  );
}
