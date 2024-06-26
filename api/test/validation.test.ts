/* eslint func-names: 0, max-len: 0, no-magic-numbers: 0 */
/* eslint no-unused-expressions: 0, max-len: 0, no-magic-numbers: 0 */

const expect = require('chai').expect;
const sinon = require('sinon');
import { validateAddUser, validateRegistration, addUserSchema, registrationSchema } from '../lib/validation';
import { Request, Response } from 'express';

const validEmailBody = {
  email: 'test@example.org'
};

const validRegistrationBody = {
  username: 'test@example.org',
  password: 'Password!23'
};

const invalidRegistrationBody = {
  username: 'test@example.org',
  password: 'password!23'
};

const next = sinon.spy();

describe('Payload Validation', () => {
  it('Validates the email address of register call', () => {
    const req = { body: validRegistrationBody };
    validateRegistration((req as Request), ({} as Response), next);
    sinon.assert.called(next);
  });
});

describe('validateAddUser', () => {
  it('Validates the email address of an addUser call', () => {
    validateAddUser(({ body: validRegistrationBody } as Request), ({} as Response), next);
    sinon.assert.called(next);
  });
});

describe('addUserSchema', () => {
  it('Validates the email address of an addUser call', () => {
    const checkUserSchema = addUserSchema.validate(validEmailBody);
    expect(checkUserSchema.error).to.be.null;
    // sinon.assert.called(next);
  });
});

describe('registrationSchemA', () => {
  it('Validates the payload needed to add a user ', () => {
    const checkUserSchema = registrationSchema.validate(validRegistrationBody);
    expect(checkUserSchema.error).to.be.null;
    // sinon.assert.called(next);
  });
});

describe('registrationSchemA', () => {
  it('Fails to Validates a bad  payload needed to add a user ', () => {
    const checkUserSchema = registrationSchema.validate(invalidRegistrationBody);
    expect(checkUserSchema.error).not.to.be.null;
    // sinon.assert.called(next);
  });
});

