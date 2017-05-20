const createList = require('../controllers/listSchema').createList;
const getList = require('../controllers/listSchema').getList;
const deleteList = require('../controllers/listSchema').deleteList;
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

// GET a specific list for a user
router.route('/list/:list')
  .get(getList, (req, res) => {
  //  const returnString = `Getting Specific List ${req.params.list}`;
    res.json(req.list);
  });

// DELETE a specific list for a user
router.route('/list/:list')
  .delete(deleteList, (req, res) => {
  //  const returnString = `Getting Specific List ${req.params.list}`;
    res.json(req.list);
  });

// GET all items for a specific list
router.route('/list/:list/items').get((req, res) => {
  res.json({ message: 'returns all list items for a single list' });
});

// POST a new item to a specific list
router
  .route('/list/:list/item')
  .post((req, res) => {
    res.json({ message: 'creates a single item associated with a list' });
  });

// GET a specific item from a specific list
router.route('/list/:list/item/:item').get((req, res) => {
  res.json({ message: 'returns a specific item from a specific list' });
});

module.exports = router;
