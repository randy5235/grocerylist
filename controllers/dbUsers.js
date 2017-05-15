const dbConfig = require('../config/dbConfig').dbConfig;
const pg = require('pg');

const pool = new pg.Pool(dbConfig);

const query = 'SELECT * FROM users where username = $1';
// function myPool(req, res, next) {
//   pool.connect((err, client, done) => {
//     const username = req.body.username;
//     // console.log(username);
//     if (err) {
//       return console.error('error fetching client from pool', err);
//     }
//     client.query(query, [username], (err, result) => {
//       // call `done(err)` to release the client back to the pool
//       // (or destroy it if there is an error)
//       done(err);

//       if (err) {
//         return console.error('error running query', err);
//       }
//       // console.log(result.rows[0]);
//       // console.log(result);
//       req.result = result.rows[0].username;
//       next();
//       // return result.rows[0].username;
//     });
//   });
// }

// pool.on('error', (err, client) => {
//   // if an error is encountered by a client while it sits idle in the pool
//   // the pool itself will emit an error event with both the error and
//   // the client which emitted the original error
//   // this is a rare occurrence but can happen if there is a network partition
//   // between your application and the database, the database restarts, etc.
//   // and so you might want to handle it and at least log it out
//   console.error('idle client error', err.message, err.stack);
// });

const myPool = (async (req, res, next) => {
  try {
    const result = await pool.query(query, [req.body.username]);
    req.result = result.rows[0].username;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send('UNAUTHORIZED');
  }
});
  // pool.query(query, [req.body.username], (err, result) => {
  //   if (err) {
  //     res.status(500).json({ message: 'Server error' });
  //   }
  //   if (result.rows.length > 0) {
  //     req.result = result.rows[0].username;
  //     next();
  //   } else {
  //     res
  //       .status(401)
  //       .json({
  //         message: 'Authentication error, please check your credentials and try again.',
  //       });
  //   }
  // });
// });
// const myPool = (req, res, next) => {
//  pool.query(query, [req.body.username], (err, result) => {
    // console.log(res.rows.length);
    // console.log(err);
//    if (result.rows.length > 0) {
 //     req.result = result.rows[0].username;
 //     next();
 //   } else {
 //     res.status(401).send('ERROR');
 //   }
 // });
//};

module.exports = myPool;
