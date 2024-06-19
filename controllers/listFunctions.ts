import Model from 'sequelize/types/model';
import { List, Item, User, UserAttributes } from './modelSchema';
const winston = require('winston');
import type { Request, Response, NextFunction, RequestHandler } from 'express';


const createList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await List.create({
      title: req.body.title,
      description: req.body.description
    });
    await list.addUser((req?.user as UserAttributes)?.id);
    res.locals.list = list;
    next();
  } catch (err) {
    winston.log('error', err);
  }
};

const getAllLists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const lists = await (user as unknown as any)?.getLists();
    res.locals.lists = lists.map((list: any) => {
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
    next(err);
  }
};

const getList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await List.findById(req.params.list);
    if (list) {
      if (await list.hasUser((req?.user as UserAttributes)?.id)) {
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
const updateList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await List.findById(req.params.list);
    if (list) {
      if (await list.hasUser((req?.user as UserAttributes)?.id)) {
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
const deleteList = async (req: Request, res: Response, next: NextFunction) => {
  /* eslint no-unused-vars: "off" */
  try {
    const { id } = req.user as UserAttributes;
    let deletedList = false;
    const list = await List.findById(req.params.list, { include: [Item] });
    if (list !== null && await list.hasUser((req?.user as UserAttributes)?.id)) {
      const numberOfUsers = await list.getUsers();
      if (numberOfUsers.length === 1) {
        const deletedItems = await list.items.map((item: { destroy: () => any; }) => item.destroy());
        deletedList = await List.destroy({
          where: { id: req.params.list }
        });
      } else {
        deletedList = await list.removeUser(id);
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

const createItem = async (req: Request, res: Response, next: NextFunction) => {
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

const getItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user as UserAttributes;
    const list = await List.findById(req.params.list, { include: [Item] });
    if (list !== null && await list.hasUser(id)) {
      res.locals.list = list;
    }
  } catch (err) {
    res.locals.error = { error: 'Record does not exist' };
    winston.log('error', err);
  }
  next();
};

const getItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user as UserAttributes;
    const list = await List.findById(req.params.list);
    if (await list.hasUser(id)) {
      const item = await Item.findById(req.params.item);
      res.locals.item = item;
    }
  } catch (err) {
    res.locals.error = { error: 'Item does not exist' };
    winston.log('error', err);
  }
  next();
};

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
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
const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await Item.destroy({
      where: { id: req.params.item }
    });
    res.locals.item = item
      ? { message: 'Record successfully deleted' }
      : { error: 'Cannot delete record' };
    next();
  } catch (err) {
    winston.log('error', err);
  }
};

const addUserToList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user as UserAttributes;
    const list = await List.findById(req.params.list);
    if (list !== null && await list.hasUser(id)) {
      req.body.email = req.body.email.toLowerCase();
      const addNewListUser = await User.findOrCreate({ where: { username: req.body.email } });
      if (addNewListUser[1] === true) {
        addNewListUser[0].update({ isRegistered: false });
      }
      const { id } = addNewListUser[0] as unknown as UserAttributes;
      await list.addUser(id);
      const userList = await list.getUsers().map((user: { username: any; }) => ({ username: user.username }));
      res.locals.list = { users: userList };
    }
    next();
  } catch (err) {
    winston.log('error', err); // replace with logger
  }
};

export {
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
