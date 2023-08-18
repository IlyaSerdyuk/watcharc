'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import Title from '@components/Title';
import translate from '@i18n/client';

export default function NotFound() {
  const { lng } = useParams();
  const { t } = translate(lng as Languages);
  return (
    <>
      <Title title={t('not-found')} />
      <Link href={`/${lng}/brands`} className="hover:underline focus:underline">
        {t('go-to-home')}
      </Link>
    </>
  );
}
