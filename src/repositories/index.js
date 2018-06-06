const createAccountRepository = require('./account');
const createAuthRepository = require('./auth');
const createChannelRepository = require('./channel');
const createRealmRepository = require('./realm');
const createUserRepository = require('./user');

/**
 * Create repositories from collections.
 *
 * @param {Collection} accountCollection Dependency
 * @param {Collection} authCollection Dependency
 * @param {Collection} channelCollection Dependency
 * @param {Collection} realmCollection Dependency
 * @param {Collection} userCollection Dependency
 * @return {Repositories} The repositories
 */
module.exports = ({accountCollection, authCollection, channelCollection, realmCollection, userCollection}) =>
  /**
   * @typedef {object} Repositories
   * @property {AccountRepository} account
   * @property {AuthRepository} auth
   * @property {ChannelRepository} channel
   * @property {RealmRepository} realm
   * @property {UserRepository} user
   */
  ({
    account: createAccountRepository({collection: accountCollection}),
    auth: createAuthRepository({collection: authCollection}),
    channel: createChannelRepository({collection: channelCollection}),
    realm: createRealmRepository({collection: realmCollection}),
    user: createUserRepository({collection: userCollection})
  });
