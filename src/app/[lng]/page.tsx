import Header from '@components/Header';
import useTranslation from '@i18n/server';

export default async function Home({ params: { lng } }: PageProps) {
  const { t } = await useTranslation(lng, 'home');
  return (
    <>
      <Header lng={lng} />
      <div className="bg-white px-6 py-16 sm:py-24 md:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('title')}
          </h1>
        </div>
      </div>
    </>
  );
}
