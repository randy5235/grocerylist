const createList = require('../controllers/listSchema').createList;
const isAuthenticated = require('../authentication/auth');
const express = require('express');

const router = express.Router();
//router.use(isAuthenticated());
router
  .route('/lists')
  .get((req, res) => {
    res.json({ message: 'Get All Lists' });
  });

router
  .route('/list')
  .post(createList, (req, res) => {
    res.json({ listId: req.list.id, title: req.list.title });
  });

router.route('/list/:list').get((req, res) => {
  const returnString = `Getting Specific List ${req.params.list}`;
  res.json({ message: returnString });
});

router.route('/list/:list/items').get((req, res) => {
  res.json({ message: 'returns all list items for a single list' });
});

router
  .route('/list/:list/item')
  .post((req, res) => {
    res.json({ message: 'creates a single item associated with a list' });
  });

router.route('/list/:list/item/:item').get((req, res) => {
  res.json({ message: 'returns a specific item from a specific list' });
});

module.exports = router;
