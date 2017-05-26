const dbConfig = require('../config/dbConfig').dbConfig;
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

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

// force: true will drop the table if it already exists
sequelize.sync({ force: false });

const userRegister = async (req, res, next) => {
  const password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(8));
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
};

const getUser = async (req, res, next) => {
  const user = await User.findOne({
    username: req.body.username
  });
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (isPasswordValid) {
    req.user = user;
    next();
  } else {
    res.json({ error: 'Username or Password is incorrect' });
  }
};

const getUserByUsername = async (username, cb) => {
  console.log(username);
  const user = await User.findOne({
    where: {
      username
    }
  });
  //console.log(`called from here: ${user}`);
  cb(null, user);
};

const findById = async (id, cb) => {
  const user = await User.findOne({
    where: {
      id
    }
  });
  console.log(`called from here: ${user}`);
  cb(null, user);
};

module.exports = { userRegister, getUser, getUserByUsername, findById };
