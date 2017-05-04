const express = require('express');

const router = express.Router();
router.route('/login')
  .get((req, res) => {
    res.json({ message: 'Welcome to login' });
  });

router.route('/logout')
  .post((req, res) => {
    res.json({ message: 'Thank you, come again!' });
  });

module.exports = router;
