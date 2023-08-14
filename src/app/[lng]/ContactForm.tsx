'use client';

import i18next from 'i18next';
import { FormEvent, useCallback, useState } from 'react';

import { FailAlert, LoadingAlert, SuccessAlert } from '@components/Alerts';
import translate from '@i18n/client';

const enum FormStatus {
  Wait = 0,
  Sending = 1,
  Fail = 2,
  Complete = 3,
}

function Message({ status, t }: { status: FormStatus; t: typeof i18next.t }) {
  switch (status) {
    case FormStatus.Sending:
      return <LoadingAlert title={t('contact.sending')} />;
    case FormStatus.Complete:
      return <SuccessAlert title={t('contact.successfully')} />;
    case FormStatus.Fail:
      return <FailAlert title={t('contact.fail')} />;
    case FormStatus.Wait:
      throw new Error(
        'Сообщение не предусмотрено для статуса ожидания заполнения формы',
      );
    default:
      const exhaustiveCheck: never = status; // eslint-disable-line no-case-declarations
      throw new Error(exhaustiveCheck);
  }
}

export default function ContactForm({ lng }: { lng: Languages }) {
  const { t } = translate(lng, 'home');
  const [status, setStatus] = useState(FormStatus.Wait);

  const handler = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    setStatus(FormStatus.Sending);

    const form = event.target as HTMLFormElement;
    const data = {
      message: form.message.value as string,
      email: form.email.value as string,
    };
    const response = await fetch('/api/contact', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const result = await response.json();
    if (result.status === 'success') {
      setStatus(FormStatus.Complete);
    } else {
      /** @todo Добавить повторные попытки */
      setStatus(FormStatus.Fail);
    }
  }, []);

  return (
    <div className="bg-white px-6 pt-24 sm:pt-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {t('contact.title')}
        </h2>
        <div className="mt-4 space-y2 text-lg leading-8 text-gray-600">
          <p>{t('contact.call-1')}</p>
          <p>{t('contact.call-2')}</p>
          <p>{t('contact.call-3')}</p>
          <p>{t('contact.call-4')}</p>
        </div>
      </div>
      <form
        onSubmit={handler}
        className="mx-auto mt-12 max-w-xl sm:mt-16 space-y-6 relative"
      >
        {status !== FormStatus.Wait ? (
          <div className="absolute inset-[-1.5rem] bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 flex flex-1 flex-col justify-center">
            <div className="w-fit mx-auto">
              <Message status={status} t={t} />
            </div>
          </div>
        ) : null}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            {t('contact.message')}
          </label>
          <div className="mt-2.5">
            <textarea
              name="message"
              id="message"
              required
              rows={4}
              maxLength={2000}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm leading-6">
            <span className="font-semibold text-gray-900 mr-3">
              {t('contact.email')}
            </span>
            <span className="font-normal text-gray-700 italic inline-block">
              {t('contact.email-motivation')}
            </span>
          </label>
          <div className="mt-2.5">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br px-3.5 py-2.5 text-center text-sm font-medium text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
          >
            {t('contact.send')}
          </button>
        </div>
      </form>
    </div>
  );
}
