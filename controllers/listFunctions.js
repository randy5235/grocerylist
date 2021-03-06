const { List, Item, User } = require('./modelSchema');
const winston = require('winston');


const createList = async (req, res, next) => {
  try {
    const list = await List.create({
      title: req.body.title,
      description: req.body.description
    });
    await list.addUser(req.user.id);
    res.locals.list = list;
    next();
  } catch (err) {
    winston.log('error', err);
  }
};

const getAllLists = async (req, res, next) => {
  try {
    const user = req.user;
    const lists = await user.getLists();
    res.locals.lists = lists.map((list) => {
      const conciseList = {
        id: list.id,
        title: list.title,
        description: list.description,
        updated: list.updatedAt
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
        res.locals.list = list;
      }
    } else {
      res.locals.list = { error: 'Record does not exist' };
    }
    next();
  } catch (err) {
    winston.log('error', err); // replace with logger
  }
};
const updateList = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.list);
    if (list) {
      if (await list.hasUser(req.user.id)) {
        const listUpdate = await list.update(req.body);
        res.locals.list = listUpdate;
      }
    } else {
      res.locals.list = { error: 'Record does not exist' };
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
    let deletedList = false;
    const list = await List.findById(req.params.list, { include: [Item] });
    if (list !== null && await list.hasUser(req.user.id)) {
      const numberOfUsers = await list.getUsers();
      if (numberOfUsers.length === 1) {
        const deletedItems = await list.items.map(item => item.destroy());
        deletedList = await List.destroy({
          where: { id: req.params.list }
        });
      } else {
        deletedList = await list.removeUser(req.user.id);
      }
    }
    res.locals.list = deletedList
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
    res.locals.item = item;
  } catch (err) {
    res.locals.error = { error: 'An error has occurred! Please try again.' };
    winston.log('error', err);
  }
  next();
};

const getItems = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.list, { include: [Item] });
    if (list !== null && await list.hasUser(req.user.id)) {
      res.locals.list = list;
    }
  } catch (err) {
    res.locals.error = { error: 'Record does not exist' };
    winston.log('error', err);
  }
  next();
};

const getItem = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.list);
    if (await list.hasUser(req.user.id)) {
      const item = await Item.findById(req.params.item);
      res.locals.item = item;
    }
  } catch (err) {
    res.locals.error = { error: 'Item does not exist' };
    winston.log('error', err);
  }
  next();
};

const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.item);
    const itemUpdate = await item.update(req.body);
    res.locals.item = itemUpdate;
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
    req.local.item = item
      ? { message: 'Record successfully deleted' }
      : { error: 'Cannot delete record' };
    next();
  } catch (err) {
    winston.log('error', err);
  }
};

const addUserToList = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.list);
    if (list !== null && await list.hasUser(req.user.id)) {
      req.body.email = req.body.email.toLowerCase();
      const addNewListUser = await User.findOrCreate({ where: { username: req.body.email } });
      if (addNewListUser[1] === true) {
        addNewListUser[0].update({ isRegistered: false });
      }
      await list.addUser(addNewListUser[0].id);
      const userList = await list.getUsers().map(user => ({ username: user.username }));
      res.locals.list = { users: userList };
    }
    next();
  } catch (err) {
    winston.log('error', err); // replace with logger
  }
};

module.exports = {
  addUserToList,
  createList,
  getAllLists,
  getList,
  updateList,
  deleteList,
  createItem,
  getItem,
  deleteItem,
  getItems,
  updateItem
};
