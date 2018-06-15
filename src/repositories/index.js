const createAccountRepository = require('./account');
const createAuthRepository = require('./auth');
const createChannelRepository = require('./channel');
const createMessageRepository = require('./message');
const createRealmRepository = require('./realm');
const createSubscriptionRepository = require('./subscription');
const createUserRepository = require('./user');

/**
 * Create repositories from collections.
 *
 * @param {Collection} accountCollection Dependency
 * @param {Collection} authCollection Dependency
 * @param {Collection} channelCollection Dependency
 * @param {Collection} messageCollection Dependency
 * @param {Collection} realmCollection Dependency
 * @param {Collection} subscriptionCollection Dependency
 * @param {Collection} userCollection Dependency
 * @return {Repositories} The repositories
 */
module.exports = ({
  accountCollection, authCollection, channelCollection, messageCollection,
  realmCollection, subscriptionCollection, userCollection,
}) =>
  /**
   * @typedef {object} Repositories
   * @property {AccountRepository} account
   * @property {AuthRepository} auth
   * @property {ChannelRepository} channel
   * @property {MessageRepository} message
   * @property {RealmRepository} realm
   * @property {SubscriptionRepository} subscription
   * @property {UserRepository} user
   */
  ({
    account: createAccountRepository({collection: accountCollection}),
    auth: createAuthRepository({collection: authCollection}),
    channel: createChannelRepository({collection: channelCollection}),
    message: createMessageRepository({collection: messageCollection}),
    realm: createRealmRepository({collection: realmCollection}),
    subscription: createSubscriptionRepository({collection: subscriptionCollection}),
    user: createUserRepository({collection: userCollection}),
  });
