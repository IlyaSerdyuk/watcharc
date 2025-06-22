import type { DbBrand, DbBrandLink } from '@services/DbTypes';
import type { YearAccuracy } from '@services/year';

export interface ModelsSettings {
  tiles?: boolean;
  table?:
    | boolean
    | {
        columns?: string[];
      };
}

export interface BrandType extends DbBrand {
  year_founded_accuracy: YearAccuracy;
  year_closed_accuracy: YearAccuracy;
  models_settings: ModelsSettings | null;
}

export const BRAND_FIRST_NUMBER = '8';

export type BrandList = {
  id: number;
  title_prefix?: string;
  title: string;
  title_postfix?: string;
  qualification?: string;
  alias: string | null;
}[];

export type BrandLogoType = DbBrand['logo_type'];

export interface BrandLinkType extends DbBrandLink {}
