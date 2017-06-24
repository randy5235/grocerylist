const express = require('express');
const { userRegister } = require('../controllers/userFunctions');
const passport = require('passport');
const { validateRegistration } = require('../lib/validation');

const router = express.Router();

router
  .route('/register').post(validateRegistration, userRegister, passport.authenticate('local', {}), (req, res) => {
    res.json({ userId: req.user.id, username: req.user.username });
  });

router
  .route('/login')
  .post(passport.authenticate('local', {}), (req, res) => res.json({ username: req.user.username }));

router.route('/logout').post((req, res) => {
  req.logout();
  res.json({ message: 'OK' });
});

module.exports = router;
