import Title from '@components/Title';
import useTranslation from '@i18n/server';
import getAlphabetIndex from '@models/brand/getAlphabetIndex';

import SectionByFirstLetter from './SectionByFirstLetter';

export async function generateMetadata({ params: { lng } }: PageProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);
  return {
    title: t('brands'),
  };
}

export default async function BrandPage({ params: { lng } }: PageProps) {
  const { t } = await useTranslation(lng);
  const alphabetIndex = await getAlphabetIndex();
  return (
    <>
      <Title title={t('brands')} />
      <SectionByFirstLetter lng={lng} alphabet={alphabetIndex} />
    </>
  );
}
