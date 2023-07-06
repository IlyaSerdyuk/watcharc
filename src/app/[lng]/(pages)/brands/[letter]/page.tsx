import Breadcrumbs from '@components/Breadcrumbs';
import Title from '@components/Title';
import useTranslation from '@i18n/server';
import getListByFirstLetter from '@models/brand/getListByFirstLetter';
import { BRAND_FIRST_NUMBER } from '@models/brand/types';

type LetterPageProps = PageProps<{
  letter: string;
}>;

export function generateStaticParams() {
  return 'abcdefghijklmnopqrstuvwxyz8'.split('').map(letter => ({ letter }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params: { lng, letter },
}: LetterPageProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);
  return {
    title:
      letter === BRAND_FIRST_NUMBER
        ? t('brands-by-first-number')
        : t('brands-by-first-letter', { letter: letter.toUpperCase() }),
  };
}

export default async function LetterPage({
  params: { lng, letter },
}: LetterPageProps) {
  const { t } = await useTranslation(lng);
  const brands = await getListByFirstLetter(letter);
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
      <ul className="md:columns-2 lg:columns-3 xl:columns-4 space-y-2 mt-6">
        {brands.map(brand => (
          <li key={brand.id}>{brand.title}</li>
        ))}
      </ul>
    </>
  );
}
