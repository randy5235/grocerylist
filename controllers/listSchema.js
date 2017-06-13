const { dbConfig } = require('../config/dbConfig');
const Sequelize = require('sequelize');
const winston = require('winston');

winston.level = 'debug';
winston.add(winston.transports.File, {
  filename: `./logs/${new Date().toISOString()}.log`,
  level: 'verbose'
});

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

Item.belongsTo(List, { foreignKeyConstraint: true, foreignKey: 'listId' });
List.hasMany(Item);

List.sync({ force: false }).catch(() => {
  winston.debug('error', 'unable to sync database');
});
// for ( let a = 0; a <=30000; a++) { a++; console.log(a);}

Item.sync({ force: false }).catch(() => {
  winston.log('error', 'unable to sync database');
});

// force: true will drop the table if it already exists
const createList = async (req, res, next) => {
  try {
    const list = await List.create({
      title: req.body.title,
      description: req.body.description
    });
    list.addUser(req.user.id);
    req.list = list;
    next();
  } catch (err) {
    winston.log('error', err);
  }
};

const getAllLists = async (req, res, next) => {
  try {
    const user = req.user;
    const lists = await user.getLists();
    req.lists = lists.map((list) => {
      const conciseList = {
        id: list.id,
        title: list.title,
        description: list.description
      };
      return conciseList;
    });
    next();
  } catch (err) {
    winston.log('error', err);
  }
};

const getList = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.list);
    if (list) {
      if (await list.hasUser(req.user.id)) {
        req.list = list;
      }
    } else {
      req.list = { error: 'Record does not exist' };
    }
    next();
  } catch (err) {
    winston.log('error', err); // replace with logger
  }
};

// adding for integration test
const deleteList = async (req, res, next) => {
  /* eslint no-unused-vars: "off" */
  try {
    const items = await List.findById(req.params.list, { include: [Item] });
    const deletedItems = await items.items.map(item => item.destroy());
    const list = await List.destroy({
      where: { id: req.params.list }
    });
    req.list = list
      ? { id: req.params.list, message: 'Record successfully deleted', deleted: true }
      : { error: 'Cannot delete record' };
    next();
  } catch (err) {
    winston.log('error', err);
  }
};

const createItem = async (req, res, next) => {
  try {
    const item = await Item.create({
      title: req.body.title,
      description: req.body.description,
      isDone: false,
      listId: req.params.list
    });
    req.item = item;
  } catch (err) {
    req.error = { error: 'An error has occurred! Please try again.' };
    winston.log('error', err);
  }
  next();
};

const getItems = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.list, { include: [Item] });
    if (list !== null && await list.hasUser(req.user.id)) {
      req.list = list;
    }
  } catch (err) {
    req.error = { error: 'Record does not exist' };
    winston.log('error', err);
  }
  next();
};

const getItem = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.list);
    if (await list.hasUser(req.user.id)) {
      const item = await Item.findById(req.params.item);
      req.item = item;
    }
  } catch (err) {
    req.error = { error: 'Item does not exist' };
    winston.log('error', err);
  }
  next();
};

const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.item);
    const itemUpdate = await item.update(req.body);
    req.item = itemUpdate;
    next();
  } catch (err) {
    winston.log('error', err);
  }
};

// adding for integration test
const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.destroy({
      where: { id: req.params.item }
    });
    req.item = item
      ? { message: 'Record successfully deleted' }
      : { error: 'Cannot delete record' };
    next();
  } catch (err) {
    winston.log('error', err);
  }
};

module.exports = {
  List,
  createList,
  getAllLists,
  getList,
  deleteList,
  createItem,
  getItem,
  deleteItem,
  getItems,
  updateItem
};
