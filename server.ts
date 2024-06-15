const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const winston = require('winston');
import router from './routes';
const { sessionSecret } = require('./config/dbConfig');
import type { Request, Response, NextFunction } from 'express';
// const RedisStore = require('connect-redis')(session);
// const client = redis.createClient();
// const redisOptions = { host: 'localhost', port: 6379, client: client,ttl :  260};
// const { MemoryStore } = require('express-session');

winston.stream = {
  write: (message: string) => {
    winston.info(message);
  },
};

require('./authentication/auth');

const app = express();
const port = process.env.PORT || 5000;
app.options('/api/', cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   next();
// });
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use((req: Request, res: Response, next: NextFunction) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Pass to next layer of middleware
  next();
});

app.use(session(sessionSecret));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(logger('combined', { stream: winston.stream }));
app.use('/api', router);
app.listen(port);
