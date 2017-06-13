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
  },
  isRegistered: {
    type: Sequelize.BOOLEAN
  }
});
User.belongsToMany(List, { through: 'UserList' });
List.belongsToMany(User, { through: 'UserList' });
// force: true will drop the table if it already exists
sequelize.sync({ force: true }).catch(() => {
  winston.log('error', 'unable to sync database');
});

const userRegister = async (req, res, next) => {
  try {
    const password = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(8)
    );
    try {
      const user = await User.findOrCreate({
        where: { username: req.body.username, isRegistered: false },
        defaults: {
          password,
          isRegistered: true
        }
      });
      if (user[1] === false) {
        user[0].update({ password, isRegistered: true });
      }
      req.user = user[0];
      next();
    } catch (err) {
      res.json({ message: err.message });
    }
  } catch (err) {
    winston.log('error', err);
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
        username,
        isRegistered: true
      }
    });
    cb(null, user);
  } catch (err) {
    winston.log('error', err);
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
