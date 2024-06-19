import {
  addUserToList,
  createList,
  getList,
  updateList,
  deleteList,
  createItem,
  deleteItem,
  getItem,
  getAllLists,
  getItems,
  updateItem
} from '../controllers/listFunctions';

import express from 'express';
import hasValidSession from '../lib/hasValidSession';
import type { Request, Response, NextFunction } from "express";

const router = express.Router();

router
  .use(hasValidSession);

router
  .route('/lists')
  .get(getAllLists, (req: Request, res: Response, next: NextFunction) => {
    res.json({ lists: res.locals.lists });
  });

router
  .route('/list')
  .post(createList, (req: Request, res: Response) => {
    res.json({
      listId: res.locals.list.id,
      title: res.locals.list.title,
      description: res.locals.list.description
    });
  });

router
  .route('/list/:list')
  .get(getList, async (req: Request, res: Response, next: NextFunction) => {
    res.json(res.locals.list);
  })
  .patch(updateList, (req: Request, res: Response, next: NextFunction) => {
    res.json(res.locals.list);
  })
  .delete(deleteList, (req: Request, res: Response, next: NextFunction) => {
    res.json(res.locals.list);
  });

router
  .route('/list/:list/items')
  .get(getItems, (req: Request, res: Response) => {
    res.json(res.locals.list ? { list: res.locals.list } : res.locals.error);
  });

router
  .route('/list/:list/item')
  .post(createItem, (req: Request, res: Response) => {
    res.json(res.locals.item || res.locals.error);
  });

router
  .route('/list/:list/item/:item')
  .get(getItem, (req: Request, res: Response) => {
    res.json(res.locals.item || res.locals.error);
  })
  .patch(updateItem, (req: Request, res: Response) => {
    res.json(res.locals.item || res.locals.error);
  })
  .delete(deleteItem, (req: Request, res: Response) => {
    res.json(res?.locals?.item);
  });

router
  .route('/list/:list/addUser')
  .post(addUserToList, (req: Request, res: Response) => {
    res.json(res.locals.list);
  });

export default router;
