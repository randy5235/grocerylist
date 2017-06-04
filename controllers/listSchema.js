const { dbConfig } = require('../config/dbConfig');
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
List.hasMany(Item);

List.sync({ force: false })
  .catch(() => { console.log('unable to sync database'); });
Item.sync({ force: false })
  .catch(() => { console.log('unable to sync database'); });


// force: true will drop the table if it already exists
const createList = async (req, res, next) => {
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
  req.lists = lists.map((list) => {
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
    console.log(err); // replace with logger
  }
};

// adding for integration test
const deleteList = async (req, res, next) => {
  const items = await List.findById(req.params.list, { include: [Item] });
  const deletedItems = await items.items.map((item) => item.destroy());
  const list = await List.destroy({
    where: { id: req.params.list }
  });
  req.list = list ? { message: 'Record successfully deleted' } : { error: 'Cannot delete record' };
  next();
};

const createItem = async (req, res, next) => {
  const item = await Item.create({
    title: req.body.title,
    description: req.body.description,
    isDone: false,
    listId: req.params.list
  });
  req.item = item;
  next();
};

const getItems = async (req, res, next) => {
  const list = await List.findById(req.params.list, { include: [Item] });
  if (await list.hasUser(req.user.id)) {
    req.list = list;
    next();
  } else {
    req.list = { error: 'Record does not exist' };
    next();
  }
};

const getItem = async (req, res, next) => {
  const list = await List.findById(req.params.list);
  if (await list.hasUser(req.user.id)) {
    const item = await Item.findById(req.params.item);
    req.item = item;
    next();
  } else {
    req.item = { error: 'Item does not exist' };
    next();
  }
};

const updateItem = async (req, res, next) => {
  const item = await Item.findById(req.params.item);
  const itemUpdate = await item.update(req.body);
  req.item = itemUpdate;
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
