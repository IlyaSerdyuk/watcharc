'use client';

import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';

import translate from '@i18n/client';
import { languageLabels } from '@i18n/settings';

import SearchMenu from './SearchMenu';

export default function MobileMenu({
  items,
  lng,
}: {
  items: {
    label: string;
    url: string;
  }[];
  lng: Languages;
}) {
  const pathname = usePathname().substring(3);
  const { t } = translate(lng);
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  return (
    <>
      <div className="ml-4 flex sm:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={openMenu}
        >
          <span className="sr-only">{t('open-main-menu')}</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <Dialog
        as="div"
        className="sm:hidden"
        open={menuOpen}
        onClose={setMenuOpen}
      >
        <div className="fixed inset-0 z-10 backdrop-blur-sm bg-white/30" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 xs:max-w-xs xs:ring-1 xs:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              href={`/${lng}`}
              className="-m-1.5 p-1.5 text-base font-extrabold leading-6"
              onClick={closeMenu}
            >
              WatchArc
            </Link>
            <SearchMenu lng={lng} />
            <button
              type="button"
              className="-m-2.5 ml-1.5 rounded-md p-2.5 text-gray-700"
              onClick={closeMenu}
            >
              <span className="sr-only">{t('close-main-menu')}</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {items.map(({ label, url }) => (
                  <Link
                    href={`/${lng}${url}`}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    key={label}
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div className="py-6 grid min-[260px]:grid-cols-2 gap-x-12">
                {Object.entries(languageLabels).map(([code, title]) => (
                  <Link
                    key={code}
                    href={`/${code}/${pathname}`}
                    onClick={closeMenu}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-sm ${
                      code === lng ? 'font-bold' : 'font-medium'
                    } leading-7 text-gray-900 hover:bg-gray-50`}
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
