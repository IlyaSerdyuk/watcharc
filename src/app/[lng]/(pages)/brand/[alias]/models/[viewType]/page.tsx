import Breadcrumbs from '@components/Breadcrumbs';
import Title from '@components/Title';
import translate from '@i18n/server';
import getMetadata from '@models/brand/getMetadata';
import getList from '@models/models/getList';

import type { TViewType } from './_components/Filters';
import Filters from './_components/Filters';
import ModelsTable from './_components/ModelsTable';
import ModelsTiles from './_components/ModelsTiles';

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
    return null;
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
      {viewType === 'table' ? (
        <ModelsTable models={models} t={t} />
      ) : (
        <ModelsTiles models={models} brand={brand} t={t} />
      )}
    </>
  );
}
