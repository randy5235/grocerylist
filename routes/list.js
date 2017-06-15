const {
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
  .patch(hasValidSession, updateList, (req, res) => {
    res.json(req.list);
  })
  // .patch method needed here
  .delete(hasValidSession, deleteList, (req, res) => {
    res.json(req.list);
  });

router.route('/list/:list/items').get(hasValidSession, getItems, (req, res) => {
  res.json({ list: req.list });
});

router.route('/list/:list/item').post(hasValidSession, createItem, (req, res) => {
  res.json(req.item || req.error);
});

router
  .route('/list/:list/item/:item')
  .get(hasValidSession, getItem, (req, res) => {
    res.json(req.item || req.error);
  })
  .patch(hasValidSession, updateItem, (req, res) => {
    res.json(req.item || req.error);
  })
  .delete(hasValidSession, deleteItem, (req, res) => {
    res.json(req.item || req.error);
  });
// will need to add a way to add another user to the list object
// need a way to remove a user from a list
// (check if user is last user on list and delete list if true)

module.exports = router;
