import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('brands', table => {
    table
      .string('alternative_titles')
      .after('title')
      .comment('Другие названия');
    table
      .string('alias', 63)
      .after('alternative_titles')
      .comment('Псевдоним в URL');
    table.integer('year_closed').unsigned().comment('Год закрытия');
    table
      .enum('year_closed_accuracy', ['year', 'decade', 'century'])
      .comment('Точность года закрытия');
    table
      .string('website_in_wayback')
      .after('website')
      .comment('Сайт в Архиве интернета');
    table.string('address', 511).comment('Адрес');
    table.string('place_id', 27).comment('Google Maps Place ID');
    table.string('phone', 127).comment('Телефон');
    table.string('email', 127).comment('Эл.почта');
    table
      .enum('credibility', ['open-source', 'retailer', 'owner'])
      .comment('Качество данных');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('brands', table => {
    table.dropColumns(
      'alternative_titles',
      'alias',
      'year_closed',
      'year_closed_accuracy',
      'website_in_wayback',
      'address',
      'place_id',
      'phone',
      'email',
      'credibility',
    );
  });
}
