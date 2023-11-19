'use client';

import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, LanguageIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { Fragment } from 'react';

const languages: Record<Languages, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  ru: 'Русский',
};

export default function HeaderLang({ lng }: { lng: Languages }) {
  const pathname = usePathname().substring(3);
  return (
    <Popover.Group className="flex flex-1 justify-end">
      <Popover className="relative">
        <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
          <LanguageIcon
            className="h-5 w-5 flex-none text-gray-400"
            aria-hidden="true"
          />
          <span className="sr-only">Change language</span>
          <ChevronDownIcon
            className="h-5 w-5 flex-none text-gray-400"
            aria-hidden="true"
          />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute -right-4 top-full z-10 mt-3 max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {Object.entries(languages).map(([code, title]) => (
                <div
                  key={code}
                  className={clsx(
                    'group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50',
                    { 'bg-gray-200': code === lng },
                  )}
                >
                  <div className="flex-auto">
                    <Link
                      href={`/${code}/${pathname}`}
                      className="block font-semibold text-gray-900"
                    >
                      {title}
                      <span className="absolute inset-0" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </Popover.Group>
  );
}
