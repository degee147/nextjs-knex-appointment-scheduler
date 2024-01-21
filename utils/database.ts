// import Knex from 'knex';
import knex, { Knex } from "knex";
import configs from '../knexfile';

export const db = knex(configs[process.env.NODE_ENV || 'development']);
// export const db = knex(configs.development);
export default db;