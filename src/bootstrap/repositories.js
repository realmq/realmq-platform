const createRepositories = require('../repositories');

/**
 * Bootstrap repositories with properly named collections.
 *
 * @param {Db} db Dependency
 * @return {Promise<Repositories>} The bootstrapped repositories
 */
module.exports = async ({db}) => {
  const [
    accountCollection,
    authCollection,
    realmCollection,
    subscriptionCollection,
    userCollection
  ] = await Promise.all([
    db.createCollection('accounts'),
    db.createCollection('auths'),
    db.createCollection('realms'),
    db.createCollection('subscriptions'),
    db.createCollection('users')
  ]);
  return createRepositories({
    accountCollection,
    authCollection,
    realmCollection,
    subscriptionCollection,
    userCollection
  });
};
