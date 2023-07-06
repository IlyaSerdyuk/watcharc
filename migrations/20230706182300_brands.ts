import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('brands', table => {
    table.comment('Бренды');
    table.increments('id');
    table.string('title').notNullable().comment('Название');
    table.string('website').comment('Сайт');
    table.string('instagram').comment('Instagram');
    table.integer('year_founded').unsigned().comment('Год основания');
    table
      .enum('year_founded_accuracy', ['year', 'decade', 'century'])
      .comment('Точность года основания');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('brands');
}
