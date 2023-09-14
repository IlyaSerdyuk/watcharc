import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('brand_aliases', table => {
    table.index(['title']);
    table.unique(['title', 'qualification']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('brand_aliases', table => {
    table.dropIndex(['title']);
    table.dropUnique(['title', 'qualification']);
  });
}
