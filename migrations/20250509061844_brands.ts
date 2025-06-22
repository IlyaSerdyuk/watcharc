import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(
    'ALTER TABLE `brands` CHANGE `logo_type` `logo_type` enum("svg","png","jpg") NULL COMMENT "Расширение логотипа"',
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(
    'ALTER TABLE `brands` CHANGE `logo_type` `logo_type` enum("svg","png") NULL COMMENT "Расширение логотипа"',
  );
}
