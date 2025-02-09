import type { TFunction } from 'i18next';
import Image from 'next/image';

import type { BrandLogoType } from '@models/brand/types';

function getSource(name: string, ext: BrandLogoType): string {
  const host = process.env.NEXT_PUBLIC_IMAGES_HOST;
  const group = name.replace('-', '').slice(0, 2);
  return `${host}/logo/${group}/${name}.${ext}`;
}

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
        src={getSource(alias, type)}
        width={300}
        height={200}
        alt={`${t('logo')} ${title}`}
      />
    </div>
  );
}
