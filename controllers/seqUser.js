const dbConfig = require('../config/dbConfig').dbConfig;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.url);

const User = sequelize.define('user', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    field: 'id',
  },
  username: {
    type: Sequelize.STRING,
    field: 'username',
  },
  password: {
    type: Sequelize.STRING,
    field: 'password',
  },
});

// force: true will drop the table if it already exists
User.sync({ force: false }).then(() =>
  // Table created
   User.create({
     username: 'Randy',
     password: 'test',
   }));
