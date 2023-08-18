'use client';

import Title from "@components/Title";
import translate from "@i18n/client";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NotFound() {
  const { lng } = useParams();
  const { t } = translate(lng as Languages, 'brand');
  return (
    <>
      <Title title={t('not-found')} />
      <Link href={`/${lng}/brands`} className="hover:underline focus:underline">
        {t('go-to-index')}
      </Link>
    </>
  )
}
