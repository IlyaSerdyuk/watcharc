import { EnvelopeIcon } from '@heroicons/react/24/outline';
import type { TFunction } from 'i18next';

import Item from './Item';

export default function Email({
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
    <Item title={t('email')} Icon={EnvelopeIcon}>
      <a href={`mailto:${value}`} className="hover:underline focus:underline">
        {value}
      </a>
    </Item>
  );
}
