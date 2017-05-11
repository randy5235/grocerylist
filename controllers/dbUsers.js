const dbConfig = require('../config/dbConfig');
const pg = require('pg');

const pool = new pg.Pool(dbConfig);

const query = 'SELECT * FROM users where username = $1';
function myPool(req, res, next) {
  pool.connect((err, client, done) => {
    const username = req.body.username;
    // console.log(username);
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query(query, [username], (err, result) => {
      // call `done(err)` to release the client back to the pool
      // (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('error running query', err);
      }
      // console.log(result.rows[0]);
      // console.log(result);
      req.result = result.rows[0].username;
      next();
      // return result.rows[0].username;
    });
  });
}

pool.on('error', (err, client) => {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack);
});

module.exports = myPool;
