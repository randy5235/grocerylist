const express = require('express');

const router = express.Router();
router.route('/login')
  .get((req, res) => {
    res.json('Welcome to login');
  });


module.exports = router;
