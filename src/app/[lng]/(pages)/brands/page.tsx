import Title from '@components/Title';
import useTranslation from '@i18n/server';
import getAlphabetIndex from '@models/brand/getAlphabetIndex';
import getIndex from '@models/country/getIndex';

import SectionByCountry from './SectionByCountry';
import SectionByFirstLetter from './SectionByFirstLetter';
import SectionByOther from './SectionByOther';

export async function generateMetadata({ params: { lng } }: PageProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);
  return {
    title: t('brands'),
  };
}

export default async function BrandPage({ params: { lng } }: PageProps) {
  const { t } = await useTranslation(lng);
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