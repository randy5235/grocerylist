const bodyParser = require('body-parser');
const { sessionSecret } = require('./config/dbConfig');
const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const router = require('./routes');
const session = require('express-session');
// const RedisStore = require('connect-redis')(session);
// const client = redis.createClient();
// const redisOptions = { host: 'localhost', port: 6379, client: client,ttl :  260};
const winston = require('winston');
const { MemoryStore } = require('express-session');

winston.stream = {
  write: (message) => {
    winston.info(message);
  }
};

require('./authentication/auth');

const app = express();
const port = process.env.PORT || 5000;

app.use(session(sessionSecret));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(logger('combined', { stream: winston.stream }));
app.use('/api', router);
app.listen(port);
