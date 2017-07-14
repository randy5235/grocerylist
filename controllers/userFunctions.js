const bcrypt = require('bcrypt');
const { User } = require('./modelSchema');
const winston = require('winston');

const userRegister = async (req, res, next) => {
  try {
    const password = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(8)
    );
    try {
      req.body.username = req.body.username.toLowerCase();
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
    req.body.username = req.body.username.toLowerCase();
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

const getUserByUsername = async (username) => {
  let user = false;
  try {
    user = await User.findOne({
      where: {
        username: username.toLowerCase(),
        isRegistered: true
      }
    });
  } catch (err) {
    winston.log('error', err);
  }
  return user;
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

module.exports = { userRegister, getUser, getUserByUsername, findById };
