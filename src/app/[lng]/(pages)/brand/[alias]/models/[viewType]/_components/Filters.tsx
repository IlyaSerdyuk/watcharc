import clsx from 'clsx';
import Link from 'next/link';

import type { BrandMetadata } from '@models/brand/getMetadata';

export type TViewType = 'grid' | 'table';

export default function Filters({
  current,
  brand,
  lng,
}: {
  current: TViewType;
  brand: BrandMetadata;
  lng: Languages;
}) {
  return (
    <div className="flex gap-2">
      {['grid', 'table'].map(option => (
        <Link
          key={option}
          href={`/${lng}/brand/${brand.alias}/models/${option}`}
          className={clsx(
            option === current ? 'border-indigo-600' : 'border-grey-200',
            'border-2 flex cursor-pointer rounded-md px-3 py-3 focus:outline-none',
          )}
        >
          {option}
        </Link>
      ))}
    </div>
  );
}
