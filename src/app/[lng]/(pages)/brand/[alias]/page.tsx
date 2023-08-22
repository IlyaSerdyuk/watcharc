import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Breadcrumbs from '@components/Breadcrumbs';
import Title from '@components/Title';
import translate from '@i18n/server';
import getDetails from '@models/brand/getDetails';
import { metaLangs } from '@services/meta';

import InfoBox from './_components/InfoBox/InfoBox';
import ListOfReferences from './_components/ListOfReferences';

type BrandPageProps = PageProps<{
  alias: string;
}>;

// К сожалению, с generateStaticParams при 4К брендов сборка проекта
// обрывается ошибкой по памяти.
// Вернемся к предварительному кешированию страниц брендов позднее.

export const revalidate = 3600;

export async function generateMetadata({
  params: { lng, alias },
}: BrandPageProps): Promise<Metadata | null> {
  const brand = await getDetails(alias, lng);
  if (!brand) {
    return null;
  }

  return {
    title: brand.title,
    alternates: {
      languages: metaLangs(`/brand/${alias}`),
    },
  };
}

export default async function BrandPage({
  params: { lng, alias },
}: BrandPageProps) {
  const { t } = await translate(lng, ['brand', 'translation']);
  const brand = await getDetails(alias, lng);
  if (!brand) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        lng={lng}
        pages={[{ title: t('nav-brands'), href: '/brands' }]}
      />
      <Title title={brand.title} />
      <InfoBox brand={brand} t={t} lng={lng} />
      <ListOfReferences links={brand.links} t={t} />
    </>
  );
}
