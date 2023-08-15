import { LockClosedIcon } from '@heroicons/react/24/outline';
import type { TFunction } from 'i18next';
import Link from 'next/link';

import yearUrlHelper from '@models/brand/yearUrlHelper';
import type { YearAccuracy } from '@services/year';
import { formatYear } from '@services/year';

import Item from './Item';

export default function YearClosed({
  value,
  accuracy,
  t,
  lng,
}: {
  value: number | null;
  accuracy: YearAccuracy;
  t: TFunction;
  lng: Languages;
}) {
  if (!value) {
    return null;
  }

  return (
    <Item Icon={LockClosedIcon}>
      <Link
        href={yearUrlHelper(value, accuracy, lng)}
        className="hover:underline focus:underline"
      >
        {t('closed-in', { year: formatYear(value, accuracy) })}
      </Link>
    </Item>
  );
}
