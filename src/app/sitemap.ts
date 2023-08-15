import type { MetadataRoute } from 'next';

import { languages } from '@i18n/settings';
import decadeUrlHelper from '@models/brand/decadeUrlHelper';
import getFoundedIndex from '@models/brand/getFoundedIndex';
import getBrandListForSitemap from '@models/brand/getListForSitemap';
import { BRAND_FIRST_NUMBER } from '@models/brand/types';
import getCountriesListForSitemap from '@models/country/getListForSitemap';

/**
 * @todo разобраться как сделать SitemapIndex и отдельные карты для каждого языка
 * Метод sitemap пока не принимает параметры и не знает по какому URL его вызвали
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps?hl=ru
 */

async function getBrandsMap() {
  const rows = [
    {
      url: 'https://watcharc.org/brands',
    },
  ];

  // Алфавитный список брендов
  `abcdefghijklmnopqrstuvwxyz${BRAND_FIRST_NUMBER}`
    .split('')
    .forEach(letter => {
      rows.push({
        url: `https://watcharc.org/brands/${letter}`,
      });
    });

  const [countries, founded, brands] = await Promise.all([
    getCountriesListForSitemap(),
    getFoundedIndex(),
    getBrandListForSitemap(),
  ]);

  // Индекс брендов по стране
  countries.forEach(({ code }) => {
    rows.push({
      url: `https://watcharc.org/brands/${code}`,
    });
  });

  // Индекс брендов по году основания
  rows.push({ url: 'https://watcharc.org/brands/founded' });
  Object.entries(founded).forEach(([century, decades]) => {
    Object.entries(decades).map(([decade]) => {
      // eslint-disable-line array-callback-return
      rows.push({
        url: `https://watcharc.org${decadeUrlHelper(century, decade)}`,
      });
    });
  });

  // Страницы брендов
  brands.forEach(({ alias }) => {
    rows.push({
      url: `https://watcharc.org/brand/${alias}`,
    });
  });

  return rows;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const brands = await getBrandsMap();
  const rows = [
    {
      url: 'https://watcharc.org',
    },
    ...brands,
  ];

  return languages.reduce((acc, lng) => {
    rows.forEach(({ url, ...other }) => {
      acc.push({
        url: url.replace('https://watcharc.org', `https://watcharc.org/${lng}`),
        ...other,
      });
    });

    return acc;
  }, [] as MetadataRoute.Sitemap);
}
