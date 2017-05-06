const express = require('express');
const list = require('./list');
const user = require('./user');

const router = express.Router();

function isAuthorized(req, res, next) {
  console.log(req.headers);
  if (req.headers.authorized === 'true') {
    next();
  } else {
    return res.json({ message: 'NOT AUTHORIZED' });
  }
}

router.use('/', user);
router.use(isAuthorized);
router.use('/', list);

module.exports = router;
