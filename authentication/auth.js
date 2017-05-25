const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const getUser = require('../controllers/userSchema').getUser;


passport.use(new LocalStrategy(
  function(username, password, done) {
    getUser({ username: req.body.username }, function (err, user) {
      console.log(user);
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));


function isAuthorized() {
  return (req, res, next) => {
    if (req.isAuthenticated) {
      next();
    }
    return res.json({ message: 'NOT AUTHORIZED' });
  };
}

module.exports = isAuthorized;
