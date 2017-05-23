const dbConfig = require('../config/dbConfig').dbConfig;
const bcrypt = require('bcrypt-nodejs');
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

sequelize.sync({force: false});

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

// checking if password is valid
// async function comparePassword(password) {
//     await bcrypt.compare(password, getUser);
// };

// force: true will drop the table if it already exists
async function userRegister(req, res, next) {
  // let sync = await User.sync({ force: true });
  let password = generateHash(req.body.password);
  console.log(password);
  const user = await User.create({
    username: req.body.username,
    password: generateHash(req.body.password)
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
