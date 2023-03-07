const createAuthRepository = require('./auth');
const createChannelRepository = require('./channel');
const createMessageRepository = require('./message');
const createRealmRepository = require('./realm');
const createRealtimeConnectionRepository = require('./realtime-connection');
const createSubscriptionRepository = require('./subscription');
const createUserRepository = require('./user');

/**
 * Create repositories from collections.
 *
 * @param {Collection} authCollection Dependency
 * @param {Collection} channelCollection Dependency
 * @param {Collection} messageCollection Dependency
 * @param {Collection} realmCollection Dependency
 * @param {Collection} realtimeConnectionCollection Dependency
 * @param {Collection} subscriptionCollection Dependency
 * @param {Collection} userCollection Dependency
 * @return {Repositories} The repositories
 */
module.exports = ({
  authCollection, channelCollection, messageCollection,
  realmCollection, subscriptionCollection, userCollection,
  realtimeConnectionCollection
}) =>
  /**
   * @typedef {object} Repositories
   * @property {AuthRepository} auth
   * @property {ChannelRepository} channel
   * @property {MessageRepository} message
   * @property {RealmRepository} realm
   * @property {RealtimeConnectionRepository} realtimeConnection
   * @property {SubscriptionRepository} subscription
   * @property {UserRepository} user
   */
  ({
    auth: createAuthRepository({collection: authCollection}),
    channel: createChannelRepository({collection: channelCollection}),
    message: createMessageRepository({collection: messageCollection}),
    realm: createRealmRepository({collection: realmCollection}),
    realtimeConnection: createRealtimeConnectionRepository({collection: realtimeConnectionCollection}),
    subscription: createSubscriptionRepository({collection: subscriptionCollection}),
    user: createUserRepository({collection: userCollection}),
  });
