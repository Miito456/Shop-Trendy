const { Pool } = require('pg');
require('dotenv').config();

const ssl = process.env.DB_SSL === 'false'
  ? false
  : { rejectUnauthorized: false };

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl
    }
  : {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 5432),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl
    };

const pool = new Pool(poolConfig);

module.exports = pool;
