/* eslint func-names: 0, max-len: 0, no-magic-numbers: 0 */

const expect = require('chai').expect;
const sinon = require('sinon');
const { validateAddUser, validateRegistration, } = require('../lib/validation');

const validEmailBody = {
  email: 'test@example.org'
};

const validRegistrationBody = {
  username: 'test@example.org',
  password: 'Password!23'
};

const next = sinon.spy();

describe('Payload Validation', () => {
  it('Validates the email address of register call', () => {
    validateRegistration({ body: validRegistrationBody }, null, next);
    sinon.assert.called(next);
  });
});

describe('validateAddUser', () => {
  it('Validates the email address of an addUser call', () => {
    validateAddUser({ body: validEmailBody }, null, next);
    sinon.assert.called(next);
  });
});

