const createRepositories = require('../repositories');

/**
 * Bootstrap repositories with properly named collections.
 *
 * @param {Db} db Dependency
 * @return {Promise<{account, auth, realm, user}>} The bootstrapped repositories
 */
module.exports = ({db}) => createRepositories({
  accountCollection: db.createCollection('accounts'),
  authCollection: db.createCollection('auths'),
  realmCollection: db.createCollection('realms'),
  userCollection: db.createCollection('users')
});
