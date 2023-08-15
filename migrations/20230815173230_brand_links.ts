import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('brand_links', table => {
    table.comment('Названия брендов');
    table.increments('id');
    table.integer('brand_id').unsigned().notNullable().comment('Бренд');
    table.string('type').notNullable().comment('Тип');
    table.string('url').notNullable().comment('Ссылка');

    table.foreign('brand_id').references('id').inTable('brands');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('brand_links');
}
