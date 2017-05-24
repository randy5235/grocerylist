const express = require('express');
const registerUser = require('../controllers/userSchema').userRegister;
const getUser = require('../controllers/userSchema').getUser;

const router = express.Router();

router.route('/register').post(registerUser, (req, res) => {
  res.json({ userId: req.user.id, username: req.user.username });
});
router
  .route('/login')
  .post(getUser, (req, res) => res.json({ username: req.user.username }));

router.route('/logout').post((req, res) => {
  res.json({ message: 'OK' });
});

module.exports = router;
