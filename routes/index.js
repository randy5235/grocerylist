const isAuthorized = require('./user').isAuthorized;
const express = require('express');
const list = require('./list');
const user = require('./user');

const router = express.Router();

router.use('/', user);
// router.use(isAuthorized);
router.use('/', list);

module.exports = router;
