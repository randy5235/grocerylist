const express = require('express');
const list = require('./list');
const user = require('./user');

const router = express.Router();

function isAuthorized() {
  return ((req, res, next) => {
    if (req.headers.authorized !== 'true') {
      return res.json({ message: 'NOT AUTHORIZED' });
    }
    next();
  });
}

router.use('/', user);
router.use(isAuthorized());
router.use('/', list);

module.exports = router;
