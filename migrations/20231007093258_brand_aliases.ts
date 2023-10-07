import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('brand_aliases', table => {
    table.string('title_prefix').after('brand_id').comment('Префикс названия');
    table.string('title_postfix').after('title').comment('Постфикс названия');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('brand_aliases', table => {
    table.dropColumns('title_prefix', 'title_postfix');
  });
}
