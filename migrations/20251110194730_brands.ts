import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('brands', table => {
    table
      .boolean('closed')
      .after('year_closed_accuracy')
      .comment('Бренд закрыт');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('brands', table => {
    table.dropColumns('closed');
  });
}
