import type { TFunction } from 'i18next';

import type { ModelsSettings } from '@models/brand/types';
import type { ModelType } from '@models/models/types';

export default function ModelsTable({
  models,
  settings,
  t,
}: {
  models: ModelType[];
  settings: Exclude<ModelsSettings['table'], undefined | false>;
  t: TFunction;
}) {
  const columns: Record<string, (model: ModelType) => string | null> = {
    'reference': (model: ModelType) => model.reference,
    'model-title': (model: ModelType) => model.title,
    'movement-type': (model: ModelType) => model.movement_type,
    'gender': (model: ModelType) => model.gender,
    'skeleton': (model: ModelType) => (model.skeleton ? 'yes' : ''),
  };
  if (typeof settings === 'object' && settings.columns?.length) {
    Object.keys(columns).forEach(column => {
      if (!settings.columns?.includes(column)) {
        delete columns[column];
      }
    });
  }

  return (
    <div className="mt-8 -mx-3 flow-root">
      <div className="inline-block min-w-full py-2 align-middle">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr>
              {Object.keys(columns).map(column => (
                <th
                  key={column}
                  scope="col"
                  className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  {t(column)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {models.map(model => (
              <tr key={model.id}>
                {Object.entries(columns).map(([key, render]) => (
                  <td
                    key={key}
                    className="whitespace-nowrap px-3 py-4 text-sm first:font-medium text-gray-500 first:text-gray-900"
                  >
                    {render(model)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
