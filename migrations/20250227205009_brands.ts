import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('brands', table => {
    table.json('models_settings').comment('Настройки подраздела о моделях');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('brands', table => {
    table.dropColumns('models_settings');
  });
}
