const { dbConfig } = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const { List } = require('./listSchema');
const winston = require('winston');

winston.level = 'debug';
// winston.add(winston.transports.File, { filename: 'somefile.log' });

const sequelize = new Sequelize(dbConfig.url);

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  }
});
User.belongsToMany(List, { through: 'UserList' });
List.belongsToMany(User, { through: 'UserList' });
// force: true will drop the table if it already exists
sequelize.sync({ force: false }).catch(() => {
  winston.log('unable to sync database');
});

const userRegister = async (req, res, next) => {
  try {
    const password = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(8)
    );
    try {
      const user = await User.create({
        username: req.body.username,
        password
      });
      req.user = user;
      next();
    } catch (err) {
      res.json({ message: err.message });
    }
  } catch (err) {
    winston.log(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username
    });
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordValid) {
      req.user = user;
      next();
    } else {
      res.json({ error: 'Username or Password is incorrect' });
    }
  } catch (err) {
    winston.log(err);
  }
};

const getUserByUsername = async (username, cb) => {
  try {
    const user = await User.findOne({
      where: {
        username
      }
    });
    cb(null, user);
  } catch (err) {
    winston.log(err);
  }
};

const findById = async (id, cb) => {
  try {
    const user = await User.findOne({
      where: {
        id
      }
    });
    cb(null, user);
  } catch (err) {
    winston.log(err);
  }
};

module.exports = { User, userRegister, getUser, getUserByUsername, findById };
