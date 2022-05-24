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
    channelCollection,
    messageCollection,
    realmCollection,
    subscriptionCollection,
    userCollection,
  ] = await Promise.all([
    db.collection('accounts'),
    db.collection('auths'),
    db.collection('channels'),
    db.collection('messages'),
    db.collection('realms'),
    db.collection('subscriptions'),
    db.collection('users'),
  ]);
  return createRepositories({
    accountCollection,
    authCollection,
    channelCollection,
    messageCollection,
    realmCollection,
    subscriptionCollection,
    userCollection,
  });
};
