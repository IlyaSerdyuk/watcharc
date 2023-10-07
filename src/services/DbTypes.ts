import { Knex } from 'knex';

export interface DbBrandAlias {
  id: number;
  brand_id: number;
  title_prefix: string | null;
  title: string;
  title_postfix: string | null;
  qualification: string | null;
}

export interface DbBrandLink {
  id: number;
  brand_id: number;
  type: string;
  url: string;
}

export interface DbBrand {
  id: number;
  title: string;
  alternative_titles: string | null;
  alias: string | null;
  website: string | null;
  website_in_wayback: string | null;
  instagram: string | null;
  year_founded: number | null;
  year_founded_accuracy: 'year' | 'decade' | 'century' | null;
  year_closed: number | null;
  year_closed_accuracy: 'year' | 'decade' | 'century' | null;
  address: string | null;
  place_id: string | null;
  phone: string | null;
  email: string | null;
  credibility: 'open-source' | 'retailer' | 'owner' | null;
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
  get brandLinks() {
    return this.knex<DbBrandLink>('brand_links');
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
