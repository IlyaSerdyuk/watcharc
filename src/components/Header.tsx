import Link from 'next/link';

import HeaderLang from './HeaderLang';

export default function Header({ lng }: { lng: string }) {
  return (
    <header>
      <nav
        className="mx-auto flex max-w-screen-2xl items-center justify-between p-6 lg:px-8"
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

        <HeaderLang lng={lng} />
      </nav>
    </header>
  );
}
