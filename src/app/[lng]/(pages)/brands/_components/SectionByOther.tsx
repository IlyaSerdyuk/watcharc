import Link from 'next/link';

import translate from '@i18n/server';

export default async function SectionByOther({ lng }: { lng: Languages }) {
  const { t } = await translate(lng);
  return (
    <section className="py-6">
      <h2 className="pb-3 text-2xl font-bold leading-10 tracking-tight text-gray-700">
        {t('by-other')}
      </h2>
      <div>
        <Link
          href={`/${lng}/brands/founded`}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          {t('by-founded')}
        </Link>
      </div>
    </section>
  );
}
