const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const getUser = require('../controllers/userSchema').getUser;
const findById = require('../controllers/userSchema').findById;
const bcrypt = require('bcrypt');

const checkCreds = passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(`USERNAME: ${username}`);
    console.log(`PASSWORD: ${password}`);
    getUser(username, function (err, user) {
      //console.log(user)
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!bcrypt.compare(password, user.password)) { return done(null, false); }
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

module.exports = { checkCreds, isAuthorized };
