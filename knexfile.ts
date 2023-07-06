import { loadEnvConfig } from '@next/env';
import type { Knex } from 'knex';

const dev = process.env.NODE_ENV !== 'production';
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = loadEnvConfig(
  './',
  dev,
).combinedEnv;

const knexConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: DB_HOST || 'localhost',
    port: parseInt(DB_PORT || '3306', 10),
    database: DB_NAME || 'watches',
    user: DB_USER || 'watches',
    password: DB_PASSWORD || 'watches',
    decimalNumbers: true,
    charset: 'utf8mb4',
  },
  migrations: {
    directory: './migrations',
  },
};

export default knexConfig;
