const dbConfig = require('../config/dbConfig').dbConfig;
const Sequelize = require('sequelize');
const User = require('./userSchema').User;
const findById = require('./userSchema').findById;


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
List.sync({ force: false });
Item.sync({ force: false });

// force: true will drop the table if it already exists
const createList = async (req, res, next) => {
  // console.log(req.body);
  const list = await List.create({
    title: req.body.title,
    description: req.body.description
  });
  list.addUser(req.user.id);
  req.list = list;
  next();
};

const getAllLists = async (req, res, next) => {
  const user = req.user;
  const lists = await user.getLists();
  req.lists = lists.map(list => {
    const conciseList = {
      id: list.id,
      title: list.title,
      description: list.description
    };
    return conciseList;
  });
  next();
};

const getList = async (req, res, next) => {
  const list = await List.findById(req.params.list);
  console.log(await list.hasUser(req.user.id));
  if (await list.hasUser(req.user.id)) {
    req.list = list;
    next();
  } else {
    req.list = { error: 'Record does not exist' };
    next();
  }
};

// adding for integration test
const deleteList = async (req, res, next) => {
  const list = await List.destroy({
    where: { id: req.params.list }
  });
  req.list = list ? { message: 'Record successfully deleted' } : { error: 'Cannot delete record' };
  next();
};

const createItem = async (req, res, next) => {
  // console.log(req.body);
  const item = await Item.create({
    title: req.body.title,
    description: req.body.description,
    isDone: false,
    listId: req.params.list
  });
  req.item = item;
  next();
};

const getItem = async (req, res, next) => {
  const item = await List.findById(req.params.item);
  req.item = item;
  next();
};

// adding for integration test
const deleteItem = async (req, res, next) => {
  const item = await Item.destroy({
    where: { id: req.params.item }
  });
  req.item = item ? { message: 'Record successfully deleted' } : { error: 'Cannot delete record' };
  next();
};

module.exports = { List, createList, getAllLists, getList, deleteList, createItem, getItem, deleteItem };
