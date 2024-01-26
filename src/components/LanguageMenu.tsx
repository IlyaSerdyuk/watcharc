'use client';

import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, LanguageIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import { languageLabels } from '@i18n/settings';

export default function LanguageMenu({ lng }: { lng: Languages }) {
  const pathname = usePathname().substring(3);
  return (
    <Popover.Group className="hidden sm:flex sm:flex-1 sm:justify-end">
      <Popover className="relative">
        <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
          <LanguageIcon
            className="h-5 w-5 flex-none text-gray-400"
            aria-hidden="true"
          />
          {languageLabels[lng]}
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
          <Popover.Panel className="absolute -right-2 top-full z-10 mt-3 max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {Object.entries(languageLabels)
                .filter(([code]) => code !== lng)
                .map(([code, title]) => (
                  <div
                    key={code}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="flex-auto">
                      <Link
                        href={`/${code}/${pathname}`}
                        className="block font-semibold text-gray-900"
                      >
                        {title}
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
