import Link from 'next/link';

import Breadcrumbs from '@components/Breadcrumbs';
import Title from '@components/Title';
import centuryHelper from '@i18n/centuryHelper';
import useTranslation from '@i18n/server';
import getFoundedIndex from '@models/brand/getFoundedIndex';

export async function generateMetadata({ params: { lng } }: PageProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);
  return {
    title: t('brands-founded'),
  };
}

const urlHelper = (lng: Languages, century: string, decade: string) => {
  const prefix = '/brands/founded/';
  const path =
    decade === 'unknown' ? `${century}xx` : `${decade.substring(0, 3)}x`;
  return `${prefix}${path}`;
};

export default async function FoundedIndexPage({ params: { lng } }: PageProps) {
  const { t } = await useTranslation(lng);
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
                    {centuryHelper(lng, Number(century) + 1)}
                  </div>
                  <div className="text font-medium leading-6 text-gray-500">
                    {t('century')}
                  </div>
                </div>
                <div className="flex-1 flex flex-wrap gap-2">
                  {Object.entries(decades).map(([decade, number]) => (
                    <Link
                      key={decade}
                      href={urlHelper(lng, century, decade)}
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
