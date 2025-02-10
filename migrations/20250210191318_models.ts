import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('models', table => {
    table.comment('Модели');
    table.increments('id');
    table.integer('brand_id').unsigned().notNullable().comment('Бренд');
    table.string('reference').comment('Артикул');
    table.string('title').comment('Название');
    table.enum('gender', ['unisex', 'men', 'women', 'kids']).comment('Гендер');
    table.boolean('skeleton').comment('Скелетон');
    table
      .enum('movement_type', [
        'manual',
        'automatic',
        'quartz',
        'hybrid',
        'solar',
        'processor',
        'kinetic',
        'spring-drive',
      ])
      .comment('Тип механизма');
    table.string('cover_code').comment('Код обложки');
    table.enum('cover_ext', ['png', 'jpg']).comment('Расширение обложки');

    table.foreign('brand_id').references('id').inTable('brands');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('models');
}
