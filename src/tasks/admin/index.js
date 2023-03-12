const initCreateChannel = require('./create-channel');
const initCreateRealm = require('./create-realm');
const initCreateRealmToken = require('./create-realm-token');
const initCreateSubscription = require('./create-subscription');
const initCreateUser = require('./create-user');
const initFetchRealm = require('./fetch-realm');
const initListChannels = require('./list-channels');
const initListRealms = require('./list-realms');
const initListRealmTokens = require('./list-realm-tokens');
const initListSubscriptions = require('./list-subscriptions');
const initListUsers = require('./list-users');

/** @typedef {object} AdminTasks */
/**
 * @param {AuthTokenRules} authTokenRules The auth token rules
 * @param {RealmRepository} realmRepository The realm repository
 * @param {AuthRepository} authRepository The auth repository
 * @param {ChannelRepository} channelRepository The channel repository
 * @param {SubscriptionRepository} subscriptionRepository The subscription repository
 * @param {UserRepository} userRepository The user repository
 * @param {CommonTasks#sendSubscriptionSyncMessage} sendSubscriptionSyncMessage Task for sending subscription sync
 * @returns {AdminTasks} Initialized admin tasks
 */
module.exports = ({
  authTokenRules,
  authRepository,
  channelRepository,
  realmRepository,
  subscriptionRepository,
  userRepository,
  sendSubscriptionSyncMessage
}) => ({
  fetchRealm: initFetchRealm({realmRepository}),
  createChannel: initCreateChannel({realmRepository, channelRepository}),
  createRealm: initCreateRealm({realmRepository}),
  createRealmToken: initCreateRealmToken({authTokenRules, realmRepository, userRepository, authRepository}),
  createSubscription: initCreateSubscription({
    userRepository,
    realmRepository,
    channelRepository,
    sendSubscriptionSyncMessage,
    subscriptionRepository
  }),
  createUser: initCreateUser({userRepository, realmRepository}),
  listChannels: initListChannels({realmRepository, channelRepository}),
  listRealms: initListRealms({realmRepository}),
  listRealmTokens: initListRealmTokens({realmRepository, authRepository}),
  listSubscriptions: initListSubscriptions({realmRepository, subscriptionRepository}),
  listUsers: initListUsers({realmRepository, userRepository})
});
