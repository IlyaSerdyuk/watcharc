import type { Metadata } from 'next';
import Link from 'next/link';

import Breadcrumbs from '@components/Breadcrumbs';
import Title from '@components/Title';
import translate from '@i18n/server';
import decadeUrlHelper from '@models/brand/decadeUrlHelper';
import getFoundedIndex from '@models/brand/getFoundedIndex';
import { metaLangs } from '@services/meta';

export async function generateMetadata({
  params: { lng },
}: PageProps): Promise<Metadata> {
  const { t } = await translate(lng);
  return {
    title: t('brands-founded'),
    alternates: {
      languages: metaLangs('/brands/founded'),
    },
  };
}

export default async function FoundedIndexPage({ params: { lng } }: PageProps) {
  const { t } = await translate(lng);
  const items = await getFoundedIndex();
  return (
    <>
      <Breadcrumbs
        lng={lng}
        pages={[{ title: t('nav-brands'), href: '/brands' }]}
      />
      <Title title={t('brands-founded')} />
      <section className="mt-4 space-y-4">
        {Object.entries(items).map(
          ([century, decades]) =>
            century !== '0' && (
              <div
                key={century}
                className="flex flex-col xs:flex-row gap-y-2 gap-x-5"
              >
                <div className="py-2.5">
                  <div className="text-3xl font-medium leading-10 tracking-tight text-gray-900">
                    {t('century.number', { value: Number(century) + 1 })}
                  </div>
                  <div className="text font-medium leading-6 text-gray-500">
                    {t('century.dimension')}
                  </div>
                </div>
                <div className="flex-1 flex flex-wrap gap-2">
                  {Object.entries(decades).map(([decade, number]) => (
                    <Link
                      key={decade}
                      href={decadeUrlHelper(century, decade, lng)}
                      className="bg-gray-400/5 hover:bg-gray-900/5 focus:bg-gray-900/5 w-28 px-6 py-4 space-y-2 text-center"
                    >
                      <div className="text-lg font-semibold tracking-tight text-gray-900">
                        {decade !== 'unknown'
                          ? `${String(decade).substring(0, 3)}x`
                          : `${century}xx`}
                      </div>
                      <div className="text-sm font-semibold leading-6 text-gray-600">
                        {number}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ),
        )}
      </section>
    </>
  );
}
