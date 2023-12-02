import { db } from '@services/Db';

/**
 * Получить подробную статистику.
 */
export default async function getDetailed() {
  const [
    totalBrands,
    countries,
    withWebsite,
    withInstagram,
    withFacebook,
    withFounded,
    withClosed,
    withAddress,
    withPhone,
    withEmail,
    withCountries,
  ] = await Promise.all([
    db.brands.count('* AS count').first<{ count: string }>(),
    db.brandsCountries
      .countDistinct('country_id AS count')
      .first<{ count: string }>(),
    db.brands.count('website AS count').first<{ count: string }>(),
    db.brands.count('instagram AS count').first<{ count: string }>(),
    db.brandLinks
      .where('type', '=', 'Facebook')
      .countDistinct('brand_id AS count')
      .first<{ count: string }>(),
    db.brands.count('year_founded AS count').first<{ count: string }>(),
    db.brands.count('year_closed AS count').first<{ count: string }>(),
    db.brands.count('address AS count').first<{ count: string }>(),
    db.brands.count('phone AS count').first<{ count: string }>(),
    db.brands.count('email AS count').first<{ count: string }>(),
    db.brandsCountries
      .countDistinct('brand_id AS count')
      .first<{ count: string }>(),
  ]);

  return {
    brands: +totalBrands.count,
    countries: +countries.count,
    details: [
      {
        label: 'website',
        absolute: +withWebsite.count,
        percentage: Math.round((+withWebsite.count / +totalBrands.count) * 100),
      },
      {
        label: 'instagram',
        absolute: +withInstagram.count,
        percentage: Math.round(
          (+withInstagram.count / +totalBrands.count) * 100,
        ),
      },
      {
        label: 'facebook',
        absolute: +withFacebook.count,
        percentage: Math.round(
          (+withFacebook.count / +totalBrands.count) * 100,
        ),
      },
      {
        label: 'founded',
        absolute: +withFounded.count,
        percentage: Math.round((+withFounded.count / +totalBrands.count) * 100),
      },
      {
        label: 'closed',
        absolute: +withClosed.count,
        percentage: Math.round((+withClosed.count / +totalBrands.count) * 100),
      },
      {
        label: 'address',
        absolute: +withAddress.count,
        percentage: Math.round((+withAddress.count / +totalBrands.count) * 100),
      },
      {
        label: 'phone',
        absolute: +withPhone.count,
        percentage: Math.round((+withPhone.count / +totalBrands.count) * 100),
      },
      {
        label: 'email',
        absolute: +withEmail.count,
        percentage: Math.round((+withEmail.count / +totalBrands.count) * 100),
      },
      {
        label: 'countries',
        absolute: +withCountries.count,
        percentage: Math.round(
          (+withCountries.count / +totalBrands.count) * 100,
        ),
      },
    ],
  };
}
