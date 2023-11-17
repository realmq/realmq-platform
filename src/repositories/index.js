const createAuthRepository = require('./auth');
const createChannelRepository = require('./channel');
const createMessageRepository = require('./message');
const createRealmRepository = require('./realm');
const createRealmLimitsRepository = require('./realm-limits');
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
 * @param {Collection} realmLimitsCollection Dependency
 * @param {Collection} realtimeConnectionCollection Dependency
 * @param {Collection} subscriptionCollection Dependency
 * @param {Collection} userCollection Dependency
 * @return {Repositories} The repositories
 */
module.exports = ({
  authCollection,
  channelCollection,
  messageCollection,
  realmCollection,
  realmLimitsCollection,
  subscriptionCollection,
  userCollection,
  realtimeConnectionCollection,
}) =>
  /**
   * @typedef {object} Repositories
   * @property {AuthRepository} auth
   * @property {ChannelRepository} channel
   * @property {MessageRepository} message
   * @property {RealmRepository} realm
   * @property {RealmLimitsRepository} realmLimits
   * @property {RealtimeConnectionRepository} realtimeConnection
   * @property {SubscriptionRepository} subscription
   * @property {UserRepository} user
   */
  ({
    auth: createAuthRepository({collection: authCollection}),
    channel: createChannelRepository({collection: channelCollection}),
    message: createMessageRepository({collection: messageCollection}),
    realm: createRealmRepository({collection: realmCollection}),
    realmLimits: createRealmLimitsRepository({collection: realmLimitsCollection}),
    realtimeConnection: createRealtimeConnectionRepository({collection: realtimeConnectionCollection}),
    subscription: createSubscriptionRepository({collection: subscriptionCollection}),
    user: createUserRepository({collection: userCollection}),
  });
