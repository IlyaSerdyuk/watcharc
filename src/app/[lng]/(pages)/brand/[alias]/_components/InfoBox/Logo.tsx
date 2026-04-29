import type { TFunction } from 'i18next';

import { Image } from '@components/Image';
import type { BrandLogoType } from '@models/brand/types';

export default function BrandLogo({
  alias,
  type,
  title,
  t,
}: {
  alias: string;
  type: BrandLogoType;
  title: string;
  t: TFunction;
}) {
  if (!type) {
    return null;
  }

  return (
    <div className="md:float-right md:ml-6 mt-3 mb-6">
      <Image
        src={`logo/${alias}.${type}`}
        width={300}
        height={200}
        alt={`${t('logo')} ${title}`}
      />
    </div>
  );
}
