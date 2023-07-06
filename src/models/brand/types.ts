import { YearAccuracy } from '@services/Db';
import { DbBrand } from '@services/DbTypes';

export interface BrandType extends DbBrand {
  year_founded_accuracy: YearAccuracy;
}

export const BRAND_FIRST_NUMBER = '8';
