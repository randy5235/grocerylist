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
const userRegister = (req, res, next) => {
  // console.log(req.body);
  User.sync({force: true }).then(() =>
    // Table created
    User.create({
      username: req.body.username,
      password: req.body.password,
    }).then((user) => {
      req.user = user;
      next();
    })
  );
};

const getUser = (req, res, next) => {
  // console.log(req.body);
  User.sync({force: false }).then(() =>
    // Table created
    User.findOne({
      username: req.body.username,
    }).then((user) => {
      req.user = user;
      next();
    })
  );
};
module.exports = { userRegister, getUser };
