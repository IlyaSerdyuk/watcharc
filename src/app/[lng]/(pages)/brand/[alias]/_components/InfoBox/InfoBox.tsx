import type { TFunction } from 'i18next';

import type { BrandCartType } from '@models/brand/getDetails';

import Address from './Address';
import Countries from './Countries';
import CountriesOfOrigin from './CountriesOfOrigin';
import Email from './Email';
import Instagram from './Instagram';
import BrandLogo from './Logo';
import Phone from './Phone';
import Website from './Website';
import YearClosed from './YearClosed';
import YearFounded from './YearFounded';

export default function InfoBox({
  brand,
  t,
  lng,
}: {
  brand: BrandCartType;
  t: TFunction;
  lng: Languages;
}) {
  return (
    <div>
      <div className="font-medium leading-7">{brand.alternative_titles}</div>
      <BrandLogo
        alias={brand.alias}
        type={brand.logo_type}
        title={brand.title}
        t={t}
      />
      <dl className="flex flex-wrap">
        <Website
          value={brand.website}
          archive={brand.website_in_wayback}
          t={t}
        />
        <Instagram value={brand.instagram} />
        <YearFounded
          value={brand.year_founded}
          accuracy={brand.year_founded_accuracy}
          t={t}
          lng={lng}
        />
        <YearClosed
          value={brand.year_closed}
          accuracy={brand.year_closed_accuracy}
          t={t}
          lng={lng}
        />
        <Countries countries={brand.countries} t={t} lng={lng} />
        <CountriesOfOrigin
          countries={brand.countriesOfOrigin}
          t={t}
          lng={lng}
        />
        <Address
          value={brand.address}
          placeID={brand.place_id}
          title={brand.title}
          t={t}
        />
        <Phone value={brand.phone} t={t} />
        <Email value={brand.email} t={t} />
      </dl>
      {brand.credibility && (
        <p className="text-gray-600 text-xs mt-6">
          {t(`credibility-${brand.credibility}`)}
        </p>
      )}
    </div>
  );
}
