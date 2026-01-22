import Title from '@components/Title';
import type { TFunction } from 'i18next';

import type { ModelType } from '@models/models/types';
import type { BrandMetadata } from '@models/brand/getMetadata';
import translate from '@i18n/server';

import { coverSource } from '../../brand/[alias]/models/[viewType]/_components/ModelsTiles';

type ModelWithBrandType = ModelType & { brand: BrandMetadata }

function Item({ model, t }: { model: ModelWithBrandType, t: TFunction }) {
  const { brand } = model;
  return (
    <div className="group relative text-center">
      <img
        alt={model.title || model.reference || brand.title}
        src={coverSource({ model, brand })}
        className="aspect-square w-full rounded-md object-contain group-hover:object-cover lg:aspect-auto lg:h-80"
      />
      <div className="mt-4">
        <h3 className="text-sm text-gray-700">
          <span>
            <span aria-hidden="true" className="absolute inset-0" />
            {brand.title} {model.title}
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
  );
}

const Raketa: BrandMetadata = { id: 2875, title: 'Raketa', alias: 'raketa', models_settings: null };
const MauriceLacroix: BrandMetadata = { id: 2246, title: 'Maurice Lacroix', alias: 'maurice-lacroix', models_settings: null };
const Tissot: BrandMetadata = { id: 3498, title: 'Tissot', alias: 'tissot', models_settings: null };
const Aviator: BrandMetadata = { id: 340, title: 'Aviator', alias: 'aviator', models_settings: null };
const Sturmanskie: BrandMetadata = { id: 3338, title: 'Sturmanskie', alias: 'sturmanskie', models_settings: null };
const MikhailMoskvin: BrandMetadata = {id: 2318, title: 'Mikhail Moskvin', alias: 'mikhail-moskvin', models_settings: null };
const Luch: BrandMetadata = { id: 2121, title: 'Luch', alias: 'luch', models_settings: null };
const Garmin: BrandMetadata = { id: 1378, title: 'Garmin', alias: 'garmin', models_settings: null };
const Apple: BrandMetadata = { id: 208, title: 'Apple', alias: 'apple', models_settings: null };

const data = [
  { id: 486, brand: Raketa, reference: 'W-13-16-10-0292', title: 'Avant-Garde', gender: 'unisex', skeleton: 0, movement_type: 'automatic', cover_code: 'w-13-16-10-0292', cover_ext: 'png' },
  { id: 527, brand: Raketa, reference: 'W-07-20-10-0286', title: 'Russian Code', gender: 'unisex', skeleton: 0, movement_type: 'automatic', cover_code: 'w-07-20-10-0286', cover_ext: 'jpg' },
  { id: 627, brand: MauriceLacroix, reference: 'EL 1098-SS001-410-1', title: null, gender: 'men', skeleton: 0, movement_type: 'quartz', cover_code: 'el-1098-ss001-410-1', cover_ext: 'jpg' },
  { id: 628, brand: MauriceLacroix, reference: 'EL 1108-SS002-110-1', title: null, gender: 'men', skeleton: 0, movement_type: 'quartz', cover_code: 'el-1108-ss002-110-1', cover_ext: 'jpg' },
  { id: 629, brand: MauriceLacroix, reference: 'EL 1087-SS001-110', title: null, gender: 'men', skeleton: 0, movement_type: 'quartz', cover_code: 'el-1087-ss001-110', cover_ext: 'jpg' },
  { id: 632, brand: Aviator, reference: 'M.2.30.0.289.6', title: 'MIG-29 SMT', gender: 'men', skeleton: 0, movement_type: 'quartz', cover_code: 'm-2-30-0-289-6', cover_ext: 'png' },
  { id: 630, brand: Tissot, reference: 'T83.6.503.13', title: null, gender: 'men', skeleton: 0, movement_type: 'quartz', cover_code: 't83-6-503-13', cover_ext: 'jpg' },
  { id: 631, brand: Tissot, reference: 'PR 50 J376/476T Titanium', title: null, gender: 'men', skeleton: 0, movement_type: 'quartz', cover_code: 'pr-50-j376-476t', cover_ext: 'jpg' },
  { id: 722, brand: Sturmanskie, reference: '2609-9045922', title: null, gender: 'men', skeleton: 0, movement_type: 'manual', cover_code: '2609-9045922', cover_ext: 'jpg' },
  { id: 633, brand: Luch, reference: '440170630', title: 'Dreva', gender: 'men', skeleton: 0, movement_type: 'quartz', cover_code: '440170630', cover_ext: 'jpg' },
  { id: 634, brand: MikhailMoskvin, reference: '1505M1–Muonionalusta', title: null, gender: 'men', skeleton: 1, movement_type: 'automatic', cover_code: '1505m1–muonionalusta', cover_ext: 'jpg' },
  { id: 635, brand: MikhailMoskvin, reference: '1215A1L1', title: null, gender: 'men', skeleton: 0, movement_type: 'manual', cover_code: '1215a1l1', cover_ext: 'jpg' },
  { id: 638, brand: Raketa, reference: null, title: 'Copernic Night (80s)', gender: 'unisex', skeleton: 0, movement_type: 'manual', cover_code: 'copernic-night-80s', cover_ext: 'png' },
  { id: 637, brand: Garmin, reference: '010-01338-21', title: 'Fenix 3 Sapphire Editor', gender: 'unisex', skeleton: 0, movement_type: null, cover_code: '010-01338-21', cover_ext: 'jpg' },
  { id: 636, brand: Apple, reference: 'A2093', title: 'Series 5 44 mm', gender: 'unisex', skeleton: 0, movement_type: null, cover_code: 'a2093', cover_ext: 'jpg' },
].map(item => ({
  ...item,
  brand_id: item.brand.id,
  gender: null,
  movement_type: null,
})) as ModelWithBrandType[];

export default async function UserPage({ params: { lng }}: PageProps) {
  const { t } = await translate(lng, ['models', 'translation']);
  return (
    <>
      <Title title="User Ilya S." />
      <article>
        <h2 className="pb-3 text-2xl font-bold leading-10 tracking-tight text-gray-700">My Collection</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map(model => (
            <Item model={model} key={model.id} t={t} />
          ))}
        </div>
      </article>
    </>
  );
}
