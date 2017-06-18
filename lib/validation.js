const Joi = require('joi');

const registrationSchema = Joi.object().keys({
  username: Joi.string().email(),
  password: Joi.any()
});

const addUserSchema = Joi.object().keys({
  email: Joi.string().email()
});

const validateRegistration = (req, res, next) => {
  const passedValidation = registrationSchema.validate(req.body);
  if (passedValidation) {
    next();
  } else {
    res.json({ error: 'Incorrect Values, please try again!' });
  }
};

const validateAddUser = (req, res, next) => {
  const passedValidation = addUserSchema.validate(req.body);
  if (passedValidation) {
    next();
  } else {
    res.json({ error: 'Incorrect Values, please try again!' });
  }
};

module.exports = { validateAddUser, validateRegistration };
