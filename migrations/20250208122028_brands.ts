import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('brands', table => {
    table.enum('logo_type', ['svg', 'png']).comment('Расширение логотипа');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('brands', table => {
    table.dropColumns('logo_type');
  });
}
