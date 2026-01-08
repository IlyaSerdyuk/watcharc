import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(
    'ALTER TABLE `models` CHANGE `movement_type` `movement_type` enum("manual","automatic","quartz","hybrid","solar","processor","kinetic","spring-drive","smart") NULL COMMENT "Тип механизма"',
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(
    'ALTER TABLE `models` CHANGE `movement_type` `movement_type` enum("manual","automatic","quartz","hybrid","solar","processor","kinetic","spring-drive") NULL COMMENT "Тип механизма"',
  );
}
