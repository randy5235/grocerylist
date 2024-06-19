import bcrypt from 'bcryptjs';
import { User, UserAttributes } from './modelSchema';
import type { Model } from 'sequelize';
import winston from 'winston';

import type { Request, Response, NextFunction } from 'express';

const userRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const salt = await bcrypt.genSalt(8);
    try {
      req.body.username = req.body.username.toLowerCase();
      const password = await bcrypt.hash(req.body.password, salt);
      const username = req.body.username;
      const user = await User.findOrCreate({
        where: { username: req.body.username, isRegistered: false },
        defaults: {
          username,
          password,
          isRegistered: true
        }
      });
      if (user[1] === false) {
        user[0].update({ password, isRegistered: true });
      }
      req.user = user[0];
      next();
    } catch (err) {
      res.json({ message: (err as any)?.message });
    }
  } catch (err) {
    winston.log('error', err);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.username = req.body.username.toLowerCase();
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });


    if (user) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.getDataValue('password')
      );
      if (isPasswordValid) {
        req.user = user;
        next();
      }
    } else {
      res.json({ error: 'Username or Password is incorrect' });
    }
  } catch (err) {
    winston.error(err);
  }
};

const getUserByUsername = async (username: string) => {
  let user = null;
  try {
    user = await User.findOne({
      where: {
        username: username.toLowerCase(),
        isRegistered: true
      }
    });
  } catch (err) {
    winston.log('error', err);
  }
  return user;
};

const findById = async (id: string, cb: any) => {
  try {
    const user = await User.findOne({
      where: {
        id
      }
    });
    cb(null, user);
  } catch (err) {
    winston.error(err);
  }
};

export { userRegister, getUser, getUserByUsername, findById };
