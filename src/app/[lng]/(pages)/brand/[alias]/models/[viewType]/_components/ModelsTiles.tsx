import type { TFunction } from 'i18next';

import type { BrandMetadata } from '@models/brand/getMetadata';
import type { ModelType } from '@models/models/types';

const coverSource = ({
  model,
  brand,
}: {
  model: ModelType;
  brand: BrandMetadata;
}) => {
  if (!model.cover_code || !model.cover_ext) {
    return process.env.NEXT_PUBLIC_DEFAULT_MODEL_COVER;
  }

  const host = process.env.NEXT_PUBLIC_IMAGES_HOST;
  const group = brand.alias.replace('-', '').slice(0, 2);
  return `${host}/models/${group}/${brand.alias}/${model.cover_code}.${model.cover_ext}`;
};

export default function ModelsTiles({
  models,
  brand,
  t,
}: {
  models: ModelType[];
  brand: BrandMetadata;
  t: TFunction;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {models.map(model => (
        <div key={model.id} className="group relative text-center">
          <img
            alt={model.title || model.reference || brand.title}
            src={coverSource({ model, brand })}
            className="aspect-square w-full rounded-md object-contain group-hover:object-cover lg:aspect-auto lg:h-80"
          />
          <div className="mt-4">
            <h3 className="text-sm text-gray-700">
              <span>
                <span aria-hidden="true" className="absolute inset-0" />
                {model.title}
              </span>
            </h3>
            {model.reference ? (
              <p className="mt-1 text-sm text-gray-500">
                <span className="font-medium mr-1">{t('ref')}:</span>
                {model.reference}
              </p>
            ) : null}
            <p className="mt-1 text-sm text-gray-500">
              {model.movement_type}
              {model.movement_type && model.gender ? ', ' : null}
              {model.gender}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
