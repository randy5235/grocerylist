const bodyParser = require('body-parser');
const config = require('./config/dbConfig').sessionSecret;
const express = require('express');
const passport = require('passport');
const router = require('./routes');
const session = require('express-session');

const sess = {
  secret: 'meow meow',
  cookie: {}
};

const app = express();
const port = process.env.PORT || 3000;
console.log(config);
app.use(session(config));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use('/api', router);
app.listen(port);
