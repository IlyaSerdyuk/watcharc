import 'server-only';

import knex from 'knex';

import knexConfig from '../../knexfile';
import { DB } from './DbTypes';

export class Db extends DB {}

export const db = new Db(knex(knexConfig));
