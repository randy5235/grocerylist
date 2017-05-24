const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const getUser = require('../controllers/userSchema').getUser;


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
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
