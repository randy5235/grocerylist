const express = require('express');
const passport = require('passport');
const { userRegister } = require('../controllers/userFunctions');
const { validateRegistration } = require('../lib/validation');

const router = express.Router();

router
  .route('/register')
  .post(
    validateRegistration,
    userRegister,
    passport.authenticate('local', {}),
    (req, res) => {
      res.json({ userId: req.user.id, username: req.user.username });
    }
  );

router
  .route('/login')
  .post(passport.authenticate('local', {}), (req, res) =>
    res.json({ username: req.user.username, userId: req.user.id })
  );

router.route('/logout').post((req, res) => {
  req.logout();
  res.clearCookie('SessionId');
  res.json({ message: 'Successfully logged out' });
});

module.exports = router;
