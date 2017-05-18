const dbConfig = require('../config/dbConfig').dbConfig;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.url);

const List = sequelize.define('lists', {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
});

const Item = sequelize.define('items', {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  isDone: {
    type: Sequelize.BOOLEAN,
  },
});


// force: true will drop the table if it already exists
const createList = (req, res, next) => {
  // console.log(req.body);
  List.sync({ force: true }).then(() =>
    // Table created
    List.create({
      username: req.body.username,
      password: req.body.password,
    }).then((user) => {
      req.user = user;
      next();
    })
  );
};
module.exports = { userRegister };
