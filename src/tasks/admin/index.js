const initCreateChannel = require('./create-channel');
const initCreateRealm = require('./create-realm');
const initCreateRealmToken = require('./create-realm-token');
const initCreateSubscription = require('./create-subscription');
const initCreateUser = require('./create-user');
const initDeleteChannel = require('./delete-channel');
const initDeleteSubscription = require('./delete-subscription');
const initDeleteToken = require('./delete-token');
const initDeleteUser = require('./delete-user');
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
 * @param {RealmLimitsRepository} realmLimitsRepository The realm limits repository
 * @param {AuthRepository} authRepository The auth repository
 * @param {ChannelRepository} channelRepository The channel repository
 * @param {MessageRepository} messageRepository The message repository
 * @param {RealtimeConnectionRepository} realtimeConnectionRepository The real-time connection repository
 * @param {SubscriptionRepository} subscriptionRepository The subscription repository
 * @param {UserRepository} userRepository The user repository
 * @param {CommonTasks#sendSubscriptionSyncMessage} sendSubscriptionSyncMessage Task for sending subscription sync
 * @returns {AdminTasks} Initialized admin tasks
 */
module.exports = ({
  authTokenRules,
  authRepository,
  channelRepository,
  messageRepository,
  realmRepository,
  realmLimitsRepository,
  realtimeConnectionRepository,
  subscriptionRepository,
  userRepository,
  sendSubscriptionSyncMessage,
}) => ({
  fetchRealm: initFetchRealm({realmRepository}),
  createChannel: initCreateChannel({realmRepository, channelRepository}),
  createRealm: initCreateRealm({realmRepository, realmLimitsRepository}),
  createRealmToken: initCreateRealmToken({authTokenRules, realmRepository, userRepository, authRepository}),
  createSubscription: initCreateSubscription({
    userRepository,
    realmRepository,
    channelRepository,
    sendSubscriptionSyncMessage,
    subscriptionRepository,
  }),
  createUser: initCreateUser({userRepository, realmRepository}),
  deleteChannel: initDeleteChannel({
    messageRepository,
    realmRepository,
    channelRepository,
    subscriptionRepository,
  }),
  deleteSubscription: initDeleteSubscription({
    realmRepository,
    subscriptionRepository,
    sendSubscriptionSyncMessage,
  }),
  deleteToken: initDeleteToken({
    authRepository,
    realmRepository,
    realtimeConnectionRepository,
  }),
  deleteUser: initDeleteUser({
    authRepository,
    realmRepository,
    realtimeConnectionRepository,
    userRepository,
    subscriptionRepository,
  }),
  listChannels: initListChannels({realmRepository, channelRepository}),
  listRealms: initListRealms({realmRepository}),
  listRealmTokens: initListRealmTokens({realmRepository, authRepository}),
  listSubscriptions: initListSubscriptions({realmRepository, subscriptionRepository}),
  listUsers: initListUsers({realmRepository, userRepository}),
});
