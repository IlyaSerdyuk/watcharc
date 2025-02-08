import type { TFunction } from 'i18next';

import type { BrandLinkType } from '@models/brand/types';

const httpOnlyRef = [
  'Montre24',
];

function href(type: string, url: string): string {
  const protocol = httpOnlyRef.includes(type) ? 'http' : 'https';
  return `${protocol}://${url}`;
}

export default function ListOfReferences({
  links,
  t,
}: {
  links: BrandLinkType[];
  t: TFunction;
}) {
  if (links.length < 1) {
    return null;
  }

  return (
    <article className="py-10">
      <header>
        <h3 className="text-base font-semibold leading-7 text-gray-900 pb-3">
          {t('list-of-references')}
        </h3>
      </header>
      <dl className="sm:table">
        {links.map(link => (
          <div className="sm:table-row">
            <dt className="text-sm font-medium leading-6 text-gray-900 sm:table-cell">
              {link.type}
            </dt>
            <dd className="pt-1 text-sm leading-6 text-gray-700 sm:table-cell sm:pt-0 sm:pl-4">
              <a
                href={href(link.type, link.url)}
                target="_blank"
                rel="noreferrer"
                className="hover:underline focus:underline"
              >
                {link.url}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
