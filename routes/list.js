const {
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
} = require('../controllers/listFunctions');

const express = require('express');
const hasValidSession = require('../lib/hasValidSession');

const router = express.Router();

router
  .use(hasValidSession);

router
  .route('/lists')
  .get(getAllLists, (req, res) => {
    res.json({ lists: res.locals.lists });
  });

router
  .route('/list')
  .post(createList, (req, res) => {
    res.json({
      listId: res.locals.list.id,
      title: res.locals.list.title,
      description: res.locals.list.description
    });
  });

router
  .route('/list/:list')
  .get(getList, (req, res) => {
    res.json(res.locals.list);
  })
  .patch(updateList, (req, res) => {
    res.json(res.locals.list);
  })
  .delete(deleteList, (req, res) => {
    res.json(res.locals.list);
  });

router
  .route('/list/:list/items')
  .get(getItems, (req, res) => {
    res.json({ list: req.list });
  });

router
  .route('/list/:list/item')
  .post(createItem, (req, res) => {
    res.json(req.item || req.error);
  });

router
  .route('/list/:list/item/:item')
  .get(getItem, (req, res) => {
    res.json(res.locals.item || res.locals.error);
  })
  .patch(updateItem, (req, res) => {
    res.json(req.item || req.error);
  })
  .delete(deleteItem, (req, res) => {
    res.json(res.local.item || req.error);
  });

router
  .route('/list/:list/addUser')
  .post(addUserToList, (req, res) => {
    res.json(res.locals.list || req.error);
  });

module.exports = router;
