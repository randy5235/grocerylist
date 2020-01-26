/* eslint consistent-return: "off"*/
const bcrypt = require("bcryptjs");
const { findById, getUserByUsername } = require("../controllers/userFunctions");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const winston = require("winston");

const compare = async (reqPassword, userPassword) => {
  const isValid = await bcrypt.compare(reqPassword, userPassword);
  return isValid;
};

passport.use(
  "local",
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await getUserByUsername(username);
      return done(
        null,
        (await compare(password, user.password)) ? user : false
      );
    } catch (err) {
      winston.log("error", err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});
