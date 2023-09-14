import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('brands', table => {
    table.unique(['alias']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('brands', table => {
    table.dropUnique(['alias']);
  });
}
