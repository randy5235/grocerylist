const express = require('express');

const router = express.Router();
router
  .route('/lists')
  .get((req, res) => {
    res.json({ message: 'Get All Lists' });
  });

router.route('/list/:list').get((req, res) => {
  const returnString = `Getting Specific List ${req.params.list}`;
  res.json({ message: returnString });
});

router.route('/list/:list/items').get((req, res) => {
  res.json({ message: 'returns all list items for a single list' });
});

router.route('/list/:list/item/:item').get((req, res) => {
  res.json({ message: 'returns a specific item from a specific list' });
});



module.exports = router;
