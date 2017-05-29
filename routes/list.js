const createList = require('../controllers/listSchema').createList;
const getList = require('../controllers/listSchema').getList;
const deleteList = require('../controllers/listSchema').deleteList;
const createItem = require('../controllers/listSchema').createItem;
const deleteItem = require('../controllers/listSchema').deleteItem;
const getItem = require('../controllers/listSchema').getItem;
const getAllLists = require('../controllers/listSchema').getAllLists;
const getItems = require('../controllers/listSchema').getItems;
// const isAuthenticated = require('../authentication/auth');
const express = require('express');
// const passport = require('passport');

const router = express.Router();
// router.use(isAuthorized);
const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.json({ error: 'Please log in first.' });
  }
};
// GET all lists for a user
router
  .route('/lists')
  .get(loggedIn, getAllLists, (req, res) => {
    res.json({ lists: req.lists });
  });

// POST a new list for a user
router
  .route('/list')
  .post(loggedIn, createList, (req, res) => {
    res.json({
      listId: req.list.id,
      title: req.list.title,
      description: req.list.description
    });
  });

// GET  or DELETE a specific list for a user
router.route('/list/:list')
  .get(loggedIn, getList, (req, res) => {
    res.json(req.list);
  })
  .delete(loggedIn, deleteList, (req, res) => {
    res.json(req.list);
  });

// GET all items for a specific list
router.route('/list/:list/items')
  .get(loggedIn, getList, getItems, (req, res) => {
    res.json({ items: req.items });
  });

// POST a new item to a specific list
router
  .route('/list/:list/item')
  .post(loggedIn, createItem, (req, res) => {
    res.json(req.item);
  })
  .delete(deleteItem, (req, res) => {
    res.json(req.item);
  });

// GET a specific item from a specific list
router.route('/list/:list/item/:item')
  .get(loggedIn, getItem, (req, res) => {
    res.json(req.item);
  });

module.exports = router;
