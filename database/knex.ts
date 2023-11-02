const knex = require('knex');
require('dotenv').config();

const getKnexConfig = () => {
  if (process.env.NODE_ENV) {
    const config = require('../knexfile')[process.env.NODE_ENV];
    return config;
  }
}

module.exports = knex(getKnexConfig());