const bodyParser = require('body-parser');
// const cors = require('cors');
import express from 'express';
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


declare module 'express-session' {
  interface SessionData {
    username: string;
    userId: string;
  }
}

winston.stream = {
  write: (message: string) => {
    winston.info(message);
  },
};

require('./authentication/auth');

const app = express();
const port = process.env.PORT || 5000;
// app.options('/api/', cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  next();
});
// app.use(cors({ credentials: true, origin: '*'}));
app.use((req: Request, res: Response, next: NextFunction) => {
//   // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

//   // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

//   // Request headers you wish to allow

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');

//   // Pass to next layer of middleware
  next();
});

// app.use(cookieParser());

// function CheckCookieSession(req: Request, res, next) {
//   if (req.cookies) {
//     console.log('req.cookies: ', req.cookies);
//   }
//   next();
// }



app.use(passport.initialize());
app.use(session(sessionSecret));
app.use(passport.session());
app.use(bodyParser.json());
app.use('/api/health', (req, res) => {
  res.json({ message: 'health check' });
});
app.get('/api/auth',checkSessionId,  (req, res) => {
  console.log('req: ', req.sessionID, req.session);
  res.json({ message: 'auth route' });
});
app.use(logger('combined', { stream: winston.stream }));
app.use('/api', checkSessionId, router);
app.listen(port);
console.log(`Server listening on port ${port}`);


function checkSessionId(req: Request, res: Response, next: NextFunction) {
  // const auth = passport.authenticate('local', { session: true });
  if (req.sessionID) {
    console.log('req.sessionID: ', req.sessionID);
  }
  next();
}