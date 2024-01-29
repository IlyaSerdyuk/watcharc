import Link from 'next/link';

import translate from '@i18n/server';

import LanguageMenu from './LanguageMenu';
import MobileMenu from './MobileMenu';
import SearchMenu from './SearchMenu';

export default async function Header({ lng }: { lng: Languages }) {
  const { t } = await translate(lng);
  const items = [
    { label: t('nav-brands'), url: '/brands' },
    { label: t('nav-statistics'), url: '/statistics' },
  ];
  return (
    <header className="relative w-full flex-none text-sm font-semibold leading-6 text-slate-900">
      <nav
        className="relative mx-auto flex max-w-screen-2xl items-center justify-between p-6 sm:px-8"
        aria-label="Global"
      >
        <Link href={`/${lng}`} className="flex-none text-slate-900">
          WatchArc
        </Link>
        <div className="ml-auto hidden sm:flex sm:items-center">
          {items.map(({ label, url }) => (
            <Link href={`/${lng}${url}`} className="ml-8" key={label}>
              {label}
            </Link>
          ))}
        </div>
        <SearchMenu lng={lng} />
        <div className="hidden sm:ml-8 sm:flex sm:items-center">
          <LanguageMenu lng={lng} />
        </div>
        <MobileMenu items={items} lng={lng} />
      </nav>
    </header>
  );
}
