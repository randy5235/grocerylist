const createList = require('../controllers/listSchema').createList;
const getList = require('../controllers/listSchema').getList;
const deleteList = require('../controllers/listSchema').deleteList;
const createItem = require('../controllers/listSchema').createItem;
const deleteItem = require('../controllers/listSchema').deleteItem;
const getItem = require('../controllers/listSchema').getItem;
const isAuthenticated = require('../authentication/auth');
const express = require('express');

const router = express.Router();
// router.use(isAuthenticated());

// GET all lists for a user
router
  .route('/lists')
  .get((req, res) => {
    res.json({ message: 'Get All Lists' });
  });

// POST a new list for a user
router
  .route('/list')
  .post(createList, (req, res) => {
    res.json({ listId: req.list.id, title: req.list.title });
  });

// GET  or DELETE a specific list for a user
router.route('/list/:list')
  .get(getList, (req, res) => {
    res.json(req.list);
  })
  .delete(deleteList, (req, res) => {
    res.json(req.list);
  });

// GET all items for a specific list
router.route('/list/:list/items').get((req, res) => {
  res.json({ message: 'returns all list items for a single list' });
});

// POST a new item to a specific list
router
  .route('/list/:list/item')
  .post(createItem, (req, res) => {
    res.json(req.item);
  })
  .delete(deleteItem, (req, res) => {
    res.json(req.item);
  });

// GET a specific item from a specific list
router.route('/list/:list/item/:item')
  .get(getItem, (req, res) => {
    res.json(req.item);
  });

module.exports = router;
