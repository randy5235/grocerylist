/* eslint import/no-extraneous-dependencies: ["off", {"devDependencies": false}] */
/* eslint import/no-unresolved: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const hooks = require('hooks');

const stash = {};

function User() {
  this.username = `test_${Date.now()}`;
  this.password = 'password';
  return { username: this.username, password: this.password };
}

const getUser = new User();

hooks.before('users > Register > Create a new user', (transaction, done) => {
  transaction.request.body = JSON.stringify(getUser);
  done();
});

hooks.before('users > Login > Login with an existing user', (transaction, done) => {
  transaction.request.body = JSON.stringify(getUser);
  done();
});

hooks.after('users > Login > Login with an existing user', (transaction, done) => {
  stash.cookie = transaction.real.headers['set-cookie'];
  done();
});

hooks.before('lists > lists > Send back a collection of all lists that a user has access to', (transaction, done) => {
  transaction.request.headers.Cookie = stash.cookie;
  done();
});

hooks.before('lists > list/:list/addUser > Add a user by email to a specific list', (transaction, done) => {
  transaction.request.headers.Cookie = stash.cookie;
  transaction.fullPath = `/api/list/${stash.list}/addUser`;
  transaction.request.uri = `/api/list/${stash.list}/addUser`;
  done();
});

hooks.before('lists > list > Create a new list', (transaction, done) => {
  transaction.request.headers.Cookie = stash.cookie;
  done();
});
hooks.before('items > item > Create a new item for a list', (transaction, done) => {
  transaction.request.headers.Cookie = stash.cookie;
  transaction.fullPath = `/api/list/${stash.list}/item`;
  transaction.request.uri = `/api/list/${stash.list}/item`;
  done();
});
hooks.after('items > item > Create a new item for a list', (transaction, done) => {
  const item = transaction.real.body;
  stash.item = JSON.parse(item).id;
  done();
});
hooks.after('lists > list > Create a new list', (transaction, done) => {
  const list = transaction.real.body;
  stash.list = JSON.parse(list).listId;
  done();
});
hooks.before('lists > list/:list > Send back a specific lists that a user has access to', (transaction, done) => {
  transaction.request.headers.Cookie = stash.cookie;
  transaction.fullPath = `/api/list/${stash.list}`;
  transaction.request.uri = `/api/list/${stash.list}`;
  done();
});
hooks.before('lists > list/:list > Delete a specific list that a user has access to', (transaction, done) => {
  transaction.request.headers.Cookie = stash.cookie;
  transaction.fullPath = `/api/list/${stash.list}`;
  transaction.request.uri = `/api/list/${stash.list}`;
  done();
});
hooks.before('items > items > Send back a collection of all items that a user has access to on a given list', (transaction, done) => {
  transaction.request.headers.Cookie = stash.cookie;
  transaction.fullPath = `/api/list/${stash.list}/items`;
  transaction.request.uri = `/api/list/${stash.list}/items`;
  done();
});
hooks.before('items > list/:list/item/:item > Send back a specific item that a user has access to', (transaction, done) => {
  transaction.request.headers.Cookie = stash.cookie;
  transaction.fullPath = `/api/list/${stash.list}/item/${stash.item}`;
  transaction.request.uri = `/api/list/${stash.list}/item/${stash.item}`;
  done();
});

