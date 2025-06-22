import { PlayIcon } from '@heroicons/react/24/outline';
import type { TFunction } from 'i18next';
import Link from 'next/link';

import type { BrandCartType } from '@models/brand/getDetails';
import type { ModelsSettings } from '@models/brand/types';
import type { ModelType } from '@models/models/types';

import ModelsTable from '../models/[viewType]/_components/ModelsTable';
import ModelsTiles from '../models/[viewType]/_components/ModelsTiles';
import {
  hasTableView,
  hasTilesView,
} from '../models/[viewType]/_components/views';

export default function Models({
  models,
  settings,
  brand,
  lng,
  t,
}: {
  models: ModelType[];
  settings: ModelsSettings | null;
  brand: BrandCartType;
  lng: Languages;
  t: TFunction;
}) {
  if (models.length < 1 || settings === null) {
    return null;
  }

  return (
    <article className="my-10">
      <header>
        <h3 className="text-2xl font-semibold leading-7 text-gray-900 pb-3">
          {t('models')}
        </h3>
      </header>

      {hasTilesView(settings) ? ( // eslint-disable-line no-nested-ternary
        <ModelsTiles models={models} brand={brand} t={t} />
      ) : hasTableView(settings) ? (
        <ModelsTable
          models={models}
          settings={
            settings.table as Exclude<
              ModelsSettings['table'],
              undefined | false
            >
          }
          t={t}
        />
      ) : null}

      <div className="pt-4">
        <Link
          href={`/${lng}/brand/${brand.alias}/models`}
          className="flex items-center space-x-2 text-gray-900"
        >
          <span className="text-sm font-medium leading-6">
            {t('more-models')}
          </span>
          <PlayIcon className="h-3 w-3 stroke-[4]" />
        </Link>
      </div>
    </article>
  );
}
