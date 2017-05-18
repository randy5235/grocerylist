const dbConfig = require('../config/dbConfig').dbConfig;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.url);

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

// force: true will drop the table if it already exists
async function userRegister(req, res, next) {
  let sync = await User.sync({ force: true });
  let user = await User.create({
    username: req.body.username,
    password: req.body.password,
  });
  req.user = user;
  next();
}

async function getUser(req, res, next) {
  User.sync({ force: false });
  const user = await User.findOne({
    username: req.body.username,
  });

  req.user = user;
  next();
}

module.exports = { userRegister, getUser };
