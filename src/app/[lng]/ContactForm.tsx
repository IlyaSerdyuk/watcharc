import i18next from 'i18next';

/** @todo Оживить форму обратной связи */
export default async function ContactForm({ t }: { t: typeof i18next.t }) {
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
        action="#"
        method="POST"
        className="mx-auto mt-12 max-w-xl sm:mt-16 space-y-6"
      >
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
              rows={4}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block space-x-3 text-sm leading-6">
            <span className="font-semibold text-gray-900">
              {t('contact.email')}
            </span>
            <span className="font-normal text-gray-700 italic">
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
            disabled
          >
            {t('contact.send')}
          </button>
        </div>
      </form>
    </div>
  );
}
