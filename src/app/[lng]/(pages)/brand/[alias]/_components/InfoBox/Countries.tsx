import { FlagIcon } from '@heroicons/react/24/outline';
import type { TFunction } from 'i18next';
import Link from 'next/link';

import type { CountryType } from '@models/country/types';

import Item from './Item';

export default function Countries({
  countries,
  t,
  lng,
}: {
  countries: Pick<CountryType, 'title' | 'code'>[];
  t: TFunction;
  lng: Languages;
}) {
  if (countries.length < 1) {
    return null;
  }

  return (
    <Item title={t('country')} Icon={FlagIcon}>
      {countries.map((country, index) => (
        <>
          {!!index && ', '}
          <Link
            href={`/${lng}/brands/${country.code}`}
            className="hover:underline focus:underline"
          >
            {country.title}
          </Link>
        </>
      ))}
    </Item>
  );
}
