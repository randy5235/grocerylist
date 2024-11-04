import express from 'express';
import passport from 'passport';
import { userRegister } from '../controllers/userFunctions';
import { validateRegistration } from '../lib/validation';
import type { UserAttributes } from '../framework/models/UserSchema';
import type { SessionData } from 'express-session';

const router = express.Router();

router
  .route('/register')
  .post(
    validateRegistration,
    userRegister,
    passport.authenticate('local', {}),
    (req, res) => {
      const { id, username } = req?.user as UserAttributes;
      (req.session as SessionData).username = username;
      (req.session as SessionData).userId = id;
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
    (req.session as SessionData).username = (req?.user as UserAttributes).username;
    console.log('req.user: ', (req?.user as UserAttributes)?.id , (req?.user as UserAttributes)?.username);
    (req.session as SessionData).userId = (req?.user as UserAttributes)?.id;
    const { id, username } = req?.user as UserAttributes;
    console.log("sessions: ", req.session);
    res.json({ username, userId: id });
  });

router.route('/logout').post((req, res) => {
  req.logout(() => { });
  res.clearCookie('SessionId');
  res.json({ message: 'Successfully logged out' });
});

export default router;
