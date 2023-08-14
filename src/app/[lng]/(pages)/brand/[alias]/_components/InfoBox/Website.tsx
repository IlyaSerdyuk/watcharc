import { GlobeAltIcon } from '@heroicons/react/24/outline';
import type { TFunction } from 'i18next';

import Item from './Item';

export default function Website({
  value,
  archive,
  t,
}: {
  value: string | null;
  archive: string | null;
  t: TFunction;
}) {
  if (!value) {
    return null;
  }

  return (
    <Item title={t('website')} Icon={GlobeAltIcon}>
      <a
        href={`//${archive || value}`}
        target="_blank"
        rel="noreferrer"
        className="hover:underline focus:underline"
      >
        {value}
        {archive && (
          <>
            {' '}
            <span className="italic">(Internet Archive)</span>
          </>
        )}
      </a>
    </Item>
  );
}
