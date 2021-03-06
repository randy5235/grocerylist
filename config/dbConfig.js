const config = require('./db.json');

const dbConfig = {
  user: config.user, // env var: PGUSER
  database: config.database, // env var: PGDATABASE
  password: config.password, // env var: PGPASSWORD
  host: config.server, // Server hosting the postgres database
  port: 5432, // env var: PGPORT
  max: 1, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  url: config.URL,
};

const sessionSecret = { ...config.sessionSecret };

module.exports = { dbConfig, sessionSecret };
