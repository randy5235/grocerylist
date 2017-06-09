const express = require('express');
const { userRegister } = require('../controllers/userSchema');
const passport = require('passport');

const router = express.Router();
// register needs to be updated to check if already
// registered or just invited.
// user model needs a registered boolean field
// to indicate if a user has actively registered
// or was just invited to a list.
router
  .route('/register').post(userRegister, (req, res) => {
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
