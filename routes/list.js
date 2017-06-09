const {
  createList,
  getList,
  deleteList,
  createItem,
  deleteItem,
  getItem,
  getAllLists,
  getItems,
  updateItem
} = require('../controllers/listSchema');

const express = require('express');

const router = express.Router();

const hasValidSession = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.json({ error: 'Please log in first.' });
  }
};

router.route('/lists').get(hasValidSession, getAllLists, (req, res) => {
  res.json({ lists: req.lists });
});

router.route('/list').post(hasValidSession, createList, (req, res) => {
  res.json({
    listId: req.list.id,
    title: req.list.title,
    description: req.list.description
  });
});

router
  .route('/list/:list')
  .get(hasValidSession, getList, (req, res) => {
    res.json(req.list);
  })
  .delete(hasValidSession, deleteList, (req, res) => {
    res.json(req.list);
  });

router.route('/list/:list/items').get(hasValidSession, getItems, (req, res) => {
  res.json({ list: req.list });
});

router.route('/list/:list/item').post(hasValidSession, createItem, (req, res) => {
  res.json(req.item);
});

router
  .route('/list/:list/item/:item')
  .get(hasValidSession, getItem, (req, res) => {
    res.json(req.item);
  })
  .patch(hasValidSession, updateItem, (req, res) => {
    res.json(req.item);
  })
  .delete(hasValidSession, deleteItem, (req, res) => {
    res.json(req.item);
  });
// will need to add a way to add another user to the list object
// need a way to remove a user from a list
// (check if user is last user on list and delete list if true)

module.exports = router;
