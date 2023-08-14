import { YearAccuracy } from '@services/year';

export default function yearUrlHelper(
  year: number,
  accuracy: YearAccuracy,
  lng: Languages,
) {
  const slot =
    accuracy === YearAccuracy.Century
      ? `${Math.floor(year / 100)}xx`
      : `${Math.floor(year / 10)}x`;
  return `/${lng}/brands/founded/${slot}`;
}
