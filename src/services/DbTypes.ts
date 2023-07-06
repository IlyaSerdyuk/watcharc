import { Knex } from 'knex';

export interface DbBrand {
  id: number;
  title: string;
  website: string | null;
  instagram: string | null;
  year_founded: number | null;
  year_founded_accuracy: 'year' | 'decade' | 'century' | null;
}

export class DB {
  constructor(public readonly knex: Knex) {}
  get brands() {
    return this.knex<DbBrand>('brands');
  }
}
