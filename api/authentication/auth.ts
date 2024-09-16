/* eslint consistent-return: "off" */
import bcrypt from 'bcryptjs';
import { findById, getUserByUsername } from '../controllers/userFunctions';
const LocalStrategy = require('passport-local').Strategy;
import passport from 'passport';
import winston from 'winston';
import { UserAttributes } from '../framework/models/UserSchema';

const compare = async (reqPassword: string, userPassword: string) => {
  const isValid = await bcrypt.compare(reqPassword, userPassword);
  return isValid;
};

passport.use(
  'local',
  new LocalStrategy(async (username: string, password: string, done: any) => {
    try {
      const user = await getUserByUsername(username);
      if (user) {
        return done(
          null,
          (await compare(password, (user as unknown as UserAttributes)?.password)) ? user : false
        );
      }
    } catch (err) {
      winston.log('error', err);
    }
  })
);

passport.serializeUser((user: any, cb: (arg0: null, arg1: any) => any) => {
  cb(null, user.id);
});

passport.deserializeUser((id: any, cb: (error: any | null, user?: any | undefined) => void) => {
  findById(id, (err: any, user: any) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});
