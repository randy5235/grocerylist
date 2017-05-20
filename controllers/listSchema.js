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
Item.sync();

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

async function getList(req, res, next) {
  const list = await List.findById(req.params.list);
  req.list = list;
  next();
}

// adding for integration test
async function deleteList(req, res, next) {
  const list = await List.destroy({
    where: { id: req.params.list }
  });
  req.list = list ? { message: 'Record successfully deleted' } : { error: 'Cannot delete record' };
  next();
}

async function createItem(req, res, next) {
  // console.log(req.body);
  const item = await Item.create({
    title: req.body.title,
    description: req.body.description,
    isDone: false,
    listId: req.params.list
  });
  req.item = item;
  next();
}

async function getItem(req, res, next) {
  const item = await List.findById(req.params.item);
  req.item = item;
  next();
}

// adding for integration test
async function deleteItem(req, res, next) {
  const item = await Item.destroy({
    where: { id: req.params.item }
  });
  req.item = item ? { message: 'Record successfully deleted' } : { error: 'Cannot delete record' };
  next();
}

module.exports = { createList, getList, deleteList, createItem, getItem, deleteItem };
