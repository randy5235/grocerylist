'use strict';

const hooks = require('hooks');

var stash = {};

function User() {
  this.username = `test_${Date.now()}`;
  this.password = `password`;
  return { username: this.username, password: this.password };
};

const getUser = new User;
// console.log(getUser);

hooks.before('users > Register > Create a new user', function (transaction, done) {
  var requestBody = JSON.parse(transaction.request.body);
  transaction.request.body = JSON.stringify(getUser);
  done();
});

hooks.after('users > Login > Login with an existing user', function (transaction, done) {
  stash.cookie = transaction.real['headers']['set-cookie'];
  console.log(stash);
  done();
});

hooks.before('lists > lists > Send back a collection of all lists that a user has access to', function (transaction, done) {
  var cookie = stash.cookie;
  transaction.request['headers']['Cookie'] = cookie;
  done();
});
hooks.before('lists > list/:list > Send back a specific lists that a user has access to', function (transaction, done) {
  var cookie = stash.cookie;
  transaction.request['headers']['Cookie'] = cookie;
  done();
});
hooks.before('items > items > Send back a collection of all items that a user has access to on a given list', function (transaction, done) {
  var cookie = stash.cookie;
  transaction.request['headers']['Cookie'] = cookie;
  done();
});
hooks.before('items > list/:list/item/:item > Send back a specific item that a user has access to', function (transaction, done) {
  var cookie = stash.cookie;
  transaction.request['headers']['Cookie'] = cookie;
  done();
});

