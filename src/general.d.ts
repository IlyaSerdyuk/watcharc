type Languages = 'en' | 'de' | 'ru';

type PageProps<T = {}> = {
  params: T & {
    lng: Languages;
  };
};
