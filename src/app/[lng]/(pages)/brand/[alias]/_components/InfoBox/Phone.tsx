import { PhoneIcon } from '@heroicons/react/24/outline';
import type { TFunction } from 'i18next';

import Item from './Item';

export default function Phone({
  value,
  t,
}: {
  value: string | null;
  t: TFunction;
}) {
  if (!value) {
    return null;
  }

  return (
    <Item title={t('phone')} Icon={PhoneIcon}>
      <a
        href={`tel:${value.replaceAll(' ', '')}`}
        className="hover:underline focus:underline"
      >
        {value}
      </a>
    </Item>
  );
}
