import { MapPinIcon } from '@heroicons/react/24/outline';
import type { TFunction } from 'i18next';
import { URLSearchParams } from 'url';

import Item from './Item';

const urlHelper = (title: string, placeID: string) => {
  const hrefParams = new URLSearchParams({
    api: '1',
    query: title,
    query_place_id: placeID,
  });
  return `https://www.google.com/maps/search/?${hrefParams}`;
};

export default function Address({
  value,
  title,
  placeID,
  t,
}: {
  value: string | null;
  title: string;
  placeID: string | null;
  t: TFunction;
}) {
  if (!value) {
    return null;
  }

  return (
    <Item title={t('address')} Icon={MapPinIcon}>
      {placeID ? (
        <a
          href={urlHelper(title, placeID)}
          className="hover:underline focus:underline"
          target="_blank"
          rel="noreferrer"
        >
          {value}
        </a>
      ) : (
        value
      )}
    </Item>
  );
}
