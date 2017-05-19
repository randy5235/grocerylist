const dbConfig = require('../config/dbConfig').dbConfig;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.url);

const List = sequelize.define('lists', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }
});

const Item = sequelize.define('items', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  isDone: {
    type: Sequelize.BOOLEAN
  }
});

Item.belongsTo(List);
List.sync();

// force: true will drop the table if it already exists
async function createList(req, res, next) {
  // console.log(req.body);
  const list = await List.create({
    title: req.body.title,
    description: req.body.description
  });
  req.list = list;
  next();
}

module.exports = { createList };
