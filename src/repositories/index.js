const createAuthRepository = require('./auth');
const createChannelRepository = require('./channel');
const createMessageRepository = require('./message');
const createRealmRepository = require('./realm');
const createSubscriptionRepository = require('./subscription');
const createUserRepository = require('./user');

/**
 * Create repositories from collections.
 *
 * @param {Collection} authCollection Dependency
 * @param {Collection} channelCollection Dependency
 * @param {Collection} messageCollection Dependency
 * @param {Collection} realmCollection Dependency
 * @param {Collection} subscriptionCollection Dependency
 * @param {Collection} userCollection Dependency
 * @return {Repositories} The repositories
 */
module.exports = ({
  authCollection, channelCollection, messageCollection,
  realmCollection, subscriptionCollection, userCollection,
}) =>
  /**
   * @typedef {object} Repositories
   * @property {AuthRepository} auth
   * @property {ChannelRepository} channel
   * @property {MessageRepository} message
   * @property {RealmRepository} realm
   * @property {SubscriptionRepository} subscription
   * @property {UserRepository} user
   */
  ({
    auth: createAuthRepository({collection: authCollection}),
    channel: createChannelRepository({collection: channelCollection}),
    message: createMessageRepository({collection: messageCollection}),
    realm: createRealmRepository({collection: realmCollection}),
    subscription: createSubscriptionRepository({collection: subscriptionCollection}),
    user: createUserRepository({collection: userCollection}),
  });
