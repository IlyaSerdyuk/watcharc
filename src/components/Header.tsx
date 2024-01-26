import Link from 'next/link';

import translate from '@i18n/server';

import LanguageMenu from './LanguageMenu';
import MobileMenu from './MobileMenu';

export default async function Header({ lng }: { lng: Languages }) {
  const { t } = await translate(lng);
  const items = [
    { label: t('nav-brands'), url: '/brands' },
    { label: t('nav-statistics'), url: '/statistics' },
  ];
  return (
    <header>
      <nav
        className="mx-auto flex max-w-screen-2xl items-center justify-between p-6 sm:px-8"
        aria-label="Global"
      >
        <div className="flex sm:flex-1">
          <Link
            href={`/${lng}`}
            className="-m-1.5 p-1.5 text-base font-extrabold leading-6"
          >
            WatchArc
          </Link>
        </div>
        <MobileMenu items={items} lng={lng} />
        <div className="hidden sm:flex sm:gap-x-12">
          {items.map(({ label, url }) => (
            <Link
              href={`/${lng}${url}`}
              className="text-sm font-semibold leading-6 text-gray-900"
              key={label}
            >
              {label}
            </Link>
          ))}
        </div>
        <LanguageMenu lng={lng} />
      </nav>
    </header>
  );
}
