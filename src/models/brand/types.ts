import type { DbBrand, DbBrandLink } from '@services/DbTypes';
import type { YearAccuracy } from '@services/year';

export interface BrandType extends DbBrand {
  year_founded_accuracy: YearAccuracy;
  year_closed_accuracy: YearAccuracy;
}

export const BRAND_FIRST_NUMBER = '8';

export type BrandList = {
  id: number;
  title: string;
  qualification?: string;
  alias: string | null;
}[];

export interface BrandLinkType extends DbBrandLink {}
