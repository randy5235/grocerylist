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

// const hasValidSession = (req, res, next) => {
//   if (req.user) {
//     next();
//   } else {
//     res.json({ error: 'Please log in first.' });
//   }
// };

router
  .use('/list', hasValidSession);

router
  .route('/lists')
  .get(getAllLists, (req, res) => {
    res.json({ lists: req.lists });
  });

router
  .route('/list')
  .post(createList, (req, res) => {
    res.json({
      listId: req.list.id,
      title: req.list.title,
      description: req.list.description
    });
  });

router
  .route('/list/:list')
  .get(getList, (req, res) => {
    res.json(req.list);
  })
  .patch(updateList, (req, res) => {
    res.json(req.list);
  })
  .delete(deleteList, (req, res) => {
    res.json(req.list);
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
    res.json(req.item || req.error);
  })
  .patch(updateItem, (req, res) => {
    res.json(req.item || req.error);
  })
  .delete(deleteItem, (req, res) => {
    res.json(req.item || req.error);
  });

router
  .route('/list/:list/addUser')
  .post(addUserToList, (req, res) => {
    res.json(req.list || req.error);
  });
// will need to add a way to add another user to the list object
// need a way to remove a user from a list
// (check if user is last user on list and delete list if true)

module.exports = router;
