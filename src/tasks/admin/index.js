const initAuthenticateAccount = require('./authenticate-account');
const initCreateAccount = require('./create-account');
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
 * @param {AccountRules} accountRules The account rules
 * @param {AuthTokenRules} authTokenRules The auth token rules
 * @param {RealmRepository} realmRepository The realm repository
 * @param {AuthRepository} authRepository The auth repository
 * @param {AccountRepository} accountRepository The account repository
 * @param {SubscriptionRepository} subscriptionRepository The subscription repository
 * @param {UserRepository} userRepository The user repository
 * @param {ChannelRepository} channelRepository The channel repository
 * @param {CommonTasks#sendSubscriptionSync} sendSubscriptionSyncMessage Send subscription created task
 * @returns {AdminTasks} Initialized admin tasks
 */
module.exports = ({
  accountRules, authTokenRules, accountRepository, authRepository, realmRepository, userRepository,
  channelRepository, subscriptionRepository, sendSubscriptionSyncMessage,
}) => {
  return {
    fetchRealm: initFetchRealm({realmRepository}),
    authenticateAccount: initAuthenticateAccount({accountRules, accountRepository}),
    createAccount: initCreateAccount({accountRules, accountRepository}),
    createChannel: initCreateChannel({realmRepository, channelRepository}),
    createRealm: initCreateRealm({realmRepository}),
    createRealmToken: initCreateRealmToken({authTokenRules, realmRepository, userRepository, authRepository}),
    createSubscription: initCreateSubscription({realmRepository, userRepository, channelRepository, subscriptionRepository, sendSubscriptionSyncMessage}),
    createUser: initCreateUser({realmRepository, userRepository}),
    listChannels: initListChannels({channelRepository, realmRepository}),
    listRealms: initListRealms({realmRepository}),
    listRealmTokens: initListRealmTokens({realmRepository, authRepository}),
    listSubscriptions: initListSubscriptions({realmRepository, subscriptionRepository}),
    listUsers: initListUsers({realmRepository, userRepository}),
  };
};
