import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('countries', table => {
    table.comment('Страны');
    table.increments('id');
    table.string('code').notNullable();
    table.string('title_en').notNullable();
    table.string('title_fr').notNullable();
    table.string('title_de').notNullable();
    table.string('title_ru').notNullable();
    table.string('title_it').notNullable();
    table.string('title_es').notNullable();
  });

  await knex.schema.createTable('brands__countries', table => {
    table.comment('Страны брендов');
    table.increments();
    table.integer('brand_id').unsigned().notNullable();
    table.integer('country_id').unsigned().notNullable();
    table.enum('type', ['founded', 'current']);

    table.foreign('brand_id').references('id').inTable('brands');
    table.foreign('country_id').references('id').inTable('countries');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('brands__countries');
  await knex.schema.dropTable('countries');
}
