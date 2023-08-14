import i18next from 'i18next';
import Link from 'next/link';

import { BrandType } from '@models/brand/types';

export default function BrandLink({
  brand,
  t,
  lng,
}: {
  brand: Pick<BrandType, 'alias' | 'title'>;
  t: typeof i18next.t;
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
