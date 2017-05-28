const express = require('express');
const registerUser = require('../controllers/userSchema').userRegister;
const getUser = require('../controllers/userSchema').getUserByUsername;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const findById = require('../controllers/userSchema').findById;


const router = express.Router();

const compare = async (reqPassword, userPassword) => {
  const isValid = await bcrypt.compare(reqPassword, userPassword);
  return isValid;
};

passport.use(new LocalStrategy((username, password, done) => {
  getUser(username, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    compare(password, user.password)
      .then((isValid) => {
        if (isValid !== true) { return done(null, false); }
        return done(null, user);
      });
  });
}));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

router.route('/register').post(registerUser, (req, res) => {
  res.json({ userId: req.user.id, username: req.user.username });
});
router
  .route('/login')
  .post(passport.authenticate('local', {}), (req, res) => res.json({ username: req.user.username }));

router.route('/logout').post((req, res) => {
  res.json({ message: 'OK' });
});


module.exports = router;
