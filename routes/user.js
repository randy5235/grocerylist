const express = require('express');
const { userRegister } = require('../controllers/userSchema');
const passport = require('passport');

const router = express.Router();

router
  .route('/register').post(userRegister, (req, res) => {
    res.json({ userId: req.user.id, username: req.user.username });
  });

router
  .route('/login')
  .post(passport.authenticate('local', {}), (req, res) => res.json({ username: req.user.username }));

router.route('/logout').post((req, res) => {
  res.json({ message: 'OK' });
});

module.exports = router;
