const createRepositories = require('../repositories');

module.exports = ({db}) => createRepositories({
  accountCollection: db.createCollection('accounts'),
  authCollection: db.createCollection('auths'),
  realmCollection: db.createCollection('realms'),
  userCollection: db.createCollection('users')
});
