const dbConfig = require('../config/dbConfig');
const express = require('express');
const pg = require('pg');


var pool = new pg.Pool(dbConfig);

pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    //call `done(err)` to release the client back to the pool (or destroy it if there is an error) 
    done(err);
 
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
    //output: 1 
  });
});
 
pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool 
  // the pool itself will emit an error event with both the error and 
  // the client which emitted the original error 
  // this is a rare occurrence but can happen if there is a network partition 
  // between your application and the database, the database restarts, etc. 
  // and so you might want to handle it and at least log it out 
  console.error('idle client error', err.message, err.stack)
})

const router = express.Router();
router
  .route('/login')
  .post((req, res) => res.json({ message: 'Thank you for logging in!' }));

router.route('/logout').post((req, res) => {
  res.json({ message: 'Thank you, come again!' });
});

module.exports = router;
