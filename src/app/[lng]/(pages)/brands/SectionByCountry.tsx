import Link from 'next/link';

import translate from '@i18n/server';

interface SectionProps {
  lng: Languages;
  countries: any[];
}

export default async function SectionByCountry({
  lng,
  countries,
}: SectionProps) {
  const { t } = await translate(lng);
  return (
    <section className="py-6">
      <h2 className="pb-3 text-2xl font-bold leading-10 tracking-tight text-gray-700">
        {t('by-country')}
      </h2>
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-0.5 justify-center">
        {countries.map(country => (
          <Link
            key={country.code}
            href={`/${lng}/brands/${country.code}`}
            className="bg-gray-400/5 hover:bg-gray-900/5 focus:bg-gray-900/5 px-6 py-4 space-y-2 text-center"
          >
            <div className="text-lg font-semibold tracking-tight text-gray-900">
              {country.title}
            </div>
            <div className="text-sm font-semibold leading-6 text-gray-600">
              {country.number}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
