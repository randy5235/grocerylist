const myPool = require('../controllers/dbUsers');
const express = require('express');

const router = express.Router();

router.route('/register').post((req, res) => {
  res.json({ message: 'OK' });
});
router
  .route('/login')
  .post(myPool, (req, res) => res.json({ username: req.result }));

router.route('/logout').post((req, res) => {
  res.json({ message: 'OK' });
});

module.exports = router;
