import { Knex } from 'knex';

export interface DbBrandAlias {
  id: number;
  brand_id: number;
  title: string;
}

export interface DbBrand {
  id: number;
  title: string;
  website: string | null;
  instagram: string | null;
  year_founded: number | null;
  year_founded_accuracy: 'year' | 'decade' | 'century' | null;
}

export interface DbBrandCountry {
  id: number;
  brand_id: number;
  country_id: number;
  type: 'founded' | 'current' | null;
}

export interface DbCountry {
  id: number;
  code: string;
  title_en: string;
  title_fr: string;
  title_de: string;
  title_ru: string;
  title_it: string;
  title_es: string;
}

export interface DbMessage {
  id: number;
  datetime: Date;
  message: string | null;
  email: string | null;
}

export class DB {
  constructor(public readonly knex: Knex) {}
  get brandAliases() {
    return this.knex<DbBrandAlias>('brand_aliases');
  }
  get brands() {
    return this.knex<DbBrand>('brands');
  }
  get brandsCountries() {
    return this.knex<DbBrandCountry>('brands__countries');
  }
  get countries() {
    return this.knex<DbCountry>('countries');
  }
  get messages() {
    return this.knex<DbMessage>('messages');
  }
}
