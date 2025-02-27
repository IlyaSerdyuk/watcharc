import type { TFunction } from 'i18next';

import type { ModelType } from '@models/models/types';

export default function ModelsTable({
  models,
  t,
}: {
  models: ModelType[];
  t: TFunction;
}) {
  return (
    <div className="mt-8 flow-root">
      <div className="inline-block min-w-full py-2 align-middle">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
              >
                {t('reference')}
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
              >
                {t('model-title')}
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
              >
                {t('movement-type')}
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
              >
                {t('gender')}
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pl-3 text-left text-sm font-semibold text-gray-900 pr-4 sm:pr-0 backdrop-blur backdrop-filter"
              >
                {t('skeleton')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {models.map(model => (
              <tr key={model.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  {model.reference}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {model.title}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {model.movement_type}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {model.gender}
                </td>
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium text-gray-500 sm:pr-0">
                  {model.skeleton ? 'yes' : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
