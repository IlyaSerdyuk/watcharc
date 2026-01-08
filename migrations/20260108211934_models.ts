import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('models', table => {
    table
      .integer('order_in_brand')
      .notNullable()
      .comment('Приоритет отображения в рамках бренда');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('models', table => {
    table.dropColumns('order_in_brand');
  });
}
