import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';

import SpinnerIcon from './SpinnerIcon';

export function LoadingAlert({ title }: { title: string }) {
  return (
    <div className="rounded-md bg-blue-50 p-4 flex">
      <div className="flex-shrink-0">
        <SpinnerIcon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="ml-3">
        <div className="text-sm font-medium text-blue-800">{title}</div>
      </div>
    </div>
  );
}

export function SuccessAlert({ title }: { title: string }) {
  return (
    <div className="rounded-md bg-green-50 p-4 flex">
      <div className="flex-shrink-0">
        <CheckCircleIcon
          className="h-5 w-5 text-green-400"
          aria-hidden="true"
        />
      </div>
      <div className="ml-3">
        <div className="text-sm font-medium text-green-800">{title}</div>
      </div>
    </div>
  );
}

export function FailAlert({ title }: { title: string }) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <div className="text-sm font-medium text-red-800">{title}</div>
        </div>
      </div>
    </div>
  );
}
