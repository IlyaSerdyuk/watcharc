import useTranslation from '@i18n/server';

export default async function Footer({ lng }: { lng: Languages }) {
  const { t } = await useTranslation(lng);
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        {t('footer')}
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="border-t border-gray-900/10 pt-8">
          <p className="text-xs leading-5 text-gray-500">{t('privacy-info')}</p>
        </div>
      </div>
    </footer>
  );
}
