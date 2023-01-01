const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'jobs',
  password: 'Akoa2018-',
  port: 5432,
});

module.exports = pool;
