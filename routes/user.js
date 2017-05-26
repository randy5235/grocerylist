const express = require('express');
const registerUser = require('../controllers/userSchema').userRegister;
const getUser = require('../controllers/userSchema').getUserByUsername;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const findById = require('../controllers/userSchema').findById;



const router = express.Router();

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(`USERNAME: ${username}`);
    console.log(`PASSWORD: ${password}`);
    getUser(username, function (err, user) {
      //console.log(user)
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!bcrypt.compare(password, user.password)) { return done(null, false); }
      console.log(user.username);
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  findById(id, function (err, user) {
    if (err) { return cb(err); }
    console.log(`USERSSSSSSSSSSS ${user.id}`);
    cb(null, user);
  });
});

function isAuthorized (req,res,next){
    if(req.isAuthenticated()){
        //if user is looged in, req.isAuthenticated() will return true 
        next();
    } else{
        res.json({ message: 'Try AGAIN' });
    }
}

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
