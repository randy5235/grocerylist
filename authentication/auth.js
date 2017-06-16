/* eslint consistent-return: "off"*/
const bcrypt = require('bcrypt');
const { findById, getUserByUsername } = require('../controllers/userFunctions');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');


const compare = async (reqPassword, userPassword) => {
  const isValid = await bcrypt.compare(reqPassword, userPassword);
  return isValid;
};

passport.use('local', new LocalStrategy((username, password, done) => {
  getUserByUsername(username, (err, user) => {
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
