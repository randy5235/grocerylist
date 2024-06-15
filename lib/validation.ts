const joi = require('joi');
import type { Request, Response, NextFunction } from 'express';

const passwordMinimumRequirements = /^(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-z])(?=.*[A-Z])/;
const passwordAllowedChars = /^[0-9a-zA-Z !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,32}$/;

const registrationSchema = joi.object().keys({
  username: joi.string().email(),
  password: joi
    .string()
    .min(8)
    .max(128)
    .regex(passwordMinimumRequirements)
    .regex(passwordAllowedChars),
});

const addUserSchema = joi.object().keys({
  email: joi.string().email(),
});

const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
  const passedValidation = registrationSchema.validate(req.body);
  if (!passedValidation.error) {
    next();
  } else {
    res.json({
      error: 'Incorrect Values, please try again',
      message: passedValidation.error,
    });
  }
};

const validateAddUser = (req: Request, res: Response, next: NextFunction) => {
  const passedValidation = addUserSchema.validate(req.body);
  if (!passedValidation.error) {
    next();
  } else {
    res.json({ error: 'Incorrect Values, please try again' });
  }
};

export {
  validateAddUser,
  validateRegistration,
  addUserSchema,
  registrationSchema,
};
