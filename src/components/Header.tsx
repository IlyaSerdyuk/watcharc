import Link from 'next/link';

import translate from '@i18n/server';

import HeaderLang from './HeaderLang';

export default async function Header({ lng }: { lng: Languages }) {
  const { t } = await translate(lng);
  return (
    <header>
      <nav
        className="mx-auto flex max-w-screen-2xl items-center justify-between gap-x-6 p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            href={`/${lng}`}
            className="-m-1.5 p-1.5 text-base font-extrabold leading-6"
          >
            WatchArc
          </Link>
        </div>

        <div className="flex">
          <Link
            href={`/${lng}/brands`}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {t('nav-brands')}
          </Link>
        </div>

        <HeaderLang lng={lng} />
      </nav>
    </header>
  );
}
