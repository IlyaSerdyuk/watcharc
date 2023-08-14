import { DbBrand } from '@services/DbTypes';
import { YearAccuracy } from '@services/year';

export interface BrandType extends DbBrand {
  year_founded_accuracy: YearAccuracy;
  year_closed_accuracy: YearAccuracy;
}

export const BRAND_FIRST_NUMBER = '8';

export type BrandList = {
  id: number;
  title: string;
  alias?: string;
}[];
