import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('brand_aliases', table => {
    table
      .string('qualification')
      .comment('Уточнение');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('brand_aliases', table => {
    table.dropColumn('qualification');
  });
}
