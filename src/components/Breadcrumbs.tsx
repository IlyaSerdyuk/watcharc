import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import translate from '@i18n/server';

export interface BreadcrumbsPage {
  title: string;
  href: string;
}

interface BreadcrumbsProps {
  lng: Languages;
  pages: BreadcrumbsPage[];
}

export default async function Breadcrumbs({ lng, pages }: BreadcrumbsProps) {
  const { t } = await translate(lng);
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li>
          <div>
            <Link
              href={`/${lng}`}
              className="text-gray-400 hover:text-gray-500"
            >
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">{t('to-home')}</span>
            </Link>
          </div>
        </li>
        {pages.map(page => (
          <li key={page.title}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Link
                href={`/${lng}${page.href}`}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current="page"
              >
                {page.title}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
