'use client';

import { Dialog, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Fragment, useCallback, useRef, useState } from 'react';

import translate from '@i18n/client';

import SearchDialog from './SearchDialog';

export default function SearchMenu({ lng }: { lng: Languages }) {
  const { t } = translate(lng);
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const inputRef = useRef(null);
  return (
    <>
      <button
        type="button"
        className="-my-1 ml-auto flex h-8 w-8 items-center justify-center rounded-lg sm:ml-8"
        onClick={openMenu}
      >
        <span className="sr-only">{t('brand-search')}</span>
        <MagnifyingGlassIcon className="h-6 w-6 fill-gray-900 hover:fill-gray-900" />
      </button>
      <Transition appear show={menuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={inputRef}
          onClose={closeMenu}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100" />
          </Transition.Child>
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 medium:pt-16 tall:pt-24">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-lg transform px-4 transition-all">
                <div className="overflow-hidden rounded-lg bg-white shadow-md">
                  <SearchDialog close={closeMenu} lng={lng} ref={inputRef} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
