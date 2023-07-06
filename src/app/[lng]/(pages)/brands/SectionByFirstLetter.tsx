import clsx from 'clsx';

import useTranslation from '@i18n/server';
import { BRAND_FIRST_NUMBER } from '@models/brand/types';

interface SectionProps {
  lng: string;
  alphabet: Record<string, number>;
}

export default async function SectionByFirstLetter({
  lng,
  alphabet,
}: SectionProps) {
  const { t } = await useTranslation(lng);
  return (
    <section className="py-6">
      <h2 className="pb-3 text-2xl font-bold leading-10 tracking-tight text-gray-700">
        {t('by-first-letter')}
      </h2>
      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-13 gap-0.5 justify-center">
        {Object.entries(alphabet).map(([letter, number]) => (
          <div
            key={letter}
            className={clsx('bg-gray-400/5 px-6 py-4 space-y-2 text-center', {
              'order-last': letter === BRAND_FIRST_NUMBER,
            })}
          >
            <div className="text-xl font-semibold tracking-tight text-gray-900">
              {letter === BRAND_FIRST_NUMBER ? '0-9' : letter.toUpperCase()}
            </div>
            <div className="text-sm font-semibold leading-6 text-gray-600">
              {number}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
