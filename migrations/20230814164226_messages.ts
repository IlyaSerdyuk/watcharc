import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('messages', table => {
    table.comment('Сообщения с сайта');
    table.increments('id');
    table
      .timestamp('datetime')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      .comment('Дата и время');
    table.string('message', 2000).comment('Сообщение');
    table.string('email').comment('Эл.почта');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('messages');
}
