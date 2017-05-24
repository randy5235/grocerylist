const dbConfig = require('../config/dbConfig').dbConfig;
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.url);

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
sequelize.sync({ force: false });

async function userRegister(req, res, next) {
  // let sync = await User.sync({ force: true });
  const password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(8));
  const user = await User.create({
    username: req.body.username,
    password
  });
  req.user = user;
  next();
}

async function getUser(req, res, next) {
  const user = await User.findOne({
    username: req.body.username
  });
  req.user = user;
  next();
}

// const test = 'test';
// console.log(generateHash(test));
module.exports = { userRegister, getUser };
