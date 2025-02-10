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
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  {t('reference')}
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  {t('model-title')}
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  {t('movement-type')}
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  {t('gender')}
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 text-left text-sm font-semibold text-gray-900 pr-4 sm:pr-0"
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
    </div>
  );
}
