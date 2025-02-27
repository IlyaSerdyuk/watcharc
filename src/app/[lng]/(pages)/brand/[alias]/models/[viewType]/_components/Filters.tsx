import clsx from 'clsx';
import Link from 'next/link';

import type { BrandMetadata } from '@models/brand/getMetadata';

import type { TViewType } from './views';
import { hasTableView, hasTilesView } from './views';

export default function Filters({
  current,
  brand,
  lng,
}: {
  current: TViewType;
  brand: BrandMetadata;
  lng: Languages;
}) {
  const views = [];
  hasTilesView(brand.models_settings) && views.push('tiles'); // eslint-disable-line @typescript-eslint/no-unused-expressions
  hasTableView(brand.models_settings) && views.push('table'); // eslint-disable-line @typescript-eslint/no-unused-expressions
  if (views.length < 2) {
    return null;
  }

  return (
    <div className="flex gap-2">
      {views.map(option => (
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
