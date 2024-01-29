'use client';

import { Combobox } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { forwardRef, useCallback, useState } from 'react';
import type { ChangeEvent, Ref } from 'react';
import useSWR from 'swr';

import translate from '@i18n/client';
import type { ISearchBrand, ISearchResult } from '@models/brand/search';

import LoadingIndicator from './LoadingIndicator';

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

function SearchDialog(
  {
    close,
    lng,
  }: {
    close: () => void;
    lng: Languages;
  },
  inputRef?: Ref<HTMLInputElement>,
) {
  const { t } = translate(lng);
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { data, error, isLoading } = useSWR<ISearchResult>(
    query.length > 0 ? `/api/search?term=${query}` : null,
    fetcher,
  );
  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value),
    [],
  );
  const selectHandler = useCallback(
    (brand: ISearchBrand) => {
      router.push(`/${lng}/${brand.url}`);
      close();
    },
    [close, lng, router],
  );
  const itemClassHelper = useCallback(
    ({ active }: { active: boolean }) =>
      clsx(
        'cursor-default select-none px-4 py-2',
        active && 'bg-indigo-600 text-white',
      ),
    [],
  );
  return (
    <Combobox onChange={selectHandler}>
      <div className="relative">
        {isLoading ? (
          <LoadingIndicator
            className="pointer-events-none absolute left-4 top-4 h-6 w-6 fill-slate-400 animate-spin"
            aria-hidden="true"
          />
        ) : (
          <MagnifyingGlassIcon
            className="pointer-events-none absolute left-4 top-4 h-6 w-6 fill-slate-400"
            aria-hidden="true"
          />
        )}
        <Combobox.Input
          className="block w-full appearance-none bg-transparent p-4 pl-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
          placeholder={`${t('brand-search')}…`}
          autoComplete="false"
          onChange={onChangeHandler}
          ref={inputRef}
        />
      </div>

      {!error && data && data.items.length > 0 && (
        <Combobox.Options
          static
          className="max-h-80 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
        >
          {data.items.map(brand => (
            <Combobox.Option
              key={brand.key}
              value={brand}
              className={itemClassHelper}
            >
              {brand.title}
              {brand.qualification && (
                <span className="text-gray-400 text-sm ml-1">
                  ({brand.qualification})
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      )}

      {error ? (
        <div className="flex flex-wrap items-center bg-gray-50 px-4 py-2.5 text-xs text-gray-700">
          {t('search-fail')}
        </div>
      ) : (
        data && (
          <div className="flex flex-wrap items-center bg-gray-50 px-4 py-2.5 text-xs text-gray-700">
            {data.total > 0
              ? t('search-result-total', { total: data.total })
              : t('no-brand-found')}
          </div>
        )
      )}
    </Combobox>
  );
}

export default forwardRef(SearchDialog);
