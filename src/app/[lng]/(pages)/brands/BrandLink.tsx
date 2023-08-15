import type { TFunction } from 'i18next';
import Link from 'next/link';

import type { BrandType } from '@models/brand/types';

export default function BrandLink({
  brand,
  t,
  lng,
}: {
  brand: Pick<BrandType, 'alias' | 'title'>;
  t: TFunction;
  lng: Languages;
}) {
  return brand.alias ? (
    <Link
      href={`/${lng}/brand/${brand.alias}`}
      className="hover:underline focus:underline"
    >
      {brand.title}
    </Link>
  ) : (
    <span className="text-gray-500" title={t('brand-info-in-validate')}>
      {brand.title}
    </span>
  );
}
