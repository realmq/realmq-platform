const createRepositories = require('../repositories');

/**
 * Bootstrap repositories with properly named collections.
 *
 * @param {Db} db Dependency
 * @return {Promise<Repositories>} The bootstrapped repositories
 */
module.exports = async ({db}) => {
  const [
    authCollection,
    channelCollection,
    messageCollection,
    realmCollection,
    realtimeConnectionCollection,
    subscriptionCollection,
    userCollection,
  ] = await Promise.all([
    db.collection('auths'),
    db.collection('channels'),
    db.collection('messages'),
    db.collection('realms'),
    db.collection('realtime-connections'),
    db.collection('subscriptions'),
    db.collection('users'),
  ]);
  return createRepositories({
    authCollection,
    channelCollection,
    messageCollection,
    realmCollection,
    realtimeConnectionCollection,
    subscriptionCollection,
    userCollection,
  });
};
