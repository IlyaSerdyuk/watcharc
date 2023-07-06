type Languages = 'en' | 'ru';

type PageProps<T = {}> = {
  params: T & {
    lng: Languages;
  };
};
