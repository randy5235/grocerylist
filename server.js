const bodyParser = require('body-parser');
const { sessionSecret } = require('./config/dbConfig');
const express = require('express');
const passport = require('passport');
const router = require('./routes');
const session = require('express-session');
require('./authentication/auth');

const app = express();
const port = process.env.PORT || 3000;
app.use(session(sessionSecret));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use('/api', router);
app.listen(port);
