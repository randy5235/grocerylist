// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql'|'sqlite'|'postgres'|'mssql',

//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },

//   // SQLite only
//   storage: 'path/to/database.sqlite'
// });

// Or you can simply use a connection uri
const dbConfig = require('../config/dbConfig').dbConfig;
const Sequelize = require('sequelize');
// console.log(÷);
const sequelize = new Sequelize(dbConfig.url);

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });


  var User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    username: 'John',
    password: 'test'
  });
});