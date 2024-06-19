import express from 'express';
import passport from 'passport';
import { userRegister } from '../controllers/userFunctions';
import { validateRegistration } from '../lib/validation';
import type { UserAttributes } from '../controllers/modelSchema';

const router = express.Router();

router
  .route('/register')
  .post(
    validateRegistration,
    userRegister,
    passport.authenticate('local', {}),
    (req, res) => {
      const { id, username } = req?.user as UserAttributes;
      if ((req?.user as UserAttributes)?.id && (req?.user as UserAttributes)?.username) {
        res.json({ userId: id, username });
      } else {
        res.status(500).json({ error: 'User not found' });
      }
    }
  );

router
  .route('/login')
  .post(passport.authenticate('local', {}), (req, res) => {
    const { id, username } = req?.user as UserAttributes;
    res.json({ username, userId: id });
  });

router.route('/logout').post((req, res) => {
  req.logout(() => { });
  res.clearCookie('SessionId');
  res.json({ message: 'Successfully logged out' });
});

export default router;
