import type { Metadata } from 'next';

import Header from '@components/Header';
import translate from '@i18n/server';
import getStatistics from '@models/getStatistics';
import { metaLangs } from '@services/meta';

import ContactForm from './ContactForm';

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      languages: metaLangs(''),
    },
  };
}

export default async function Home({ params: { lng } }: PageProps) {
  const { t } = await translate(lng, 'home');
  const stats = await getStatistics();
  return (
    <>
      <Header lng={lng} />
      <div className="bg-white px-6 pt-16 sm:pt-24 md:pt-32 pb-10 sm:pb-18 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {t('title')}
          </h1>
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="mt-6 flex flex-col gap-8 lg:flex-row">
              <div className="lg:flex lg:flex-auto lg:justify-center lg:order-last">
                <dl className="flex space-y-8 gap-x-16 justify-center lg:block lg:w-64 xl:w-80">
                  {stats.map(stat => (
                    <div
                      key={stat.label}
                      className="flex flex-col-reverse gap-y-4 text-center lg:text-left"
                    >
                      <dt className="text-base leading-7 text-gray-600">
                        {t(stat.label, { count: stat.value })}
                      </dt>
                      <dd className="text-5xl font-semibold tracking-tight text-gray-900">
                        {t('number', { value: stat.value })}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                <p className="text-lg leading-8 text-gray-600">
                  {t('import-sources', { unescapeHtmlEntity: true })}
                </p>
                <p className="mt-10 text-lg leading-8 text-gray-600">
                  {t('import-status')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactForm lng={lng} />
    </>
  );
}
