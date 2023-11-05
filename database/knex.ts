import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

const getKnexConfig = () => {
  if (process.env.NODE_ENV) {
    const config = require('../knexfile')[process.env.NODE_ENV];
    return config;
  }
}

export default knex(getKnexConfig());