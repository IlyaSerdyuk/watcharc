type Languages = 'en' | 'de' | 'fr' | 'ru';

type PageProps<T = {}> = {
  params: T & {
    lng: Languages;
  };
};
