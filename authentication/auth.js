/* eslint consistent-return: "off"*/
const bcrypt = require('bcrypt');
const { findById, getUserByUsername } = require('../controllers/userFunctions');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');


const compare = async (reqPassword, userPassword) => {
  const isValid = await bcrypt.compare(reqPassword, userPassword);
  return isValid;
};

passport.use('local', new LocalStrategy(async (username, password, done) => {
  const user = await getUserByUsername(username);
  if (compare(password, user.password)) {
    return done(null, user);
  } else {
    return done(null, false);
  }
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
