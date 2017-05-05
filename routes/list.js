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

module.exports = router;
