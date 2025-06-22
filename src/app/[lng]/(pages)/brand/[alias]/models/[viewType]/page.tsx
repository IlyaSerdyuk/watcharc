import { notFound, redirect } from 'next/navigation';

import Breadcrumbs from '@components/Breadcrumbs';
import Title from '@components/Title';
import translate from '@i18n/server';
import getMetadata from '@models/brand/getMetadata';
import type { ModelsSettings } from '@models/brand/types';
import getList from '@models/models/getList';
import { TViewType } from '@models/models/types';

import Filters from './_components/Filters';
import ModelsTable from './_components/ModelsTable';
import ModelsTiles from './_components/ModelsTiles';
import { hasTableView, hasTilesView } from './_components/views';

type ModelsPageProps = PageProps<{
  alias: string;
  viewType: TViewType;
}>;

export default async function ModelsPage({
  params: { lng, alias, viewType },
}: ModelsPageProps) {
  const { t } = await translate(lng, ['models', 'translation']);
  const brand = await getMetadata(alias);
  if (!brand) {
    notFound();
  }

  if (!brand.models_settings || !Object.keys(brand.models_settings).length) {
    redirect(`/${lng}/brand/${alias}`);
  }

  switch (viewType) {
    case 'table':
      if (!hasTableView(brand.models_settings)) {
        redirect(`/${lng}/brand/${alias}/models/tiles`);
      }
      break;
    case 'tiles':
      if (!hasTilesView(brand.models_settings)) {
        redirect(`/${lng}/brand/${alias}/models/table`);
      }
      break;
    default:
      // const exhaustiveCheck: never = viewType;
      redirect(`/${lng}/brand/${alias}/models`);
  }

  const models = await getList(brand.id);

  return (
    <>
      <Breadcrumbs
        lng={lng}
        pages={[
          { title: t('nav-brands'), href: '/brands' },
          { title: brand.title, href: `/brand/${alias}` },
        ]}
      />
      <Title title={`${t('models-of', { value: brand.title })}`} />
      <Filters current={viewType} brand={brand} lng={lng} />
      {viewType === TViewType.Table ? (
        <ModelsTable
          models={models}
          settings={
            brand.models_settings.table as Exclude<
              ModelsSettings['table'],
              undefined | false
            >
          }
          t={t}
        />
      ) : (
        <ModelsTiles models={models} brand={brand} t={t} />
      )}
    </>
  );
}
