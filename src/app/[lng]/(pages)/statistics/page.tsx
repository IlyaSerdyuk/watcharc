import type { Metadata } from 'next';

import Title from '@components/Title';
import translate from '@i18n/server';
import getStatistics from '@models/statistics/getDetailed';
import { metaLangs } from '@services/meta';

export const revalidate = 86400;

export async function generateMetadata({
  params: { lng },
}: PageProps): Promise<Metadata> {
  const { t } = await translate(lng, 'statistics');
  return {
    title: t('title'),
    alternates: {
      languages: metaLangs(`/statistics`),
    },
  };
}

export default async function StatisticsPage({ params: { lng } }: PageProps) {
  const { t } = await translate(lng, 'statistics');
  const stats = await getStatistics();
  const date = new Date();
  return (
    <>
      <Title title={t('title')} />
      <div className="my-6 text-3xl font-semibold tracking-tight text-gray-900 text-center">
        {
          // eslint-disable-next-line no-irregular-whitespace
          `${t('total')} ${t('number', { value: stats.brands })} ${t('brands', {
            count: stats.brands,
          })}` +
            // eslint-disable-next-line no-irregular-whitespace
            ` ${t('from')} ${t('number', { value: stats.countries })} ${t(
              'countries',
              { count: stats.countries },
            )}`
        }
      </div>
      <dl className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {stats.details.map(({ label, absolute, percentage }) => (
          <div key={label} className="flex flex-col bg-gray-400/5 p-8">
            <dt className="text-sm font-semibold leading-6 text-gray-600">
              {t(`details.${label}`)}
            </dt>
            <dd className="order-first">
              <div className="text-3xl font-semibold tracking-tight text-gray-900 m-3">
                {t('number', { value: absolute })}
              </div>
              <div className="text-2xl font-semibold tracking-tight text-gray-700 m-3">
                {percentage}%
              </div>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-sm font-medium text-gray-500">
        {t('current-at', {
          value: date,
          formatParams: {
            value: {
              dateStyle: 'short',
              timeStyle: 'long',
            },
          },
        })}
      </p>
    </>
  );
}
